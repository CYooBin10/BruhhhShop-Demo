import { getRuntimeConfig } from "@/config/runtime";
import { Icon } from "@/components/ui/Icon";

const reasons = [
  "Cấu hình được công khai trước khi mua.",
  "Không quảng cáo số người chơi khi chưa benchmark.",
  "Hỗ trợ kiểm tra lỗi theo chính sách.",
  "Thông báo rõ giới hạn CPU, mạng và tài nguyên.",
];

export async function Advantages() {
  const { site } = await getRuntimeConfig();
  return <section className="section section-advantages" id="uu-diem"><div className="container advantages-compact"><div><p className="section-label">Thông tin có thể kiểm chứng</p><h2>Vì sao chọn <span>{site.name}?</span></h2></div><ul>{reasons.map((reason) => <li key={reason}><Icon name="circle-check" /><span>{reason}</span></li>)}</ul></div></section>;
}
