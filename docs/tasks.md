# 任务执行与进度跟踪文档（tasks）

> IM Medical International 艾恩国际医疗 —— 跨境医疗官网
> 文档版本：v1.0 · 2026-08-31
> 状态说明：当前已实现 5 个真实页面（首页 / 疾病与治疗 / 寻找治疗方法 / 搜索 / 检索疾病和状况），其余 29 页为 PendingPage 占位。

---

## 1. 技术栈与工程结构

### 1.1 技术栈

| 项 | 版本 | 说明 |
| --- | --- | --- |
| React | ^19.2.7 | UI 框架 |
| react-router-dom | ^7.18.3 | 路由（懒加载 + Suspense） |
| Vite | ^8.1.1 | 构建工具 |
| TypeScript | ~6.0.2 | 类型系统 |
| Tailwind CSS | ^4.3.3 | 样式方案（v4 `@theme` token） |
| 包管理器 | pnpm | — |
| 部署 | Vercel | `vercel.json` |

### 1.2 关键目录

```
src/
├── App.tsx                    # 路由装配：REAL_PAGES 真实渲染，其余走 PendingPage
├── types/routes.ts            # Page 联合类型 + pagePaths 路径映射 + getPageFromPath
├── data/siteData.ts           # 导航、疾病、热门搜索、占位文案、planner 数据
├── assets/lanhu/              # 蓝湖切图资源（logo、icon、页面整图、consult 背景）
├── components/
│   ├── layout/                # SiteHeader（utility-bar + header + main-nav）、SiteFooter（consult-banner + footer）
│   └── diseases/              # DiseaseModal（疾病弹窗）
└── pages/
    ├── HomePage.tsx / .css        # ✅ 首页（10 个 artboard 区块，HomePage.css）
    ├── DiseaseTreatmentPage.tsx   # ✅ 疾病与治疗（整图 + 热区方案）
    ├── TreatmentPlannerPage.tsx   # ✅ 寻找治疗方法（planner-artboard）
    ├── SearchPage.tsx             # ✅ 搜索（search-artboard）
    └── PendingPage.tsx            # 占位页（hero + 能力卡片 + 状态提示）
```

### 1.3 路由装配逻辑（App.tsx）

```ts
const REAL_PAGES: Page[] = ['home', 'diseases', 'planner', 'search', 'diseaseSearch']
const PENDING_PAGES = (Object.keys(pagePaths) as Page[]).filter(page => !REAL_PAGES.includes(page))
```

- `REAL_PAGES` 中的页面懒加载真实组件；
- 其余页面统一走 `PendingPage`，带 `page` prop 渲染对应占位内容；
- `path="*"` 兜底回首页占位。

---

## 2. 路由设计（当前 13 条）

| Page | 路径 | 现状 |
| --- | --- | --- |
| home | `/` | ✅ HomePage（设计稿 9 首页，10 artboard 区块） |
| overseas | `/overseas-care` | PendingPage（设计稿 31 出国就医） |
| services | `/services` | PendingPage（我们的服务总览） |
| doctors | `/doctors` | PendingPage（设计稿 16 全球医生 / 7 找医生） |
| hospitals | `/hospitals` | PendingPage（设计稿 33 医院 / 6 找医院） |
| diseases | `/diseases` | ✅ DiseaseTreatmentPage（设计稿 22 疾病与治疗） |
| diseaseSearch | `/disease-search` | ✅ DiseaseSearchPage（设计稿 15 检索疾病和状况，支持 `?q=` 关键词） |
| cases | `/cases` | PendingPage（设计稿 17 成功案例） |
| about | `/about` | PendingPage（关于我们） |
| search | `/search` | ✅ SearchPage（设计稿 8 搜索） |
| planner | `/planner` | ✅ TreatmentPlannerPage（设计稿 5 寻找治疗方法） |
| appointment | `/appointment` | PendingPage（预约服务落地） |
| patientJourney | `/patient-journey` | PendingPage（患者流程） |
| imdoc | `/imdoc` | PendingPage（IMDOC 医疗协作） |
| news | `/news` | PendingPage（设计稿 18 新闻版块） |
| hospitalNews | `/hospital-news` | PendingPage（设计稿 11 全球医院动态） |
| medicalGuide | `/medical-guide` | PendingPage（设计稿 12 海外医疗资讯与指南） |

---

## 3. 34 页设计稿 ↔ 路由映射与进度矩阵

### 3.1 已实现（5 页）

| 设计稿 | 页面 | 路由 | 实现方式 |
| --- | --- | --- | --- |
| 9 | 首页 | `/` | HomePage artboard 还原：1920×9781 切 10 区块（hero / 关于+数据 / 核心服务 / 疾病入口 / 医生 / 医院 / 案例 / 资讯 / FAQ / 流程），首尾复用 SiteHeader/SiteFooter；图片本地化到 `src/assets/lanhu/home/`（34 PNG + hero-bg.jpg）；疾病入口带词跳转 `/disease-search?q=xxx` |
| 22 | 疾病与治疗 | `/diseases` | 整图（1920×8033）+ 透明热区按钮：导航 15 区 + 内容锚点 6 区 + 表单输入覆盖（姓名/电话/病情简述/提交） |
| 5 | 寻找治疗方法 | `/planner` | planner-artboard：标题 + 搜索框 + 热门搜索 chips（3 行 9 词） |
| 8 | 搜索 | `/search` | search-artboard：搜索框 + 热门搜索（3 分类 + 6 疾病） |
| 15 | 检索疾病和状况 | `/disease-search` | 组件化检索页：搜索 + 身体系统 tabs + 字母索引 + 疾病弹窗；支持 `?q=` URL 参数（搜索/寻找治疗方法页提交后带词跳转） |

### 3.2 待开发（31 页）—— 按优先级分批

> 图例：P0 转化核心 → P1 列表页 → P2 详情页 → P3 服务品牌页 → P4 内容辅助页

| # | 设计稿页名 | 归属路由 | 类型 | 优先级 | 状态 |
| --- | --- | --- | --- | --- | --- |
| 9 | 首页 | `/` | 首页 | P0 | ✅（见 3.1） |
| 17 | 成功案例 | `/cases` | 列表页 | P0 | ⬜ |
| 19 | 疾病和状况 | `/diseases` | 疾病列表 | P0 | ⬜ |
| 10 | 肺癌概述 | `/diseases/*` | 疾病详情 | P0 | ⬜ |
| 15 | 检索疾病和状况 | `/disease-search` | 工具页 | P0 | ✅ |
| 14 | 疾病中心图标 | `/diseases` | 中心导航 | P0 | ⬜ |
| 13 | 全球疾病治疗指南 | `/planner` | 列表页 | P1 | ⬜ |
| 4 | 治疗药物 | `/diseases` | 列表页 | P1 | ⬜ |
| 25 | 药物详情 | `/diseases/*` | 详情页 | P1 | ⬜ |
| 16 | 全球医生 | `/doctors` | 列表页 | P1 | ⬜ |
| 7 | 找医生 | `/doctors` | 列表页 | P1 | ⬜ |
| 34 | 医生详情 | `/doctors/*` | 详情页 | P1 | ⬜ |
| 33 | 医院 | `/hospitals` | 列表页 | P1 | ⬜ |
| 6 | 找医院 | `/hospitals` | 列表页 | P1 | ⬜ |
| 32 | 医院详情（MD安德森） | `/hospitals/*` | 详情页 | P1 | ⬜ |
| 26 | 医院的详情页（癌研有明） | `/hospitals/*` | 详情页 | P1 | ⬜ |
| 30 | 海外体检 | `/services` | 列表页 | P1 | ⬜ |
| 29 | 基因检测服务 | `/services` | 服务详情 | P1 | ⬜ |
| 27 | 健康管理计划 | `/services` | 列表/服务 | P1 | ⬜ |
| 28 | 体检详情 | `/services/*` | 详情页 | P2 | ⬜ |
| 1 | 远程问诊页面 | `/services` | 服务详情 | P2 | ⬜ |
| 21 | 多学科远程咨询 | `/services` | 服务详情 | P2 | ⬜ |
| 24 | 多学科详情页 | `/services/*` | 服务详情 | P2 | ⬜ |
| 20 | 日本体检介绍页 | `/services` | 服务详情（超长） | P2 | ⬜ |
| 23 | 企业家健康管理详情页 | `/services/*` | 服务详情 | P2 | ⬜ |
| 31 | 出国就医 | `/overseas-care` | 服务总览 | P3 | ⬜ |
| 18 | 新闻版块 | 资讯区 | 资讯列表 | P3 | ⬜ |
| 3 | 新闻详情 | 资讯区/* | 资讯详情 | P3 | ⬜ |
| 11 | 全球医院动态 | 资讯区 | 资讯列表 | P3 | ⬜ |
| 12 | 海外医疗资讯与指南 | 资讯区 | 资讯列表 | P3 | ⬜ |
| 2 | 常见问题 | `/about` | 内容列表 | P4 | ⬜ |

> 注：资讯类页面（新闻版块/新闻详情/全球医院动态/海外医疗资讯与指南）已建立独立路由占位（`/news`、`/hospital-news`、`/medical-guide`），Footer「有用信息 / 健康图书馆 / 全球医院」链接已可点击跳转；内容落地仍需按列表页模板实现。

---

## 4. 已实现页面实现说明

### 4.1 疾病与治疗（DiseaseTreatmentPage）—— 整图 + 热区方案

- 使用设计稿整图 `assets/lanhu/disease-treatment/design.webp`（1920×8033，sharp 压缩替代 5.7MB 原始 png）作为画布；
- 容器 `aspect-1920/8033` + `w-[1920px] max-w-full` 实现等比缩放；
- **navigationZones**（15 个透明按钮）：utility-bar 4 区 + 主导航 8 区 + 右上 3 区（患者流程/IMDOC/搜索），按设计稿像素坐标 `(left, top, width, height)` 映射为百分比，点击跳转对应路由；
- **contentZones**（6 个锚点按钮）：治疗方案 / 推荐医院 / 权威专家 / 治疗药物 / 服务案例 / 治疗资讯，点击平滑滚动到设计稿 Y 坐标；
- **表单覆盖**：姓名/联系电话/病情简述/立即提交为透明输入控件叠于设计稿之上。

> 此方案适合「单页视觉还原」，但热区坐标硬编码、不便于维护，后续页面建议优先组件化实现（模板见 5.3）。

### 4.2 寻找治疗方法（TreatmentPlannerPage）

- planner-artboard：搜索背景图 + 「寻找治疗方法」双色标题 + 搜索框 + 热门搜索 chips；
- 搜索提交跳转 `/diseases`。

### 4.3 搜索（SearchPage）

- search-artboard：大搜索图标 + 输入框（Enter 或按钮提交）+ 热门搜索分类列表；
- 搜索提交带词跳转 `/disease-search?q=xxx`（与寻找治疗方法页一致）。

### 4.4 检索疾病和状况（DiseaseSearchPage）

- 组件化检索页：`?q=` URL 参数初始化搜索词 + 身体系统 tabs + 疾病网格 + 字母索引 + 疾病详情弹窗（DiseaseModal）；
- 数据来自 `siteData`（`bodyTabs` / `bodyDiseases` / `alphabet`）；
- 路由 `/disease-search`，导航高亮归属「疾病与治疗」（`getPageFromPath` 分组映射）。

### 4.5 首页（HomePage）—— artboard 分块还原

- 设计稿 1920×9781，首页按蓝湖累计坐标使用统一 1920px artboard 缩放容器；Header/hero、平台介绍、核心服务、疾病、医生及 group_40 尾部区域共用同一缩放比例；窄屏由 `.home-stage-space` 保持完整画布高度并等比缩放，避免区块独立 aspect-ratio 导致文字、控件与容器不同步；
- 关键区块：utility 40px、Header（含主导航）166px、hero 930px、平台介绍 530px、核心服务 1110px、疾病 500px、医生 1100px、医院内容区 1075px、服务流程 760px、咨询 Banner 580px、Footer 主体 560px、版权 70px；医院卡固定 440×297，背景图与 440×142 文字蒙层分离；
- 交互：hero 4 按钮跳转（appointment/hospitals/services/services）；8 疾病入口带词跳 `/disease-search?q=xxx`；核心服务与医院分类为可操作 tab；FAQ 为可展开按钮；各分区「了解更多」及资讯/资源卡保留原有路由；图片全部本地化到 `src/assets/lanhu/home/`。

---

## 5. 开发约定

### 5.1 组件化分层

```
页级组件（pages/*）        → 组装区块
  ├─ 区块组件（sections/*） → hero / 筛选栏 / 卡片网格 / 分页 / 详情双栏 / consult-banner
  └─ 原子组件（components/*）→ 按钮 / 输入框 / 标签 / checkbox / 分页圆 / 面包屑 / 图标项
```

### 5.2 数据驱动

- 导航、统计数字、医院/专家/药物/案例列表放入 `src/data/` 常量；
- 设计 token 放入 Tailwind v4 `@theme`（`--c-navy`、`--c-teal`、`--c-magenta` 等），组件内不再硬编码色值。

### 5.3 页面模板复用

| 模板 | 复用页面 |
| --- | --- |
| 列表页模板（hero + 筛选栏 + 卡片网格 + 分页） | 全球医生 / 找医生 / 医院 / 找医院 / 治疗药物 / 全球疾病治疗指南 / 成功案例 / 海外体检 / 全球医院动态 / 健康管理计划 |
| 详情页模板（hero + 双栏） | 医生详情 / 医院详情 / 医院的详情页 / 药物详情 / 体检详情 / 新闻详情 / 多学科详情页 |
| 服务详情模板（hero + 数据卡 + 区块 + CTA） | 远程问诊 / 多学科远程咨询 / 日本体检介绍 / 企业家健康管理 / 基因检测服务 / 出国就医 |

### 5.4 接入既有全局组件

- 新页面必须复用 `SiteHeader`（导航高亮依赖 `getPageFromPath`）与 `SiteFooter`（含咨询表单）；
- 咨询表单提交暂为纯前端，后续接后端接口。

---

## 6. 里程碑

| 里程碑 | 范围 | 预计产物 |
| --- | --- | --- |
| M1 转化闭环（当前） | 首页 + 疾病与治疗 + 寻找治疗方法 + 搜索 + 预约服务 + 成功案例 | 用户可从首页走到咨询表单 |
| M2 资源列表化 | 全球医生 + 医生详情 / 合作医院 + 医院详情 + 医院详情（癌研有明） | 列表页模板 + 详情页模板落地 |
| M3 疾病内容域 | 疾病和状况 + 肺癌概述 + 疾病中心图标 + 检索疾病和状况 + 治疗药物 + 药物详情 + 全球疾病治疗指南 | 疾病域完整 |
| M4 服务产品域 | 远程问诊 / 多学科远程咨询 / 海外体检 + 体检详情 / 日本体检介绍 / 健康管理计划 / 企业家健康管理 / 基因检测 / 出国就医 | 服务品牌页完整 |
| M5 资讯内容域 | 新闻版块 + 新闻详情 + 全球医院动态 + 海外医疗资讯与指南 + 常见问题 | 资讯区路由组 |
| M6 收尾 | 关于我们 + 移动端适配 + 设计 token 收敛 + 性能优化 | 全站 34 页 100% |

> 进度更新规则：每完成一页，将 3.2 表中状态从 ⬜ 改为 ✅，并记录实现方式与验收截图。
