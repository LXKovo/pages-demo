import { useEffect, useState } from 'react'
import { DiseaseSearchPage } from './pages/DiseaseSearchPage'
import { SearchPage } from './pages/SearchPage'
import { TreatmentPlannerPage } from './pages/TreatmentPlannerPage'
import type { Page } from './types/routes'
import './App.css'
import './planner.css'

function initialPage(): Page {
  if (window.location.pathname.startsWith('/diseases')) return 'diseases'
  if (window.location.pathname.startsWith('/planner')) return 'planner'
  return 'search'
}

function App() {
  const [page, setPage] = useState<Page>(initialPage)
  useEffect(() => {
    const handlePopState = () => setPage(initialPage())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  const navigate = (next: Page) => {
    const path = next === 'diseases' ? '/diseases' : next === 'planner' ? '/planner' : '/search'
    window.history.pushState({}, '', path)
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (page === 'diseases') return <DiseaseSearchPage onNavigate={navigate} />
  if (page === 'planner') return <TreatmentPlannerPage onNavigate={navigate} />
  return <SearchPage onNavigate={navigate} />
}

export default App
