import { businessConfig, configuredValue, unknownValue } from "@/config/business";
import { policyLinks, type PolicySlug } from "@/config/policies";
import { siteConfig } from "@/config/site";
import type { PolicyData } from "@/types/site";

const paymentMethods = businessConfig.paymentMethods.length > 0 ? businessConfig.paymentMethods.join(", ") : unknownValue;
const refundWindow = businessConfig.refundWindowHours === null ? unknownValue : `${businessConfig.refundWindowHours} giờ đầu`;

export const policies: Record<PolicySlug, PolicyData> = {
  "dieu-khoan-dich-vu": {
    slug: "dieu-khoan-dich-vu",
    title: "Điều khoản dịch vụ",
    description: "Quy định ngắn gọn về thanh toán, sử dụng, gia hạn và trách nhiệm khi dùng VPS.",
    sections: [
      { id: "dat-hang-va-kich-hoat", title: "Đặt hàng và kích hoạt", paragraphs: ["Khách hàng cần cung cấp thông tin liên hệ chính xác để xác nhận đơn hàng và nhận thông tin VPS. VPS được bàn giao sau khi thanh toán được xác nhận theo Chính sách thanh toán và bàn giao VPS."] },
      { id: "thoi-han-va-gia-han", title: "Thời hạn và gia hạn", paragraphs: ["Thời hạn gói được tính theo chu kỳ đã chọn khi đặt hàng. Khách cần chủ động liên hệ gia hạn trước khi hết hạn; nếu không gia hạn, VPS có thể bị ngừng theo quy trình vận hành. Thời điểm ngừng và thời gian lưu dữ liệu sau hết hạn chưa được công bố, cần xác nhận trước khi mua."] },
      { id: "thanh-toan", title: "Thanh toán", paragraphs: [`Phương thức thanh toán hiện công bố: ${paymentMethods}. Chỉ chuyển khoản theo thông tin được quản trị viên xác nhận cho đơn hàng hiện tại. Không gửi mật khẩu ngân hàng, OTP, PIN hoặc thông tin nhạy cảm khác.`] },
      { id: "noi-dung-bi-cam", title: "Nội dung và hành vi bị cấm", items: ["DDoS, flood, spam, phishing, malware, botnet hoặc scan port trái phép.", "Xâm nhập trái phép, phát tán nội dung vi phạm pháp luật hoặc dùng VPS để che giấu hành vi vi phạm.", "Dùng phần mềm crack, công cụ khai thác trái phép hoặc proxy công cộng gây rủi ro cho hạ tầng.", "Cố tình sử dụng CPU, ổ đĩa hoặc mạng vượt fair use kéo dài gây ảnh hưởng node hoặc người dùng khác."] },
      { id: "du-lieu-va-bao-mat", title: "Dữ liệu và thông tin truy cập", paragraphs: ["Khách hàng tự sao lưu dữ liệu quan trọng và tự bảo vệ mật khẩu, khóa SSH, token cùng thông tin truy cập. Việc cài lại VPS, hết hạn dịch vụ hoặc khóa do vi phạm có thể làm mất dữ liệu. DiabloNode không mặc định cam kết backup nếu gói không ghi rõ."] },
      { id: "bao-tri-va-ho-tro", title: "Bảo trì và hỗ trợ", paragraphs: ["Khi điều kiện cho phép, DiabloNode sẽ thông báo trước về bảo trì có ảnh hưởng dịch vụ. Hỗ trợ kỹ thuật tập trung vào lỗi hạ tầng và VPS; lỗi ứng dụng, code hoặc phần mềm bên thứ ba được kiểm tra trong phạm vi có thể nhưng không phải cam kết khắc phục.", `Giờ hỗ trợ: ${businessConfig.supportHours}. Kênh tiếp nhận yêu cầu: ${businessConfig.supportChannel}.`] },
      { id: "thay-doi-gia-va-cau-hinh", title: "Thay đổi giá hoặc cấu hình", paragraphs: ["Nếu cần thay đổi giá hoặc cấu hình của gói đang cung cấp, DiabloNode sẽ cố gắng thông báo trước khi điều kiện cho phép. Khách có quyền xem thông tin cập nhật trước khi tiếp tục gia hạn hoặc thanh toán mới."] },
      { id: "xu-ly-vi-pham", title: "Tạm ngưng, chấm dứt và xử lý vi phạm", paragraphs: ["DiabloNode có thể giới hạn, tạm khóa hoặc chấm dứt VPS khi phát hiện hành vi nguy hiểm hoặc vi phạm điều khoản. Trường hợp ảnh hưởng nghiêm trọng đến hạ tầng có thể được xử lý ngay; các trường hợp khác sẽ được thông báo khi có thể."] },
      { id: "gioi-han-trach-nhiem", title: "Giới hạn trách nhiệm", paragraphs: ["DiabloNode không chịu trách nhiệm cho thiệt hại gián tiếp, mất lợi nhuận, mất dữ liệu do thao tác của khách, lỗi ứng dụng bên thứ ba hoặc sự kiện ngoài phạm vi kiểm soát hợp lý. Quy định này không thay thế trách nhiệm kiểm tra và xử lý lỗi hạ tầng theo chính sách đã công bố."] },
      { id: "cap-nhat-dieu-khoan", title: "Cập nhật điều khoản", paragraphs: ["Điều khoản có thể được cập nhật để phản ánh thay đổi dịch vụ hoặc quy định vận hành. Ngày cập nhật gần nhất luôn hiển thị ở đầu trang."] },
    ],
  },
  "bao-hanh-hoan-tien": {
    slug: "bao-hanh-hoan-tien",
    title: "Chính sách bảo hành và hoàn tiền",
    description: "Phạm vi xử lý lỗi VPS, trách nhiệm dữ liệu và điều kiện xem xét hoàn tiền.",
    sections: [
      { id: "pham-vi-bao-hanh", title: "Phạm vi bảo hành", items: ["VPS không truy cập được do lỗi node hoặc lỗi hạ tầng.", "VPS được cấp sai cấu hình so với đơn hàng đã xác nhận.", "Ổ đĩa, mạng hoặc hệ thống ảo hóa gặp sự cố thuộc phía nhà cung cấp.", "VPS bị gián đoạn ngoài kế hoạch do lỗi kỹ thuật của nhà cung cấp."] },
      { id: "hinh-thuc-xu-ly", title: "Hình thức xử lý", paragraphs: ["Tùy lỗi thực tế, DiabloNode có thể khắc phục trên VPS hiện tại, khởi tạo lại VPS khi cần thiết, chuyển node, đổi VPS tương đương hoặc cộng bù thời gian sử dụng. Hoàn tiền chỉ là một phương án khi lỗi nghiêm trọng thuộc phía nhà cung cấp và không thể khắc phục; không cam kết mọi sự cố đều được hoàn tiền."] },
      { id: "khong-thuoc-bao-hanh", title: "Trường hợp không được bảo hành", items: ["Khách tự xóa file, làm mất dữ liệu, cài sai hệ điều hành hoặc cấu hình sai.", "Lộ mật khẩu, khóa SSH hoặc thông tin đăng nhập.", "VPS bị tấn công do ứng dụng của khách có lỗ hổng.", "Dùng phần mềm crack, malware, botnet hoặc công cụ vi phạm.", "DDoS, spam, scan port trái phép hoặc khai thác tài nguyên.", "Dùng CPU, ổ đĩa hoặc mạng vượt fair use kéo dài.", "VPS hết hạn nhưng khách chưa gia hạn.", "Lỗi từ phần mềm bên thứ ba ngoài quyền kiểm soát của nhà cung cấp."] },
      { id: "chinh-sach-du-lieu", title: "Chính sách dữ liệu", paragraphs: [`Khách hàng chịu trách nhiệm sao lưu dữ liệu quan trọng. DiabloNode không mặc định cam kết có backup nếu gói không ghi rõ. Việc cài lại VPS có thể xóa toàn bộ dữ liệu; nhà cung cấp không chịu trách nhiệm với dữ liệu mất do thao tác của khách. Chính sách backup hiện tại: ${businessConfig.infrastructure.backupPolicy}. Nếu có backup, chu kỳ, thời gian lưu và khả năng khôi phục phải được công bố riêng.`] },
      { id: "dieu-kien-hoan-tien", title: "Điều kiện hoàn tiền", items: [`Yêu cầu phải gửi trong thời hạn: ${refundWindow}.`, "Khách cần cung cấp mã đơn hàng và mô tả lỗi để kiểm tra.", "DiabloNode có quyền kiểm tra VPS trước khi quyết định.", "Chỉ hoàn khi lỗi thuộc nhà cung cấp và không thể khắc phục trong thời gian hợp lý.", "Không hoàn tiền vì đổi ý, không còn nhu cầu hoặc chọn sai gói.", "Không hoàn tiền cho tài khoản vi phạm điều khoản.", "Phí trung gian thanh toán có thể không được hoàn.", "Khoản hoàn chỉ được trả về đúng người hoặc phương thức đã thanh toán khi có thể xác minh."] },
      { id: "thoi-gian-xu-ly", title: "Thời gian xử lý", paragraphs: [`Phản hồi ban đầu: ${configuredValue(businessConfig.warrantyResponseTime)}. Kiểm tra kỹ thuật: ${configuredValue(businessConfig.technicalInspectionTime)}. Thời gian xử lý lỗi tối đa dự kiến: ${configuredValue(businessConfig.maxResolutionTime)}. Thời gian xử lý hoàn tiền: ${configuredValue(businessConfig.refundProcessingTime)}. Kênh gửi yêu cầu: ${businessConfig.supportChannel}.`] },
    ],
  },
  "quyen-rieng-tu": {
    slug: "quyen-rieng-tu",
    title: "Chính sách quyền riêng tư",
    description: "Cách DiabloNode thu thập, sử dụng và tiếp nhận yêu cầu liên quan đến thông tin cá nhân.",
    sections: [
      { id: "thong-tin-thu-thap", title: "Thông tin có thể thu thập", items: ["Họ và tên, email, số điện thoại và Discord.", "Thông tin đơn hàng, gói VPS và lịch sử hỗ trợ.", "Nội dung trao đổi cần thiết để xác nhận đơn hàng hoặc xử lý lỗi."] },
      { id: "muc-dich-su-dung", title: "Mục đích sử dụng", paragraphs: ["Thông tin được sử dụng để xử lý đơn hàng, hỗ trợ kỹ thuật, chống gian lận và gửi thông báo liên quan đến dịch vụ."] },
      { id: "chia-se-thong-tin", title: "Chia sẻ thông tin", paragraphs: ["DiabloNode không bán dữ liệu khách hàng. Thông tin không được công khai trừ khi có yêu cầu pháp lý hợp lệ hoặc khách hàng chủ động yêu cầu chia sẻ để xử lý dịch vụ."] },
      { id: "thoi-gian-luu-tru", title: "Thời gian lưu trữ", paragraphs: ["Chỉ lưu dữ liệu trong thời gian cần thiết cho mục đích xử lý đơn hàng, hỗ trợ, đối soát hoặc đáp ứng nghĩa vụ pháp lý phù hợp."] },
      { id: "yeu-cau-cua-khach-hang", title: "Yêu cầu sửa hoặc xóa thông tin", paragraphs: [`Khách hàng có thể gửi yêu cầu sửa hoặc xóa thông tin cá nhân qua email ${siteConfig.contact.email}. Yêu cầu cần nêu rõ thông tin cần xử lý để DiabloNode xác minh và phản hồi.`] },
      { id: "bao-mat-thong-tin", title: "Bảo mật thông tin", paragraphs: ["DiabloNode áp dụng các biện pháp phù hợp trong phạm vi hệ thống hiện có để hạn chế truy cập trái phép. Không đưa ra tuyên bố về mã hóa hoặc tiêu chuẩn bảo mật nếu hệ thống chưa xác nhận được."] },
    ],
  },
  "thanh-toan-ban-giao": {
    slug: "thanh-toan-ban-giao",
    title: "Chính sách thanh toán và bàn giao VPS",
    description: "Quy trình xác nhận thanh toán, bàn giao thông tin VPS và lưu ý an toàn.",
    sections: [
      { id: "phuong-thuc-thanh-toan", title: "Phương thức thanh toán", paragraphs: [`Phương thức thanh toán được hỗ trợ hiện tại: ${paymentMethods}. Vui lòng liên hệ qua Discord hoặc Facebook để nhận thông tin thanh toán chính xác trước khi chuyển khoản.`] },
      { id: "kiem-tra-noi-dung", title: "Kiểm tra trước khi thanh toán", paragraphs: ["Khách phải kiểm tra đúng nội dung chuyển khoản, số tiền và thông tin nhận thanh toán được quản trị viên xác nhận. Không tự chuyển vào thông tin cũ hoặc thông tin không được xác nhận cho đơn hàng hiện tại."] },
      { id: "thoi-gian-ban-giao", title: "Thời gian bàn giao", paragraphs: [`VPS được bàn giao sau khi DiabloNode xác nhận thanh toán. Thời gian bàn giao dự kiến: ${configuredValue(businessConfig.deliveryTime)}.`] },
      { id: "kenh-ban-giao", title: "Kênh gửi thông tin VPS", paragraphs: ["Thông tin VPS chỉ được gửi qua kênh liên hệ đã xác nhận với khách hàng. Nếu nhận được thông tin bất thường, hãy dừng trao đổi và liên hệ lại qua kênh chính thức."] },
      { id: "sau-khi-nhan-vps", title: "Sau khi nhận VPS", paragraphs: ["Khách phải đổi mật khẩu ngay sau khi nhận VPS và tự quản lý thông tin truy cập. Không chia sẻ mật khẩu hoặc thông tin truy cập trong kênh công khai."] },
      { id: "thanh-toan-sai", title: "Thanh toán sai hoặc thiếu", paragraphs: ["Thanh toán nhầm nội dung, sai tài khoản hoặc thiếu tiền có thể khiến đơn hàng xử lý chậm. Vui lòng gửi mã đơn hàng và bằng chứng giao dịch để được kiểm tra."] },
      { id: "thong-tin-nhay-cam", title: "Thông tin không được yêu cầu", paragraphs: ["DiabloNode không yêu cầu khách gửi mật khẩu ngân hàng, mã OTP, mã PIN hoặc thông tin nhạy cảm không cần thiết cho việc xác nhận đơn hàng."] },
    ],
  },
  "su-dung-tai-nguyen": {
    slug: "su-dung-tai-nguyen",
    title: "Quy định sử dụng tài nguyên",
    description: "Cách hiểu đúng về vCPU, RAM, NVMe, cổng mạng và fair use của VPS.",
    sections: [
      { id: "cpu-va-vcpu", title: "CPU và vCPU", paragraphs: [`CPU model: ${businessConfig.infrastructure.cpuModel}. Loại vCPU: ${businessConfig.infrastructure.vcpuType}. Số vCPU không đồng nghĩa với số lõi vật lý độc quyền. Khi config chưa xác nhận shared hay dedicated, khách không nên hiểu đó là tài nguyên dedicated.`] },
      { id: "gioi-han-cpu", title: "Tác vụ CPU kéo dài", paragraphs: ["Không được stress CPU 100% liên tục gây ảnh hưởng node. Tác vụ nặng kéo dài có thể bị giới hạn hoặc yêu cầu nâng gói. DiabloNode sẽ liên hệ trước khi giới hạn nếu điều kiện cho phép, trừ trường hợp gây ảnh hưởng nghiêm trọng đến hệ thống."] },
      { id: "ram", title: "RAM", paragraphs: ["RAM được cấp theo gói, nhưng hệ điều hành và dịch vụ nền cũng sử dụng một phần tài nguyên. Không cam kết ứng dụng luôn dùng đủ toàn bộ RAM nếu hệ thống có cơ chế quản lý riêng. Không tạo tiến trình bất thường để chiếm dụng hoặc phá hệ thống."] },
      { id: "o-dia", title: "Ổ đĩa", paragraphs: ["Ổ đĩa hiện công bố là NVMe. Dung lượng thực tế có thể thấp hơn nhẹ sau khi định dạng và cài hệ điều hành. Cấm ghi/xóa liên tục cường độ cao gây ảnh hưởng ổ đĩa chung; database hoặc workload ghi lớn cần trao đổi trước."] },
      { id: "mang", title: "Mạng", paragraphs: [`Cổng mạng: ${businessConfig.infrastructure.portSpeed}. Đây là tốc độ cổng mạng tối đa, không phải cam kết khách luôn đạt đủ 1 Gbps. Tốc độ thực tế phụ thuộc node, tuyến mạng, vị trí và tải hệ thống. Traffic hàng tháng: ${businessConfig.infrastructure.monthlyTraffic}.`] },
      { id: "hanh-vi-mang-bi-cam", title: "Hành vi mạng bị cấm", items: ["DDoS, flood, proxy công cộng, spam và hành vi lạm dụng mạng.", "Scan port trái phép hoặc tạo lưu lượng bất thường ảnh hưởng người dùng khác.", "Chạy benchmark hoặc stress test kéo dài gây ảnh hưởng hệ thống."] },
      { id: "minecraft", title: "Server Minecraft", paragraphs: [`Hiệu năng phụ thuộc phiên bản, plugin, mod, map và số người chơi. DiabloNode không cam kết số player chỉ dựa trên RAM. Paper, Purpur và cấu hình tối ưu thường phù hợp hơn cho workload vừa phải. ${businessConfig.infrastructure.cpuModel} phù hợp workload vừa phải, không được quảng cáo như CPU gaming xung cao. Kết quả thực tế cần benchmark trên đúng node.`] },
      { id: "thong-tin-chua-cong-bo", title: "Thông tin cần xác nhận", paragraphs: [`Datacenter: ${businessConfig.infrastructure.datacenter}. Chống DDoS: ${businessConfig.infrastructure.ddosProtection}. Hệ điều hành hỗ trợ: ${businessConfig.infrastructure.supportedOperatingSystems}. Chính sách fair use: ${businessConfig.infrastructure.fairUsePolicy}. Các dữ liệu này cần được xác nhận trước khi mua nếu ảnh hưởng nhu cầu sử dụng.`] },
    ],
  },
};

export function getPolicy(slug: string) {
  return policyLinks.some((policy) => policy.slug === slug) ? policies[slug as PolicySlug] : undefined;
}
