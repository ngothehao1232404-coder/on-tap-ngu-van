import { QuizQuestion } from '../types/literature';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topicId: 'bau-troi-tuoi-tho',
    difficulty: 'easy',
    question: 'Ai là tác giả của truyện ngắn "Bầy chim chìa vôi"?',
    options: ['Nguyễn Quang Thiều', 'Đoàn Giỏi', 'Võ Quảng', 'Thanh Thảo'],
    correctIndex: 0,
    explanation: 'Truyện ngắn "Bầy chim chìa vôi" do nhà văn, nhà thơ Nguyễn Quang Thiều sáng tác.'
  },
  {
    id: 'q2',
    topicId: 'bau-troi-tuoi-tho',
    difficulty: 'medium',
    question: 'Tại sao hai anh em Mên và Mon lại bật khóc ở cuối truyện "Bầy chim chìa vôi"?',
    options: [
      'Vì tiếc con đò của bố bị trôi mất',
      'Vì bị bố mẹ mắng do trốn đi trong đêm mưa gió',
      'Vì quá xúc động và hạnh phúc khi bầy chim non đã cất cánh bay lên an toàn',
      'Vì bầy chim non đã bị dòng nước cuốn trôi'
    ],
    correctIndex: 2,
    explanation: 'Giọt nước mắt của hai anh em là niềm xúc động nghẹn ngào, hạnh phúc vỡ òa khi chứng kiến bầy chim non kiên cường đập cánh bay lên khỏi dòng nước lũ.'
  },
  {
    id: 'q3',
    topicId: 'bau-troi-tuoi-tho',
    difficulty: 'easy',
    question: 'Đoạn trích "Đi lấy mật" được trích từ tác phẩm nổi tiếng nào của Đoàn Giỏi?',
    options: [
      'Đất rừng phương Nam',
      'Cá bống mú',
      'Những đứa con trong gia đình',
      'Hương rừng Cà Mau'
    ],
    correctIndex: 0,
    explanation: '"Đi lấy mật" là đoạn trích tiêu biểu trong tiểu thuyết "Đất rừng phương Nam" của Đoàn Giỏi.'
  },
  {
    id: 'q4',
    topicId: 'bau-troi-tuoi-tho',
    difficulty: 'medium',
    question: 'Nét độc đáo của nghề "gác kèo" nuôi ong ở rừng U Minh là gì?',
    options: [
      'Nuôi ong trong các thùng gỗ nhân tạo xếp thành hàng',
      'Dùng các thân tràm gác nghiêng vào rừng để ong rừng tự bay về làm tổ',
      'Dụ ong bằng mật mía nhân tạo',
      'Nhốt ong chúa vào lồng sắt nhỏ'
    ],
    correctIndex: 1,
    explanation: 'Người U Minh gác những cành tràm (kèo) nghiêng theo hướng gió thích hợp để đàn ong rừng tự nhiên tìm về làm tổ.'
  },
  {
    id: 'q5',
    topicId: 'khuc-nhac-tam-hon',
    difficulty: 'easy',
    question: 'Bài thơ "Đồng dao mùa xuân" của Nguyễn Khoa Điềm được sáng tác theo thể thơ nào?',
    options: ['Thơ lục bát', 'Thơ bốn chữ', 'Thơ năm chữ', 'Thơ tự do'],
    correctIndex: 1,
    explanation: 'Bài thơ được sáng tác theo thể thơ bốn chữ với nhịp điệu 2/2 mang âm hưởng đồng dao trong trẻo.'
  },
  {
    id: 'q6',
    topicId: 'khuc-nhac-tam-hon',
    difficulty: 'medium',
    question: 'Hình ảnh người lính trong "Đồng dao mùa xuân" trước khi vào chiến trường có nét gì đặc biệt?',
    options: [
      'Là người từng trải, dày dạn kinh nghiệm trận mạc',
      'Hồn nhiên, chưa từng yêu, cà phê chưa uống, còn mê thả diều',
      'Là một người nghệ sĩ phong trần',
      'Là một vị tướng chỉ huy oai nghiêm'
    ],
    correctIndex: 1,
    explanation: 'Tác giả khắc họa nét hồn nhiên, trẻ trung của người lính: "Chưa một lần yêu / Cà phê chưa uống / Còn mê thả diều".'
  },
  {
    id: 'q7',
    topicId: 'khuc-nhac-tam-hon',
    difficulty: 'easy',
    question: 'Trong bài thơ "Gặp lá cơm nếp", điều gì đã đánh thức nỗi nhớ mẹ và quê hương của người chiến sĩ?',
    options: [
      'Tiếng chim hót ríu rít ban mai',
      'Hương thơm của nhành lá cơm nếp gặp trên đường hành quân',
      'Màu vàng của hoa mai rừng nở rộ',
      'Một bức thư của mẹ gửi từ hậu phương'
    ],
    correctIndex: 1,
    explanation: 'Hương thơm mộc mạc của nhành lá cơm nếp ven đường đã gợi nhớ bát xôi mẹ nấu và dáng mẹ tần tảo bên bếp lửa.'
  },
  {
    id: 'q8',
    topicId: 'giai-dieu-dat-nuoc',
    difficulty: 'medium',
    question: 'Tác phẩm "Mùa xuân của tôi" của Vũ Bằng thuộc thể loại văn học nào?',
    options: ['Tiểu thuyết lịch sử', 'Tùy bút', 'Truyện đồng thoại', 'Kịch bản văn học'],
    correctIndex: 1,
    explanation: '"Mùa xuân của tôi" là đoạn trích trong thiên tùy bút đặc sắc "Thương nhớ mười hai" của Vũ Bằng.'
  },
  {
    id: 'q9',
    topicId: 'tri-tue-dan-gian',
    difficulty: 'easy',
    question: 'Bài học triết lý nhân sinh rút ra từ truyện ngụ ngôn "Ếch ngồi đáy giếng" là gì?',
    options: [
      'Phải sống nhanh nhẹn, biết tận dụng cơ hội',
      'Không được chủ quan, kiêu ngạo, thiển cận; phải luôn khiêm tốn mở rộng tầm nhìn',
      'Cần học cách bơi lội giỏi như loài ếch',
      'Tránh xa loài trâu khi ra khỏi giếng'
    ],
    correctIndex: 1,
    explanation: 'Truyện phê phán thói tự phụ, kiêu căng dựa trên hiểu biết hạn hẹp và khuyên răn con người phải luôn giữ đức khiêm nhường, không ngừng học hỏi.'
  },
  {
    id: 'q10',
    topicId: 'tri-tue-dan-gian',
    difficulty: 'medium',
    question: 'Trong "Thầy bói xem voi", các thầy bói đã phạm phải sai lầm nghiêm trọng nào trong nhận thức?',
    options: [
      'Không chịu sờ tận tay vào con voi',
      'Bị người quản voi lừa gạt nói sai',
      'Lấy cái nhìn bộ phận, cục bộ để áp đặt, suy diễn cho toàn thể con voi',
      'Sợ hãi bỏ chạy khi con voi kêu to'
    ],
    correctIndex: 2,
    explanation: 'Mỗi thầy chỉ sờ một bộ phận (tai, vòi, ngà, chân, đuôi) nhưng lại võ đoán rằng đó là toàn bộ hình dáng con voi, từ đó bảo thủ tranh cãi.'
  },
  {
    id: 'q11',
    topicId: 'tri-tue-dan-gian',
    difficulty: 'medium',
    question: 'Trong văn bản "Tinh thần yêu nước của nhân dân ta", Bác Hồ đã so sánh tinh thần yêu nước với hình ảnh nào?',
    options: [
      'Như một ngọn hải đăng soi đường chỉ lối',
      'Như một làn sóng vô cùng mạnh mẽ, to lớn lướt qua mọi nguy hiểm',
      'Như một bức tường thành kiên cố vững chãi',
      'Như một đóa hoa thơm ngát giữa ngàn hoa'
    ],
    correctIndex: 1,
    explanation: 'Bác ví: "Nó kết thành một làn sóng vô cùng mạnh mẽ, to lớn, nó lướt qua mọi sự nguy hiểm, khó khăn, nó nhấn chìm tất cả lũ bán nước và lũ cướp nước."'
  },
  {
    id: 'q12',
    topicId: 'tieng-viet',
    difficulty: 'hard',
    question: 'Câu thơ "Mặt trời của bắp thì nằm trên đồi / Mặt trời của mẹ, con nằm trên lưng" sử dụng biện pháp tu từ nào ở từ "mặt trời" thứ hai?',
    options: ['So sánh', 'Ẩn dụ', 'Hoán dụ', 'Chơi chữ'],
    correctIndex: 1,
    explanation: '"Mặt trời của mẹ" là hình ảnh ẩn dụ chỉ đứa con - nguồn sống, niềm hạnh phúc và hi vọng rạng ngời sưởi ấm cuộc đời mẹ.'
  }
];
