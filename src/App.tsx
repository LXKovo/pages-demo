import { useEffect, useState } from 'react'
import { DiseaseSearchPage } from './pages/DiseaseSearchPage'
import { SearchPage } from './pages/SearchPage'
import { TreatmentPlannerPage } from './pages/TreatmentPlannerPage'
import { PendingPage } from './pages/PendingPage'
import { getPageFromPath, pagePaths, type Page } from './types/routes'
import './App.css'
import './planner.css'

function initialPage(): Page {
  return getPageFromPath(window.location.pathname)
}

function App() {
  const [page, setPage] = useState<Page>(initialPage)
  useEffect(() => {
    const handlePopState = () => setPage(initialPage())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  const navigate = (next: Page) => {
    window.history.pushState({}, '', pagePaths[next])
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (page === 'diseases') return <DiseaseSearchPage onNavigate={navigate} />
  if (page === 'planner') return <TreatmentPlannerPage onNavigate={navigate} />
  if (page === 'search') return <SearchPage onNavigate={navigate} />
  return <PendingPage page={page} onNavigate={navigate} />
}

export default App
