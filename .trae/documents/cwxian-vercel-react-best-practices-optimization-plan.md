# 创无限官网 Vercel React 最佳实践优化计划

**版本**：v1.0  
**日期**：2026-07-05  
**状态**：待用户确认  
**目标**：在已有 Next.js 15 + React 19 + TypeScript + Tailwind CSS 静态导出项目基础上，依据 `vercel-react-best-practices` 技能进行一轮定向代码质量与性能优化：消除数据获取瀑布、缓存重复静态 IO、减少客户端 bundle、修复条件渲染隐患，并验证构建无回归。

---

## 1. Summary

主站已完成全部页面、SEO、可访问性与静态导出配置。本阶段不再新增业务页面，而是对现有代码做工程层面的“体检 + 修复”。

重点优化方向：

1. **数据 IO 层**：将 `lib/data.ts` 从同步 `readFileSync` 改为异步 `readFile`，并增加模块级 JSON 缓存，避免构建期重复读取同一份数据。
2. **并行数据获取**：在需要同时读取多份 JSON 的页面使用 `Promise.all`，充分利用异步 IO 并行能力。
3. **代码分割**：对非首屏关键的客户端组件（帮助中心搜索、案例筛选器）使用 `next/dynamic` 动态导入，并补充骨架屏。
4. **条件渲染安全**：将 JSX 中可能渲染 `0`/`false`/`""` 的 `&&` 条件改为三元表达式。
5. **减少客户端边界**：移除 `SubSiteLink` 中可选的 `window.gtag` 点击事件，使其恢复为服务端组件，降低大量页面不必要的客户端 bundle。

所有改动保持现有视觉与交互不变，仅提升构建效率、运行时性能与代码可维护性。

---

## 2. Current State Analysis

### 2.1 已合规项（本次不改动）

- **无 barrel 文件**：组件均从具体文件导入，符合 `bundle-barrel-imports`。
- **动态导入已有示例**：[MobileNav](file:///d:/documents/GitHub/cwxian-web/components/layout/Header.tsx#L12-L14) 已使用 `next/dynamic` + `ssr: false`。
- **静态 JSX 提升**：[GettingStartedSteps](file:///d:/documents/GitHub/cwxian-web/components/sections/GettingStartedSteps.tsx#L6-L27)、[Header](file:///d:/documents/GitHub/cwxian-web/components/layout/Header.tsx#L16-L23)、[Footer](file:///d:/documents/GitHub/cwxian-web/components/layout/Footer.tsx#L6-L31) 中的静态数组均定义在模块级，符合 `rendering-hoist-jsx`。
- **无第三方脚本**：当前无分析、广告等外部脚本，无需 `bundle-defer-third-party` 处理。
- **无图片资源**：全部使用 SVG 图标，`images.unoptimized: true` 已配置。

### 2.2 待优化项

| 类别 | 现状 | 涉及文件 | 对应规则 |
|------|------|----------|----------|
| 同步阻塞 IO | `lib/data.ts` 使用 `readFileSync`，页面顺序调用多个 getter | `lib/data.ts`、多数 `app/**/page.tsx` | `server-parallel-fetching` |
| 无 IO 缓存 | 同一份 JSON 在 `generateStaticParams` 与页面中可能被多次读取 | `lib/data.ts`、`app/showcase/[slug]/page.tsx` | `server-cache-lru` |
| 客户端组件直接导入 | `DocSearch`、`ShowcaseFilterClient` 在页面中静态导入，首屏 JS 偏大 | `app/docs/page.tsx`、`app/showcase/page.tsx` | `bundle-dynamic-imports` |
| 条件渲染隐患 | 多处使用 `{condition && <Element />}`，存在渲染 `false`/`0`/`""` 风险 | `PageHeader`、`SectionHeader`、`DocContent`、`ExternalLink`、`SubSiteLink`、`Checklist`、`GettingStartedSteps`、`DocSearch`、`app/showcase/[slug]/page.tsx` | `rendering-conditional-render` |
| 不必要的客户端边界 | `SubSiteLink` 仅为了可选的 `window.gtag` 事件声明为 `"use client"` | `components/shared/SubSiteLink.tsx` | `server-serialization`、`bundle-dynamic-imports` |

---

## 3. Proposed Changes

### 3.1 数据 IO 层：异步读取 + 模块级缓存

**涉及文件**：[lib/data.ts](file:///d:/documents/GitHub/cwxian-web/lib/data.ts)

**改动内容**：

1. 将 `readFileSync` 替换为 `fs/promises` 的 `readFile`，使所有 getter 变为 `async`。
2. 增加 `Map` 缓存，同一构建进程内同一份 JSON 只读取并解析一次。
3. 所有 `export function getXxx()` 改为 `export async function getXxx(): Promise<T>`。

**目标代码示例**：

```ts
import { readFile } from "fs/promises";
import { join } from "path";
import type { ... } from "@/types";

const dataDirectory = join(process.cwd(), "data");
const jsonCache = new Map<string, unknown>();

async function readJsonFile<T>(filename: string): Promise<T> {
  const cached = jsonCache.get(filename);
  if (cached !== undefined) {
    return cached as T;
  }

  const filePath = join(dataDirectory, filename);
  const fileContents = await readFile(filePath, "utf8");
  const parsed = JSON.parse(fileContents);
  jsonCache.set(filename, parsed);
  return parsed as T;
}

export async function getStats(): Promise<Stat[]> {
  return readJsonFile<Stat[]>("stats.json");
}

// ... 其余 getter 同理
```

**依据**：`server-parallel-fetching`（异步 IO 可并行）、`server-cache-lru`（消除重复静态 IO）。

---

### 3.2 页面层：并行获取独立数据

**涉及文件**（所有需要同时读取多份数据的页面）：

- [app/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/page.tsx)
- [app/services/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/services/page.tsx)
- [app/get-started/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/get-started/page.tsx)
- [app/get-started/domain/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/get-started/domain/page.tsx)
- [app/get-started/hosting/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/get-started/hosting/page.tsx)
- [app/docs/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/docs/page.tsx)
- [app/docs/faq/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/docs/faq/page.tsx)
- [components/docs/DocPageLayout.tsx](file:///d:/documents/GitHub/cwxian-web/components/docs/DocPageLayout.tsx)
- [app/showcase/[slug]/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/showcase/[slug]/page.tsx) 的 `generateStaticParams`
- [app/sitemap.ts](file:///d:/documents/GitHub/cwxian-web/app/sitemap.ts)

**改动内容**：

- 对独立数据调用使用 `Promise.all` 并行获取。
- 仅读取单份数据的页面改为 `await getXxx()`。
- 需要类型断言的页面，先并行拿到原始值，再分别断言。

**示例 1：首页多数据并行**（[app/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/page.tsx#L19-L25)）

```tsx
export default async function Home() {
  const [stats, services, showcases, testimonials, partners, faq] = await Promise.all([
    getStats(),
    getServices(),
    getShowcases(),
    getTestimonials(),
    getPartners(),
    getFAQ(),
  ]);

  return (
    <>
      <Hero />
      <Stats stats={stats} />
      <ServiceOverview services={services} />
      {/* ... */}
    </>
  );
}
```

**示例 2：开通指引页并行 + 类型断言**（[app/get-started/domain/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/get-started/domain/page.tsx#L17-L31)）

```tsx
export default async function DomainGuidePage() {
  const [gettingStartedRaw, eligibilityRaw, faq] = await Promise.all([
    getGettingStarted(),
    getEligibility(),
    getFAQ(),
  ]);

  const gettingStarted = gettingStartedRaw as {
    domainSteps: { step: number; title: string; description: string }[];
    preparation: string[];
    tips: string[];
  };

  const eligibility = eligibilityRaw as {
    domainRules: {
      length: string;
      allowedChars: string;
      forbiddenPatterns: string[];
      forbiddenWords: string[];
    };
  };

  // ...
}
```

**示例 3：sitemap 异步化**（[app/sitemap.ts](file:///d:/documents/GitHub/cwxian-web/app/sitemap.ts#L8-L9)）

```ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const showcases = await getShowcases();
  // ...
}
```

**依据**：`async-parallel`、`server-parallel-fetching`。

---

### 3.3 客户端组件动态导入

**涉及文件**：

- [app/docs/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/docs/page.tsx)
- [app/showcase/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/showcase/page.tsx)
- 新建 [components/docs/DocSearchSkeleton.tsx](file:///d:/documents/GitHub/cwxian-web/components/docs/DocSearchSkeleton.tsx)
- 新建 [components/showcase/ShowcaseFilterSkeleton.tsx](file:///d:/documents/GitHub/cwxian-web/components/showcase/ShowcaseFilterSkeleton.tsx)

**改动内容**：

- 对 `DocSearch` 与 `ShowcaseFilterClient` 使用 `next/dynamic` 动态导入，默认 `ssr: true` 以保留 HTML 内容。
- 提供与真实组件尺寸一致的骨架屏，减少 CLS。

**目标代码示例**：

```tsx
import dynamic from "next/dynamic";
import { DocSearchSkeleton } from "@/components/docs/DocSearchSkeleton";

const DocSearch = dynamic(
  () => import("@/components/docs/DocSearch").then((mod) => mod.DocSearch),
  { loading: () => <DocSearchSkeleton /> }
);
```

```tsx
import dynamic from "next/dynamic";
import { ShowcaseFilterSkeleton } from "@/components/showcase/ShowcaseFilterSkeleton";

const ShowcaseFilterClient = dynamic(
  () => import("@/components/showcase/ShowcaseFilterClient").then((mod) => mod.ShowcaseFilterClient),
  { loading: () => <ShowcaseFilterSkeleton /> }
);
```

**依据**：`bundle-dynamic-imports`。

---

### 3.4 修复条件渲染隐患

**涉及文件**：

- [app/showcase/[slug]/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/showcase/[slug]/page.tsx#L96-L113)
- [components/shared/PageHeader.tsx](file:///d:/documents/GitHub/cwxian-web/components/shared/PageHeader.tsx#L27-L30)
- [components/shared/SectionHeader.tsx](file:///d:/documents/GitHub/cwxian-web/components/shared/SectionHeader.tsx#L24-L29)
- [components/docs/DocContent.tsx](file:///d:/documents/GitHub/cwxian-web/components/docs/DocContent.tsx#L14-L18)
- [components/shared/ExternalLink.tsx](file:///d:/documents/GitHub/cwxian-web/components/shared/ExternalLink.tsx#L26)
- [components/shared/SubSiteLink.tsx](file:///d:/documents/GitHub/cwxian-web/components/shared/SubSiteLink.tsx#L49)
- [components/get-started/Checklist.tsx](file:///d:/documents/GitHub/cwxian-web/components/get-started/Checklist.tsx#L67-L87)
- [components/sections/GettingStartedSteps.tsx](file:///d:/documents/GitHub/cwxian-web/components/sections/GettingStartedSteps.tsx#L60-L64)
- [components/docs/DocSearch.tsx](file:///d:/documents/GitHub/cwxian-web/components/docs/DocSearch.tsx#L76-L122)

**改动内容**：

将所有可能渲染非预期值的 `{condition && <Element />}` 改为 `{condition ? <Element /> : null}`。

**示例**：

```tsx
// 前
{description && <p className="...">{description}</p>}

// 后
{description ? <p className="...">{description}</p> : null}
```

**依据**：`rendering-conditional-render`。

---

### 3.5 将 SubSiteLink 恢复为服务端组件

**涉及文件**：[components/shared/SubSiteLink.tsx](file:///d:/documents/GitHub/cwxian-web/components/shared/SubSiteLink.tsx)

**改动内容**：

1. 移除文件顶部的 `"use client"`。
2. 删除 `handleClick` 与 `onClick` 逻辑（当前 `window.gtag` 为可选分析事件，非核心功能）。
3. 保留其余样式与外部链接安全属性。

**目标代码**：

```tsx
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface SubSiteLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
}

export function SubSiteLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  showIcon = true,
}: SubSiteLinkProps) {
  return (
    <Button variant={variant} size={size} className={cn(className)} asChild>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2"
      >
        {children}
        {showIcon ? <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      </a>
    </Button>
  );
}
```

**后续分析事件处理**：如未来需要统计子站跳转，可单独新建一个客户端 `SubSiteLinkTracker` 包装器，或在 `layout.tsx` 中通过 `next/script` 加载分析脚本后使用事件委托，避免让基础链接组件成为客户端边界。

**依据**：`server-serialization`、`bundle-dynamic-imports`（减少客户端 bundle）。

---

## 4. Assumptions & Decisions

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 数据读取方式 | 异步 `fs/promises.readFile` + 模块级 `Map` 缓存 | 支持 `Promise.all` 并行，同时消除重复解析 |
| 缓存范围 | 单构建进程内有效 | 数据文件在构建期间不变，安全且简单；开发时 HMR 会重启进程 |
| 动态导入 SSR | `ssr: true`（默认） | 保留初始 HTML，避免 SEO 与可访问性内容缺失 |
| 动态导入组件范围 | 仅 `DocSearch`、`ShowcaseFilterClient` | 二者交互重、非全局首屏；`Accordion`、`Checklist` 体积小且多处使用，暂不拆分 |
| SubSiteLink 分析事件 | 当前移除 | 主站纯展示，无实际分析脚本；减少客户端边界收益更大 |
| 条件渲染修复范围 | 所有 JSX 中的 `&&` 条件 | 统一改为三元表达式，消除未来因数据变化导致渲染异常的风险 |

---

## 5. Verification Steps

### 5.1 类型与规范验证

1. 运行 `npm run lint`，确认无新增 ESLint 错误。
2. 运行 `npm run build`，确认构建成功并生成 `dist/`。

### 5.2 构建产物验证

1. `dist/` 下所有页面路由对应的 `index.html` 存在。
2. `dist/sitemap.xml`、`dist/robots.txt`、`dist/manifest.webmanifest` 正常生成。
3. 检查 `.next/static/chunks` 是否出现 `DocSearch`、`ShowcaseFilterClient` 独立 chunk（动态导入成功）。

### 5.3 功能回归验证

1. **首页**：Stats、ServiceOverview、ShowcasePreview、FAQPreview 渲染正常。
2. **帮助中心**（`/docs/`）：搜索框可见；输入关键词后下拉结果正常。
3. **案例页**（`/showcase/`）：分类与阶段筛选正常；清除筛选正常。
4. **开通指引**（`/get-started/domain/`、`/get-started/hosting/`）：流程步骤、命名规范、FAQ Accordion 正常。
5. **子站链接**：Header、Footer、服务卡片中的“域名服务 / 开通空间”外部跳转正常，`rel="noopener noreferrer"` 保留。
6. **移动端菜单**：点击汉堡菜单展开/关闭正常。

### 5.4 性能验证（可选）

1. 使用 Lighthouse 或 Vercel Speed Insights 检查：
   - Performance ≥ 90
   - Accessibility ≥ 90
   - Best Practices ≥ 90
   - SEO ≥ 95
2. 对比优化前后 `.next/static/chunks` 总体积，确认首屏 JS 下降。

---

## 6. Deliverables

- [ ] [lib/data.ts](file:///d:/documents/GitHub/cwxian-web/lib/data.ts) 改为异步读取并带模块级缓存
- [ ] 所有调用 `getXxx()` 的页面/组件改为 `await` / `Promise.all`
- [ ] [components/docs/DocSearchSkeleton.tsx](file:///d:/documents/GitHub/cwxian-web/components/docs/DocSearchSkeleton.tsx) 新建
- [ ] [components/showcase/ShowcaseFilterSkeleton.tsx](file:///d:/documents/GitHub/cwxian-web/components/showcase/ShowcaseFilterSkeleton.tsx) 新建
- [ ] [app/docs/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/docs/page.tsx) 动态导入 `DocSearch`
- [ ] [app/showcase/page.tsx](file:///d:/documents/GitHub/cwxian-web/app/showcase/page.tsx) 动态导入 `ShowcaseFilterClient`
- [ ] 9 个文件中的 `&&` 条件渲染改为三元表达式
- [ ] [components/shared/SubSiteLink.tsx](file:///d:/documents/GitHub/cwxian-web/components/shared/SubSiteLink.tsx) 恢复为服务端组件
- [ ] `npm run lint` 通过
- [ ] `npm run build` 成功

---

**计划结束**
