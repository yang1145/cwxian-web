# 优化域名注册流程与项目主次排版

## Context（背景）

当前项目存在三个核心问题，导致整体"乱七八糟"：

1. **注册入口跳转不一致**：全站有 10+ 处"注册域名"按钮直接外跳到 `dns.cwxian.com`，绕过了流程说明页；只有 `/get-started/domain/` 流程页底部的 CTA 才是"先读流程再跳转"。用户预期是「点击注册 → 阅读流程 → 最终跳转」的单一漏斗，现状却是「一会有流程、一会直跳」。

2. **主次颠倒**：Header / Footer / MobileNav / ServiceOverview 中"开通空间"是 primary 主按钮、"域名服务"是 outline 次按钮，与「以域名注册为主、虚拟主机边缘化」的定位相反。

3. **邮件申请流程文案重复**：完整的邮件主题/正文字段说明在 ServiceCard、流程页、getting-started.json、faq.json、guides.md、sub-sites.md 等 6+ 处重复维护，容易不一致。

**目标**：建立单一漏斗——所有"注册域名"CTA 统一跳内部流程页 `/get-started/domain/`，仅流程页底部 CTA 外跳 `dns.cwxian.com`；域名升为主 CTA，空间降级为次级；精简重复文案。

## 设计原则

- **单一漏斗**：所有"注册域名"按钮 → 内部 `<Link href="/get-started/domain/">`（next/link + Button）；仅 `/get-started/domain/` 底部 CTA → 外跳 `https://dns.cwxian.com`（保留 `SubSiteLink`）。
- **主次调整**：域名 = primary 主按钮；空间 = outline 次级按钮（均改为内部跳转 `/get-started/hosting/`），空间不再出现在外跳入口。
- **组件分工**：`SubSiteLink`（外跳、新标签页）仅用于流程页底部的"最终跳转"；其余注册入口一律用 `next/link` + `Button asChild` 内部跳转。
- **文案去重**：完整邮件申请说明仅保留在流程页（数据源 `data/getting-started.json`）与文档/FAQ；ServiceCard 的 Alert 精简为引导提示。

## 实施步骤

### A. 全局布局 CTA（域名 primary + 空间降级 outline，均内部跳转）

1. **`components/layout/Header.tsx`**（L65-80）
   - 将两个 `SubSiteLink`（dns outline + user primary）替换为：
     - 主：`Button asChild variant="primary" size="sm"` → `<Link href="/get-started/domain/">注册域名</Link>`
     - 次：`Button asChild variant="outline" size="sm"` → `<Link href="/get-started/hosting/">开通空间</Link>`
   - 移除 `SubSiteLink` 导入。

2. **`components/layout/MobileNav.tsx`**（L32-47）
   - 同上：主"注册域名"→ `/get-started/domain/`，次"开通空间"→ `/get-started/hosting/`，均内部 `Link`。
   - 移除 `SubSiteLink` 导入。

3. **`components/layout/Footer.tsx`**（L52-66）
   - 同上模式；Footer 为深色背景，outline 保留 `border-neutral-600 bg-transparent text-neutral-200 hover:bg-neutral-800 hover:text-white`。
   - 页脚"服务"列链接（含空间）保留不动（属次级导航）。
   - 移除 `SubSiteLink` 导入。

### B. 首页板块

4. **`components/sections/Hero.tsx`**（L31-46）
   - 主 CTA 改为：`Button asChild size="lg" className="bg-white text-primary-700 hover:bg-primary-50"` → `<Link href="/get-started/domain/">注册域名 <ArrowRight/></Link>`
   - 次 CTA：`Button asChild variant="outline" size="lg"` + 白底透明样式 → `<Link href="/get-started/">立即开通</Link>`
   - 删除外跳 dns 的 `SubSiteLink`，移除其导入。

5. **`components/sections/ServiceOverview.tsx`**（L53-59）
   - domain 卡片：primary 内部 `Link` → `/get-started/domain/`（"前往注册域名"）
   - hosting 卡片：outline 内部 `Link` → `/get-started/hosting/`（"前往开通空间"）
   - 由 `SubSiteLink` 切换为 `Button asChild` + `Link`；修正原本 domain=outline/hosting=primary 的颠倒。
   - 移除 `SubSiteLink` 导入。

6. **`components/sections/BottomCTA.tsx`**（L34-49）
   - 主：`Button asChild size="lg" className="bg-white text-primary-700..."` → `<Link href="/get-started/domain/">注册域名</Link>`
   - 次：outline 内部 `Link` → `/get-started/hosting/`（"开通空间"），样式 `border-white/30 bg-transparent text-white hover:bg-white/10`（遵循蓝底 outline 约束）。
   - 移除 `SubSiteLink` 导入。

### C. 服务页

7. **`data/services.json`**（L26-29、L55-58）
   - `domain.cta.href` → `/get-started/domain/`
   - `hosting.cta.href` → `/get-started/hosting/`
   - `cta.text` 不变。

8. **`app/services/page.tsx`**（L58-61）
   - 服务卡片 CTA 由 `SubSiteLink href={service.cta.href}` 改为 `Button asChild` + `<Link href={service.cta.href}>`；domain=primary、hosting=outline。

9. **`components/services/ServiceCard.tsx`**
   - **Alert 精简**（L30-59）：删除两段冗长的邮件主题/正文说明，改为简洁引导：「本页仅展示服务规格与使用限制。完整注册流程请查看开通指引。」并附内部 `Link` 指向 `service.id === "domain" ? "/get-started/domain/" : "/get-started/hosting/"`。
   - **底部 CTA**（L101-112）：`SubSiteLink`（外跳）改为 `Button asChild` + `<Link href={service.cta.href}>`（现已是内部路径）；domain=primary、hosting=outline。
   - 删除交叉外跳按钮（L105-111，原 domain→user.cwxian.com / hosting→dns.cwxian.com 的错乱交叉链接），保持页面聚焦。
   - 移除 `SubSiteLink` 导入；保留 `SubSiteLink` 仅用于流程页出口。
   - 注意：JSX 条件渲染继续用三元表达式（符合项目约束）。

### D. 开通指引与其他页

10. **`components/get-started/SubSiteCTA.tsx`**（L22-40，用于 `/get-started/` 总览页底部）
    - 主：内部 `Link` → `/get-started/domain/`（"注册域名"，白色主样式）
    - 次：内部 `Link` → `/get-started/hosting/`（"开通空间"，outline）
    - 保留底部 `Alert` 提示文案。
    - 移除 `SubSiteLink` 导入（组件名保留以缩小改动面）。

11. **`app/showcase/page.tsx`**（L52-60）
    - "前往注册域名" `SubSiteLink`（外跳 dns）→ `Button asChild` + `<Link href="/get-started/domain/">`（outline 白底透明样式）。
    - 保留"了解开通流程" → `/get-started/`。
    - 移除 `SubSiteLink` 导入。

12. **`app/get-started/eligibility/page.tsx`**（L217-233）
    - "前往注册域名" → 内部 `Link` → `/get-started/domain/`（primary 白色）
    - "前往开通空间" → 内部 `Link` → `/get-started/hosting/`（outline 降级）
    - 移除 `SubSiteLink` 导入。

13. **`app/get-started/domain/page.tsx`**（流程页，唯一外跳出口）
    - **保留**底部 CTA（L169-176）→ 外跳 `https://dns.cwxian.com`（`SubSiteLink`，单一漏斗出口）✓
    - 顶部 Alert + 邮件说明 = 文案唯一真相源，保留 ✓
    - 删除底部"查看空间开通指引"交叉按钮（L177-183），让域名流程页聚焦；保留"返回开通指引"回链。

14. **`app/get-started/hosting/page.tsx`**（空间流程页）
    - 保留底部 CTA → 外跳 `https://user.cwxian.com`（`SubSiteLink`，空间漏斗出口）✓
    - 其余不动（空间流程页本身保留，仅在全站导航中降权）。

### E. 文案去重说明
- 完整邮件申请说明保留于：`data/getting-started.json`（数据源）、`get-started/domain/page.tsx`（渲染）、`content/docs/guides.md`、`content/docs/sub-sites.md`、`data/faq.json`（文档/FAQ 属合理引用）。
- 仅从 `ServiceCard.tsx` Alert 中移除重复的完整邮件文案（步骤 9）。

## 改动后 SubSiteLink 的最终用途
`SubSiteLink`（外跳新标签页）仅保留在两处"最终跳转"出口：
- `app/get-started/domain/page.tsx` 底部 → `dns.cwxian.com`
- `app/get-started/hosting/page.tsx` 底部 → `user.cwxian.com`

形成清晰分工：内部 `Link` = "去读流程"；`SubSiteLink` = "流程读完，最终外跳"。

## 验证

1. `npm run lint` 通过（无 console.log / TODO / debugger，符合硬约束）。
2. `npm run build` 成功导出 37 个静态页面，首屏 JS 仍处于 106–121 kB 目标区间。
3. `grep "dns\.cwxian\.com"` 确认：作为按钮 `href` 的外跳仅出现在 `get-started/domain/page.tsx` 底部 CTA（其余为文档/数据文本引用）。
4. 手动走查漏斗：从首页/Header/Footer/服务页/案例页/审核页任意"注册域名"按钮点击 → 均落地 `/get-started/domain/`；仅该页底部 CTA 外跳 `dns.cwxian.com`。
5. 主次确认：Header/Footer/MobileNav/Hero/ServiceOverview/BottomCTA 中"注册域名"为 primary、"开通空间"为 outline 次级，且均为内部跳转。
6. 空间入口仍可达：通过 `/services/hosting/`、`/get-started/hosting/`、页脚"服务"列访问，未彻底删除。
