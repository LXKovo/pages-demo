# IM Medical International · 艾恩国际医疗

跨境医疗咨询官网前端。面向美国、日本、英国、德国、新加坡等地区提供一站式国际医疗服务，官网承担品牌展示、患者引流、疾病/医生/医院等结构化信息检索与咨询线索转化。

项目基于蓝湖 34 页产品设计稿 1:1 还原实现，设计 token、字体规格与区块布局全部来源于设计稿 CSS 标注。

## 当前进度

| 状态 | 页面 | 数量 |
| --- | --- | --- |
| ✅ 已实现真实页面 | 首页、搜索、疾病与治疗、治疗路径规划、检索疾病和状况 | 5 |
| 🧩 已接通路由（PendingPage 占位） | 出国就医、我们的服务、全球医生、合作医院、服务案例、关于我们、预约服务、患者流程、IMDOC、新闻版块、全球医院动态、海外医疗资讯与指南 | 12 |

全部 34 页的逐页明细见 [docs/UI.md](docs/UI.md)，进度矩阵见 [docs/tasks.md](docs/tasks.md)。

### 已实现页面

| 页面 | 路由 | 主要功能 |
| --- | --- | --- |
| 首页 | `/` | 蓝湖设计稿（1920×9781）切 10 个 artboard 区块：hero 四按钮 / 数据背书 / 核心服务 / 疾病入口 / 医生 / 医院 / 案例 / 资讯 / FAQ / 服务流程；疾病图标带词跳疾病检索 |
| 搜索 | `/search` | 关键词输入、回车/按钮提交、热门搜索与快捷推荐词 |
| 疾病与治疗 | `/diseases` | 蓝湖整图热区导航：治疗方案/医院/专家/药物/案例/资讯锚点 + 咨询表单 |
| 治疗路径规划 | `/planner` | 搜索 + 热门治疗标签，提交带词跳转疾病检索 |
| 检索疾病和状况 | `/disease-search` | 关键词检索、身体系统 tabs、字母索引、疾病详情弹层；支持 `?q=` URL 预填 |

### 已接通路由（待逐页实现）

以下入口均可点击跳转、支持当前导航高亮与浏览器前进/后退，页面暂以统一过渡页占位：

| 导航入口 | 路由 | 导航入口 | 路由 |
| --- | --- | --- | --- |
| 出国就医 | `/overseas-care` | 预约服务 | `/appointment` |
| 我们的服务 | `/services` | IMDOC | `/imdoc` |
| 全球医生 | `/doctors` | 新闻版块 | `/news` |
| 合作医院 | `/hospitals` | 全球医院动态 | `/hospital-news` |
| 服务案例 | `/cases` | 海外医疗资讯与指南 | `/medical-guide` |
| 关于我们 | `/about` | | |

顶部 Utility Bar（找医生/找医院/寻找治疗方法/预约服务）、Logo、搜索、患者流程与 IMDOC 入口均已连接对应路由。

## 技术栈

| 项 | 版本 | 说明 |
| --- | --- | --- |
| React | 19 | UI 框架 |
| react-router-dom | 7 | 路由（懒加载 + Suspense） |
| Vite | 8 | 构建工具 |
| TypeScript | 6（`strict` 模式） | 类型系统 |
| Tailwind CSS | 4（`@theme` 设计 token） | 样式方案 |
| 包管理器 | pnpm | — |
| 部署 | Vercel | `vercel.json` SPA 重写 |

设计 token（色彩/阴影/边框）集中在 [src/index.css](src/index.css) 的 Tailwind v4 `@theme` 中管理，与 [docs/design.md](docs/design.md) 一一对应；页面级样式按文件分置，通过 CSS 变量复用 token。

## 快速开始

环境要求：Node.js 20+、pnpm。

```bash
# 安装依赖
pnpm install

# 启动开发服务器（默认 http://localhost:5173）
pnpm run dev

# TypeScript 类型检查并构建生产文件
pnpm run build

# 执行 ESLint
pnpm run lint

# 预览生产构建
pnpm run preview
```

提交代码前建议至少执行：

```bash
pnpm run build
pnpm run lint
```

## 项目结构

```text
src/
├── App.tsx                            # 路由装配：REAL_PAGES 真实渲染，其余走 PendingPage
├── main.tsx                           # React 应用入口
├── index.css                          # 全局基础样式 + Tailwind v4 @theme 设计 token
├── App.css                            # 公共样式（Header/Footer/导航/弹层/toast）
├── SearchPage.css                     # 搜索页样式
├── planner.css                        # 治疗路径规划页样式
├── types/
│   └── routes.ts                      # Page 联合类型、pagePaths 路径映射、getPageFromPath 解析
├── data/
│   └── siteData.ts                    # 导航配置、疾病数据、热门搜索、planner 标签、占位文案
├── assets/
│   └── lanhu/                         # 蓝湖本地切图（logo/图标/页面整图/咨询背景，含 webp 优化版）
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx / .css      # 公共顶部导航（Utility Bar + Header + Main Nav）
│   │   └── SiteFooter.tsx             # 公共咨询 Banner 与页脚
│   ├── common/
│   │   └── Toast.tsx                  # 表单提交反馈提示
│   └── diseases/
│       └── DiseaseModal.tsx           # 疾病详情弹层
└── pages/
    ├── HomePage.tsx / .css            # 首页（10 个 artboard 区块，HomePage.css）
    ├── SearchPage.tsx                 # 搜索页
    ├── DiseaseSearchPage.tsx          # 疾病检索页
    ├── TreatmentPlannerPage.tsx       # 治疗路径规划页
    ├── DiseaseTreatmentPage.tsx       # 疾病与治疗整图热区页
    ├── PendingPage.tsx / .css         # 待开发路由的统一过渡页
    └── ...

docs/
├── prospal.md                         # 原型/需求说明（信息架构、核心路径、交互规则）
├── design.md                          # 设计规范（色彩/字体/版式骨架 token 全表）
├── UI.md                              # 34 页产品原型逐页区块明细
└── tasks.md                           # 任务执行与进度跟踪

design-reference/                      # 蓝湖原型截图（仅本地开发参考，已 gitignore，不发布）
```

## 路由机制

项目使用 react-router-dom v7，全量懒加载：

- [src/types/routes.ts](src/types/routes.ts) 统一维护 `Page` 联合类型、`pagePaths` URL 映射与 `getPageFromPath` 路径解析；`PAGE_GROUP` 将 `disease-search` 等子页归组到主导航栏目，保证导航高亮正确。
- [src/App.tsx](src/App.tsx) 以 `lazy` + `Suspense` 装配路由：`REAL_PAGES`（home / diseases / planner / search / diseaseSearch）直出真实页面，其余 12 页统一走 `PendingPage` 占位，`path="*"` 兜底回首页。
- 路由切换自动滚动回顶，并按页面映射更新 `document.title`（SEO）。

## 设计系统

设计 token 以 Tailwind v4 `@theme` 形式集中在 [src/index.css](src/index.css)：

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--color-navy` | `#2b2c6c` | 主色：标题、Footer、hero 蒙层、当前分页 |
| `--color-magenta` | `#fa007f` | 强调：CTA、价格、提交按钮 |
| `--color-teal` | `#00c6ae` | 次要 CTA：标签、图标、teal 按钮 |
| `--color-teal-deep` | `#1dba9b` | 预约服务条专用 teal |
| `--color-muted` / `--color-gray-*` | 灰阶 | 正文、元数据、边框、背景 |
| `--shadow-card` | `0 5px 15px rgba(164,172,171,.25)` | 卡片投影 |

字体为思源黑体（Source Han Sans CN）+ Almarai。完整的色彩全表、版式骨架（Utility Bar 40px / Header 166px / Hero 310px / 咨询 Banner 580px / Footer 560px）、圆角与阴影规范见 [docs/design.md](docs/design.md)。

页面模板约定：列表页 = hero + 360px 筛选侧栏 + 卡片网格 + 40px 圆形分页；详情页 = hero + 两栏布局。

## 本地设计原型参考

蓝湖原型截图保存在项目根目录 `design-reference/`（仅本地开发比对用，已加入 `.gitignore`，**不提交、不随站发布**）：

- `design-reference/search.png` — 搜索原型图
- `design-reference/disease-search.png` — 疾病检索原型图

页面运行时不依赖任何蓝湖远程图片地址，所有图片资源均已本地化到 `src/assets/lanhu/`。

## 数据与组件约定

- [src/App.tsx](src/App.tsx) 仅负责应用级路由与页面分发。
- 页面级状态与流程放在 `src/pages`；多页共享的 Header/Footer 放在 `src/components/layout`。
- 页面内部出现真实复用或独立复杂逻辑时，再提取业务组件；不为一次性标签过度拆分。
- 静态展示数据集中在 [src/data/siteData.ts](src/data/siteData.ts)，便于后续替换为 API。
- 表单（咨询、预约）提交带本地校验与 Toast 反馈，样式层按 [docs/design.md](docs/design.md) 的 token 还原。

## 文档索引

| 文档 | 内容 |
| --- | --- |
| [docs/prospal.md](docs/prospal.md) | 需求说明：项目背景、信息架构、核心路径 |
| [docs/design.md](docs/design.md) | 设计规范：色彩/字体/版式 token 全表 |
| [docs/UI.md](docs/UI.md) | 34 页产品原型逐页区块明细与交互 |
| [docs/tasks.md](docs/tasks.md) | 任务执行与进度跟踪 |

## 后续新增页面

拿到新原型后按以下顺序扩展：

1. 在 `src/pages` 新建页面组件（参考 `UI.md` 对应页区块明细 + `design.md` 设计规范）。
2. 在 `src/types/routes.ts` 增加页面类型与 URL。
3. 在 `src/data/siteData.ts` 更新导航配置或页面数据。
4. 在 `src/App.tsx` 将页面加入真实渲染（或新增路由分发）。
5. 可复用模块放入 `src/components/<业务目录>`。
6. 页面图片用 sharp 转 webp 后放入 `src/assets/lanhu/<页面>/`；原型截图放 `design-reference/`（本地参考）。
7. 完成后运行 `pnpm run build && pnpm run lint`。

## 部署

项目为纯静态 SPA，通过 Vercel 部署，`vercel.json` 配置了 History API 重写（所有路径回退到 `index.html`）。页面标题与元信息已在 [index.html](index.html) 配置。
