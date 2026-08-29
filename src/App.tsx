import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { pagePaths, type Page } from './types/routes'
import './App.css'
import './planner.css'

const DiseaseSearchPage = lazy(() =>
  import('./pages/DiseaseSearchPage').then(m => ({ default: m.DiseaseSearchPage }))
)
const TreatmentPlannerPage = lazy(() =>
  import('./pages/TreatmentPlannerPage').then(m => ({ default: m.TreatmentPlannerPage }))
)
const SearchPage = lazy(() =>
  import('./pages/SearchPage').then(m => ({ default: m.SearchPage }))
)
const PendingPage = lazy(() =>
  import('./pages/PendingPage').then(m => ({ default: m.PendingPage }))
)

const REAL_PAGES: Page[] = ['diseases', 'planner', 'search']
const PENDING_PAGES = (Object.keys(pagePaths) as Page[]).filter(page => !REAL_PAGES.includes(page))

function PageLoading() {
  return <div className="page-loading">加载中…</div>
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path={pagePaths.diseases} element={<DiseaseSearchPage />} />
          <Route path={pagePaths.planner} element={<TreatmentPlannerPage />} />
          <Route path={pagePaths.search} element={<SearchPage />} />
          {PENDING_PAGES.map(page => (
            <Route key={page} path={pagePaths[page]} element={<PendingPage page={page} />} />
          ))}
          <Route path="*" element={<PendingPage page="home" />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
