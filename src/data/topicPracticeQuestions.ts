import { PracticeQuestionItem, TopicPracticeSet } from '../types/literature';

export const INITIAL_PRACTICE_QUESTIONS: PracticeQuestionItem[] = [
  // ==========================================
  // CHỦ ĐỀ 1: BẦU TRỜI TUỔI THƠ
  // ==========================================
  // 1. Đúng / Sai
  {
    id: 'pq-bttt-tf-1',
    topicId: 'bau-troi-tuoi-tho',
    topicName: 'Bầu trời tuổi thơ',
    type: 'true_false',
    question: 'Trong truyện ngắn "Bầy chim chìa vôi", tổ chim chìa vôi nằm trên cành cây cao sát mái nhà của hai anh em Mon và Mên.',
    correctBoolean: false,
    explanation: 'Sai. Bầy chim chìa vôi làm tổ ở dải cát giữa lòng sông Đáy. Khi nước sông dâng cao do mưa lũ, dải cát bị ngập nên hai đứa trẻ mới lo lắng bầy chim non bị chết đuối.'
  },
  {
    id: 'pq-bttt-tf-2',
    topicId: 'bau-troi-tuoi-tho',
    topicName: 'Bầu trời tuổi thơ',
    type: 'true_false',
    question: 'Trong đoạn trích "Đi lấy mật" (Đoàn Giỏi), người dân rừng U Minh gác kèo để dẫn dụ bầy ong mật tự nhiên về làm tổ.',
    correctBoolean: true,
    explanation: 'Đúng. Kèo là một nhánh tràm thẳng được đẽo sạch và gác nghiêng đón hướng gió, tạo chỗ trú ẩn ưa thích để đàn ong rừng tự nhiên kéo về làm tổ.'
  },
  // 2. Lựa chọn
  {
    id: 'pq-bttt-mc-1',
    topicId: 'bau-troi-tuoi-tho',
    topicName: 'Bầu trời tuổi thơ',
    type: 'multiple_choice',
    question: 'Vì sao trong đêm mưa gió bão bùng, hai anh em Mon và Mên không thể ngủ được?',
    options: [
      'Vì sợ tiếng sấm sét và mưa gió đập vào mái nhà',
      'Vì lo lắng bãi cát sông Đáy bị nước lũ dìm ngập và bầy chim non bị chết đuối',
      'Vì nhớ bố mẹ đang đi làm xa chưa về',
      'Vì mải rủ nhau đi bắt cá đêm trên sông'
    ],
    correctIndex: 1,
    explanation: 'Mon và Mên trằn trọc suốt đêm vì thương xót bầy chim non mới nở trên dải cát sắp bị nước sông Đáy dâng lên nhấn chìm.'
  },
  {
    id: 'pq-bttt-mc-2',
    topicId: 'bau-troi-tuoi-tho',
    topicName: 'Bầu trời tuổi thơ',
    type: 'multiple_choice',
    question: 'Người dạy cho cậu bé An những kinh nghiệm phân biệt đàn ong rừng và cách quan sát nhánh cây trong rừng tràm U Minh là ai?',
    options: [
      'Thầy giáo Bảy',
      'Má nuôi của An',
      'Tía nuôi và thằng Cò',
      'Bác Ba Phi'
    ],
    correctIndex: 2,
    explanation: 'Tía nuôi và thằng Cò là những người con của rừng tràm U Minh, giàu kinh nghiệm sống và đã chỉ dạy cho An từng dấu hiệu tự nhiên khi đi lấy mật.'
  },
  // 3. Điền từ ngắn
  {
    id: 'pq-bttt-fb-1',
    topicId: 'bau-troi-tuoi-tho',
    topicName: 'Bầu trời tuổi thơ',
    type: 'fill_blank',
    question: 'Điền tên con sông vào chỗ trống: Hai anh em Mon và Mên bơi thuyền ra dải cát cứu bầy chim non trên dòng sông [ ... ].',
    correctText: 'Đáy',
    acceptableAnswers: ['đáy', 'sông đáy', 'song day'],
    explanation: 'Bối cảnh truyện ngắn "Bầy chim chìa vôi" của Nguyễn Quang Thiều diễn ra bên dòng sông Đáy thân thương của vùng quê Bắc Bộ.'
  },
  {
    id: 'pq-bttt-fb-2',
    topicId: 'bau-troi-tuoi-tho',
    topicName: 'Bầu trời tuổi thơ',
    type: 'fill_blank',
    question: 'Điền từ còn thiếu: Đoạn trích "Đi lấy mật" được trích từ tiểu thuyết nổi tiếng mang tên "[ ... ] rừng phương Nam" của nhà văn Đoàn Giỏi.',
    correctText: 'Đất',
    acceptableAnswers: ['đất', 'dat'],
    explanation: 'Tiểu thuyết "Đất rừng phương Nam" xuất bản năm 1957 là tác phẩm văn học thiếu nhi kinh điển của nhà văn Đoàn Giỏi.'
  },
  // 4. Hỏi - đáp ngắn
  {
    id: 'pq-bttt-sa-1',
    topicId: 'bau-troi-tuoi-tho',
    topicName: 'Bầu trời tuổi thơ',
    type: 'short_answer',
    question: 'Chi tiết giọt nước mắt lăn trên má của Mon và Mên ở cuối truyện "Bầy chim chìa vôi" thể hiện tâm trạng gì?',
    sampleAnswer: 'Giọt nước mắt thể hiện niềm xúc động trào dâng, niềm hạnh phúc tột cùng và sự giải tỏa tâm lý sau đêm dài lo âu khi thấy bầy chim non đã chiến thắng dòng nước lũ, cất cánh bay lên an toàn.',
    keyPoints: [
      'Xúc động và hạnh phúc nghẹn ngào',
      'Sự giải tỏa sau đêm dài lo âu',
      'Tình yêu thương sự sống và thế giới loài vật trong trẻo của tuổi thơ'
    ],
    explanation: 'Đây là chi tiết đắt giá nhất của tác phẩm, thanh lọc tâm hồn hai đứa trẻ và làm sáng bừng chủ đề tình yêu thiên nhiên.'
  },

  // ==========================================
  // CHỦ ĐỀ 2: KHÚC NHẠC TÂM HỒN
  // ==========================================
  // 1. Đúng / Sai
  {
    id: 'pq-knth-tf-1',
    topicId: 'khuc-nhac-tam-hon',
    topicName: 'Khúc nhạc tâm hồn',
    type: 'true_false',
    question: 'Bài thơ "Đồng dao mùa xuân" của Nguyễn Khoa Điềm được sáng tác theo thể thơ bốn chữ ngắn gọn, giàu nhịp điệu dân ca.',
    correctBoolean: true,
    explanation: 'Đúng. Thể thơ bốn chữ với nhịp điệu ngắn, đều đặn gợi âm hưởng của khúc đồng dao dân gian, ngợi ca người lính trẻ kiên cường.'
  },
  {
    id: 'pq-knth-tf-2',
    topicId: 'khuc-nhac-tam-hon',
    topicName: 'Khúc nhạc tâm hồn',
    type: 'true_false',
    question: 'Trong bài thơ "Sang thu", tác giả Hữu Thỉnh đã sử dụng hình ảnh "hoa phượng nở đỏ rực" để báo hiệu khoảnh khắc giao mùa.',
    correctBoolean: false,
    explanation: 'Sai. Tín hiệu sang thu trong bài thơ là: "hương ổi phả vào trong gió se", "sương chùng chình qua ngõ", dòng sông "dềnh dàng" và cánh chim "bắt đầu vội vã".'
  },
  // 2. Lựa chọn
  {
    id: 'pq-knth-mc-1',
    topicId: 'khuc-nhac-tam-hon',
    topicName: 'Khúc nhạc tâm hồn',
    type: 'multiple_choice',
    question: 'Trong bài thơ "Gặp lá cơm nếp" (Thanh Thảo), điều gì đã gợi nhắc người lính nhớ da diết về người mẹ ở quê nhà?',
    options: [
      'Bức thư của người thân gửi từ hậu phương',
      'Mùi hương khói bếp và hương xôi nếp ngào ngạt ven đường hành quân',
      'Tiếng ru ầu ơ của bà mẹ nơi bản làng vùng cao',
      'Cánh hoa ban rừng nở trắng đèo dốc Trường Sơn'
    ],
    correctIndex: 1,
    explanation: 'Mùi lá nếp thơm nồng giữa rừng Trường Sơn đã đánh thức kỉ niệm tuổi thơ bên nồi xôi của mẹ, làm dâng trào tình cảm mẫu tử thiêng liêng.'
  },
  {
    id: 'pq-knth-mc-2',
    topicId: 'khuc-nhac-tam-hon',
    topicName: 'Khúc nhạc tâm hồn',
    type: 'multiple_choice',
    question: 'Hình ảnh "Sương chùng chình qua ngõ" trong bài thơ "Sang thu" sử dụng biện pháp tu từ nào?',
    options: [
      'So sánh',
      'Nói giảm nói tránh',
      'Nhân hóa',
      'Nói quá'
    ],
    correctIndex: 2,
    explanation: 'Từ láy "chùng chình" kết hợp nhân hóa làn sương như một con người đang ngập ngừng, chậm rãi bước qua ngõ xóm mùa thu.'
  },
  // 3. Điền từ ngắn
  {
    id: 'pq-knth-fb-1',
    topicId: 'khuc-nhac-tam-hon',
    topicName: 'Khúc nhạc tâm hồn',
    type: 'fill_blank',
    question: 'Điền từ còn thiếu vào câu thơ: "Có một người lính / Đi vào núi xanh / Những năm máu lửa / Một ngày [ ... ] / Không về nữa anh."',
    correctText: 'hòa bình',
    acceptableAnswers: ['hòa bình', 'hoa binh'],
    explanation: 'Câu thơ trong bài "Đồng dao mùa xuân": "Một ngày hòa bình / Không về nữa anh" khắc họa sự hi sinh cao cả của người lính trẻ.'
  },
  {
    id: 'pq-knth-fb-2',
    topicId: 'khuc-nhac-tam-hon',
    topicName: 'Khúc nhạc tâm hồn',
    type: 'fill_blank',
    question: 'Điền từ còn thiếu: Bài thơ "Gặp lá cơm nếp" được viết theo thể thơ [ ... ] chữ.',
    correctText: 'năm',
    acceptableAnswers: ['5', 'năm', 'nam'],
    explanation: 'Bài thơ "Gặp lá cơm nếp" của Thanh Thảo được viết bằng thể thơ 5 chữ giàu nhạc tính trữ tình.'
  },
  // 4. Hỏi - đáp ngắn
  {
    id: 'pq-knth-sa-1',
    topicId: 'khuc-nhac-tam-hon',
    topicName: 'Khúc nhạc tâm hồn',
    type: 'short_answer',
    question: 'Hai câu thơ "Sấm cũng bớt bất ngờ / Trên hàng cây đứng tuổi" ở cuối bài "Sang thu" ẩn chứa tầng ý nghĩa triết lý gì?',
    sampleAnswer: 'Tầng nghĩa thực: Mùa thu những cơn sấm chớp không còn dữ dội như mùa hạ. Tầng nghĩa ẩn dụ triết lý: Người từng trải, đã đứng tuổi sẽ vững vàng, điềm tĩnh trước những sóng gió, biến động bất ngờ của cuộc đời.',
    keyPoints: [
      'Nghĩa tả thực: Sấm mùa thu thưa dần và bớt dữ dội',
      'Nghĩa biểu tượng: Con người từng trải trước những thăng trầm của cuộc đời'
    ],
    explanation: 'Đây là nét độc đáo sâu sắc trong thơ Hữu Thỉnh: từ quy luật thiên nhiên nâng lên thành triết lý chiêm nghiệm nhân sinh.'
  },

  // ==========================================
  // CHỦ ĐỀ 3: TRÍ TUỆ DÂN GIAN & BÀI HỌC CUỘC SỐNG
  // ==========================================
  // 1. Đúng / Sai
  {
    id: 'pq-ttdg-tf-1',
    topicId: 'tri-tue-dan-gian',
    topicName: 'Trí tuệ dân gian & Bài học cuộc sống',
    type: 'true_false',
    question: 'Trong truyện ngụ ngôn "Ếch ngồi đáy giếng", con ếch bị trâu giẫm bẹp là do một trận mưa rào làm nước dâng đưa nó ra ngoài giếng.',
    correctBoolean: true,
    explanation: 'Đúng. Khi ra khỏi đáy giếng chật hẹp, con ếch quen thói huênh hoang, nhâng nháo nhìn lên trời không để ý xung quanh nên đã bị một con trâu đi qua giẫm bẹp.'
  },
  {
    id: 'pq-ttdg-tf-2',
    topicId: 'tri-tue-dan-gian',
    topicName: 'Trí tuệ dân gian & Bài học cuộc sống',
    type: 'true_false',
    question: 'Trong truyện "Thầy bói xem voi", cả năm ông thầy bói đều sờ toàn bộ con voi từ đầu đến chân rồi mới đưa ra nhận xét.',
    correctBoolean: false,
    explanation: 'Sai. Mỗi ông thầy bói chỉ sờ vào một bộ phận duy nhất (vòi, ngà, tai, chân, đuôi) nhưng lại khẳng định đó là toàn bộ hình dáng con voi, dẫn đến đánh nhau toác đầu.'
  },
  // 2. Lựa chọn
  {
    id: 'pq-ttdg-mc-1',
    topicId: 'tri-tue-dan-gian',
    topicName: 'Trí tuệ dân gian & Bài học cuộc sống',
    type: 'multiple_choice',
    question: 'Bài học nhận thức quan trọng nhất mà truyện ngụ ngôn "Thầy bói xem voi" muốn gửi gắm đến người đọc là gì?',
    options: [
      'Muốn xem voi thì phải đến rạp xiếc hoặc vườn bách thú',
      'Khi đánh giá một sự vật, hiện tượng phải xem xét toàn diện, tránh nhìn phiến diện một bộ phận rồi vội quy kết cho cái toàn thể',
      'Không nên đi xem bói toán vì thầy bói đều nói sai',
      'Không nên tranh cãi ở nơi công cộng đông người'
    ],
    correctIndex: 1,
    explanation: 'Truyện phê phán cách nhìn nhận phiến diện, hời hợt "thầy bói xem voi" và khuyên con người cần có cái nhìn tổng thể, khách quan.'
  },
  // 3. Điền từ ngắn
  {
    id: 'pq-ttdg-fb-1',
    topicId: 'tri-tue-dan-gian',
    topicName: 'Trí tuệ dân gian & Bài học cuộc sống',
    type: 'fill_blank',
    question: 'Điền thành ngữ còn thiếu: Câu chuyện chú ếch sống dưới đáy giếng chật hẹp đã để lại thành ngữ dân gian "[ ... ] ngồi đáy giếng".',
    correctText: 'Ếch',
    acceptableAnswers: ['ếch', 'ech'],
    explanation: 'Thành ngữ "Ếch ngồi đáy giếng" dùng để chỉ những người hiểu biết nông cạn nhưng lại hay tự cao tự đại, coi thường người khác.'
  },
  // 4. Hỏi - đáp ngắn
  {
    id: 'pq-ttdg-sa-1',
    topicId: 'tri-tue-dan-gian',
    topicName: 'Trí tuệ dân gian & Bài học cuộc sống',
    type: 'short_answer',
    question: 'Học sinh lớp 7 rút ra được bài học gì cho việc học tập của bản thân từ truyện "Ếch ngồi đáy giếng"?',
    sampleAnswer: 'Phải luôn khiêm tốn, không tự mãn với thành tích của mình, không ngừng mở rộng tầm nhìn, tích cực học hỏi từ thầy cô, bạn bè và cuộc sống xung quanh, không chủ quan trước những môi trường mới.',
    keyPoints: [
      'Thái độ khiêm tốn, tránh tự mãn kiêu ngạo',
      'Chủ động mở rộng kiến thức và thế giới quan',
      'Thích nghi cẩn trọng khi bước vào môi trường rộng lớn'
    ],
    explanation: 'Truyện răn dạy sâu sắc về thói kiêu ngạo và tầm nhìn hạn hẹp của con người trong quá trình học tập và rèn luyện.'
  },

  // ==========================================
  // CHỦ ĐỀ 4: THỰC HÀNH TIẾNG VIỆT LỚP 7
  // ==========================================
  // 1. Đúng / Sai
  {
    id: 'pq-tv7-tf-1',
    topicId: 'tieng-viet-7',
    topicName: 'Thực hành Tiếng Việt 7',
    type: 'true_false',
    question: 'Câu văn: "Bác đã đi rồi sao, Bác ơi!" (Tố Hữu) sử dụng biện pháp tu từ nói giảm nói tránh.',
    correctBoolean: true,
    explanation: 'Đúng. Từ "đi" được dùng thay thế cho từ "chết" nhằm giảm bớt cảm giác đau xót, mất mát lớn lao trước sự ra đi của Bác Hồ.'
  },
  {
    id: 'pq-tv7-tf-2',
    topicId: 'tieng-viet-7',
    topicName: 'Thực hành Tiếng Việt 7',
    type: 'true_false',
    question: 'Nói quá là biện pháp tu từ nhằm mục đích nói sai sự thật để lừa dối người nghe.',
    correctBoolean: false,
    explanation: 'Sai. Nói quá là biện pháp phóng đại mức độ, quy mô nhằm nhấn mạnh, gây ấn tượng hoặc tăng sức biểu cảm nghệ thuật, hoàn toàn khác với hành vi nói dối.'
  },
  // 2. Lựa chọn
  {
    id: 'pq-tv7-mc-1',
    topicId: 'tieng-viet-7',
    topicName: 'Thực hành Tiếng Việt 7',
    type: 'multiple_choice',
    question: 'Trường hợp nào dưới đây KHÔNG sử dụng biện pháp tu từ nói giảm nói tránh?',
    options: [
      'Cụ ấy tuổi cao sức yếu nên đã tạ thế đêm qua.',
      'Bài làm của em cần cố gắng nhiều hơn nữa.',
      'Hắn ta đã bị công an bắt giam vì tội ăn trộm.',
      'Anh ấy đã vĩnh viễn nằm lại nơi chiến trường.'
    ],
    correctIndex: 2,
    explanation: 'Câu "Hắn ta đã bị công an bắt giam vì tội ăn trộm" diễn đạt trực tiếp, không sử dụng nói giảm nói tránh.'
  },
  // 3. Điền từ ngắn
  {
    id: 'pq-tv7-fb-1',
    topicId: 'tieng-viet-7',
    topicName: 'Thực hành Tiếng Việt 7',
    type: 'fill_blank',
    question: 'Điền từ còn thiếu: Biện pháp tu từ dùng cách diễn đạt tế nhị, uyển chuyển nhằm tránh gây cảm giác quá đau buồn, ghê sợ được gọi là nói giảm nói [ ... ].',
    correctText: 'tránh',
    acceptableAnswers: ['tránh', 'tranh'],
    explanation: 'Nói giảm nói tránh là một trong những biện pháp nghệ thuật tu từ trọng tâm trong chương trình Ngữ văn lớp 7.'
  },
  // 4. Hỏi - đáp ngắn
  {
    id: 'pq-tv7-sa-1',
    topicId: 'tieng-viet-7',
    topicName: 'Thực hành Tiếng Việt 7',
    type: 'short_answer',
    question: 'Khi nào học sinh lớp 7 nên và không nên sử dụng biện pháp tu từ nói giảm nói tránh?',
    sampleAnswer: 'NÊN dùng khi chia buồn, nhận xét khuyết điểm của bạn bè để tế nhị, lịch sự và giữ gìn tình cảm. KHÔNG NÊN dùng khi cần phê bình nghiêm túc sai phạm, khi báo cáo sự việc khẩn cấp đòi hỏi tính chuẩn xác tuyệt đối hoặc trong các văn bản hành chính.',
    keyPoints: [
      'Nên dùng: Chia sẻ nỗi đau buồn, góp ý tế nhị khuyết điểm',
      'Không nên dùng: Báo cáo trung thực vi phạm, biên bản hành chính, tình huống cấp bách'
    ],
    explanation: 'Hiểu đúng ngữ cảnh giao tiếp giúp học sinh vận dụng tiếng Việt văn minh, hiệu quả và có văn hóa.'
  }
];

export const PRACTICE_TOPIC_OPTIONS = [
  { id: 'all', name: 'Tất cả chủ đề đang học' },
  { id: 'bau-troi-tuoi-tho', name: 'Chủ đề 1: Bầu trời tuổi thơ (Bầy chim chìa vôi, Đi lấy mật)' },
  { id: 'khuc-nhac-tam-hon', name: 'Chủ đề 2: Khúc nhạc tâm hồn (Đồng dao mùa xuân, Gặp lá cơm nếp, Sang thu)' },
  { id: 'tri-tue-dan-gian', name: 'Chủ đề 3: Trí tuệ dân gian & Bài học cuộc sống (Ếch ngồi đáy giếng, Thầy bói xem voi)' },
  { id: 'tieng-viet-7', name: 'Chủ đề 4: Thực hành Tiếng Việt (Nói giảm nói tránh, Nói quá, Tu từ)' },
  { id: 'custom-only', name: 'Bộ câu hỏi tự tạo của em (LocalStorage)' }
];
