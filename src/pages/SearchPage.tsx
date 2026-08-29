import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { hotSearches } from '../data/siteData'
import { pagePaths } from '../types/routes'

export function SearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const submit = (value = query) => {
    if (value.trim()) navigate(pagePaths.diseases)
  }

  return (
    <div className="page search-page">
      <div className="search-shell">
        <button className="close" aria-label="关闭" onClick={() => navigate(pagePaths.home)}>×</button>
        <div className="search-title-row">
          <input autoFocus value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => event.key === 'Enter' && submit()} placeholder="在此搜索" />
          <button onClick={() => submit()} aria-label="提交搜索">⌕</button>
        </div>
        <div className="hot-search">
          <h3>热门搜索</h3>
          {hotSearches.map(item => <button key={item} onClick={() => { setQuery(item); submit(item) }}>{item}</button>)}
        </div>
        <div className="suggestion-chips">
          <button onClick={() => submit('CAR-T')}>CAR-T</button>
          <button onClick={() => submit('癌症免疫疗法')}>癌症免疫疗法</button>
          <button onClick={() => submit('骨髓移植')}>骨髓移植</button>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
