import { useNavigate } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { pendingPageContent } from '../data/siteData'
import { pagePaths, type Page } from '../types/routes'
import './PendingPage.css'

type PendingPageProps = {
  page: Page
}

export function PendingPage({ page }: PendingPageProps) {
  const navigate = useNavigate()
  const content = pendingPageContent[page] ?? pendingPageContent.home!

  return (
    <div className="page pending-page">
      <SiteHeader />
      <main>
        <section className="pending-hero">
          <div className="pending-hero-content">
            <span>{content.eyebrow}</span>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            <div className="pending-actions">
              <button className="pending-primary" onClick={() => navigate(pagePaths.planner)}>规划治疗路径</button>
              <button className="pending-secondary" onClick={() => navigate(pagePaths.diseases)}>浏览疾病与治疗</button>
            </div>
          </div>
          <div className="pending-visual" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="medical-cross"><i /><i /></div>
          </div>
        </section>
        <section className="pending-capabilities">
          <div><strong>30+</strong><span>全球合作医疗机构</span></div>
          <div><strong>多学科</strong><span>国际专家协作网络</span></div>
          <div><strong>全流程</strong><span>医学与就医服务支持</span></div>
        </section>
        <section className="pending-status">
          <span>页面内容正在持续完善</span>
          <p>当前导航、路由和核心服务入口已可正常体验。</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
