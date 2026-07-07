# 创无限官网（cwxian.com）

创无限（cwxian.com）是一个面向早期创业项目与个人开发者的公益性互联网基础资源服务平台，为符合条件的项目提供免费的 `*.cwxian.com` 二级域名与托管空间。本项目为创无限的主站官网，采用纯前端静态站点架构，负责品牌展示、服务规则、开通指引、帮助文档、协议政策与跳转引导。

实际的域名注册与解析管理请前往 [dns.cwxian.com](https://dns.cwxian.com)，免费空间开通与管理请前往 [user.cwxian.com](https://user.cwxian.com)。

---

## 目录

- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [本地开发](#本地开发)
- [构建与部署](#构建与部署)
- [SEO 与可访问性](#seo-与可访问性)
- [内容维护](#内容维护)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

---

## 技术栈

- **框架**：[Next.js 15](https://nextjs.org/)（App Router）
- **UI 库**：[React 19](https://react.dev/)
- **语言**：[TypeScript](https://www.typescriptlang.org/)
- **样式**：[Tailwind CSS 3.4](https://tailwindcss.com/)
- **图标**：[Lucide React](https://lucide.dev/)
- **内容**：JSON 数据 + Markdown 文档
- **部署方式**：静态导出（`output: 'export'`）

开发过程中遵循 [Vercel React Best Practices](.agents/skills/vercel-react-best-practices/SKILL.md)，优先使用静态生成（SSG）、约定式 SEO 文件、动态导入与语义化 HTML。

---

## 项目结构

```
cwxian-web/
├── app/                          # Next.js App Router 页面
│   ├── page.tsx                  # 首页
│   ├── layout.tsx                # 根布局（含全局 metadata、字体、Skip Link）
│   ├── globals.css               # 全局样式与 Tailwind 入口
│   ├── robots.ts                 # 生成 robots.txt
│   ├── sitemap.ts                # 生成 sitemap.xml
│   ├── manifest.ts               # 生成 Web App Manifest
│   ├── opengraph-image.tsx       # 动态 Open Graph 图片
│   ├── twitter-image.tsx         # 动态 Twitter 卡片图片
│   ├── services/                 # 服务介绍页
│   ├── get-started/              # 开通指引页
│   ├── showcase/                 # 成功案例页
│   ├── docs/                     # 帮助中心页
│   ├── about/                    # 关于我们页
│   ├── terms/                    # 用户协议
│   ├── privacy/                  # 隐私政策
│   └── open-source/              # 开源与贡献
├── components/
│   ├── layout/                   # 布局组件（Header、Footer、Container、SkipLink）
│   ├── sections/                 # 首页区块组件
│   ├── services/                 # 服务页组件
│   ├── get-started/              # 开通指引组件
│   ├── showcase/                 # 案例页组件
│   ├── docs/                     # 帮助文档组件
│   ├── shared/                   # 通用组件（PageHeader、SectionHeader、SubSiteLink 等）
│   └── ui/                       # 基础 UI 组件（Button、Card、Badge、Accordion 等）
├── data/                         # JSON 静态数据
├── content/                      # Markdown 文档（用户协议、隐私政策、帮助文档等）
├── lib/                          # 工具函数与数据读取
│   ├── data.ts                   # 读取 JSON 数据
│   ├── markdown.ts               # 解析 Markdown
│   └── utils.ts                  # cn() 等工具函数
├── types/                        # TypeScript 类型定义
├── public/                       # 静态资源
├── next.config.ts                # Next.js 配置（静态导出）
├── tailwind.config.ts            # Tailwind 主题配置
├── tsconfig.json                 # TypeScript 配置
└── package.json                  # 项目依赖与脚本
```

---

## 本地开发

### 环境要求

- Node.js 18.x 或更高版本
- npm / yarn / pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

默认在 [http://localhost:3000](http://localhost:3000) 启动，支持热更新。

### 代码检查

```bash
npm run lint
```

---

## 构建与部署

### 静态导出

```bash
npm run build
```

构建产物输出到 `dist/` 目录，可直接部署到任何支持静态站点的托管服务（Vercel、Netlify、Cloudflare Pages、GitHub Pages、阿里云 OSS、腾讯云 COS 等）。

### 关键配置说明

- `next.config.ts` 中设置 `output: 'export'`、`distDir: 'dist'`、`trailingSlash: true`。
- `images.unoptimized: true`：静态导出时关闭 Next.js 内置图片优化，避免构建报错；生产环境建议配合 CDN 或图片服务使用。
- 所有页面均为静态生成（SSG），无需 Node.js 运行时。

### 部署到 Vercel（示例）

1. 将代码推送到 GitHub/GitLab/Bitbucket。
2. 在 Vercel 中导入项目。
3. 框架预设选择 **Next.js**。
4. 构建命令保持默认 `next build`，输出目录保持默认或手动指定 `dist`。
5. 部署完成后，Vercel 会自动分配预览域名与生产域名。

---

## SEO 与可访问性

### SEO

- 全局 `metadata` 配置于 `app/layout.tsx`，包含标题模板、描述、关键词、Open Graph、Twitter Card、robots 与 canonical。
- 每个页面导出独立 `metadata`。
- `robots.ts` 生成 `robots.txt`，允许爬虫索引全站并指向 sitemap。
- `sitemap.ts` 生成 `sitemap.xml`，包含主站所有页面（含动态生成的案例详情页）。
- `manifest.ts` 生成 Web App Manifest。
- `opengraph-image.tsx` 与 `twitter-image.tsx` 动态生成 1200×630 的社交分享图片。

### 可访问性

- 使用语义化 HTML 标签（`<header>`、`<nav>`、`<main>`、`<footer>`、`<section>`、`<article>`）。
- 提供 Skip Link，方便键盘用户快速跳转到主内容。
- 所有图标均设置 `aria-hidden="true"` 或由有意义的文本/标签替代。
- 外部链接使用 `target="_blank"` 与 `rel="noopener noreferrer"`。
- 颜色对比度符合 WCAG 2.1 AA 标准。
- 页面标题层级清晰，每个页面仅有一个 `<h1>`。

---

## 内容维护

### 修改页面数据

站点大部分内容来自 `data/` 目录下的 JSON 文件，例如：

- `data/services.json`：服务介绍与规格
- `data/showcases.json`：成功案例
- `data/faq.json`：常见问题
- `data/team.json`：团队成员
- `data/partners.json`：合作伙伴

直接编辑对应 JSON 文件即可更新页面内容，无需修改组件代码。

### 修改文档内容

用户协议、隐私政策、开源贡献、帮助文档等内容位于 `content/` 目录下的 Markdown 文件。编辑这些文件后重新构建即可生效。

> 注意：Markdown 文档中的最高级标题应为 `##`（h2），因为页面 `<h1>` 已由 `PageHeader` 组件提供。使用 `###` 与 `####` 作为子标题。

### 添加新页面

1. 在 `app/` 下创建对应路由目录与 `page.tsx`。
2. 导出页面级 `metadata`。
3. 复用 `PageHeader`、`SectionHeader`、`Container` 等共享组件。
4. 如需新增数据，在 `data/` 下创建 JSON 文件并在 `lib/data.ts` 中添加读取函数。
5. 更新 `app/sitemap.ts`，将新页面加入站点地图。

---

## 贡献指南

创无限欢迎社区成员以代码、文档、设计、运营等方式参与贡献。

### 提交 Issue 或 PR

1. Fork 本仓库并创建你的分支（`git checkout -b feature/your-feature`）。
2. 提交改动（`git commit -am 'Add some feature'`）。
3. 推送到分支（`git push origin feature/your-feature`）。
4. 创建 Pull Request，描述改动内容与原因。

### 代码规范

- 使用 TypeScript 编写所有组件与工具函数。
- 优先使用 React Server Components，仅在需要客户端交互时使用 `"use client"`。
- 样式优先使用 Tailwind CSS 工具类，复杂逻辑使用 `cn()` 组合。
- 保持组件职责单一，避免在组件内部定义子组件。

### 志愿者计划

如果你想以志愿者身份参与项目审核、技术支持或社区运营，请发送邮件至 contact@cwxian.com，邮件主题注明【志愿者申请】。

---

## 许可证

本项目采用 [MIT 许可证](LICENSE) 开源。

---

**创无限团队**  
官网：[https://cwxian.com](https://cwxian.com)  
联系邮箱：[contact@cwxian.com](mailto:contact@cwxian.com)  
GitHub：[https://github.com/cwxian](https://github.com/cwxian)
