import { useLocation, useNavigate } from 'react-router-dom'
import chinaIcon from '../../assets/lanhu/china.png'
import imdocIcon from '../../assets/lanhu/imdoc.png'
import logo from '../../assets/lanhu/logo.png'
import patientJourneyIcon from '../../assets/lanhu/patient-journey.png'
import searchIcon from '../../assets/lanhu/search.png'
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
          <button className="header-text-action" onClick={() => navigate(pagePaths.patientJourney)}>
            <img src={patientJourneyIcon} width="36" height="36" alt="" />
            <span>患者流程</span>
          </button>
          <button className="header-text-action" onClick={() => navigate(pagePaths.imdoc)}>
            <img src={imdocIcon} width="36" height="36" alt="" />
            <span>IMDOC</span>
          </button>
          <button className="header-text-action" aria-label="搜索" onClick={() => navigate(pagePaths.search)}>
            <img src={searchIcon} width="36" height="36" alt="" />
            <span>搜索</span>
          </button>
          <button className="header-language" type="button" aria-label="切换语言" title="多语言即将上线">
            <img src={chinaIcon} width="30" height="20" alt="" />
            <span>CH</span>
            <i aria-hidden="true" />
          </button>
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
