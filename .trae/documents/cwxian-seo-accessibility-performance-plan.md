# 创无限官网 SEO、性能与可访问性完善计划

**版本**：v1.0  
**日期**：2026-07-05  
**状态**：待用户确认  
**目标**：在已有 Next.js 15 + React 19 + TypeScript + Tailwind CSS 静态导出项目基础上，补齐 SEO 配置（robots / sitemap / manifest / OG 图片）、可访问性（skip link、heading 层级、ARIA）、性能优化（代码分割、图片策略、font-display），并完成构建验证与 README 文档。

---

## 1. Summary

本计划承接上一阶段已完成的全部页面开发工作（服务介绍、开通指引、案例、帮助中心、关于我们、协议与开源页面）。当前主站已具备完整的前端页面结构、全局 metadata、子站跳转引导与响应式布局。本阶段聚焦于**上线前的工程收尾**：生成搜索引擎友好的 `robots.txt` 与 `sitemap.xml`、添加 Web App Manifest、创建动态 Open Graph 图片、强化可访问性、验证静态构建产物，并补充项目文档。

所有改动均遵循 `vercel-react-best-practices` 的 `server-hoist-static-io`、`bundle-dynamic-imports`、`rendering-conditional-render` 与 `rerender-memo` 等原则，确保静态导出站点在性能与可维护性上达到生产标准。

---

## 2. Current State Analysis

### 2.1 已完成的资产

- **全局 SEO 元数据**：[`app/layout.tsx`](file:///d:/documents/GitHub/cwxian-web/app/layout.tsx) 已配置 `title.template`、`description`、`keywords`、`authors`、`creator`、`metadataBase`、`alternates.canonical`、`openGraph`、`twitter`、`robots`。
- **页面级元数据**：所有 `app/**/page.tsx` 均已导出独立 `metadata`（通过 Grep 验证，共 24 个文件）。
- **静态导出配置**：[`next.config.ts`](file:///d:/documents/GitHub/cwxian-web/next.config.ts) 已配置 `output: "export"`、`distDir: "dist"`、`trailingSlash: true`、`images.unoptimized: true`。
- **字体优化**：已使用 `next/font/google` 加载 Inter，并设置 `display: swap`。
- **响应式布局**：Header、Footer、Container、PageHeader、SectionHeader 等组件已适配桌面/平板/移动端。
- **语义化 HTML**：页面使用 `<header>`、`<nav>`、`<main>`、`<footer>`、`<section>`、`<h1>`–`<h3>` 等标签，Lucide 图标均设置 `aria-hidden="true"`。

### 2.2 缺失内容（本阶段需完成）

- **SEO 配置文件**：
  - 缺少 `app/robots.ts`（生成 `robots.txt`）
  - 缺少 `app/sitemap.ts`（生成 `sitemap.xml`）
  - 缺少 `app/manifest.ts`（生成 `manifest.webmanifest`）
  - 缺少 `app/opengraph-image.tsx` 与 `app/twitter-image.tsx`（动态 OG/Twitter 图片）
- **可访问性增强**：
  - 缺少 skip link（跳转到主内容）
  - Header 中没有当前页面导航高亮（可选增强）
  - Markdown 渲染后的 DocContent 内部 heading 层级需检查
- **性能与代码分割**：
  - 当前无图片资源，全部使用 SVG 图标，无需额外图片优化
  - 可考虑对 `MobileNav`、Markdown 文档页重型组件使用 `next/dynamic` 动态导入
- **构建与文档**：
  - 需要运行 `npm run build` 验证静态导出
  - 需要编写 `README.md`
  - 需要确认 `.gitignore` 排除 `dist/`、`node_modules/`、`.next/`

### 2.3 关键约束

- 主站无后端，所有数据为静态 JSON/Markdown。
- 部署方式为静态导出（`output: 'export'`）。
- 子站 `user.cwxian.com` 与 `user.cwxian.com` 不在本仓库范围内，sitemap 仅包含主站页面。
- 需要保持现有设计风格（现代极简科技风，primary-600 为主色）。

---

## 3. Proposed Changes

### Phase 1：SEO 配置文件

#### 1.1 创建 `app/robots.ts`

**涉及文件**：`app/robots.ts`

**内容**：
- 允许所有爬虫访问所有路径
- 指向 `https://cwxian.com/sitemap.xml`
- 由于 `trailingSlash: true`，sitemap 实际输出为 `sitemap.xml`，但 robots.txt 中写 `/sitemap.xml` 即可

**依据**：Next.js App Router 约定式文件，静态导出时自动生成 `robots.txt`。

#### 1.2 创建 `app/sitemap.ts`

**涉及文件**：`app/sitemap.ts`

**内容**：
- 列出主站所有页面 URL：
  - `/`
  - `/services/`、`/services/domain/`、`/services/hosting/`
  - `/get-started/`、`/get-started/domain/`、`/get-started/hosting/`、`/get-started/eligibility/`
  - `/showcase/`、`/showcase/[slug]/`（读取 `data/showcases.json` 动态生成）
  - `/docs/`、`/docs/faq/`、`/docs/guides/`、`/docs/domain-guide/`、`/docs/hosting-guide/`、`/docs/sub-sites/`
  - `/about/`、`/about/team/`、`/about/partners/`、`/about/volunteers/`、`/about/contact/`
  - `/terms/`、`/privacy/`、`/open-source/`
- 每个 URL 设置 `lastModified`（使用当前日期）、`changeFrequency`、`priority`
- 首页 priority 为 `1.0`，一级页面 `0.8`，二级详情页 `0.6`

**依据**：`vercel-react-best-practices` 的 `server-hoist-static-io`（静态 I/O 在模块级/构建时完成），所有数据读取在构建时执行。

#### 1.3 创建 `app/manifest.ts`

**涉及文件**：`app/manifest.ts`

**内容**：
- `name`: "创无限"
- `short_name`: "创无限"
- `description`: 站点描述
- `start_url`: "/"
- `display`: "standalone"
- `background_color`: "#ffffff"
- `theme_color`: "#2563eb"（primary-600）
- `icons`: 使用 SVG 或 Emoji 作为占位图标（因为项目无设计资源），或引用公开图标 URL

**依据**：PWA 基础配置，提升 SEO 与浏览器安装体验。

#### 1.4 创建 `app/opengraph-image.tsx` 与 `app/twitter-image.tsx`

**涉及文件**：
- `app/opengraph-image.tsx`
- `app/twitter-image.tsx`

**内容**：
- 使用 `@vercel/og`（若已安装）或 Next.js 内置 `ImageResponse` 生成动态 OG 图片
- 图片尺寸：1200×630（OG）、1200×630（Twitter summary_large_image）
- 设计风格：渐变背景（primary-900 到 primary-700）、白色标题、副标题、创无限 Logo 占位
- 标题与描述从 `metadata` 继承或硬编码默认值

**决策**：若项目尚未安装 `@vercel/og`，优先使用 Next.js 内置 `ImageResponse`（Next.js 15 已内置），避免新增依赖。

**依据**：`vercel-react-best-practices` 的 `server-hoist-static-io`（构建时生成图片，避免运行时开销）。

### Phase 2：可访问性增强

#### 2.1 添加 Skip Link

**涉及文件**：
- `components/layout/SkipLink.tsx`（新建）
- `app/layout.tsx`（修改）

**内容**：
- 在 `<body>` 最顶部添加一个仅在 focus 时可见的 "跳转到主内容" 链接
- 链接 `href="#main-content"`
- 在 `app/layout.tsx` 的 `<main>` 上添加 `id="main-content"` 与 `tabIndex={-1}`

**依据**：WCAG 2.1 AA 2.4.1 Bypass Blocks。

#### 2.2 检查并修复 Heading 层级

**涉及文件**：
- `components/docs/DocContent.tsx`（检查）
- `content/**/*.md`（必要时调整 heading 级别）

**内容**：
- 确保 Markdown 渲染后的标题不会跳过层级
- 文档详情页页面标题使用 `<h1>`，文档内部最高使用 `<h2>`
- 若 `remark-html` 生成的标题层级不正确，通过 CSS 或 rehype 插件调整

**依据**：WCAG 2.1 AA 1.3.1 Info and Relationships。

#### 2.3 Header 当前页面高亮（可选）

**涉及文件**：`components/layout/Header.tsx`

**内容**：
- 使用 `usePathname()` 获取当前路径
- 为当前匹配的导航项添加视觉高亮（如 `text-primary-600` 或底部 border）
- 保持 SSR/SSG 安全：组件已是 `"use client"`，可直接使用 `usePathname`

**决策**：此项为增强体验，计划内实现，成本较低。

### Phase 3：性能优化

#### 3.1 动态导入非关键组件

**涉及文件**：
- `components/layout/Header.tsx`（MobileNav 已是动态渲染，但非动态导入）
- `components/docs/DocSearch.tsx`（若存在且较重）

**内容**：
- 对 `MobileNav` 使用 `next/dynamic` 动态导入，减少首屏 bundle
- 对帮助中心搜索组件（如较重）使用动态导入

**依据**：`vercel-react-best-practices` 的 `bundle-dynamic-imports`。

#### 3.2 图片策略确认

**当前状态**：项目未使用任何 `<img>` 或 `next/image`，全部使用 `lucide-react` SVG 图标。

**决策**：
- 不新增图片资源，保持无图标的极简科技风格
- 在 README 中说明：若未来添加图片，应使用 `next/image` 并配合静态导出图片 loader/CDN
- 确认 `next.config.ts` 中 `images.unoptimized: true` 已配置，避免静态导出报错

#### 3.3 第三方脚本延迟加载

**当前状态**：项目无第三方脚本（分析、广告等）。

**决策**：
- 不添加任何第三方脚本
- 在 README 中预留说明：未来添加 Google Analytics/Clarity 等时，应使用 `next/script` 并设置 `strategy="lazyOnload"`

### Phase 4：构建验证

#### 4.1 运行构建

**命令**：`npm run build`

**预期结果**：
- 成功生成 `dist/` 目录
- 控制台无 TypeScript 错误
- 无 ESLint 致命错误

#### 4.2 检查构建产物

**验证项**：
- `dist/robots.txt` 存在且内容正确
- `dist/sitemap.xml` 存在且包含所有页面 URL
- `dist/manifest.webmanifest` 存在
- `dist/opengraph-image.jpg`（或 `.png`）存在
- 所有页面路由对应的 `index.html` 存在
- 子站跳转链接指向 `https://user.cwxian.com` 与 `https://user.cwxian.com`

#### 4.3 链接与可访问性快速检查

**验证项**：
- 使用 `next lint` 检查代码规范
- 检查所有外部链接是否包含 `target="_blank"` 与 `rel="noopener noreferrer"`
- 检查所有图标是否设置 `aria-hidden="true"` 或有意义的 `aria-label`

### Phase 5：项目文档

#### 5.1 编写 `README.md`

**涉及文件**：`README.md`

**内容**：
- 项目简介：创无限官网是什么
- 技术栈：Next.js 15、React 19、TypeScript、Tailwind CSS
- 目录结构说明
- 本地开发：安装依赖、启动开发服务器
- 构建与部署：静态导出、输出目录 `dist/`、部署到 Vercel/Netlify/CDN 的说明
- SEO/可访问性说明
- 贡献指南
- 许可证

#### 5.2 检查 `.gitignore`

**涉及文件**：`.gitignore`

**内容**：
- 确保包含 `node_modules/`、`.next/`、`dist/`、`*.log`、`.env*.local`、`.DS_Store` 等
- 若 `.gitignore` 不存在或缺失，创建/补充

---

## 4. Assumptions & Decisions

| 决策项 | 选择 | 理由 |
|--------|------|------|
| Sitemap 范围 | 仅主站页面 | 子站不在本仓库且为独立域名 |
| Robots 策略 | 允许所有爬虫索引所有路径 | 主站所有页面均为公开内容 |
| OG 图片实现 | 使用 Next.js 内置 `ImageResponse` | 避免新增 `@vercel/og` 依赖，静态导出友好 |
| 图标资源 | 不创建真实图标，使用 SVG/Emoji 占位 | 项目无设计资源，保持极简风格 |
| 第三方脚本 | 当前不添加 | 主站纯展示，无分析需求 |
| 图片优化 | 保持现状（无图片） | 当前设计全部使用 SVG 图标 |
| 动态导入 | 对 MobileNav 等客户端组件使用 `next/dynamic` | 减少首屏 JS bundle |
| README 详细程度 | 详细完整 | 用户偏好 comprehensive documentation |

---

## 5. Verification Steps

### 5.1 开发期验证

1. `npm run dev` 正常启动，无报错。
2. 首页访问正常，Skip Link 可通过键盘 Tab 聚焦。
3. 各页面 `metadata` 在浏览器 DevTools 的 `<head>` 中正确显示。
4. 访问 `/robots.txt`、`/sitemap.xml`、`/manifest.webmanifest` 可正确返回内容。

### 5.2 构建期验证

1. `npm run build` 成功完成，`dist/` 目录生成。
2. `next lint` 无致命错误。
3. `dist/robots.txt`、`dist/sitemap.xml`、`dist/manifest.webmanifest` 存在。
4. `dist/opengraph-image.jpg`（或 `.png`）存在。
5. 所有页面均有对应的 `index.html`。

### 5.3 上线前验证

1. Lighthouse 评分：性能 ≥ 90，可访问性 ≥ 90，SEO ≥ 95，最佳实践 ≥ 90。
2. 键盘导航完整：Skip Link → 主导航 → 主内容 → 页脚链接。
3. 所有子站跳转链接指向正确地址并携带安全属性。
4. 移动端菜单可正常打开/关闭，ARIA 属性正确。

---

## 6. 风险与应对

| 风险 | 影响 | 应对措施 |
|------|------|----------|
| `ImageResponse` 在静态导出下需要字体文件 | 构建失败 | 使用系统字体或内联字体数据，避免依赖外部字体加载 |
| Sitemap 中 showcase 详情页 slugs 过多 | 构建时间略微增加 | 数据量小（创业案例），可接受 |
| README 内容过于冗长 | 维护负担 | 分章节组织，保持可检索性 |

---

## 7. 交付物清单

- [ ] `app/robots.ts`
- [ ] `app/sitemap.ts`
- [ ] `app/manifest.ts`
- [ ] `app/opengraph-image.tsx`
- [ ] `app/twitter-image.tsx`
- [ ] `components/layout/SkipLink.tsx`
- [ ] 修改 `app/layout.tsx`（集成 Skip Link 与 main-content id）
- [ ] 修改 `components/layout/Header.tsx`（当前页面高亮，可选动态导入 MobileNav）
- [ ] `README.md`
- [ ] `.gitignore`（检查/补充）
- [ ] `npm run build` 成功验证

---

**计划结束**
