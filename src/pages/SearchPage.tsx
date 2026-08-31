import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import searchIcon from '../assets/lanhu/search/big-search-icon.png'
import { pagePaths } from '../types/routes'
import '../SearchPage.css'

const SEARCH_CATEGORIES = ['肿瘤与癌症', '神经系统疾病', '血液与免疫系统疾病']
const SEARCH_DISEASES = ['肺癌', '肝癌', '结直肠癌', '脑瘤', '胰腺癌', '黑色素瘤']

export function SearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const submit = (value = query) => {
    if (value.trim()) navigate(pagePaths.diseases)
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
          {SEARCH_CATEGORIES.map(item => (
            <li key={item} className="search-cat">
              <button onClick={() => submit(item)}>{item}</button>
            </li>
          ))}
          {SEARCH_DISEASES.map(item => (
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
