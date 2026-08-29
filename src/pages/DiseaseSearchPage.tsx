import { useMemo, useState } from 'react'
import { DiseaseModal } from '../components/diseases/DiseaseModal'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { alphabet, bodyDiseases, bodyTabs } from '../data/siteData'

export function DiseaseSearchPage() {
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState(bodyTabs[0])
  const [letter, setLetter] = useState('S')
  const [selected, setSelected] = useState<string | null>(null)
  const filtered = useMemo(() => bodyDiseases.filter(disease => !query || disease.includes(query)), [query])

  return (
    <div className="page disease-page">
      <SiteHeader />
      <section className="disease-hero">
        <div className="hero-content">
          <h1>找到与您疾病匹配的全球最佳治疗路径</h1>
          <p>从确诊到治疗决策——汇聚全球顶级医院的疾病诊疗方案与权威专家资源</p>
          <div className="hero-search"><input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索疾病名称、症状或治疗领域..." /><button aria-label="搜索">⌕</button></div>
          <small>搜索疾病名称、身体部位或症状查找</small>
        </div>
      </section>
      <main className="disease-content">
        <h2>按身体系统浏览</h2>
        <div className="tabs">{bodyTabs.map(item => <button key={item} className={tab === item ? 'selected' : ''} onClick={() => setTab(item)}>{item}</button>)}</div>
        <div className="disease-grid-large">{filtered.map(item => <button key={item} onClick={() => setSelected(item)}>{item}</button>)}</div>
        <h2 className="alphabet-title">按字母索引</h2>
        <div className="alphabet">{alphabet.map(item => <button key={item} className={letter === item ? 'selected' : ''} onClick={() => setLetter(item)}>{item}</button>)}</div>
        <div className="disease-grid-large alphabet-grid">{filtered.slice(0, 6).map(item => <button key={item} onClick={() => setSelected(item)}>{item}</button>)}</div>
      </main>
      <SiteFooter />
      {selected && <DiseaseModal disease={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
