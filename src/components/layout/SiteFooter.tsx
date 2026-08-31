import logo from '../../assets/lanhu/logo.png'
import consultBg from '../../assets/lanhu/planner/consult-bg.png'

export function SiteFooter() {
  return (
    <>
      <section className="consult-banner">
        <img className="consult-bg" src={consultBg} alt="" />
        <div className="consult-heading">
          <h2><span>免费获取全球就医</span><span>评估方案</span></h2>
          <p>专业医学顾问将在24小时内联系您</p>
        </div>
        <div className="consult-fields-row">
          <input placeholder="您的姓名" aria-label="您的姓名" />
          <input placeholder="联系电话" aria-label="联系电话" inputMode="tel" />
        </div>
        <textarea className="consult-brief" placeholder="病情简述" aria-label="病情简述" />
        <button className="consult-submit" type="button">立即提交</button>
      </section>
      <footer className="footer">
        <div className="footer-inner">
          <div><img src={logo} className="footer-logo" alt="" /></div>
          <div><h4>联系我们</h4><p className="phone">◉ + 86 400-1010-501</p></div>
          <div><h4>我们的服务</h4><p>全球就医战略咨询<br />国际远程会诊<br />多学科专家远程问诊<br />海外体检<br />日本高级体检<br />基因检测服务</p></div>
          <div><h4>有用信息</h4><p>美国看病<br />日本看病<br />英国看病<br />服务案例<br />常见问题<br />在线预约</p></div>
          <div><h4>全球医院</h4><p>美国医院排名<br />日本医院排名<br />英国医院排名<br />德国医院排名</p></div>
          <div><h4>健康图书馆</h4><p>全球疾病治疗指南<br />癌症百科<br />最新药物<br />全球专家访谈</p></div>
        </div>
        <div className="copyright">© All Rights Reserved to the IM Medical International Consulting | Developed by Lemon-MSS</div>
      </footer>
    </>
  )
}
