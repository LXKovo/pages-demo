import logo from '../../assets/lanhu/logo.png'
import { navigationItems } from '../../data/siteData'
import type { Page } from '../../types/routes'

type SiteHeaderProps = {
  page: Page
  onNavigate: (page: Page) => void
}

export function SiteHeader({ page, onNavigate }: SiteHeaderProps) {
  return (
    <>
      <div className="utility-bar">
        <span>找医生</span>
        <span>找医院</span>
        <span className="utility-link" onClick={() => onNavigate('planner')}>寻找治疗方法</span>
        <span className="utility-active">预约服务 ↗</span>
      </div>
      <header className="site-header">
        <img src={logo} className="brand-logo" alt="艾恩国际医疗咨询" />
        <div className="header-actions">
          <span>♧ 患者流程</span>
          <span>♧ IMDOC</span>
          <button aria-label="搜索" onClick={() => onNavigate('search')}>⌕</button>
          <span>🇨🇳 CH⌄</span>
        </div>
      </header>
      <nav className="main-nav">
        {navigationItems.map((item, index) => (
          <button
            key={item}
            className={page === 'diseases' && index === 5 ? 'active' : ''}
            onClick={() => index === 5 && onNavigate('diseases')}
          >
            {item}
          </button>
        ))}
      </nav>
    </>
  )
}
