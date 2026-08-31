import { useNavigate } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { pagePaths, type Page } from '../types/routes'
import './HomePage.css'

import heroBg from '../assets/lanhu/home/hero-bg.jpg'
import heroArrow from '../assets/lanhu/home/hero-arrow.png'
import moreArrow from '../assets/lanhu/home/more-arrow.png'
import faqArrow from '../assets/lanhu/home/faq-arrow.png'
import coreUsa from '../assets/lanhu/home/core-usa.png'
import doctorAvatar from '../assets/lanhu/home/doctor-avatar.png'
import hospitalBg from '../assets/lanhu/home/hospital-bg.png'
import stat1 from '../assets/lanhu/home/stat-1.png'
import stat2 from '../assets/lanhu/home/stat-2.png'
import stat3 from '../assets/lanhu/home/stat-3.png'
import stat4 from '../assets/lanhu/home/stat-4.png'
import stat5 from '../assets/lanhu/home/stat-5.png'
import stat6 from '../assets/lanhu/home/stat-6.png'
import disease1 from '../assets/lanhu/home/disease-1.png'
import disease2 from '../assets/lanhu/home/disease-2.png'
import disease3 from '../assets/lanhu/home/disease-3.png'
import disease4 from '../assets/lanhu/home/disease-4.png'
import disease5 from '../assets/lanhu/home/disease-5.png'
import disease6 from '../assets/lanhu/home/disease-6.png'
import disease7 from '../assets/lanhu/home/disease-7.png'
import disease8 from '../assets/lanhu/home/disease-8.png'
import case1 from '../assets/lanhu/home/case-1.png'
import case2 from '../assets/lanhu/home/case-2.png'
import case3 from '../assets/lanhu/home/case-3.png'
import case4 from '../assets/lanhu/home/case-4.png'
import news1 from '../assets/lanhu/home/news-1.png'
import news2 from '../assets/lanhu/home/news-2.png'
import news3 from '../assets/lanhu/home/news-3.png'
import news4 from '../assets/lanhu/home/news-4.png'
import process1 from '../assets/lanhu/home/process-1.png'
import process2 from '../assets/lanhu/home/process-2.png'
import process3 from '../assets/lanhu/home/process-3.png'
import process4 from '../assets/lanhu/home/process-4.png'
import process5 from '../assets/lanhu/home/process-5.png'
import process6 from '../assets/lanhu/home/process-6.png'

const heroButtons: Array<{ label: string; page: Page; variant: string }> = [
  { label: '预约咨询', page: 'appointment', variant: 'home-hero-btn-1' },
  { label: '合作医院', page: 'hospitals', variant: 'home-hero-btn-2' },
  { label: '预约海外体检', page: 'services', variant: 'home-hero-btn-3' },
  { label: '第二诊疗意见', page: 'services', variant: 'home-hero-btn-4' },
]

const stats = [
  { num: '6', label: '医院', desc: '艾恩医院和诊所', icon: stat1 },
  { num: '200+', label: '科室', desc: '全球合作医疗网络覆盖科室', icon: stat2 },
  { num: '5,000+', label: '患者', desc: '服务患者家庭', icon: stat3 },
  { num: '12', label: '服务中心', desc: '全球客户服务中心', icon: stat4 },
  { num: '67', label: '专家', desc: '延长人类生命细胞领域顶尖医学专家', icon: stat5 },
  { num: '1,000+', label: '机构', desc: '国际合作医疗机构', icon: stat6 },
]

const serviceTags = ['美国看病', '日本看病', '英国看病', '国际远程会诊', '海外高端体检']

const diseases = [
  { name: '肺癌', icon: disease1, keyword: '肺癌' },
  { name: '结直肠癌', icon: disease2, keyword: '结直肠癌' },
  { name: '胰腺癌', icon: disease3, keyword: '胰腺癌' },
  { name: '脑癌', icon: disease4, keyword: '脑癌' },
  { name: '胃癌', icon: disease5, keyword: '胃癌' },
  { name: '肝癌', icon: disease6, keyword: '肝癌' },
  { name: '淋巴癌', icon: disease7, keyword: '淋巴癌' },
  { name: '更多', icon: disease8, keyword: '' },
]

const DOCTOR_TEMPLATE = {
  name: 'David Berz',
  title: '美国顶尖癌症专家',
  intro: '拥有内科、血液科和癌症肿瘤科三个执照肺癌及脑癌的免...',
  hospital: '美国XXX医院',
}

const doctors = Array.from({ length: 9 }, () => DOCTOR_TEMPLATE)

const hospitals = [
  { name: '皇家马斯登医院', rank: '癌症专科排名:1 (2025年美国医院排名)' },
  { name: '大奥蒙德街儿童医院', rank: '癌症专科排名:1 (2025年美国医院排名)' },
  { name: '皇家布朗普顿医院', rank: '癌症专科排名:1 (2025年美国医院排名)' },
  { name: '皇家国立骨科医院', rank: '癌症专科排名:1 (2025年美国医院排名)' },
  { name: '帝国理工学院医院', rank: '癌症专科排名:1 (2025年美国医院排名)' },
  { name: '英国摩尔菲尔德眼科医院', rank: '癌症专科排名:1 (2025年美国医院排名)' },
]

const cases = [
  {
    title: '肝动脉泵化疗技术助力晚期肠癌肝...',
    age: '年龄：66',
    illness: '病症：晚期结直肠癌肝转移',
    hospital: '就诊医院：纪念斯隆凯特琳癌症中心',
    brief:
      '就诊概述：晚期肠癌肝转移，不意味着治疗走到尽头！66岁的王先生在遭遇术后肝转移快速复发后，借助美国前沿的"肝动脉泵化疗"（HAI）...',
    img: case1,
  },
  {
    title: '肺癌、7厘米肿瘤、虚弱到只能坐...',
    age: '年龄：62',
    illness: '病症： 肺鳞癌',
    hospital: '就诊医院：MD安德森癌症中心',
    brief:
      '就诊概述：62岁的他确诊肺鳞癌。因为肺功能太差，手术和放疗都难以进行，化疗效果也并不理想。病情进展后，他一度虚弱到只能坐轮椅。',
    img: case2,
  },
  {
    title: '她腰疼了14年不清不楚，到美国...',
    age: '年龄：60+',
    illness: '病症：弥漫性特发性骨肥厚',
    hospital: '就诊医院： 妙佑医疗国际(原梅奥诊所)Mayo Clinic',
    brief: '就诊概述：一位60多岁患者的海外就医经历，提醒所有久治不愈、诊断反复的病友：复杂病怕的不是慢，而是走错路。',
    img: case3,
  },
  {
    title: '脑胶质瘤治疗陷入困境？美国哈佛...',
    age: '年龄：35',
    illness: '病症： 胶质瘤',
    hospital: '就诊医院：丹娜法伯癌症研究院',
    brief:
      '就诊概述：脚踝迟迟不好，走路越来越不稳，腿脚也越来越没劲。起初，他以为只是扭伤恢复慢，直到全面检查后才发现，真正的问题不在脚踝，而...',
    img: case4,
  },
]

const news = [
  {
    title: '切完肿瘤后打一针，长效防癌！...',
    excerpt: '艾恩国际关注胰腺癌治疗前沿。一款个性化新抗原癌症疫苗在手术切除肿瘤后使...',
    img: news1,
  },
  {
    title: '美国FDA授予新药PLN-101095联...',
    excerpt: '艾恩国际关注晚期实体瘤治疗新进展。在一项临床试验中，新药PLN-101095联...',
    img: news2,
  },
  {
    title: '晚期肺癌脑转移，又查出三阴性乳...',
    excerpt: '2026年，Alisa Secaida终于迎来了自己的40岁生日。对很多人来说，40岁只...',
    img: news3,
  },
  {
    title: '身体扛不住化疗，Ⅲ期肺癌就只能...',
    excerpt: '肿瘤暂时没有发现远处转移，却因为位置和淋巴结受累无法手术。医生告诉...',
    img: news4,
  },
]

const faqs = [
  {
    q: '去国外看病需要多少钱？',
    a: '费用因病情、国家、医院而异。我们提供免费费用预估服务，并协助申请医院折扣。通常美国复杂手术15-30万美元，日本5-15万美元，英国10-20万美元。',
  },
  { q: '去美国看病需要多少钱？' },
  { q: '去美国看病需要多少钱？' },
  { q: '去美国看病需要多少钱？' },
]

const processes = [
  { title: '咨询申请提交资料', desc: '提交病情信息，开启专属就医评估', icon: process1 },
  { title: '病例翻译匹配专家', desc: '标准化病例转换，精准对接海外医疗资源', icon: process2 },
  { title: '预约专家办理签证', desc: '落实医院排期，办理医疗签证相关事宜', icon: process3 },
  { title: '行程安排行前指导', desc: '一站式规划出行，规避跨境就医各类风险', icon: process4 },
  { title: '海外就医陪同照护', desc: '现场全程照护，让海外就诊更安心', icon: process5 },
  { title: '跟踪随访复查检测', desc: '诊疗结束持续跟进，守护长期健康状态', icon: process6 },
]

export function HomePage() {
  const navigate = useNavigate()

  const goDisease = (keyword: string) => {
    if (!keyword) {
      navigate(pagePaths.diseases)
      return
    }
    navigate(`${pagePaths.diseaseSearch}?q=${encodeURIComponent(keyword)}`)
  }

  return (
    <main className="home-page">
      <SiteHeader />

      {/* Hero */}
      <section className="home-block home-hero">
        <img className="home-hero-bg" src={heroBg} alt="" />
        <h1 className="home-font home-hero-title">跨越国界，寻找生命的另一种可能</h1>
        <p className="home-font home-hero-sub">专注跨境医疗服务&nbsp;&nbsp;&nbsp;&nbsp;|全球顶尖医院官方合作&nbsp;&nbsp;&nbsp;&nbsp;|15年专业积累</p>
        <p className="home-font home-hero-cover">服务覆盖:美国·英国·日本·德国·瑞士·马来西亚</p>
        <div className="home-hero-btns">
          {heroButtons.map(btn => (
            <button
              key={btn.label}
              type="button"
              className={`home-font home-hero-btn ${btn.variant}`}
              onClick={() => navigate(pagePaths[btn.page])}
            >
              {btn.label}
              <img src={heroArrow} alt="" />
            </button>
          ))}
        </div>
      </section>

      {/* 关于我们 + 数据背书 */}
      <section className="home-block home-about-stats">
        <h2 className="home-font home-about-title">
          艾恩国际医疗--全方位海外
          <span className="accent">医疗服务平台</span>
        </h2>
        <p className="home-font home-about-desc">
          艾恩国际医疗是由美国IM7 ALLIANCE GROUP LLC和美国Melyhoinc及中国巨向科技有限公司 共同创办，总部位于洛杉矶。致力于为全球患者提供精准的跨境医疗服务，使他们能够轻松获得全球专业医学专家的诊疗以及先进的治疗方案。 艾恩服务范围涵盖美国、加拿大、中国、英国、德国、泰国、日本、新加坡、菲律宾、哥斯达黎加、墨西哥、印度、马来西亚等国家，已成为行业知名跨境医疗咨询服务公司。
        </p>
        <div className="home-stats">
          {stats.map(stat => (
            <div key={stat.label} className="home-stat">
              <img className="home-stat-icon" src={stat.icon} alt="" />
              <div>
                <div className="home-stat-num">{stat.num}</div>
                <div className="home-stat-label">{stat.label}</div>
                <div className="home-stat-desc">{stat.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 核心服务 */}
      <section className="home-block home-services">
        <h2 className="home-font home-services-title">
          出国就医
          <span className="accent">核心服务</span>
        </h2>
        <p className="home-font home-services-desc">
          链接全球优质医疗资源，搭建跨国多学科诊疗通道。 我们联动海外权威医疗机构与专科专家，提供国际远程会诊、海外就医、高端体检等多元化跨境医疗服务。依托多年行业实践经验，标准化统筹就医全流程，为患者提供可靠、连贯的跨境医疗咨询与落地支持。
        </p>
        <div className="home-services-tags">
          {serviceTags.map((tag, index) => (
            <span key={tag} className={`home-font home-services-tag${index === 0 ? ' active' : ''}`}>
              {tag}
            </span>
          ))}
        </div>
        <div className="home-services-body">
          <img className="home-services-img" src={coreUsa} alt="美国看病" />
          <div className="home-services-text">
            <h3 className="home-font home-services-name">美国看病</h3>
            <p className="home-font home-services-detail">美国是全球医疗高地，是出国就医的主要目的地国家，拥有更多新药、新疗法。</p>
            <button
              type="button"
              className="home-font home-services-more"
              onClick={() => navigate(pagePaths.services)}
            >
              了解更多
              <img src={moreArrow} alt="" />
            </button>
            <div className="home-services-btns">
              <button
                type="button"
                className="home-font home-services-btn home-services-btn-magenta"
                onClick={() => navigate(pagePaths.doctors)}
              >
                美国权威专家
              </button>
              <button
                type="button"
                className="home-font home-services-btn home-services-btn-outline"
                onClick={() => navigate(pagePaths.hospitals)}
              >
                美国合作医院
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 疾病与治疗 */}
      <section className="home-block home-diseases">
        <h2 className="home-font home-diseases-title">
          疾病与
          <span className="accent">治疗</span>
        </h2>
        <div className="home-disease-list">
          {diseases.map(disease => (
            <button
              key={disease.name}
              type="button"
              className="home-disease-item"
              onClick={() => goDisease(disease.keyword)}
            >
              <img className="home-disease-icon" src={disease.icon} alt={disease.name} />
              <span className="home-font home-disease-name">{disease.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 合作医生 */}
      <section className="home-block home-doctors">
        <h2 className="home-font home-doctors-title">
          合作
          <span className="accent">医生</span>
        </h2>
        <p className="home-font home-doctors-sub">
          汇聚美、日、英等多国权威专科医生，搭建跨国专家资源网络，为患者提供国际专业诊疗评估与方案参考
        </p>
        <button
          type="button"
          className="home-font home-doctors-more"
          onClick={() => navigate(pagePaths.doctors)}
        >
          了解更多
          <img src={moreArrow} alt="" />
        </button>
        <div className="home-doctor-grid">
          {doctors.map((doctor, index) => (
            <button
              key={index}
              type="button"
              className="home-doctor-card"
              onClick={() => navigate(pagePaths.doctors)}
            >
              <img className="home-doctor-avatar" src={doctorAvatar} alt={doctor.name} />
              <div className="home-doctor-info">
                <h3 className="home-font home-doctor-name">{doctor.name}</h3>
                <p className="home-font home-doctor-title">{doctor.title}</p>
                <p className="home-font home-doctor-intro">{doctor.intro}</p>
                <p className="home-font home-doctor-hospital">{doctor.hospital}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 合作医院 */}
      <section className="home-block home-hospitals">
        <h2 className="home-font home-hospitals-title">
          出国看病
          <span className="accent">合作医院</span>
        </h2>
        <div className="home-hospitals-tags">
          {['美国医院', '日本医院', '英国医院', '德国医院', '中国医院'].map((tag, index) => (
            <span key={tag} className={`home-font home-hospitals-tag${index === 0 ? ' active' : ''}`}>
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="home-font home-hospitals-more"
          onClick={() => navigate(pagePaths.hospitals)}
        >
          了解更多
          <img src={moreArrow} alt="" />
        </button>
        <div className="home-hospital-grid">
          {hospitals.map(hospital => (
            <button
              key={hospital.name}
              type="button"
              className="home-hospital-card"
              onClick={() => navigate(pagePaths.hospitals)}
            >
              <img className="home-hospital-card-bg" src={hospitalBg} alt="" />
              <span className="home-font home-hospital-name">{hospital.name}</span>
              <span className="home-font home-hospital-rank">{hospital.rank}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 服务案例 */}
      <section className="home-block home-cases">
        <h2 className="home-font home-cases-title">
          出国看病
          <span className="accent">服务案例</span>
        </h2>
        <p className="home-font home-cases-sub">确保每一位患者得到国外适合的就医方案</p>
        <button
          type="button"
          className="home-font home-cases-more"
          onClick={() => navigate(pagePaths.cases)}
        >
          了解更多
          <img src={moreArrow} alt="" />
        </button>
        {[0, 2].map(row => (
          <div key={row} className={`home-case-row ${row === 0 ? 'home-case-row-1' : 'home-case-row-2'}`}>
            {cases.slice(row, row + 2).map(caseItem => (
              <button
                key={caseItem.title}
                type="button"
                className="home-case-card"
                onClick={() => navigate(pagePaths.cases)}
              >
                <img className="home-case-img" src={caseItem.img} alt="" />
                <div className="home-case-info">
                  <h3 className="home-font home-case-name">{caseItem.title}</h3>
                  <div className="home-font home-case-meta">
                    <span>{caseItem.age}</span>
                    <span>{caseItem.illness}</span>
                  </div>
                  <p className="home-font home-case-hospital">{caseItem.hospital}</p>
                  <p className="home-font home-case-brief">{caseItem.brief}</p>
                </div>
              </button>
            ))}
          </div>
        ))}
      </section>

      {/* 资讯与指南 */}
      <section className="home-block home-news">
        <h2 className="home-font home-news-title">
          出国看病
          <span className="accent">资讯与指南</span>
        </h2>
        <button
          type="button"
          className="home-font home-news-more"
          onClick={() => navigate(pagePaths.medicalGuide)}
        >
          了解更多
          <img src={moreArrow} alt="" />
        </button>
        <div className="home-news-grid">
          {news.map(article => (
            <button
              key={article.title}
              type="button"
              className="home-news-card"
              onClick={() => navigate(pagePaths.medicalGuide)}
            >
              <img className="home-news-img" src={article.img} alt="" />
              <div className="home-news-info">
                <h3 className="home-font home-news-name">{article.title}</h3>
                <p className="home-font home-news-excerpt">{article.excerpt}</p>
                <span className="home-font home-news-detail">查看详情</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 常见问题 */}
      <section className="home-block home-faq">
        <h2 className="home-font home-faq-title">
          常见问题
          <span className="accent">解答</span>
        </h2>
        <p className="home-font home-faq-sub">您关心的问题，我们一一解答</p>
        <div className="home-faq-item home-faq-open">
          <h3 className="home-font home-faq-q">{faqs[0].q}</h3>
          <p className="home-font home-faq-a">{faqs[0].a}</p>
        </div>
        {faqs.slice(1).map((faq, index) => (
          <div key={index} className={`home-faq-item home-faq-closed home-faq-closed-${index + 2}`}>
            <h3 className="home-font home-faq-q">{faq.q}</h3>
            <img className="home-faq-arrow" src={faqArrow} alt="" />
          </div>
        ))}
        <button
          type="button"
          className="home-font home-faq-more"
          onClick={() => navigate(pagePaths.about)}
        >
          查看更多
        </button>
      </section>

      {/* 服务流程 */}
      <section className="home-block home-process">
        <h2 className="home-font home-process-title">
          出国看病
          <span className="accent">服务流程</span>
        </h2>
        {[0, 3].map(row => (
          <div key={row} className={`home-process-row ${row === 0 ? 'home-process-row-1' : 'home-process-row-2'}`}>
            {processes.slice(row, row + 3).map(step => (
              <div key={step.title} className="home-process-step">
                <img className="home-process-icon" src={step.icon} alt="" />
                <h3 className="home-font home-process-name">{step.title}</h3>
                <p className="home-font home-process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      <SiteFooter />
    </main>
  )
}
