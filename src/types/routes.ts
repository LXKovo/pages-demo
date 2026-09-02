export type Page =
  | 'home'
  | 'overseas'
  | 'services'
  | 'doctors'
  | 'hospitals'
  | 'diseases'
  | 'diseaseSearch'
  | 'cases'
  | 'about'
  | 'search'
  | 'planner'
  | 'appointment'
  | 'patientJourney'
  | 'imdoc'
  | 'news'
  | 'hospitalNews'
  | 'medicalGuide'
  | 'membership'

export const pagePaths: Record<Page, string> = {
  home: '/',
  overseas: '/overseas-care',
  services: '/services',
  doctors: '/doctors',
  hospitals: '/hospitals',
  diseases: '/diseases',
  diseaseSearch: '/disease-search',
  cases: '/cases',
  about: '/about',
  search: '/search',
  planner: '/planner',
  appointment: '/appointment',
  patientJourney: '/patient-journey',
  imdoc: '/imdoc',
  news: '/news',
  hospitalNews: '/hospital-news',
  medicalGuide: '/medical-guide',
  membership: '/membership',
}

// 主导航中归属同一栏目的子页面 → 映射到主栏目，保证 nav 高亮正确
const PAGE_GROUP: Partial<Record<Page, Page>> = {
  diseaseSearch: 'diseases',
}

export function getPageFromPath(pathname: string): Page {
  const matched = (Object.entries(pagePaths) as Array<[Page, string]>)
    .find(([, path]) => path !== '/' && pathname.startsWith(path))

  return matched ? (PAGE_GROUP[matched[0]] ?? matched[0]) : 'home'
}
