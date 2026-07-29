import { Icon } from "@/components/ui/Icon";

export function Commitment() {
  return (
    <section className="section section-commitment" id="cam-ket">
      <div className="container commitment-card"><div className="commitment-mark"><Icon name="shield" /></div><div className="commitment-content"><p className="section-label">Cam kết</p><h2>Cam kết từ <span>Bruhhh Cloud</span></h2><p>Bruhhh Cloud cam kết cung cấp sản phẩm đạt chất lượng tốt và chính sách bảo hành rõ ràng trong phạm vi điều khoản dịch vụ.</p><div className="commitment-points"><div><Icon name="circle-check" /><span>Sản phẩm đạt chất lượng tốt</span></div><div><Icon name="circle-check" /><span>Có bảo hành</span></div></div></div><div className="commitment-aside"><span>Rõ ràng từ đầu</span><strong>Không hứa<br />điều không thể.</strong></div></div>
    </section>
  );
}
