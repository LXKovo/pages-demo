export type Page =
  | 'home'
  | 'overseas'
  | 'services'
  | 'doctors'
  | 'hospitals'
  | 'diseases'
  | 'cases'
  | 'about'
  | 'search'
  | 'planner'
  | 'appointment'
  | 'patientJourney'
  | 'imdoc'

export const pagePaths: Record<Page, string> = {
  home: '/',
  overseas: '/overseas-care',
  services: '/services',
  doctors: '/doctors',
  hospitals: '/hospitals',
  diseases: '/diseases',
  cases: '/cases',
  about: '/about',
  search: '/search',
  planner: '/planner',
  appointment: '/appointment',
  patientJourney: '/patient-journey',
  imdoc: '/imdoc',
}

export function getPageFromPath(pathname: string): Page {
  const matched = (Object.entries(pagePaths) as Array<[Page, string]>)
    .find(([, path]) => path !== '/' && pathname.startsWith(path))

  return matched?.[0] ?? 'home'
}
