import { useNavigate } from 'react-router-dom'
import design from '../assets/lanhu/disease-treatment/design.png'
import { pagePaths, type Page } from '../types/routes'

const navigationZones: Array<{ page: Page; label: string; left: number; top: number; width: number; height: number }> = [
  { page: 'doctors', label: '找医生', left: 0, top: 0, width: 480, height: 40 },
  { page: 'hospitals', label: '找医院', left: 480, top: 0, width: 480, height: 40 },
  { page: 'planner', label: '寻找治疗方法', left: 960, top: 0, width: 480, height: 40 },
  { page: 'appointment', label: '预约服务', left: 1440, top: 0, width: 480, height: 40 },
  { page: 'home', label: '首页', left: 50, top: 145, width: 100, height: 60 },
  { page: 'overseas', label: '出国就医', left: 250, top: 145, width: 160, height: 60 },
  { page: 'services', label: '我们的服务', left: 485, top: 145, width: 180, height: 60 },
  { page: 'doctors', label: '全球医生', left: 745, top: 145, width: 160, height: 60 },
  { page: 'hospitals', label: '合作医院', left: 985, top: 145, width: 160, height: 60 },
  { page: 'diseases', label: '疾病与治疗', left: 1210, top: 145, width: 190, height: 60 },
  { page: 'cases', label: '服务案例', left: 1470, top: 145, width: 160, height: 60 },
  { page: 'about', label: '关于我们', left: 1700, top: 145, width: 180, height: 60 },
  { page: 'patientJourney', label: '患者流程', left: 1388, top: 67, width: 130, height: 55 },
  { page: 'imdoc', label: 'IMDOC', left: 1530, top: 67, width: 115, height: 55 },
  { page: 'search', label: '搜索', left: 1655, top: 67, width: 105, height: 55 },
]

const contentZones = [
  ['治疗方案', 360, 930, 200, 60],
  ['推荐医院', 560, 930, 200, 60],
  ['权威专家', 760, 930, 200, 60],
  ['治疗药物', 960, 930, 200, 60],
  ['服务案例', 1160, 930, 200, 60],
  ['治疗资讯', 1360, 930, 200, 60],
] as const

const zoneStyle = (left: number, top: number, width: number, height: number) => ({
  left: `${(left / 1920) * 100}%`,
  top: `${(top / 8033) * 100}%`,
  width: `${(width / 1920) * 100}%`,
  height: `${(height / 8033) * 100}%`,
})

export function DiseaseTreatmentPage() {
  const navigate = useNavigate()

  const scrollToDesignY = (top: number) => {
    const canvas = document.getElementById('disease-treatment-canvas')
    if (!canvas) return
    window.scrollTo({ top: canvas.offsetTop + (canvas.clientWidth / 1920) * top, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-white">
      <div
        id="disease-treatment-canvas"
        className="relative mx-auto aspect-[1920/8033] w-[1920px] max-w-full overflow-hidden"
      >
        <img className="absolute inset-0 block size-full select-none" src={design} alt="疾病与治疗" />

        {navigationZones.map(zone => (
          <button
            key={`${zone.label}-${zone.left}`}
            type="button"
            className="absolute z-10 cursor-pointer bg-transparent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[rgba(0,198,174,1)]"
            style={zoneStyle(zone.left, zone.top, zone.width, zone.height)}
            aria-label={zone.label}
            onClick={() => navigate(pagePaths[zone.page])}
          />
        ))}

        {contentZones.map(([label, left, top, width, height], index) => (
          <button
            key={label}
            type="button"
            className="absolute z-10 cursor-pointer bg-transparent focus-visible:outline-2 focus-visible:outline-[rgba(0,198,174,1)]"
            style={zoneStyle(left, top, width, height)}
            aria-label={label}
            onClick={() => scrollToDesignY([1050, 2140, 3130, 4260, 5160, 5900][index])}
          />
        ))}

        <input
          className="absolute z-10 border-0 bg-transparent px-[0.8%] text-[clamp(4.5px,0.9375vw,18px)] text-[rgba(51,51,51,1)] outline-none placeholder:text-transparent"
          style={zoneStyle(240, 7065, 380, 50)}
          aria-label="您的姓名"
          placeholder="您的姓名"
        />
        <input
          className="absolute z-10 border-0 bg-transparent px-[0.8%] text-[clamp(4.5px,0.9375vw,18px)] text-[rgba(51,51,51,1)] outline-none placeholder:text-transparent"
          style={zoneStyle(632, 7065, 380, 50)}
          aria-label="联系电话"
          placeholder="联系电话"
          inputMode="tel"
        />
        <textarea
          className="absolute z-10 resize-none border-0 bg-transparent px-[0.8%] py-[0.5%] text-[clamp(4.5px,0.9375vw,18px)] text-[rgba(51,51,51,1)] outline-none placeholder:text-transparent"
          style={zoneStyle(240, 7135, 772, 80)}
          aria-label="病情简述"
          placeholder="病情简述"
        />
        <button
          type="button"
          className="absolute z-10 cursor-pointer bg-transparent focus-visible:outline-2 focus-visible:outline-[rgba(255,255,255,1)]"
          style={zoneStyle(240, 7251, 260, 60)}
          aria-label="立即提交"
        />
      </div>
    </main>
  )
}
