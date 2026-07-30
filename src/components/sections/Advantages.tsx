import { Icon } from "@/components/ui/Icon";

const reasons = [
  "Cấu hình được công khai trước khi mua.",
  "Không quảng cáo số người chơi khi chưa benchmark.",
  "Hỗ trợ kiểm tra lỗi theo chính sách.",
  "Thông báo rõ giới hạn CPU, mạng và tài nguyên.",
];

export function Advantages() {
  return <section className="section section-advantages" id="uu-diem"><div className="container advantages-compact"><div><p className="section-label">Thông tin có thể kiểm chứng</p><h2>Vì sao chọn <span>DiabloNode?</span></h2></div><ul>{reasons.map((reason) => <li key={reason}><Icon name="circle-check" /><span>{reason}</span></li>)}</ul></div></section>;
}
