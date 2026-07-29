# AGENTS.md

Tài liệu này là quy định bắt buộc dành cho mọi AI coding agent làm việc trong dự án. Agent phải đọc toàn bộ file này trước khi phân tích, chỉnh sửa hoặc viết code.

## 1. Bắt đầu mỗi session

Trước khi làm bất kỳ công việc nào, agent phải:

1. Đọc toàn bộ `AGENTS.md` ở thư mục gốc.
2. Xác định chính xác yêu cầu và kết quả người dùng cần.
3. Xác định các file có khả năng liên quan.
4. Chỉ đọc file cần thiết cho nhiệm vụ hiện tại.
5. Kiểm tra cấu trúc, kiến trúc và phong cách code hiện có trước khi viết code.
6. Hiểu luồng hoạt động liên quan trước khi bắt đầu sửa code.

Nếu có thêm `AGENTS.md` trong thư mục con, agent phải đọc file gần nhất với khu vực đang chỉnh sửa và tuân thủ cả quy định cấp dự án lẫn quy định cục bộ. Quy định cụ thể hơn áp dụng cho phạm vi gần hơn, trừ khi mâu thuẫn với yêu cầu trực tiếp, an toàn dữ liệu hoặc bảo mật.

## 2. Phạm vi đọc file

Không mặc định đọc toàn bộ repository. Bắt đầu từ file người dùng nhắc tới, rồi tìm import, dependency, interface, service, route hoặc config liên quan trực tiếp. Mở rộng phạm vi từng bước khi cần và dừng khi đã đủ thông tin để làm việc.

Ưu tiên tìm kiếm tên class, function, symbol hoặc chuỗi liên quan thay vì mở hàng loạt file. Không đọc thư mục build, cache, dependency hoặc file sinh tự động nếu không cần. Tránh đọc hoặc chỉnh sửa trực tiếp các vị trí sau:

- `node_modules`
- `build`, `dist`, `target`
- `.gradle`, `.idea`, `.git`
- Thư mục cache và generated
- File lock, trừ khi nhiệm vụ liên quan trực tiếp đến dependency

Không đọc `.env`, credential, token, private key hoặc file chứa secret nếu người dùng không yêu cầu rõ ràng.

## 3. Tôn trọng code hiện có

Trước khi viết code, quan sát và làm theo convention hiện có về:

- Đặt tên, format và tổ chức file.
- Chia package, module và feature.
- Class, interface, function và dependency injection.
- Xử lý lỗi, logging và validation.
- Comment, tài liệu và cách viết test.
- Framework, thư viện và kiến trúc đang sử dụng.

Không tự ý đổi framework, kiến trúc, thư viện, naming convention, public API; refactor diện rộng; di chuyển hàng loạt file; hoặc thêm dependency. Chỉ làm vậy khi người dùng yêu cầu hoặc khi thật sự bắt buộc, đồng thời phải nêu lý do.

## 4. Code sạch, dễ đọc

Viết code cho con người đọc trước, máy chạy sau. Code phải có tên biến, function, class và file thể hiện rõ mục đích; luồng xử lý dễ theo dõi; trách nhiệm được chia hợp lý; xử lý lỗi rõ ràng; kiểm tra input tại đúng trust boundary; dùng kiểu dữ liệu cụ thể khi ngôn ngữ hỗ trợ; và giữ public API nhỏ, dễ hiểu.

Ưu tiên giải pháp đơn giản, trực tiếp, dễ debug và đúng yêu cầu. Tránh function quá dài, class làm nhiều việc, nesting sâu, callback hoặc `if` dư thừa, logic ẩn, duplicate code có ý nghĩa, chain method quá dài, ternary lồng nhau và generic/type phức tạp không đem lại giá trị.

Không rút ngắn tên chỉ để code ngắn hơn. Tránh tên mơ hồ như `a`, `b`, `x`, `tmp`, `obj`, `data2`, `doStuff` hoặc `handleThing`.

## 5. Tránh code quá AI

Không tạo code trông thông minh nhưng khó đọc. Tránh abstraction quá sớm, over-engineering, design pattern không cần thiết, nhiều interface cho một implementation, wrapper, factory, manager, provider hoặc helper dư thừa, generic phức tạp, meta-programming và reflection không cần thiết.

Không tạo function đa năng, comment dài dòng, hàng chục file nhỏ cho tính năng đơn giản, hệ thống config cho giá trị cố định, fallback hoặc compatibility layer không được yêu cầu, telemetry/analytics/logging quá mức, hay tính năng ngoài phạm vi.

Mỗi abstraction mới phải giải quyết một vấn đề có thật. Ưu tiên ít tầng trung gian, dễ đặt breakpoint, dễ thay đổi và dễ xóa. Không tạo boilerplate “để sau”.

## 6. Function và class

Function phải có một trách nhiệm chính, tên mô tả hành động cụ thể, số tham số hợp lý, kết quả rõ ràng và xử lý trường hợp lỗi hoặc rỗng. Không thay đổi state ngoài phạm vi một cách bất ngờ. Tránh boolean parameter khó hiểu; dùng enum hoặc function riêng khi điều đó làm API rõ hơn.

Class phải đại diện cho một trách nhiệm hoặc khái niệm rõ ràng, không trở thành God class và không chứa function không liên quan. Không dùng hậu tố `Manager`, `Helper`, `Util` hoặc `Service` tùy tiện. Không tạo class chỉ để bọc một function đơn giản nếu không có lợi ích rõ ràng.

## 7. Comment và tài liệu

Chỉ viết comment để giải thích lý do của quyết định, ràng buộc đặc biệt, hành vi không hiển nhiên, workaround cho bug/giới hạn bên ngoài, công thức hoặc thuật toán phức tạp. Comment giải thích “tại sao”, không lặp lại “đang làm gì”.

Không để comment `Added by AI`, `Generated code`, `This function handles...`, `TODO` không có ngữ cảnh, hoặc mô tả dài dòng, sáo rỗng và hiển nhiên.

## 8. Tổ chức file và thư mục

Giữ file liên quan gần nhau; cấu trúc phản ánh feature hoặc domain; tên thư mục ngắn, rõ và nhất quán; tránh thư mục chứa nhiều loại file không liên quan, độ sâu quá lớn, hoặc thư mục chỉ chứa một file không có lý do.

Không dồn code vào thư mục chung chung như `utils`, `common`, `helpers` hoặc `misc`. Khi thêm file, phải tự hỏi:

1. File có thực sự cần không?
2. Logic có thể đặt sạch trong file hiện có không?
3. File thuộc feature hoặc domain nào?
4. Vị trí nào giúp người khác dễ tìm nhất?
5. Tên file có mô tả đúng nội dung không?

Không tạo tên chung chung như `Utils`, `Common`, `Helper`, `Misc`, `Functions`, `Stuff`, `Temp`, `NewFile` hoặc `DataManager`. Nếu cần utility, tên phải thể hiện phạm vi, như `DateFormatter`, `PathValidator`, `YamlParser` hoặc `PlayerNameNormalizer`.

## 9. Phạm vi thay đổi

Thực hiện thay đổi nhỏ nhất để hoàn thành yêu cầu. Không format lại toàn file khi chỉ sửa vài dòng; đổi tên thành phần không liên quan; xóa code đang hoạt động chỉ vì thích cách khác; refactor ngoài phạm vi; đổi behavior không được yêu cầu; sửa hàng loạt warning không liên quan; hoặc chỉnh dependency lock file khi không cần.

Không sửa generated file thay vì source tạo ra nó. Mọi thay đổi phải có lý do liên quan trực tiếp đến nhiệm vụ.

## 10. Xử lý lỗi

Không dùng `catch` rỗng, bỏ qua exception không có lý do, hoặc trả giá trị mặc định làm che giấu lỗi. Giới hạn `try-catch` trong phạm vi cần thiết, tránh log cùng một lỗi ở nhiều tầng, và không đưa secret/dữ liệu nhạy cảm vào log hoặc exception.

Thông báo lỗi phải có đủ ngữ cảnh để debug, không dùng thông báo chung chung như `Something went wrong` trong code nội bộ và không làm lộ dữ liệu nhạy cảm.

## 11. Logging

Chỉ log khi giúp theo dõi trạng thái quan trọng, điều tra lỗi, quan sát tương tác với hệ thống bên ngoài hoặc xác định nguyên nhân behavior bất thường. Không log mỗi lần function được gọi, toàn bộ object lớn, password, token, cookie, credential, dữ liệu người dùng nhạy cảm hoặc thông tin lặp lại quá nhiều.

## 12. Dependency

Trước khi thêm dependency:

1. Kiểm tra dự án đã có thư viện đáp ứng nhu cầu chưa.
2. Kiểm tra API chuẩn có giải quyết được với ít code không.
3. Đánh giá dependency có thật sự cần không.
4. Xem ảnh hưởng đến kích thước, bảo mật và bảo trì.
5. Chỉ thêm khi lợi ích rõ ràng.

Không thêm dependency chỉ cho một thao tác đơn giản.

## 13. Testing và kiểm tra

Sau chỉnh sửa, kiểm tra trong phạm vi phù hợp: compile/build liên quan, syntax, import, test liên quan, behavior cũ, file/import/code thừa và formatter/linter hiện có. Chạy kiểm tra liên quan trước; không chạy toàn bộ hệ thống nếu không cần hoặc quá tốn tài nguyên.

Không sửa test chỉ để làm code sai vượt qua test. Nếu logic không tầm thường, để lại ít nhất một kiểm tra có thể chạy được, chẳng hạn một test nhỏ hoặc self-check phù hợp với công nghệ hiện có.

## 14. Bảo mật

Không hard-code password, API key, token hoặc secret; không in secret ra console/log; không đưa dữ liệu nhạy cảm vào exception; không tắt validation/authentication; không đưa input trực tiếp vào query, command hoặc path; và không tự ý giảm bảo mật.

Không đọc hoặc chỉnh sửa credential ngoài phạm vi. Ưu tiên validation, escaping, parameterized query và nguyên tắc quyền tối thiểu.

## 15. Yêu cầu chưa rõ

Trước hết đọc code liên quan để tự xác định ngữ cảnh. Nếu còn thiếu nhưng có thể dùng giả định nhỏ, hợp lý và an toàn, tiếp tục và nêu rõ giả định.

Chỉ hỏi lại khi thiếu thông tin có thể làm sai behavior chính, gây mất dữ liệu, phá compatibility, tạo kiến trúc sai, ảnh hưởng bảo mật hoặc dẫn đến nhiều cách triển khai khác biệt đáng kể. Không hỏi điều có thể tìm thấy trực tiếp trong dự án.

## 16. Báo cáo sau khi hoàn thành

Báo cáo ngắn gọn:

- Đã thay đổi gì.
- File nào đã chỉnh sửa hoặc tạo mới.
- Lý do thay đổi chính.
- Đã chạy kiểm tra nào.
- Điểm nào chưa thể kiểm tra.

Không báo cáo dài dòng. Không khẳng định test thành công nếu chưa thực sự chạy.

## 17. Thứ tự ưu tiên

Khi các quy định hoặc yêu cầu mâu thuẫn, áp dụng thứ tự sau:

1. Yêu cầu trực tiếp của người dùng.
2. Bảo mật và an toàn dữ liệu.
3. `AGENTS.md` gần nhất với code đang chỉnh sửa.
4. `AGENTS.md` ở thư mục gốc.
5. Convention và kiến trúc hiện có.
6. Formatter, linter và quy định của ngôn ngữ.
7. Giải pháp đơn giản, dễ đọc và dễ bảo trì.

## 18. Checklist trước khi kết thúc

- [ ] Đã đọc toàn bộ `AGENTS.md` liên quan.
- [ ] Chỉ đọc các file cần thiết.
- [ ] Đã hiểu code liên quan trước khi sửa.
- [ ] Không thay đổi ngoài phạm vi.
- [ ] Không tạo abstraction không cần thiết.
- [ ] Code dễ đọc và dễ debug.
- [ ] Tên class, function và biến rõ ràng.
- [ ] Cấu trúc file và thư mục hợp lý.
- [ ] Không thêm dependency không cần thiết.
- [ ] Không để lại code hoặc import thừa.
- [ ] Không làm lộ secret hoặc dữ liệu nhạy cảm.
- [ ] Đã kiểm tra compile, test, lint hoặc build liên quan khi có thể.
- [ ] Báo cáo trung thực những gì đã và chưa kiểm tra.
