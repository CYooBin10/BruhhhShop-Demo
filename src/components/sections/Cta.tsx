import { Icon } from "@/components/ui/Icon";

type CtaProps = {
  onOrder: () => void;
};

export function Cta({ onOrder }: CtaProps) {
  return (
    <section className="section section-cta" id="lien-he"><div className="container cta-card"><div><p className="section-label">Sẵn sàng triển khai?</p><h2>Sẵn sàng khởi động <span>dự án của bạn?</span></h2><p>Chọn gói Bruh VPS phù hợp và bắt đầu triển khai dự án ngay hôm nay.</p></div><div className="cta-actions"><a className="button button-light" href="#bang-gia">Xem bảng giá <Icon name="arrow-right" /></a><button className="button button-outline-light" type="button" onClick={onOrder}>Liên hệ hỗ trợ <Icon name="arrow-up-right" /></button></div></div></section>
  );
}
