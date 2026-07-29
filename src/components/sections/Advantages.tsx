import { Icon } from "@/components/ui/Icon";

const advantages = [
  ["activity", "Hiệu năng ổn định", "VPS được tối ưu để duy trì hoạt động ổn định trong quá trình sử dụng."],
  ["spark", "Giá cả hợp lý", "Các gói VPS có cấu hình rõ ràng và mức giá dễ tiếp cận."],
  ["rocket", "Kích hoạt nhanh", "Quy trình mua VPS đơn giản, hạn chế các bước không cần thiết."],
  ["headphones", "Hỗ trợ khách hàng", "Khách hàng được hỗ trợ khi gặp vấn đề trong quá trình sử dụng dịch vụ."],
] as const;

export function Advantages() {
  return (
    <section className="section section-advantages" id="uu-diem">
      <div className="container advantages-layout"><div className="advantages-intro"><p className="section-label">Vì sao Bruhhh?</p><h2>Tại sao chọn<br /><span>Bruhhh Cloud?</span></h2><p>Chúng tôi giữ mọi thứ đơn giản: cấu hình rõ ràng, giá dễ hiểu và hỗ trợ khi bạn cần.</p><a className="text-link" href="#cam-ket">Xem cam kết <Icon name="arrow-right" /></a></div><div className="advantages-list">{advantages.map(([icon, title, description], index) => <article className="advantage-row" key={title}><span className="advantage-number">0{index + 1}</span><span className="advantage-icon"><Icon name={icon === "activity" ? "workflow" : icon} /></span><div><h3>{title}</h3><p>{description}</p></div><Icon name="arrow-up-right" /></article>)}</div></div>
    </section>
  );
}
