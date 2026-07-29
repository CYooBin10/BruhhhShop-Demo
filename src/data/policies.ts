import { businessConfig, configuredValue, unknownValue } from "@/config/business";
import { policyLinks, type PolicySlug } from "@/config/policies";
import { siteConfig } from "@/config/site";
import type { PolicyData } from "@/types/site";

const siteConfigContactEmail = siteConfig.contact.email;
const paymentMethods = businessConfig.paymentMethods.length > 0 ? businessConfig.paymentMethods.join(", ") : unknownValue;
const refundWindow = businessConfig.refundWindowHours === null ? unknownValue : `${businessConfig.refundWindowHours} giờ đầu`;

export const policies: Record<PolicySlug, PolicyData> = {
  "dieu-khoan-dich-vu": {
    slug: "dieu-khoan-dich-vu",
    title: "Điều khoản dịch vụ",
    description: "Quy định sử dụng dịch vụ Bruhhh Cloud và trách nhiệm của khách hàng.",
    sections: [
      { id: "thong-tin-khach-hang", title: "Thông tin khách hàng", paragraphs: ["Khách hàng phải cung cấp thông tin liên hệ chính xác và cập nhật khi có thay đổi. Bruhhh Cloud có thể cần thông tin này để xác nhận đơn hàng, hỗ trợ kỹ thuật hoặc gửi thông báo dịch vụ."] },
      { id: "hanh-vi-bi-cam", title: "Hành vi bị cấm", paragraphs: ["Không được sử dụng VPS để thực hiện hoặc hỗ trợ DDoS, spam, phishing, phát tán malware, botnet, scan trái phép, xâm nhập trái phép hoặc bất kỳ hành vi nào vi phạm pháp luật."] },
      { id: "su-dung-tai-nguyen", title: "Sử dụng tài nguyên", paragraphs: ["Không được cố tình làm quá tải CPU, RAM, ổ đĩa hoặc mạng trong thời gian dài gây ảnh hưởng đến hệ thống hoặc người dùng khác. Các giới hạn cụ thể được nêu tại Quy định sử dụng tài nguyên."] },
      { id: "tam-khoa-dich-vu", title: "Tạm khóa dịch vụ", paragraphs: ["Bruhhh Cloud có quyền tạm khóa hoặc giới hạn dịch vụ khi phát hiện hành vi nguy hiểm, hành vi vi phạm điều khoản hoặc rủi ro ảnh hưởng đến hạ tầng. Khi điều kiện cho phép, chúng tôi sẽ thông báo và hướng dẫn xử lý."] },
      { id: "du-lieu-va-sao-luu", title: "Dữ liệu và sao lưu", paragraphs: [`Khách hàng chịu trách nhiệm sao lưu dữ liệu. Dữ liệu có thể mất nếu VPS bị cài lại, hết hạn hoặc bị khóa do vi phạm điều khoản. Chính sách backup hiện tại: ${businessConfig.infrastructure.backupPolicy}.`] },
      { id: "bao-tri", title: "Bảo trì và thay đổi dịch vụ", paragraphs: ["Bruhhh Cloud sẽ cố gắng thông báo trước khi bảo trì nếu điều kiện cho phép. Nội dung điều khoản có thể được cập nhật; ngày cập nhật gần nhất được hiển thị ở đầu trang."] },
      { id: "cap-nhat-dieu-khoan", title: "Cập nhật điều khoản", paragraphs: ["Việc tiếp tục sử dụng dịch vụ sau khi điều khoản được cập nhật được hiểu là khách hàng đã có cơ hội xem nội dung mới. Nếu không đồng ý, khách hàng cần liên hệ trước khi tiếp tục sử dụng."] },
    ],
  },
  "bao-hanh-hoan-tien": {
    slug: "bao-hanh-hoan-tien",
    title: "Chính sách bảo hành và hoàn tiền",
    description: "Phạm vi hỗ trợ, điều kiện bảo hành và nguyên tắc xem xét hoàn tiền VPS.",
    sections: [
      { id: "pham-vi-bao-hanh", title: "Phạm vi bảo hành", paragraphs: ["Khi VPS lỗi do hệ thống nhà cung cấp, Bruhhh Cloud sẽ hỗ trợ kiểm tra và áp dụng phương án phù hợp theo tình trạng: sửa lỗi, đổi VPS hoặc cộng thêm thời gian sử dụng.", `Thời gian phản hồi dự kiến: ${configuredValue(businessConfig.warrantyResponseTime)}. Thời gian xử lý tối đa dự kiến: ${configuredValue(businessConfig.maxResolutionTime)}.`] },
      { id: "loi-ha-tang", title: "Mất kết nối do hạ tầng", paragraphs: ["Khi mất kết nối được xác định có nguyên nhân từ hạ tầng, Bruhhh Cloud sẽ kiểm tra và khắc phục sớm nhất có thể trong phạm vi kiểm soát của hệ thống."] },
      { id: "truong-hop-khong-bao-hanh", title: "Trường hợp không thuộc bảo hành", items: ["Khách hàng tự xóa dữ liệu hoặc tự cài lại hệ điều hành.", "Cài đặt sai hệ điều hành hoặc thay đổi cấu hình gây lỗi.", "Làm lộ mật khẩu, thông tin truy cập hoặc để bên thứ ba chiếm quyền sử dụng.", "Sử dụng dịch vụ trái với Điều khoản dịch vụ hoặc Quy định sử dụng tài nguyên."] },
      { id: "dieu-kien-hoan-tien", title: "Điều kiện hoàn tiền", paragraphs: [`Không hoàn tiền vô điều kiện. Khoảng thời gian tiếp nhận yêu cầu cấu hình: ${refundWindow}. Chỉ xem xét hoàn tiền nếu lỗi thuộc phía nhà cung cấp và không thể khắc phục trong thời gian hợp lý. Khách đã sử dụng VPS bình thường nhưng đổi ý sẽ không được hoàn tiền.`] },
      { id: "phi-va-ho-so", title: "Phí và hồ sơ yêu cầu", paragraphs: ["Phí thanh toán hoặc phí trung gian có thể không được hoàn. Mọi yêu cầu phải có mã đơn hàng và bằng chứng lỗi đủ để kiểm tra."] },
    ],
  },
  "quyen-rieng-tu": {
    slug: "quyen-rieng-tu",
    title: "Chính sách quyền riêng tư",
    description: "Cách Bruhhh Cloud thu thập, sử dụng và tiếp nhận yêu cầu liên quan đến thông tin cá nhân.",
    sections: [
      { id: "thong-tin-thu-thap", title: "Thông tin có thể thu thập", items: ["Họ và tên, email, số điện thoại và Discord.", "Thông tin đơn hàng, gói VPS và lịch sử hỗ trợ.", "Nội dung trao đổi cần thiết để xác nhận đơn hàng hoặc xử lý lỗi."] },
      { id: "muc-dich-su-dung", title: "Mục đích sử dụng", paragraphs: ["Thông tin được sử dụng để xử lý đơn hàng, hỗ trợ kỹ thuật, chống gian lận và gửi thông báo liên quan đến dịch vụ."] },
      { id: "chia-se-thong-tin", title: "Chia sẻ thông tin", paragraphs: ["Bruhhh Cloud không bán dữ liệu khách hàng. Thông tin không được công khai trừ khi có yêu cầu pháp lý hợp lệ hoặc khách hàng chủ động yêu cầu chia sẻ để xử lý dịch vụ."] },
      { id: "thoi-gian-luu-tru", title: "Thời gian lưu trữ", paragraphs: ["Chỉ lưu dữ liệu trong thời gian cần thiết cho mục đích xử lý đơn hàng, hỗ trợ, đối soát hoặc đáp ứng nghĩa vụ pháp lý phù hợp."] },
      { id: "yeu-cau-cua-khach-hang", title: "Yêu cầu sửa hoặc xóa thông tin", paragraphs: [`Khách hàng có thể gửi yêu cầu sửa hoặc xóa thông tin cá nhân qua email ${siteConfigContactEmail}. Yêu cầu cần nêu rõ thông tin cần xử lý để Bruhhh Cloud xác minh và phản hồi.`] },
      { id: "bao-mat-thong-tin", title: "Bảo mật thông tin", paragraphs: ["Bruhhh Cloud áp dụng các biện pháp phù hợp trong phạm vi hệ thống hiện có để hạn chế truy cập trái phép. Không đưa ra tuyên bố về mã hóa hoặc tiêu chuẩn bảo mật nếu hệ thống chưa xác nhận được."] },
    ],
  },
  "thanh-toan-ban-giao": {
    slug: "thanh-toan-ban-giao",
    title: "Chính sách thanh toán và bàn giao VPS",
    description: "Quy trình xác nhận thanh toán, bàn giao thông tin VPS và lưu ý an toàn.",
    sections: [
      { id: "phuong-thuc-thanh-toan", title: "Phương thức thanh toán", paragraphs: [`Phương thức thanh toán được hỗ trợ hiện tại: ${paymentMethods}. Vui lòng liên hệ qua Discord hoặc Facebook để nhận thông tin thanh toán chính xác trước khi chuyển khoản.`] },
      { id: "kiem-tra-noi-dung", title: "Kiểm tra trước khi thanh toán", paragraphs: ["Khách phải kiểm tra đúng nội dung chuyển khoản, số tiền và thông tin nhận thanh toán được quản trị viên xác nhận. Không tự chuyển vào thông tin cũ hoặc thông tin không được xác nhận cho đơn hàng hiện tại."] },
      { id: "thoi-gian-ban-giao", title: "Thời gian bàn giao", paragraphs: [`VPS được bàn giao sau khi Bruhhh Cloud xác nhận thanh toán. Thời gian bàn giao dự kiến: ${configuredValue(businessConfig.deliveryTime)}.`] },
      { id: "kenh-ban-giao", title: "Kênh gửi thông tin VPS", paragraphs: ["Thông tin VPS chỉ được gửi qua kênh liên hệ đã xác nhận với khách hàng. Nếu nhận được thông tin bất thường, hãy dừng trao đổi và liên hệ lại qua kênh chính thức."] },
      { id: "sau-khi-nhan-vps", title: "Sau khi nhận VPS", paragraphs: ["Khách phải đổi mật khẩu ngay sau khi nhận VPS và tự quản lý thông tin truy cập. Không chia sẻ mật khẩu hoặc thông tin truy cập trong kênh công khai."] },
      { id: "thanh-toan-sai", title: "Thanh toán sai hoặc thiếu", paragraphs: ["Thanh toán nhầm nội dung, sai tài khoản hoặc thiếu tiền có thể khiến đơn hàng xử lý chậm. Vui lòng gửi mã đơn hàng và bằng chứng giao dịch để được kiểm tra."] },
      { id: "thong-tin-nhay-cam", title: "Thông tin không được yêu cầu", paragraphs: ["Bruhhh Cloud không yêu cầu khách gửi mật khẩu ngân hàng, mã OTP, mã PIN hoặc thông tin nhạy cảm không cần thiết cho việc xác nhận đơn hàng."] },
    ],
  },
  "su-dung-tai-nguyen": {
    slug: "su-dung-tai-nguyen",
    title: "Quy định sử dụng tài nguyên",
    description: "Thông tin công khai và nguyên tắc fair use khi sử dụng tài nguyên VPS.",
    sections: [
      { id: "cpu-va-vcpu", title: "CPU và vCPU", paragraphs: [`CPU model: ${businessConfig.infrastructure.cpuModel}. Loại vCPU: ${businessConfig.infrastructure.vcpuType}. Khi cấu hình chưa được công bố là shared hay dedicated, khách hàng không nên hiểu đó là tài nguyên dedicated.`] },
      { id: "gioi-han-cpu", title: "Sử dụng CPU liên tục", paragraphs: ["CPU có thể bị giới hạn khi sử dụng 100% liên tục trong thời gian dài và gây ảnh hưởng đến hệ thống hoặc người dùng khác. Việc giới hạn được xem xét theo tình trạng thực tế và chính sách fair use."] },
      { id: "ram-va-luu-tru", title: "RAM và lưu trữ", paragraphs: [`Dung lượng RAM theo từng gói được hiển thị tại Bảng giá. Ổ đĩa hiện công bố: 120 GB NVMe. Chính sách fair use: ${businessConfig.infrastructure.fairUsePolicy}.`] },
      { id: "cong-mang-va-traffic", title: "Cổng mạng và traffic", paragraphs: [`Cổng mạng: ${businessConfig.infrastructure.portSpeed}. Đây là tốc độ cổng mạng tối đa, không phải cam kết băng thông thực tế cho mọi thời điểm. Giới hạn traffic hàng tháng: ${businessConfig.infrastructure.monthlyTraffic}.`] },
      { id: "quy-dinh-su-dung", title: "Quy định fair use", items: ["Không chạy benchmark hoặc stress test kéo dài nếu gây ảnh hưởng hệ thống.", "Không tạo lưu lượng bất thường, scan trái phép, spam hoặc hành vi làm ảnh hưởng người dùng khác.", "Không sử dụng tài nguyên để thực hiện hành vi bị cấm trong Điều khoản dịch vụ."] },
      { id: "thong-tin-chua-cong-bo", title: "Thông tin chưa công bố", paragraphs: [`Datacenter: ${businessConfig.infrastructure.datacenter}. Chống DDoS: ${businessConfig.infrastructure.ddosProtection}. Hệ điều hành hỗ trợ: ${businessConfig.infrastructure.supportedOperatingSystems}. Các thông tin này sẽ chỉ được cập nhật khi có dữ liệu xác nhận.`] },
      { id: "minecraft", title: "Server Minecraft", paragraphs: ["Bruhhh Cloud không cam kết số lượng người chơi Minecraft khi chưa có kết quả benchmark phù hợp với phiên bản, mod, plugin và cách cấu hình thực tế."] },
    ],
  },
};

export function getPolicy(slug: string) {
  return policyLinks.some((policy) => policy.slug === slug) ? policies[slug as PolicySlug] : undefined;
}
