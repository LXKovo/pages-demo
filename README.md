# IM Medical 国际医疗咨询网站

基于蓝湖产品设计稿实现的国际医疗咨询网站前端项目。项目当前已完成搜索、疾病检索和治疗路径规划等核心交互，并为后续产品页面预先配置了完整的导航与路由结构。

## 技术栈

- React 19
- TypeScript 6
- Vite 8
- CSS Variables
- 响应式 CSS
- ESLint

项目已安装 Tailwind CSS 4 相关依赖，但当前页面样式主要使用普通 CSS 实现，Tailwind Vite 插件尚未启用。

## 当前功能

### 已完成页面

| 页面 | 路由 | 主要功能 |
| --- | --- | --- |
| 搜索 | `/search` | 关键词输入、回车搜索、热门搜索、快捷推荐词 |
| 疾病与治疗 | `/diseases` | 疾病搜索、身体系统分类、字母索引、疾病详情弹层 |
| 治疗路径规划 | `/planner` | 三步选择流程、国家多选、分析状态、动态推荐结果 |

### 已接通路由

以下入口均可点击、支持当前导航高亮，并可使用浏览器前进和后退。页面暂时使用统一过渡页面，后续可根据新的产品原型逐页替换。

| 导航入口 | 路由 | 状态 |
| --- | --- | --- |
| 首页 | `/` | 待开发 |
| 出国就医 | `/overseas-care` | 待开发 |
| 我们的服务 | `/services` | 待开发 |
| 全球医生 | `/doctors` | 待开发 |
| 合作医院 | `/hospitals` | 待开发 |
| 疾病与治疗 | `/diseases` | 已完成 |
| 服务案例 | `/cases` | 待开发 |
| 关于我们 | `/about` | 待开发 |
| 预约服务 | `/appointment` | 待开发 |
| 患者流程 | `/patient-journey` | 待开发 |
| IMDOC | `/imdoc` | 待开发 |

顶部“找医生”“找医院”“寻找治疗方法”“预约服务”、Logo、搜索、患者流程和 IMDOC 入口也已经连接到对应路由。

## 本地开发

环境要求：

- Node.js 20+
- pnpm

安装依赖并启动开发服务器：

~~~bash
pnpm install
pnpm run dev
~~~

默认访问地址：

- [http://localhost:5173/](http://localhost:5173/)
- [http://localhost:5173/search](http://localhost:5173/search)
- [http://localhost:5173/diseases](http://localhost:5173/diseases)
- [http://localhost:5173/planner](http://localhost:5173/planner)

如果 `5173` 已被占用，Vite 会自动使用下一个可用端口。

## 项目命令

~~~bash
# 启动开发服务器
pnpm run dev

# TypeScript 类型检查并构建生产文件
pnpm run build

# 执行 ESLint
pnpm run lint

# 预览生产构建
pnpm run preview
~~~

提交代码前建议至少执行：

~~~bash
pnpm run build
pnpm run lint
~~~

## 原型图对比

蓝湖原型图存放在 `public/prototypes`，运行项目后可打开静态对比页：

- [原型图对比页](http://localhost:5173/prototypes/)
- [搜索原型图](./public/prototypes/search.png)
- [疾病检索原型图](./public/prototypes/disease-search.png)

原型图均为本地静态文件，运行时不依赖蓝湖远程图片地址。

## 项目结构

~~~text
src/
├── App.tsx                            # 路由状态、历史记录监听和页面分发
├── main.tsx                           # React 应用入口
├── App.css                            # 公共、搜索与疾病页面样式
├── index.css                          # 全局基础样式
├── planner.css                        # 治疗路径规划页面样式
├── assets/
│   ├── 远程问诊页面.png
│   └── lanhu/
│       └── logo.png
├── components/
│   ├── diseases/
│   │   └── DiseaseModal.tsx           # 疾病详情弹层
│   └── layout/
│       ├── SiteHeader.tsx             # 公共顶部导航
│       ├── SiteHeader.css
│       └── SiteFooter.tsx             # 公共咨询区与页脚
├── data/
│   └── siteData.ts                    # 导航配置、页面文案及业务演示数据
├── pages/
│   ├── SearchPage.tsx                 # 搜索页面
│   ├── DiseaseSearchPage.tsx          # 疾病检索页面
│   ├── TreatmentPlannerPage.tsx       # 治疗路径规划页面
│   ├── PendingPage.tsx                # 待开发路由的统一过渡页面
│   └── PendingPage.css
└── types/
    └── routes.ts                      # 路由类型、URL 映射和路径解析

public/
├── favicon.svg
├── icons.svg
└── prototypes/
    ├── index.html
    ├── search.png
    └── disease-search.png
~~~

## 路由机制

项目目前使用基于 History API 的轻量路由方案：

- `src/types/routes.ts` 统一维护页面类型和 URL 映射。
- `App.tsx` 根据当前路径选择页面组件。
- `pushState` 负责无刷新路由切换。
- `popstate` 负责浏览器前进和后退。
- `SiteHeader` 根据当前页面自动显示导航高亮。

后续页面数量或嵌套路由明显增加时，可以迁移到 React Router。

## 后续新增页面

拿到新的产品原型后，建议按以下方式扩展：

1. 在 `src/pages` 新建对应页面组件。
2. 在 `src/types/routes.ts` 增加页面类型和 URL。
3. 在 `src/data/siteData.ts` 更新导航配置或页面数据。
4. 在 `App.tsx` 添加页面组件分发。
5. 将可复用模块放入 `src/components/<业务目录>`。
6. 将原型图放入 `public/prototypes`，便于设计对比。
7. 完成后运行构建和 ESLint 检查。

## 组件化约定

- `App.tsx` 仅负责应用级路由和页面分发。
- 页面级状态和流程放在 `src/pages`。
- 多页面共享的 Header、Footer 等放在 `src/components/layout`。
- 页面内部出现真实复用或独立复杂逻辑时，再提取业务组件。
- 静态展示数据集中放在 `src/data`，便于后续替换为 API。
- 不为简单的一次性标签过度拆分组件。

## 设计资源

设计稿来源于蓝湖项目。品牌 Logo、咨询区域图片和原型截图均保存在项目本地，最终页面代码中不使用蓝湖 CDN 地址。
