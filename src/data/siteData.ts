import type { Page } from '../types/routes'

export const hotSearches = ['肿瘤与癌症', '神经系统疾病', '血液与免疫系统疾病', '肺癌', '肝癌', '结直肠癌', '脑瘤', '胰腺癌', '黑色素瘤']

// 热门搜索拆分为「分类 + 疾病」两组（搜索页使用）
export const searchCategories = hotSearches.slice(0, 3)
export const searchDiseases = hotSearches.slice(3)

// 寻找治疗方法页的热门标签（3 行）
export const plannerChips = [
  searchDiseases.slice(0, 3),
  searchDiseases.slice(3),
  ['CAR-T', '癌症免疫疗法', '骨髓移植'],
] as const

export const bodyTabs = ['癌症与肿瘤', '心血管疾病', '神经系统疾病', '血液与免疫疾病', '骨科与运动系统', '儿童专科', '罕见病与综合']

export const bodyDiseases = ['肺癌', '结直肠癌', '乳腺癌', '胃癌', '脑瘤', '肝癌', '肾癌', '胆管癌', '肉瘤', '淋巴瘤', '白血病', '骨髓瘤', '膀胱癌', '宫颈癌', '卵巢癌', '子宫癌', '黑色素瘤', '头颈癌', '鼻咽癌', '口腔癌', '甲状腺癌', '胶质瘤', '视网膜母细胞瘤', '神经母细胞瘤', '视神经胶质瘤', '尤文氏肉瘤', '横纹肌肉瘤', '间皮瘤', '室管膜肿瘤', '骨肉瘤']

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export const navigationItems: Array<{ label: string; page: Page }> = [
  { label: '首页', page: 'home' },
  { label: '出国就医', page: 'overseas' },
  { label: '我们的服务', page: 'services' },
  { label: '全球医生', page: 'doctors' },
  { label: '合作医院', page: 'hospitals' },
  { label: '疾病与治疗', page: 'diseases' },
  { label: '服务案例', page: 'cases' },
  { label: '关于我们', page: 'about' },
  { label: '会员服务', page: 'membership' },
]

export const pendingPageContent: Partial<Record<Page, { title: string; description: string; eyebrow: string }>> = {
  home: { title: '连接全球优质医疗资源', description: '为患者提供从诊疗咨询到海外就医的一站式国际医疗服务。', eyebrow: 'IM MEDICAL INTERNATIONAL' },
  overseas: { title: '出国就医', description: '覆盖评估、医院匹配、病历翻译、预约及行程协调的完整服务流程。', eyebrow: 'OVERSEAS MEDICAL CARE' },
  services: { title: '我们的服务', description: '围绕患者需求提供远程会诊、多学科咨询、健康管理与医学支持。', eyebrow: 'OUR SERVICES' },
  doctors: { title: '全球医生', description: '汇集不同学科领域的国际医学专家，为复杂疾病提供专业意见。', eyebrow: 'GLOBAL SPECIALISTS' },
  hospitals: { title: '合作医院', description: '连接美国、日本、英国、德国等国家和地区的优质医疗机构。', eyebrow: 'PARTNER HOSPITALS' },
  cases: { title: '服务案例', description: '通过真实服务流程呈现国际医疗协作中的专业支持与患者体验。', eyebrow: 'PATIENT STORIES' },
  about: { title: '关于我们', description: '专注国际医疗咨询，以专业、透明和患者为中心连接全球医疗资源。', eyebrow: 'ABOUT IM MEDICAL' },
  appointment: { title: '预约服务', description: '提交基本需求后，专业医学顾问将与您联系并协助制定下一步方案。', eyebrow: 'BOOK A CONSULTATION' },
  patientJourney: { title: '患者流程', description: '了解从首次咨询、医学评估到海外诊疗及后续随访的服务流程。', eyebrow: 'PATIENT JOURNEY' },
  imdoc: { title: 'IMDOC 医疗协作', description: '面向患者与医学顾问的跨境医疗信息协作服务。', eyebrow: 'IMDOC' },
  news: { title: '新闻版块', description: '公司动态、全球专家访谈、多国看病指南、日本体检指南与医学前沿资讯。', eyebrow: 'NEWS & INSIGHTS' },
  hospitalNews: { title: '全球医院动态', description: '来自美国、英国、日本、中国合作医院的最新动态与远程会诊案例。', eyebrow: 'HOSPITAL NEWS' },
  medicalGuide: { title: '海外医疗资讯与指南', description: '美国、英国、日本看病指南，海外体检与全球就医实用信息。', eyebrow: 'MEDICAL GUIDE' },
}

export const plannerGoals = ['寻找治疗方案', '获取第二诊疗意见', '预约远程会诊', '了解临床试验']
export const plannerCountries = ['美国', '日本', '英国', '德国', '新加坡']

export const treatmentResults = [
  ['美国 MD Anderson', '综合治疗 · 专家会诊', '匹配度 96%'],
  ['日本国立癌症中心', '精准治疗 · 临床试验', '匹配度 91%'],
  ['英国皇家马斯登医院', '第二诊疗意见 · 远程', '匹配度 87%'],
] as const
