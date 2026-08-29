type DiseaseModalProps = {
  disease: string
  onClose: () => void
}

export function DiseaseModal({ disease, onClose }: DiseaseModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="disease-modal" onClick={event => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-kicker">疾病与治疗</div>
        <h2>{disease}</h2>
        <p>查看 {disease} 的全球治疗指南、权威医院与专家资源。</p>
        <div className="modal-actions"><button>治疗指南</button><button>全球医院</button><button>专家咨询</button></div>
      </div>
    </div>
  )
}
