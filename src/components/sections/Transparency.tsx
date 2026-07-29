import { Icon } from "@/components/ui/Icon";

const commitments = [
  "Không quảng cáo sai cấu hình.",
  "Không cam kết số người chơi Minecraft khi chưa benchmark.",
  "Thông báo trước khi thay đổi cấu hình hoặc giá nếu điều kiện cho phép.",
  "Hỗ trợ kiểm tra lỗi đúng theo chính sách đã công bố.",
  "Khách được xem đầy đủ điều khoản trước khi thanh toán.",
];

export function Transparency() {
  return (
    <section className="section section-transparency" id="minh-bach">
      <div className="container transparency-layout"><div><p className="section-label">Rõ ràng trước khi mua</p><h2>Cam kết <span>minh bạch</span></h2><p>Thông tin chưa có dữ liệu xác nhận được ghi rõ là “Chưa công bố”, không thay bằng cam kết chung chung.</p></div><ul>{commitments.map((commitment) => <li key={commitment}><Icon name="circle-check" /><span>{commitment}</span></li>)}</ul></div>
    </section>
  );
}
