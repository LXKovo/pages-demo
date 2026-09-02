import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { getPageFromPath, pagePaths, type Page } from './types/routes'
import './App.css'
import './planner.css'

const PAGE_TITLES: Record<Page, string> = {
  home: '艾恩国际医疗 · IM Medical International',
  overseas: '出国就医 · 艾恩国际医疗',
  services: '我们的服务 · 艾恩国际医疗',
  doctors: '全球医生 · 艾恩国际医疗',
  hospitals: '合作医院 · 艾恩国际医疗',
  diseases: '疾病与治疗 · 艾恩国际医疗',
  diseaseSearch: '检索疾病和状况 · 艾恩国际医疗',
  cases: '服务案例 · 艾恩国际医疗',
  about: '关于我们 · 艾恩国际医疗',
  search: '搜索 · 艾恩国际医疗',
  planner: '寻找治疗方法 · 艾恩国际医疗',
  appointment: '预约服务 · 艾恩国际医疗',
  patientJourney: '患者流程 · 艾恩国际医疗',
  imdoc: 'IMDOC 医疗协作 · 艾恩国际医疗',
  news: '新闻版块 · 艾恩国际医疗',
  hospitalNews: '全球医院动态 · 艾恩国际医疗',
  medicalGuide: '海外医疗资讯与指南 · 艾恩国际医疗',
  membership: '会员服务 · 艾恩国际医疗',
}

const HomePage = lazy(() =>
  import('./pages/HomePage').then(m => ({ default: m.HomePage }))
)
const DiseaseTreatmentPage = lazy(() =>
  import('./pages/DiseaseTreatmentPage').then(m => ({ default: m.DiseaseTreatmentPage }))
)
const TreatmentPlannerPage = lazy(() =>
  import('./pages/TreatmentPlannerPage').then(m => ({ default: m.TreatmentPlannerPage }))
)
const SearchPage = lazy(() =>
  import('./pages/SearchPage').then(m => ({ default: m.SearchPage }))
)
const DiseaseSearchPage = lazy(() =>
  import('./pages/DiseaseSearchPage').then(m => ({ default: m.DiseaseSearchPage }))
)
const MembershipPage = lazy(() =>
  import('./pages/MembershipPage').then(m => ({ default: m.MembershipPage }))
)
const PendingPage = lazy(() =>
  import('./pages/PendingPage').then(m => ({ default: m.PendingPage }))
)

const REAL_PAGES: Page[] = ['home', 'diseases', 'planner', 'search', 'diseaseSearch', 'membership']
const PENDING_PAGES = (Object.keys(pagePaths) as Page[]).filter(page => !REAL_PAGES.includes(page))

function PageLoading() {
  return <div className="page-loading">加载中…</div>
}

function ScrollToTop() {
  const { pathname } = useLocation()
  const page = getPageFromPath(pathname)
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = PAGE_TITLES[page]
  }, [pathname, page])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path={pagePaths.home} element={<HomePage />} />
          <Route path={pagePaths.diseases} element={<DiseaseTreatmentPage />} />
          <Route path={pagePaths.planner} element={<TreatmentPlannerPage />} />
          <Route path={pagePaths.search} element={<SearchPage />} />
          <Route path={pagePaths.diseaseSearch} element={<DiseaseSearchPage />} />
          <Route path={pagePaths.membership} element={<MembershipPage />} />
          {PENDING_PAGES.map(page => (
            <Route key={page} path={pagePaths[page]} element={<PendingPage page={page} />} />
          ))}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
