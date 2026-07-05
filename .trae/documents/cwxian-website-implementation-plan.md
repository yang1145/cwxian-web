# 创无限（cwxian.com）主站官网开发实施计划

**版本**：v1.1  
**日期**：2026-07-05  
**状态**：待用户确认  
**目标**：基于 [PRD.md](file:///d:/documents/GitHub/cwxian-web/PRD.md)，继续完成剩余页面路由与组件，使用 Next.js + React + TypeScript 创建创无限主站纯前端展示官网，遵循 `vercel-react-best-practices` 性能最佳实践，设计风格为现代极简科技风。

---

## 1. Summary

本计划是上一阶段工作的延续。上一阶段已完成项目骨架、设计系统、全局布局、首页全部区块、服务卡片组件、子站跳转组件与基础 UI 组件。本阶段将集中完成 PRD 中剩余的所有页面路由、页面组件、帮助中心内容、关于我们与协议页面，并补齐 SEO / 性能 / 可访问性相关配置，最终完成静态构建验证。

主站为纯前端展示型站点，所有实际业务功能（域名注册、空间开通）通过跳转到 `dns.cwxian.com` 与 `free-host.cwxian.com` 完成。主站需完整承载品牌展示、服务规则、开通指引、案例展示、帮助文档、协议政策等内容。

---

## 2. Current State Analysis

### 2.1 已完成资产

- **项目骨架**：`package.json`、`next.config.ts`、`tsconfig.json`、`tailwind.config.ts`、`app/globals.css`、`app/layout.tsx`、`app/page.tsx`
- **设计系统**：Tailwind 主题色（primary-50~950 / neutral-50~950）、字体变量、`lib/utils.ts` 中的 `cn()` 工具函数
- **全局布局**：
  - [`components/layout/Header.tsx`](file:///d:/documents/GitHub/cwxian-web/components/layout/Header.tsx)：主导航 + 子站跳转入口 + 移动端菜单
  - [`components/layout/Footer.tsx`](file:///d:/documents/GitHub/cwxian-web/components/layout/Footer.tsx)：页脚导航 + ICP 备案位置 + 子站跳转
  - [`components/layout/Container.tsx`](file:///d:/documents/GitHub/cwxian-web/components/layout/Container.tsx)：内容最大宽度容器
  - [`components/layout/MobileNav.tsx`](file:///d:/documents/GitHub/cwxian-web/components/layout/MobileNav.tsx)：移动端抽屉导航
- **首页区块**（全部位于 `components/sections/`）：
  - `Hero.tsx`、`Stats.tsx`、`ServiceOverview.tsx`、`GettingStartedSteps.tsx`、`ShowcasePreview.tsx`、`Testimonials.tsx`、`Partners.tsx`、`FAQPreview.tsx`、`BottomCTA.tsx`
- **服务相关组件**：
  - [`components/services/ServiceCard.tsx`](file:///d:/documents/GitHub/cwxian-web/components/services/ServiceCard.tsx)：服务详情页核心组件，展示特点、规格、限制与子站跳转
- **共享组件**：
  - [`components/shared/SubSiteLink.tsx`](file:///d:/documents/GitHub/cwxian-web/components/shared/SubSiteLink.tsx)：带安全属性的子站跳转按钮
- **基础 UI 组件**：
  - [`components/ui/Button.tsx`](file:///d:/documents/GitHub/cwxian-web/components/ui/Button.tsx)
  - [`components/ui/Alert.tsx`](file:///d:/documents/GitHub/cwxian-web/components/ui/Alert.tsx)
- **静态数据文件**（全部位于 `data/`）：
  - `services.json`、`stats.json`、`showcases.json`、`testimonials.json`、`partners.json`、`faq.json`、`docs.json`、`team.json`、`contact.json`、`getting-started.json`、`eligibility.json`
- **数据读取层**：[`lib/data.ts`](file:///d:/documents/GitHub/cwxian-web/lib/data.ts)：统一读取上述 JSON 文件
- **类型定义**：[`types/index.ts`](file:///d:/documents/GitHub/cwxian-web/types/index.ts)
- **全局 SEO 元数据**：[`app/layout.tsx`](file:///d:/documents/GitHub/cwxian-web/app/layout.tsx) 中已配置 title template、description、Open Graph、Twitter Card、robots

### 2.2 缺失内容（本阶段需完成）

- **页面路由**：`services/*`、`get-started/*`、`showcase/*`、`docs/*`、`about/*`、`terms/*`、`privacy/*`、`open-source/*`
- **页面级元数据**：除首页外的各页面独立 `metadata`
- **缺失的 UI 组件**：Card、Badge、Accordion（FAQ 展开）、Separator、Breadcrumb、PageHeader、SectionHeader 等
- **帮助中心内容**：`content/docs/*.md` 文档与解析渲染能力
- **SEO 配置文件**：`robots.ts`、`sitemap.ts`
- **构建验证**：静态导出配置检查、页面链接检查、Lighthouse 评分验证
- **README.md**：项目说明与本地运行指南

### 2.3 关键约束

- 主站无后端对接，所有数据以静态 JSON/Markdown 形式维护。
- 子站仅保留最基础功能，主站必须承载全部规则与引导。
- 需响应式适配桌面端、平板端、移动端。
- 需符合 WCAG 2.1 AA 可访问性标准。
- 首页首屏加载时间目标 < 3 秒。
- 使用 `output: 'export'` 静态导出部署。

---

## 3. Proposed Changes

### Phase 1：补齐基础 UI 组件与页面级布局组件

#### 1.1 新增 / 完善 UI 组件

**涉及文件**：

- `components/ui/Card.tsx`：通用卡片容器（可复用于服务、案例、文档列表）
- `components/ui/Badge.tsx`：标签组件（用于领域/阶段筛选、状态标识）
- `components/ui/Accordion.tsx`：FAQ 折叠展开组件
- `components/ui/Separator.tsx`：视觉分隔线
- `components/ui/Skeleton.tsx`：加载占位（预留）

**遵循的 Vercel 最佳实践**：

- `rerender-memo`：对复杂 UI 组件使用 `React.memo` 避免不必要重渲染
- `rerender-no-inline-components`：不在组件内部定义子组件
- `rendering-conditional-render`：条件渲染使用三元表达式而非 `&&`

#### 1.2 新增页面级布局组件

**涉及文件**：

- `components/shared/PageHeader.tsx`：页面标题区（标题 + 副标题 + 可选背景）
- `components/shared/SectionHeader.tsx`：区块标题区（标题 + 描述 + 可选 CTA）
- `components/shared/Breadcrumb.tsx`：面包屑导航

---

### Phase 2：服务介绍页

#### 2.1 服务总览页

**文件**：`app/services/page.tsx`

**内容**：

- 页面标题与导语
- 两个服务卡片（域名 / 空间），点击进入详情
- 服务对比表
- 申请条件摘要
- 审核标准摘要链接
- 底部 CTA 跳转开通指引

#### 2.2 服务详情页

**文件**：

- `app/services/domain/page.tsx`
- `app/services/hosting/page.tsx`

**实现方式**：直接复用 [`components/services/ServiceCard.tsx`](file:///d:/documents/GitHub/cwxian-web/components/services/ServiceCard.tsx)，传入对应 service 数据。

**元数据**：为两个详情页导出独立 `metadata`。

---

### Phase 3：开通指引页

#### 3.1 开通指引总览

**文件**：`app/get-started/page.tsx`

**内容**：

- 页面标题“开通前请先了解规则”
- 开通前必读（申请条件、服务限制、禁止用途、审核周期、准备材料）
- 条件自检清单（纯前端展示，可勾选，不提交）
- 域名 / 空间开通指引卡片，含跳转按钮
- 链接至完整审核标准页

#### 3.2 域名/空间开通指引详情

**文件**：

- `app/get-started/domain/page.tsx`
- `app/get-started/hosting/page.tsx`

**内容**：分步骤说明 + 子站跳转按钮 + 常见问题。

#### 3.3 审核标准页

**文件**：`app/get-started/eligibility/page.tsx`

**内容**：读取 `data/eligibility.json`，展示适用范围、通过条件、优先支持领域、常见拒绝原因、域名命名规范、空间使用限制、申诉流程、跳转引导。

**涉及组件**：

- `components/get-started/Checklist.tsx`：自检清单
- `components/get-started/SubSiteCTA.tsx`：子站跳转按钮组

---

### Phase 4：成功案例页

#### 4.1 案例列表页

**文件**：`app/showcase/page.tsx`

**内容**：

- 页面标题
- 领域 / 阶段筛选（读取 `data/showcases.json` 中的分类）
- 案例卡片网格
- 底部开通引导

**涉及组件**：

- `components/showcase/ShowcaseCard.tsx`
- `components/showcase/ShowcaseFilter.tsx`

#### 4.2 案例详情页

**文件**：`app/showcase/[slug]/page.tsx`

**实现**：使用 `generateStaticParams` 静态生成所有案例详情页。

**内容**：项目 Logo、名称、域名、领域、阶段、详细介绍、创始人感言、使用服务、返回列表链接。

---

### Phase 5：帮助中心

#### 5.1 帮助中心首页

**文件**：`app/docs/page.tsx`

**内容**：文档分类卡片、热门 FAQ、搜索入口、子站使用说明链接。

#### 5.2 文档子页

**文件**：

- `app/docs/faq/page.tsx`
- `app/docs/guides/page.tsx`
- `app/docs/domain-guide/page.tsx`
- `app/docs/hosting-guide/page.tsx`
- `app/docs/sub-sites/page.tsx`

**内容来源**：

- FAQ 页读取 `data/faq.json`
- 其他文档优先读取 `content/docs/*.md`（若文件不存在则先创建占位 Markdown）

**涉及组件**：

- `components/docs/DocSearch.tsx`：前端文档搜索（基于 `data/docs.json` 构建简单索引）
- `components/docs/DocSidebar.tsx`：文档侧边导航
- `components/docs/DocContent.tsx`：Markdown 渲染容器

**技术选型**：使用 `gray-matter` + `remark` / `react-markdown` 解析 Markdown（构建时运行）。

---

### Phase 6：关于我们与协议页

#### 6.1 关于我们

**文件**：

- `app/about/page.tsx`：使命愿景 + 运营模式 + 合作伙伴预览
- `app/about/team/page.tsx`：读取 `data/team.json`
- `app/about/partners/page.tsx`：读取 `data/partners.json`
- `app/about/volunteers/page.tsx`：志愿者计划
- `app/about/contact/page.tsx`：联系邮箱、社交媒体、联系表单（纯前端表单，可对接第三方表单服务或仅展示 `mailto:`）

#### 6.2 协议与开源

**文件**：

- `app/terms/page.tsx`：用户协议
- `app/privacy/page.tsx`：隐私政策
- `app/open-source/page.tsx`：开源与贡献

**内容来源**：优先使用 `content/` 目录下的 Markdown 文件，便于运营更新。

---

### Phase 7：SEO、性能与可访问性完善

#### 7.1 SEO 配置

**涉及文件**：

- `app/robots.ts`：生成 `robots.txt`
- `app/sitemap.ts`：生成 XML 站点地图
- 各页面导出独立 `metadata`（title、description、canonical、Open Graph）
- 可选：`app/opengraph-image.tsx` / `app/twitter-image.tsx` 动态 OG 图片

#### 7.2 性能优化

**涉及工作**：

- 图片：所有图片使用 Next.js `<Image>`，静态导出时配置 `unoptimized: true`
- 代码分割：对 Partners、Showcase 等非首屏区块保持动态导入
- 静态导出：确认 `next.config.ts` 中 `output: 'export'`、`distDir: 'dist'`、`trailingSlash: true`
- 字体：已使用 `next/font` 加载 Inter

**遵循的 Vercel 最佳实践**：

- `bundle-dynamic-imports`
- `bundle-defer-third-party`
- `rendering-content-visibility`
- `server-hoist-static-io`

#### 7.3 可访问性

- 所有图片添加 `alt` 文本
- 表单字段关联 `<label>`
- 键盘导航支持
- 颜色对比度符合 WCAG 2.1 AA
- 语义化 HTML 标签

---

### Phase 8：构建验证与文档

#### 8.1 构建配置检查

**涉及文件**：

- `next.config.ts`：确认静态导出、图片配置、路由
- `package.json`：构建脚本
- `.gitignore`：排除 `dist/`、`node_modules/`

#### 8.2 验证清单

- [ ] `npm run dev` 可正常启动
- [ ] `npm run build` 成功生成 `dist/`
- [ ] 所有 PRD 中定义的页面均可访问
- [ ] 所有子站跳转链接正确指向 `dns.cwxian.com` 与 `free-host.cwxian.com`
- [ ] 移动端适配正常
- [ ] SEO 元数据完整
- [ ] 构建产物中无 404 错误

#### 8.3 项目文档

**文件**：`README.md`

**内容**：项目简介、技术栈、目录结构、本地运行、构建部署、贡献指南。

---

## 4. 文件结构规划（更新后）

```
d:\documents\GitHub\cwxian-web
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 首页（已完成）
│   ├── layout.tsx                # 根布局（已完成）
│   ├── globals.css               # 全局样式（已完成）
│   ├── robots.ts                 # robots.txt
│   ├── sitemap.ts                # sitemap.xml
│   ├── services/
│   │   ├── page.tsx              # 服务总览
│   │   ├── domain/page.tsx       # 域名服务详情
│   │   └── hosting/page.tsx      # 空间服务详情
│   ├── get-started/
│   │   ├── page.tsx              # 开通指引总览
│   │   ├── domain/page.tsx       # 域名开通指引
│   │   ├── hosting/page.tsx      # 空间开通指引
│   │   └── eligibility/page.tsx  # 完整审核标准
│   ├── showcase/
│   │   ├── page.tsx              # 案例列表
│   │   └── [slug]/page.tsx       # 项目详情（静态生成）
│   ├── docs/
│   │   ├── page.tsx              # 帮助中心首页
│   │   ├── faq/page.tsx
│   │   ├── guides/page.tsx
│   │   ├── domain-guide/page.tsx
│   │   ├── hosting-guide/page.tsx
│   │   └── sub-sites/page.tsx
│   ├── about/
│   │   ├── page.tsx
│   │   ├── team/page.tsx
│   │   ├── partners/page.tsx
│   │   ├── volunteers/page.tsx
│   │   └── contact/page.tsx
│   ├── terms/page.tsx
│   ├── privacy/page.tsx
│   └── open-source/page.tsx
├── components/
│   ├── layout/                   # 布局组件（已完成）
│   ├── sections/                 # 首页区块（已完成）
│   ├── ui/                       # 基础 UI 组件
│   │   ├── Button.tsx            # 已完成
│   │   ├── Alert.tsx             # 已完成
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Accordion.tsx
│   │   ├── Separator.tsx
│   │   └── Skeleton.tsx
│   ├── services/                 # 服务页组件
│   │   └── ServiceCard.tsx       # 已完成
│   ├── get-started/              # 开通指引组件
│   │   ├── Checklist.tsx
│   │   └── SubSiteCTA.tsx
│   ├── showcase/                 # 案例组件
│   │   ├── ShowcaseCard.tsx
│   │   └── ShowcaseFilter.tsx
│   ├── docs/                     # 帮助文档组件
│   │   ├── DocSearch.tsx
│   │   ├── DocSidebar.tsx
│   │   └── DocContent.tsx
│   └── shared/                   # 通用组件
│       ├── SubSiteLink.tsx       # 已完成
│       ├── ExternalLink.tsx
│       ├── PageHeader.tsx
│       ├── SectionHeader.tsx
│       └── Breadcrumb.tsx
├── data/                         # JSON 静态数据（已完成）
├── content/                      # Markdown 文档
│   └── docs/
│       ├── guides.md
│       ├── domain-guide.md
│       ├── hosting-guide.md
│       └── sub-sites.md
├── lib/                          # 工具函数与数据读取
│   ├── utils.ts                  # 已完成
│   ├── data.ts                   # 已完成
│   └── markdown.ts               # Markdown 解析工具
├── types/
│   └── index.ts                  # 已完成
├── public/                       # 静态资源
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 5. Assumptions & Decisions

### 5.1 技术决策

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 框架 | Next.js 15 + React 19 | 遵循 Vercel 最佳实践，静态导出能力强，SEO 友好 |
| 语言 | TypeScript | 类型安全，便于维护 |
| 样式 | Tailwind CSS | 现代原子化 CSS，开发效率高 |
| 路由 | App Router | 支持 React Server Components 与静态生成 |
| 内容 | JSON + Markdown | 无后端，便于运营维护 |
| 部署 | 静态导出（`output: 'export'`） | 主站纯前端，无需 Node.js 运行时 |

### 5.2 设计决策

- 现代极简科技风：深蓝/靛蓝主色，干净留白，卡片式布局。
- 中文为主，组件与代码层面预留国际化扩展能力。
- 服务详情页顶部始终提示“实际注册/开通请前往子站”。
- 子站跳转按钮在 Header、Footer、服务页、开通指引页全局可见。

### 5.3 性能决策

- 所有页面优先静态生成（SSG）。
- 案例详情页使用 `generateStaticParams`。
- 图片使用 Next.js `<Image>`，静态导出时关闭优化由 CDN 处理。
- 重型组件（如 Partners）保持动态导入。
- 第三方分析脚本延迟加载。

---

## 6. Verification Steps

### 6.1 开发期验证

1. `npm run dev` 可正常启动，首页渲染正常。
2. 新创建的页面可通过对应 URL 访问。
3. Chrome DevTools 中测试桌面、平板、移动端视图。
4. 所有子站跳转链接指向正确地址，且带有安全属性。

### 6.2 构建期验证

1. `npm run build` 成功生成 `dist/` 目录。
2. 控制台无 TypeScript / ESLint 错误。
3. 所有图片、字体、JSON 数据正确打包。

### 6.3 上线前验证

1. Lighthouse 评分：性能 ≥ 90，可访问性 ≥ 90，SEO ≥ 95，最佳实践 ≥ 90。
2. 首页首屏 < 3 秒（主流网络环境）。
3. 键盘导航、颜色对比度、`alt` 文本完整。
4. 元数据、sitemap、robots.txt 完整。
5. 内容与 PRD 中定义一致。

---

## 7. 风险与应对

| 风险 | 影响 | 应对措施 |
|------|------|----------|
| 页面数量较多导致开发周期延长 | 交付延迟 | 按 PRD 优先级分阶段交付，先完成 P0 页面 |
| Markdown 解析引入额外依赖 | Bundle 增大 | 仅在构建时运行，选择轻量库 |
| 静态内容过多导致构建时间变长 | 开发体验下降 | 按需生成、延迟加载非关键内容 |
| 跨域子站跳转体验不一致 | 用户困惑 | 全局提示“子站仅提供基础功能，规则请先在主站了解” |

---

## 8. 交付物清单

- [ ] 所有 PRD 定义页面（服务、开通指引、案例、帮助中心、关于我们、协议等）
- [ ] 可复用 UI 组件库补充完整
- [ ] 静态内容数据文件（JSON + Markdown）
- [ ] SEO 与性能优化配置
- [ ] 构建产物 `dist/`
- [ ] README.md（项目说明与本地运行指南）

---

**计划结束**
