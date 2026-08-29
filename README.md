# IM Medical 国际医疗咨询页面

基于 React + Vite 构建的医疗咨询网站原型实现，用于还原蓝湖设计稿并验证搜索、疾病检索和治疗路径规划等交互流程。

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS 4（项目依赖）
- CSS Variables + 响应式 CSS

## 页面入口

| 页面 | 路由 | 主要交互 |
| --- | --- | --- |
| 搜索 | `/search` | 输入搜索、回车搜索、热门搜索、快捷推荐词 |
| 检索疾病和状况 | `/diseases` | 身体系统切换、疾病筛选、字母索引、疾病详情弹层 |
| 治疗路径规划 | `/planner` | 三步表单、疾病选择、治疗目标、国家多选、智能分析状态、匹配结果 |

根路径 `/` 默认进入搜索页面。

## 本地运行

环境要求：Node.js 20+，推荐使用 pnpm。

~~~bash
pnpm install
pnpm run dev
~~~

启动后访问：

- [http://localhost:5173/search](http://localhost:5173/search)
- [http://localhost:5173/diseases](http://localhost:5173/diseases)
- [http://localhost:5173/planner](http://localhost:5173/planner)

## 常用命令

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

## 设计原型对比

蓝湖原型图已复制到 `public/prototypes`，可以通过静态对比页查看：

- [设计原型对比页](http://localhost:5173/prototypes/)
- [搜索原型图](./public/prototypes/search.png)
- [疾病检索原型图](./public/prototypes/disease-search.png)

对比页同时提供实现页面的快捷链接，方便逐页检查布局和交互。

## 目录结构

~~~text
src/
├── App.tsx                         # 路由状态与页面分发
├── main.tsx                        # React 应用入口
├── App.css                         # 搜索、疾病页面及公共样式
├── planner.css                     # 治疗路径规划页面样式
├── pages/
│   ├── SearchPage.tsx
│   ├── DiseaseSearchPage.tsx
│   └── TreatmentPlannerPage.tsx
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   └── SiteFooter.tsx
│   └── diseases/
│       └── DiseaseModal.tsx
├── data/
│   └── siteData.ts                  # 导航、疾病、规划选项及结果数据
├── types/
│   └── routes.ts                    # 页面路由类型
└── assets/
    ├── lanhu/logo.png
    └── 远程问诊页面.png

public/
└── prototypes/                      # 蓝湖设计原型静态文件
~~~

## 组件化约定

- `App.tsx` 只负责路由状态和页面分发。
- 页面级逻辑放在 `src/pages`。
- 多页面复用的布局放在 `src/components/layout`。
- 页面内部可复用的业务组件单独放在对应功能目录。
- 静态选项和展示数据集中放在 `src/data`，后续可替换为 API 数据。
- 新增页面时，应同步增加路由类型、页面组件和必要的业务组件，避免将页面 JSX 堆回 `App.tsx`。

## 设计资源说明

设计稿来源于蓝湖项目。项目中的原型图使用本地静态资源，运行时页面不依赖蓝湖远程图片地址。公共品牌 Logo 和咨询区域图片位于 `src/assets`。
