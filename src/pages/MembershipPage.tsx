import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteHeader } from '../components/layout/SiteHeader'
import { pagePaths } from '../types/routes'
import './MembershipPage.css'

type Tier = {
  name: string
  audience: string
  price: string
  color: 'teal' | 'navy' | 'magenta'
  recommended?: boolean
  core: string[]
  details: string[]
  scene: string
}

type BenefitGroup = { title: string; rows: string[][] }

const tiers: Tier[] = [
  { name: '优享会员', audience: '重视预防的家庭', price: '¥9,800', color: 'teal', core: ['国内三甲绿通 3次/年', '海外第二诊疗意见 2次', '7×12h 健康管家'], details: ['[A 预防] 国内就医绿通 3次 · 年度体检方案', '[B 诊断] 海外第二诊疗意见 2次', '[C 救治] —', '[D 保障] 7×12h 健康管家'], scene: '适合重视健康管理、偶尔需要海外专家第二意见的家庭。' },
  { name: '尊享会员', audience: '有明确海外就医计划', price: '¥32,000', color: 'navy', core: ['含优享全部权益', '日本早癌筛查 1次/年', '海外预约 2次/年'], details: ['[A 预防] 含优享 + 日本早癌筛查 1次', '[B 诊断] 海外预约 2次 · 病历翻译', '[C 救治] 海外就医行程咨询', '[D 保障] 基因检测 · 抗癌风险导航 · 专属顾问'], scene: '适合有明确海外体检或就医计划的个人与家庭。' },
  { name: '尊享会员+', audience: '重症家庭 · 转化主战场', price: '¥68,000', color: 'navy', recommended: true, core: ['含尊享全部权益', '国际转诊全程托管', '远程放疗会诊 · 紧急救援 100万'], details: ['[A 预防] 含尊享全部 + 精密体检不限次', '[B 诊断] MDT 多学科会诊 4次/年', '[C 救治] 国际转诊全程托管（签证/机票/翻译/住宿）', '[D 保障] 远程放疗会诊 · 紧急救援 100万 · 全程救治导航'], scene: '适合重症或复杂病例家庭，需要确定性服务通道。' },
  { name: '至臻会员', audience: '含 3 人家族席位', price: '¥128,000', color: 'magenta', core: ['含尊享+全部权益', '家族席位 含3人', '私人医学顾问 · 新药优先'], details: ['[A 预防] 含尊享+全部 + 家族席位（配偶及子女）', '[B 诊断] 全球 TOP 专家 MDT 优先 · 不限次', '[C 救治] 全球新药 / 临床试验优先入组评估', '[D 保障] 1对1 私人医学顾问 · 救治导航计划'], scene: '适合超高净值家庭或家族办公室级健康管理。' },
]

const benefitGroups: BenefitGroup[] = [
  { title: 'A · 预防与体检', rows: [['国内就医绿通', '3次/年', '不限', '不限', '不限'], ['年度精密体检', '方案', '含', '不限次', '不限次+定制'], ['日本早癌筛查', '—', '1次/年', '2次/年', '不限次'], ['基因检测/抗癌导航', '—', '1次', '年度更新', '不限次']] },
  { title: 'B · 诊断与意见', rows: [['海外第二诊疗意见', '2次', '不限', '不限', '不限'], ['海外TOP医院预约', '2次/年', '4次/年', '不限', '不限'], ['远程会诊', '—', '2次', '4次/年', '不限'], ['MDT 多学科会诊', '—', '—', '4次/年', '优先·不限']] },
  { title: 'C · 救治通道', rows: [['国际转诊', '—', '咨询', '全程托管', '全程+协调'], ['远程放疗方案', '—', '—', '含', '含'], ['签证/机票/住宿托管', '—', '自理', '全程代办', '全程代办'], ['新药/临床试验评估', '—', '—', '—', '优先入组']] },
  { title: 'D · 保障与专属', rows: [['紧急医疗救援', '—', '50万', '100万', '200万'], ['健康管家', '7×12h', '7×24h', '专属顾问', '私人医学顾问'], ['救治导航计划', '—', '—', '含', '含'], ['家庭席位', '—', '—', '配偶+子女', '含3人']] },
]

const journey = ['① 提交病历', '② 48h 匹配专家', '③ 获取方案 / 预约', '④ 签证行程托管', '⑤ 海外就医', '⑥ 回国随访']
const faqs = [
  ['会费是否包含实际诊疗费用？', '会费为年度会员服务费，不含海外医院的诊疗、住院、用药等实际医疗费用；具体以正式会员服务协议为准。'],
  ['“救治导航计划”是什么？', '指预约、转诊、陪诊、随访等资源协调服务，不构成对任何治疗效果的承诺或保证。'],
  ['升级后权益如何计算？', '高一级会员包含低一级全部权益，同项服务以高档位为准；具体按正式协议约定执行。'],
  ['合作医院是否真实可查？', '合作网络和个案可用性以医院最终确认为准，具体信息可向专业顾问咨询。'],
]

export function MembershipPage() {
  const navigate = useNavigate()
  const [openTiers, setOpenTiers] = useState<Set<number>>(new Set([2]))
  const [openFaq, setOpenFaq] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (!modalOpen) return
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setModalOpen(false)
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = '' }
  }, [modalOpen])

  const toggleTier = (index: number) => setOpenTiers(current => {
    const next = new Set(current)
    if (next.has(index)) {
      next.delete(index)
    } else {
      next.add(index)
    }
    return next
  })
  const toggleAll = () => setOpenTiers(openTiers.size === tiers.length ? new Set() : new Set(tiers.map((_, index) => index)))

  return <div className="membership-page">
    <SiteHeader />
    <main>
      <section className="membership-hero">
        <div className="membership-container">
          <p className="membership-eyebrow">MEMBERSHIP SERVICES</p>
          <h1>当疾病跨越国界<br />你的医疗资源 <em>不该有边界</em></h1>
          <p className="membership-lead">一项会员服务 · 连接全球医疗资源 · 提供就医协调支持</p>
          <div className="membership-actions"><button className="membership-primary" onClick={() => navigate(pagePaths.appointment)}>匹配我的方案</button><a className="membership-outline" href="#matrix">查看权益对比</a></div>
          <p className="membership-disclaimer">页面价格、次数及额度均为原型参考信息，不构成正式报价或服务承诺。</p>
        </div>
      </section>

      <section className="membership-trust"><div><strong>320+</strong><span>全球合作医院</span></div><div><strong>28</strong><span>覆盖国家</span></div><div><strong>≤48h</strong><span>顾问响应参考</span></div><div><strong>15年</strong><span>跨境医疗经验</span></div></section>

      <section className="membership-section" id="philosophy"><div className="membership-container"><SectionTitle title="会员哲学 · 从预防到服务支持" subtitle="OUR PHILOSOPHY" /><div className="philosophy-grid">{[['A', '预防', '精密体检 · 早期筛查'], ['B', '诊断', '第二意见 · 远程会诊'], ['C', '救治', '海外转诊 · 全程协调'], ['D', '保障', '救援 · 专属医学顾问']].map(([letter, title, text]) => <div className={`philosophy-card philosophy-${letter}`} key={letter}><b>{letter}</b><strong>{title}</strong><span>{text}</span></div>)}</div><p className="membership-note">高一级会员包含低一级全部权益；同项升级以正式会员协议和实际确认结果为准。</p></div></section>

      <section className="membership-section membership-tiers-section" id="tiers"><div className="membership-container"><SectionTitle title="会员体系 · 选择你的全球医疗通行证" subtitle="MEMBERSHIP TIERS" /><div className="reference-note">原型参考数据：价格、次数、额度和适用条件上线前须以正式会员协议为准。</div><div className="tiers-grid">{tiers.map((tier, index) => { const open = openTiers.has(index); return <article className={`tier-card tier-${tier.color} ${tier.recommended ? 'tier-recommended' : ''}`} key={tier.name}>{tier.recommended && <div className="tier-ribbon">★ 推荐方案</div>}<div className="tier-content"><h3>{tier.name}</h3><p className="tier-audience">{tier.audience}</p><div className="tier-price">{tier.price}<small>/年</small></div><ul>{tier.core.map(item => <li key={item}>{item}</li>)}</ul><button className="tier-toggle" onClick={() => toggleTier(index)} aria-expanded={open}>{open ? '收起详情 ▴' : '查看完整详情 ▾'}</button>{open && <div className="tier-detail"><h4>A → B → C → D 服务内容</h4>{tier.details.map(detail => <p key={detail}>{detail}</p>)}<span>适合：{tier.scene}</span></div>}</div></article>})}</div><button className="expand-all" onClick={toggleAll}>{openTiers.size === tiers.length ? '收起全部档位详情' : '展开全部档位详情'}</button></div></section>

      <section className="membership-section" id="matrix"><div className="membership-container"><SectionTitle title="核心权益对比矩阵 · 一眼看清差异" subtitle="AT A GLANCE" /><p className="matrix-note">矩阵用于横向了解差异；完整服务内容、适用条件及额度以正式协议为准。</p><div className="matrix-scroll"><table className="benefit-matrix"><thead><tr><th>核心权益</th><th>优享<br />¥9,800</th><th>尊享<br />¥32,000</th><th className="matrix-recommended">尊享+<br />¥68,000</th><th>至臻<br />¥128,000</th></tr></thead><tbody>{[['绿通（次/年）', '3', '不限', '不限', '不限'], ['海外预约（次/年）', '2', '4', '不限', '不限'], ['国际转诊', '—', '咨询', '全程托管', '全程托管+协调'], ['紧急救援额度', '—', '50万', '100万', '200万'], ['家庭席位', '—', '—', '配偶+子女', '含3人']].map(row => <tr key={row[0]}>{row.map((cell, index) => <td className={index > 1 && cell !== '—' ? 'matrix-upgrade' : ''} key={cell}>{cell}</td>)}</tr>)}</tbody></table></div><button className="full-benefits" onClick={() => setModalOpen(true)}>查看完整权益清单（含全部 15 项细则）</button></div></section>

      <section className="membership-section membership-journey-section" id="journey"><div className="membership-container"><SectionTitle title="服务旅程 · 关键时刻有人支持" subtitle="YOUR JOURNEY" /><div className="journey-grid">{journey.map(step => <div key={step}>{step}</div>)}</div><p className="membership-note">从首次咨询到后续随访，服务范围和实际可用性以个案确认结果为准。</p></div></section>
      <section className="membership-section membership-family-section" id="family"><div className="membership-container"><SectionTitle title="家庭席位 · 企业 / 家族办公室方案" subtitle="FAMILY & ENTERPRISE" /><div className="family-grid"><div className="family-card"><h3>家庭席位</h3><p>尊享+ 起可按协议配置配偶及未成年子女席位<br />全家共享全球医疗资源协调支持</p></div><div className="family-card family-card-dark"><h3>企业 / 家族办公室</h3><p>高管健康福利 · 家族健康管理<br />专属医学顾问团队 · 定制化年度方案</p><button onClick={() => navigate(pagePaths.appointment)}>预约企业咨询</button></div></div></div></section>
      <section className="membership-section" id="faq"><div className="membership-container membership-faq-container"><SectionTitle title="常见问题" subtitle="FAQ" />{faqs.map(([question, answer], index) => <button className={`faq-item ${openFaq === index ? 'faq-open' : ''}`} key={question} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>Q {question}</span>{openFaq === index && <p>{answer}</p>}</button>)}</div></section>
    </main>
    {modalOpen && <div className="benefits-modal-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && setModalOpen(false)}><div className="benefits-modal" role="dialog" aria-modal="true" aria-labelledby="benefits-title"><button className="modal-close" onClick={() => setModalOpen(false)} aria-label="关闭完整权益清单">×</button><h2 id="benefits-title">完整权益清单（15 项细则）</h2><p className="modal-note">以下内容为原型参考，具体次数、额度和适用条件以正式会员服务协议为准。</p>{benefitGroups.map(group => <div className="benefit-group" key={group.title}><h3>{group.title}</h3><div className="modal-table-scroll"><table><thead><tr><th>权益项</th><th>优享</th><th>尊享</th><th>尊享+</th><th>至臻</th></tr></thead><tbody>{group.rows.map(row => <tr key={row[0]}>{row.map(cell => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></div>)}</div></div>}
    <section className="membership-final-cta" id="membership-cta"><div className="membership-container"><h2>为家人 · 为自己 · 了解全球医疗服务支持</h2><p>会员服务不等同于医疗诊疗，不承诺治疗效果；具体服务内容以协议及顾问确认结果为准。</p><button onClick={() => navigate(pagePaths.appointment)}>预约咨询</button><div className="membership-legal-links"><button onClick={() => navigate(pagePaths.about)}>了解我们</button><button onClick={() => navigate(pagePaths.appointment)}>费用与协议咨询</button><button onClick={() => navigate(pagePaths.appointment)}>隐私与资质咨询</button><button onClick={() => navigate(pagePaths.hospitals)}>合作医院网络</button></div></div></section>
  </div>
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) { return <div className="membership-section-title"><h2>{title}</h2><span>{subtitle}</span></div> }
