import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/lanhu/logo.png'
import { navigationItems } from '../../data/siteData'
import { getPageFromPath, pagePaths } from '../../types/routes'
import './SiteHeader.css'

export function SiteHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPage = getPageFromPath(location.pathname)

  return (
    <>
      <div className="utility-bar">
        <button onClick={() => navigate(pagePaths.doctors)}>找医生</button>
        <button onClick={() => navigate(pagePaths.hospitals)}>找医院</button>
        <button onClick={() => navigate(pagePaths.planner)}>寻找治疗方法</button>
        <button className="utility-active" onClick={() => navigate(pagePaths.appointment)}>预约服务 ↗</button>
      </div>
      <header className="site-header">
        <button className="brand-link" onClick={() => navigate(pagePaths.home)} aria-label="返回首页">
          <img src={logo} className="brand-logo" alt="艾恩国际医疗咨询" />
        </button>
        <div className="header-actions">
          <button className="header-text-action" onClick={() => navigate(pagePaths.patientJourney)}>♧ 患者流程</button>
          <button className="header-text-action" onClick={() => navigate(pagePaths.imdoc)}>♧ IMDOC</button>
          <button aria-label="搜索" onClick={() => navigate(pagePaths.search)}>⌕</button>
          <span>🇨🇳 CH⌄</span>
        </div>
      </header>
      <nav className="main-nav">
        {navigationItems.map(item => (
          <button
            key={item.page}
            className={currentPage === item.page ? 'active' : ''}
            onClick={() => navigate(pagePaths[item.page])}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </>
  )
}
