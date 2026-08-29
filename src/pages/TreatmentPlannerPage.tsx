import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { bodyDiseases, plannerCountries, plannerGoals, treatmentResults } from '../data/siteData'
import { pagePaths } from '../types/routes'

export function TreatmentPlannerPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [condition, setCondition] = useState('肺癌')
  const [goal, setGoal] = useState('寻找治疗方案')
  const [countries, setCountries] = useState<string[]>(['美国'])
  const [analyzing, setAnalyzing] = useState(false)
  const [done, setDone] = useState(false)
  const toggleCountry = (country: string) => setCountries(current => current.includes(country) ? current.filter(item => item !== country) : [...current, country])
  const next = () => {
    if (step < 2) setStep(current => current + 1)
    else {
      setAnalyzing(true)
      window.setTimeout(() => { setAnalyzing(false); setDone(true) }, 900)
    }
  }

  return (
    <div className="page planner-page">
      <SiteHeader />
      <section className="planner-hero"><div><span>IM MEDICAL PATHFINDER</span><h1>找到适合您的治疗路径</h1><p>输入疾病与目标，我们将为您匹配全球医院、专家与治疗指南。</p></div></section>
      <main className="planner-main">
        <div className="planner-progress">{['疾病信息', '治疗目标', '偏好与结果'].map((label, index) => <div key={label} className={index <= step ? 'current' : ''}><b>{index + 1}</b><span>{label}</span></div>)}</div>
        {!done ? <section className="planner-card">
          <div className="planner-card-head"><span>STEP {step + 1} / 3</span><strong>{step === 0 ? '先告诉我们您正在面对什么疾病' : step === 1 ? '您最希望达成什么目标？' : '选择您倾向的就医目的地'}</strong></div>
          {step === 0 && <div className="planner-options">{bodyDiseases.slice(0, 10).map(item => <button key={item} className={condition === item ? 'selected' : ''} onClick={() => setCondition(item)}>{item}</button>)}</div>}
          {step === 1 && <div className="planner-options goal-options">{plannerGoals.map(item => <button key={item} className={goal === item ? 'selected' : ''} onClick={() => setGoal(item)}>{item}</button>)}</div>}
          {step === 2 && <div className="planner-options">{plannerCountries.map(item => <button key={item} className={countries.includes(item) ? 'selected' : ''} onClick={() => toggleCountry(item)}>{item}<small>{countries.includes(item) ? '已选择' : '点击选择'}</small></button>)}</div>}
          <div className="planner-actions"><button className="back-btn" disabled={step === 0} onClick={() => setStep(current => current - 1)}>上一步</button><button className="planner-next" onClick={next}>{analyzing ? '智能分析中...' : step === 2 ? '生成我的路径' : '继续'}</button></div>
        </section> : <section className="planner-results">
          <div className="result-intro"><span>分析完成</span><h2>为您生成了 3 条匹配路径</h2><p>{condition} · {goal} · {countries.join('、') || '全球'}</p></div>
          <div className="result-grid">{treatmentResults.map(([name, desc, score], index) => <article key={name} className="result-card"><div className={'result-badge badge-' + index}>{index + 1}</div><h3>{name}</h3><p>{desc}</p><strong>{score}</strong><button onClick={() => navigate(pagePaths.diseases)}>查看详情 -&gt;</button></article>)}</div>
          <button className="restart" onClick={() => { setDone(false); setStep(0) }}>重新评估</button>
        </section>}
      </main>
      <SiteFooter />
    </div>
  )
}
