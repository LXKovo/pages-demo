import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/lanhu/logo.png'
import consultBg from '../../assets/lanhu/planner/consult-bg.webp'
import { Toast } from '../common/Toast'
import { pagePaths, type Page } from '../../types/routes'

type FooterLink = { label: string; page: Page }

const SERVICE_LINKS: FooterLink[] = [
  { label: '全球就医战略咨询', page: 'services' },
  { label: '国际远程会诊', page: 'services' },
  { label: '多学科专家远程问诊', page: 'services' },
  { label: '海外体检', page: 'services' },
  { label: '日本高级体检', page: 'services' },
  { label: '基因检测服务', page: 'services' },
]

const INFO_LINKS: FooterLink[] = [
  { label: '美国看病', page: 'overseas' },
  { label: '日本看病', page: 'overseas' },
  { label: '英国看病', page: 'overseas' },
  { label: '服务案例', page: 'cases' },
  { label: '常见问题', page: 'about' },
  { label: '在线预约', page: 'appointment' },
  { label: '会员服务', page: 'membership' },
]

const HOSPITAL_LINKS: FooterLink[] = [
  { label: '美国医院排名', page: 'hospitals' },
  { label: '日本医院排名', page: 'hospitals' },
  { label: '英国医院排名', page: 'hospitals' },
  { label: '德国医院排名', page: 'hospitals' },
]

const LIBRARY_LINKS: FooterLink[] = [
  { label: '全球疾病治疗指南', page: 'planner' },
  { label: '癌症百科', page: 'diseaseSearch' },
  { label: '最新药物', page: 'news' },
  { label: '全球专家访谈', page: 'news' },
]

function FooterColumn({
  title,
  links,
  navigate,
}: {
  title: string
  links: FooterLink[]
  navigate: ReturnType<typeof useNavigate>
}) {
  return (
    <div>
      <h4>{title}</h4>
      {links.map(link => (
        <button key={link.label} className="footer-link" onClick={() => navigate(pagePaths[link.page])}>
          {link.label}
        </button>
      ))}
    </div>
  )
}

export function SiteFooter() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [brief, setBrief] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  // toast 自动消失
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 3000)
    return () => window.clearTimeout(timer)
  }, [toast])

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      setToast('请填写姓名和联系电话后再提交')
      return
    }
    // 后端接口待接入；当前为原型提示
    setToast('已收到您的需求，专业医学顾问将在 24 小时内联系您')
    setName('')
    setPhone('')
    setBrief('')
  }

  return (
    <>
      <section className="consult-banner">
        <img className="consult-bg" src={consultBg} alt="" />
        <div className="consult-heading">
          <h2><span>免费获取全球就医</span><span>评估方案</span></h2>
          <p>专业医学顾问将在24小时内联系您</p>
        </div>
        <div className="consult-fields-row">
          <input value={name} onChange={event => setName(event.target.value)} placeholder="您的姓名" aria-label="您的姓名" />
          <input value={phone} onChange={event => setPhone(event.target.value)} placeholder="联系电话" aria-label="联系电话" inputMode="tel" />
        </div>
        <textarea className="consult-brief" value={brief} onChange={event => setBrief(event.target.value)} placeholder="病情简述" aria-label="病情简述" />
        <button className="consult-submit" type="button" onClick={handleSubmit}>立即提交</button>
      </section>
      <footer className="footer">
        <div className="footer-inner">
          <div><img src={logo} className="footer-logo" alt="" /></div>
          <div><h4>联系我们</h4><p className="phone">◉ + 86 400-1010-501</p></div>
          <FooterColumn title="我们的服务" links={SERVICE_LINKS} navigate={navigate} />
          <FooterColumn title="有用信息" links={INFO_LINKS} navigate={navigate} />
          <FooterColumn title="全球医院" links={HOSPITAL_LINKS} navigate={navigate} />
          <FooterColumn title="健康图书馆" links={LIBRARY_LINKS} navigate={navigate} />
        </div>
        <div className="copyright">© All Rights Reserved to the IM Medical International Consulting | Developed by Lemon-MSS</div>
      </footer>
      {toast && <Toast message={toast} variant={toast.startsWith('请') ? 'error' : 'success'} />}
    </>
  )
}
