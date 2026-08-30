import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import logo from '../assets/lanhu/logo.png'
import searchIcon from '../assets/lanhu/search.png'
import { hotSearches } from '../data/siteData'
import { pagePaths } from '../types/routes'

export function SearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const submit = (value = query) => {
    if (value.trim()) navigate(pagePaths.diseases)
  }

  return (
    <main className="search-page">
      <div className="search-artboard">
        <div className="utility-bar search-utility-bar">
          <button onClick={() => navigate(pagePaths.doctors)}>找医生</button>
          <button onClick={() => navigate(pagePaths.hospitals)}>找医院</button>
          <button onClick={() => navigate(pagePaths.planner)}>寻找治疗方法</button>
          <button className="utility-active" onClick={() => navigate(pagePaths.appointment)}>预约服务 ↗</button>
        </div>
        <section className="search-shell">
          <button className="search-brand" onClick={() => navigate(pagePaths.home)} aria-label="返回首页">
            <img src={logo} alt="艾恩国际医疗咨询" />
          </button>
          <button className="close" aria-label="关闭" onClick={() => navigate(pagePaths.home)}>×</button>
          <div className="search-title-row">
            <input autoFocus value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => event.key === 'Enter' && submit()} placeholder="在此搜索" />
            <button onClick={() => submit()} aria-label="提交搜索"><img src={searchIcon} alt="" /></button>
          </div>
          <div className="hot-search">
            <h3>热门搜索</h3>
            {hotSearches.map(item => <button key={item} onClick={() => { setQuery(item); submit(item) }}>{item}</button>)}
          </div>
        </section>
        <div className="suggestion-chips">
          <button onClick={() => submit('CAR-T')}>CAR-T</button>
          <button onClick={() => submit('癌症免疫疗法')}>癌症免疫疗法</button>
          <button onClick={() => submit('骨髓移植')}>骨髓移植</button>
        </div>
        <SiteFooter />
      </div>
    </main>
  )
}
