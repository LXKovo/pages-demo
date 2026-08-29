import logo from '../../assets/lanhu/logo.png'
import { navigationItems } from '../../data/siteData'
import type { Page } from '../../types/routes'
import './SiteHeader.css'

type SiteHeaderProps = {
  page: Page
  onNavigate: (page: Page) => void
}

export function SiteHeader({ page, onNavigate }: SiteHeaderProps) {
  return (
    <>
      <div className="utility-bar">
        <button onClick={() => onNavigate('doctors')}>找医生</button>
        <button onClick={() => onNavigate('hospitals')}>找医院</button>
        <button onClick={() => onNavigate('planner')}>寻找治疗方法</button>
        <button className="utility-active" onClick={() => onNavigate('appointment')}>预约服务 ↗</button>
      </div>
      <header className="site-header">
        <button className="brand-link" onClick={() => onNavigate('home')} aria-label="返回首页">
          <img src={logo} className="brand-logo" alt="艾恩国际医疗咨询" />
        </button>
        <div className="header-actions">
          <button className="header-text-action" onClick={() => onNavigate('patientJourney')}>♧ 患者流程</button>
          <button className="header-text-action" onClick={() => onNavigate('imdoc')}>♧ IMDOC</button>
          <button aria-label="搜索" onClick={() => onNavigate('search')}>⌕</button>
          <span>🇨🇳 CH⌄</span>
        </div>
      </header>
      <nav className="main-nav">
        {navigationItems.map(item => (
          <button
            key={item.page}
            className={page === item.page ? 'active' : ''}
            onClick={() => onNavigate(item.page)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </>
  )
}
