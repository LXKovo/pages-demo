import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import searchBg from '../assets/lanhu/planner/search-bg.webp'
import searchIcon from '../assets/lanhu/planner/search-icon.png'
import { plannerChips } from '../data/siteData'
import { pagePaths } from '../types/routes'
import '../planner.css'

export function TreatmentPlannerPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const submit = (value = query) => {
    if (value.trim()) navigate(`${pagePaths.diseaseSearch}?q=${encodeURIComponent(value.trim())}`)
  }

  return (
    <div className="page planner-page">
      <SiteHeader />
      <section className="planner-artboard">
        <img className="planner-bg" src={searchBg} alt="" />
        <h1 className="planner-title">
          <span>寻找</span>
          <span>治疗方法</span>
        </h1>
        <div className="planner-search">
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={event => event.key === 'Enter' && submit()}
            placeholder="在此搜索..."
            aria-label="搜索疾病或治疗方法"
          />
          <button onClick={() => submit()} aria-label="搜索">
            <img src={searchIcon} alt="" />
          </button>
        </div>
        <div className="planner-hot">热门搜索</div>
        <div className="planner-chips">
          {plannerChips.map(row => (
            <div className="planner-chips-row" key={row[0]}>
              {row.map(chip => (
                <button key={chip} onClick={() => submit(chip)}>{chip}</button>
              ))}
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
