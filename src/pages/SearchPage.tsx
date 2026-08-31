import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import searchIcon from '../assets/lanhu/search/big-search-icon.png'
import { searchCategories, searchDiseases } from '../data/siteData'
import { pagePaths } from '../types/routes'
import '../SearchPage.css'

export function SearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const submit = (value = query) => {
    if (value.trim()) navigate(`${pagePaths.diseaseSearch}?q=${encodeURIComponent(value.trim())}`)
  }

  return (
    <div className="page search-page">
      <SiteHeader />
      <section className="search-artboard">
        <div className="search-title-row">
          <input
            autoFocus
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={event => event.key === 'Enter' && submit()}
            placeholder="在此搜索"
            aria-label="在此搜索"
          />
          <button onClick={() => submit()} aria-label="提交搜索">
            <img src={searchIcon} alt="" />
          </button>
        </div>
        <div className="search-hot">热门搜索</div>
        <ul className="search-list">
          {searchCategories.map(item => (
            <li key={item} className="search-cat">
              <button onClick={() => submit(item)}>{item}</button>
            </li>
          ))}
          {searchDiseases.map(item => (
            <li key={item}>
              <button onClick={() => submit(item)}>{item}</button>
            </li>
          ))}
        </ul>
      </section>
      <SiteFooter />
    </div>
  )
}
