import { FlashCardItem, FlashCardSubject, FlashCardCategory } from '../types/literature';

export const FLASHCARD_SUBJECTS: { id: FlashCardSubject; name: string; icon: string }[] = [
  { id: 'literature', name: 'Ngữ văn', icon: 'BookOpen' },
  { id: 'natural_sciences', name: 'Khoa học tự nhiên', icon: 'Atom' },
  { id: 'history_geography', name: 'Lịch sử & Địa lý', icon: 'Compass' },
  { id: 'english', name: 'Tiếng Anh', icon: 'Globe' },
  { id: 'math', name: 'Toán học', icon: 'Calculator' },
  { id: 'civics', name: 'Giáo dục công dân', icon: 'ShieldCheck' },
  { id: 'other', name: 'Môn học khác', icon: 'Layers' },
];

export const FLASHCARD_CATEGORIES: { id: FlashCardCategory; name: string; description: string; badgeColor: string }[] = [
  { id: 'concept', name: 'Khái niệm & Thuật ngữ', description: 'Thuật ngữ, tên gọi và bản chất', badgeColor: 'bg-blue-100 text-blue-900 border-blue-200' },
  { id: 'definition', name: 'Định nghĩa', description: 'Định nghĩa chính xác, cốt lõi', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
  { id: 'example', name: 'Ví dụ minh họa', description: 'Dẫn chứng cụ thể, áp dụng thực tế', badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' },
  { id: 'comparison', name: 'Phân biệt & So sánh', description: 'So sánh điểm giống/khác nhau, tránh nhầm lẫn', badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' },
  { id: 'rule_note', name: 'Quy tắc & Lưu ý', description: 'Công thức, quy tắc làm bài, lỗi cần tránh', badgeColor: 'bg-rose-100 text-rose-900 border-rose-200' },
];

export const INITIAL_FLASHCARDS: FlashCardItem[] = [
  // ==========================
  // 1. NGỮ VĂN
  // ==========================
  {
    id: 'fc-lit-1',
    subject: 'literature',
    subjectName: 'Ngữ văn',
    category: 'definition',
    topic: 'Thực hành Tiếng Việt',
    front: 'Biện pháp tu từ Nói giảm nói tránh là gì?',
    back: 'Là biện pháp tu từ dùng cách diễn đạt tế nhị, uyển chuyển nhằm tránh gây cảm giác quá đau buồn, ghê sợ, nặng nề hoặc tránh thô tục, thiếu lịch sự.',
    example: 'Ví dụ: Dùng "Bác đã đi rồi sao Bác ơi!" (Tố Hữu) thay vì dùng từ "Bác đã mất".',
    notes: 'Lưu ý: Không dùng nói giảm nói tránh khi cần thông báo sự thật chính xác, khẩn cấp hoặc lập biên bản hành chính.',
    tags: ['Biện pháp tu từ', 'Tiếng Việt 7']
  },
  {
    id: 'fc-lit-2',
    subject: 'literature',
    subjectName: 'Ngữ văn',
    category: 'comparison',
    topic: 'Thực hành Tiếng Việt',
    front: 'Phân biệt biện pháp Nói quá và Hành vi nói dối / nói khoác?',
    back: '• Nói quá: Biện pháp tu từ phóng đại quy mô/tính chất nhằm nhấn mạnh, gây ấn tượng nghệ thuật, người nghe vẫn hiểu đúng sự thật.\n• Nói dối / nói khoác: Hành vi nói sai sự thật nhằm lừa gạt, làm người khác hiểu lầm hoặc khoe khoang tiêu cực.',
    example: 'Nói quá: "Bàn chân người lính xẻ dọc Trường Sơn đi cứu nước" (tôn vinh ý chí phi thường).',
    notes: 'Quy tắc: Nói quá có giá trị thẩm mỹ tích cực; nói dối mang động cơ tiêu cực, thiếu trung thực.',
    tags: ['Phân biệt tu từ', 'Nói quá']
  },
  {
    id: 'fc-lit-3',
    subject: 'literature',
    subjectName: 'Ngữ văn',
    category: 'rule_note',
    topic: 'Kỹ năng làm thơ',
    front: 'Quy tắc gieo vần và ngắt nhịp của Thơ bốn chữ và năm chữ?',
    back: '• Thơ 4 chữ: Thường ngắt nhịp 2/2 hoặc 1/3; gieo vần chân hoặc vần lưng, vần liền hoặc vần cách.\n• Thơ 5 chữ: Thường ngắt nhịp 3/2 hoặc 2/3, tạo âm hưởng biến đổi linh hoạt.',
    example: 'Ví dụ thơ 4 chữ: "Có một người lính / Đi vào núi xanh / Những năm máu lửa" (ngắt nhịp 2/2, vần cách: xanh - anh).',
    notes: 'Lưu ý: Nhịp điệu thơ 4 chữ gần với đồng dao, thích hợp kể chuyện, ngợi ca; thơ 5 chữ giàu chất tự sự trữ tình.',
    tags: ['Thể thơ', 'Quy tắc gieo vần']
  },
  {
    id: 'fc-lit-4',
    subject: 'literature',
    subjectName: 'Ngữ văn',
    category: 'concept',
    topic: 'Văn bản đọc hiểu',
    front: 'Nhan đề truyện ngắn "Bầy chim chìa vôi" của Nguyễn Quang Thiều mang biểu tượng gì?',
    back: '"Bầy chim chìa vôi" là biểu tượng cho mầm sống non nớt, thánh thiện nhưng tiềm tàng sức sống bền bỉ trước bão lũ; đồng thời là điểm tựa khơi dậy lòng nhân ái, tình yêu thiên nhiên trong sáng của tuổi thơ.',
    example: 'Chi tiết giọt nước mắt nghẹn ngào của Mon và Mên khi bầy chim non cất cánh bay lên trên bãi cát sông Đáy.',
    notes: 'Lưu ý: Trả lời câu hỏi phân tích nhan đề cần nêu đủ 2 vế: Nghĩa đen (loài chim) và Nghĩa biểu tượng (tấm lòng tuổi thơ).',
    tags: ['Bầy chim chìa vôi', 'Ý nghĩa biểu tượng']
  },

  // ==========================
  // 2. KHOA HỌC TỰ NHIÊN
  // ==========================
  {
    id: 'fc-sci-1',
    subject: 'natural_sciences',
    subjectName: 'Khoa học tự nhiên',
    category: 'definition',
    topic: 'Hóa học cơ bản',
    front: 'Nguyên tử (Atom) là gì và cấu tạo gồm những hạt nào?',
    back: 'Nguyên tử là hạt vô cùng nhỏ, trung hòa về điện, cấu tạo nên các chất.\nCấu tạo nguyên tử gồm 2 phần:\n1. Hạt nhân ở tâm (gồm proton mang điện dương p+ và neutron không mang điện n).\n2. Vỏ nguyên tử gồm các electron mang điện âm (e-) chuyển động xung quanh.',
    example: 'Nguyên tử Carbon có 6 proton, 6 neutron trong hạt nhân và 6 electron ở lớp vỏ.',
    notes: 'Quy tắc vàng: Trong mọi nguyên tử, số proton (p) luôn bằng số electron (e).',
    tags: ['Nguyên tử', 'Hạt nhân', 'KHTN 7']
  },
  {
    id: 'fc-sci-2',
    subject: 'natural_sciences',
    subjectName: 'Khoa học tự nhiên',
    category: 'comparison',
    topic: 'Chất tinh khiết',
    front: 'Phân biệt Đơn chất và Hợp chất?',
    back: '• Đơn chất: Những chất được tạo nên từ MỘT nguyên tố hóa học duy nhất (Ví dụ: Kim loại sắt Fe, khí oxi O2, khí nitơ N2).\n• Hợp chất: Những chất được tạo nên từ HAI hay NHIỀU nguyên tố hóa học khác nhau kết hợp (Ví dụ: Nước H2O, muối ăn NaCl, khí cacbonic CO2).',
    example: 'Khí Oxi (O2) là đơn chất; Nước cất (H2O gồm H và O) là hợp chất.',
    notes: 'Lưu ý: Đừng nhầm lẫn giữa "Hỗn hợp" (trộn nhiều chất không phản ứng) và "Hợp chất" (liên kết hóa học xác định).',
    tags: ['Đơn chất', 'Hợp chất', 'Phân biệt']
  },
  {
    id: 'fc-sci-3',
    subject: 'natural_sciences',
    subjectName: 'Khoa học tự nhiên',
    category: 'rule_note',
    topic: 'Vật lý chuyển động',
    front: 'Công thức tính Tốc độ chuyển động và quy tắc đổi đơn vị m/s sang km/h?',
    back: '• Công thức: v = s / t (Trong đó: v là tốc độ, s là quãng đường, t là thời gian).\n• Đơn vị hợp pháp: m/s (mét trên giây) hoặc km/h (kilômét trên giờ).\n• Quy tắc đổi nhanh:\n  - Từ m/s sang km/h: NHÂN với 3,6\n  - Từ km/h sang m/s: CHIA cho 3,6',
    example: '10 m/s = 10 × 3,6 = 36 km/h. Ngược lại, 72 km/h = 72 : 3,6 = 20 m/s.',
    notes: 'Lưu ý: Trước khi áp dụng công thức v = s / t, quãng đường và thời gian phải cùng một hệ đơn vị (m & s, hoặc km & h).',
    tags: ['Tốc độ', 'Công thức Vật lý']
  },

  // ==========================
  // 3. LỊCH SỬ & ĐỊA LÝ
  // ==========================
  {
    id: 'fc-his-1',
    subject: 'history_geography',
    subjectName: 'Lịch sử & Địa lý',
    category: 'concept',
    topic: 'Lịch sử thế giới',
    front: 'Các cuộc phát kiến địa lý (thế kỷ XV - XVI) là gì và ai là người đầu tiên tìm ra châu Mỹ?',
    back: 'Là những chuyến thám hiểm đường biển của các nhà hàng hải Tây Âu nhằm tìm kiếm những con đường biển mới sang các nước phương Đông.\nNăm 1492, Cristoforo Colombo (Cô-lôm-bô) dẫn đầu đoàn thám hiểm vượt Đại Tây Dương và phát hiện ra châu Mỹ.',
    example: 'Chuyến đi vòng quanh Trái Đất đầu tiên bằng đường biển do Phéc-năng Ma-gien-lan (Magellan) chỉ huy (1519 - 1522).',
    notes: 'Lưu ý: Colombo cho đến khi qua đời vẫn tin rằng mình đã đặt chân đến bờ đông Ấn Độ.',
    tags: ['Phát kiến địa lý', 'Lịch sử 7']
  },
  {
    id: 'fc-his-2',
    subject: 'history_geography',
    subjectName: 'Lịch sử & Địa lý',
    category: 'comparison',
    topic: 'Địa lý châu Á',
    front: 'Phân biệt Gió mùa mùa hạ và Gió mùa mùa đông ở khu vực Nam Á và Đông Nam Á?',
    back: '• Gió mùa mùa hạ: Thổi từ đại dương vào lục địa (hướng Tây Nam), tính chất nóng ẩm, mang lại lượng mưa lớn.\n• Gió mùa mùa đông: Thổi từ áp cao lục địa ra biển (hướng Đông Bắc), tính chất lạnh và khô hạn.',
    example: 'Vào mùa hạ, miền Bắc Việt Nam có mưa rào và bão; mùa đông có gió mùa Đông Bắc gây rét buốt.',
    notes: 'Quy tắc: Gió thổi từ biển vào luôn đem lại hơi ẩm gây mưa; gió thổi từ sâu trong lục địa luôn khô ráo.',
    tags: ['Gió mùa', 'Khí hậu châu Á']
  },

  // ==========================
  // 4. TIẾNG ANH
  // ==========================
  {
    id: 'fc-eng-1',
    subject: 'english',
    subjectName: 'Tiếng Anh',
    category: 'comparison',
    topic: 'Grammar',
    front: 'Phân biệt Past Simple (Quá khứ đơn) và Present Perfect (Hiện tại hoàn thành)?',
    back: '• Past Simple: Diễn tả hành động ĐÃ CHẤM DỨT tại thời điểm XÁC ĐỊNH trong quá khứ (Dấu hiệu: yesterday, last week, in 2020, ago).\n• Present Perfect: Diễn tả hành động xảy ra trong quá khứ nhưng KẾT QUẢ hoặc DẤU VẾT còn lưu đến hiện tại, hoặc thời gian KHÔNG xác định (Dấu hiệu: already, yet, since, for, ever, just).',
    example: 'Past Simple: "I bought this book yesterday."\nPresent Perfect: "I have already read this book."',
    notes: 'Quy tắc: Có mốc thời gian cụ thể trong quá khứ (in 1995, yesterday) -> BẮT BUỘC dùng Past Simple, không dùng Present Perfect.',
    tags: ['Tenses', 'Grammar Rule']
  },
  {
    id: 'fc-eng-2',
    subject: 'english',
    subjectName: 'Tiếng Anh',
    category: 'rule_note',
    topic: 'Comparative Adjectives',
    front: 'Quy tắc so sánh hơn với Tính từ ngắn và Tính từ dài?',
    back: '• Tính từ ngắn (1 âm tiết): S1 + be + adj-ER + than + S2 (Ví dụ: tall -> taller, fast -> faster).\n• Tính từ dài (2 âm tiết trở lên): S1 + be + MORE + adj + than + S2 (Ví dụ: beautiful -> more beautiful).\n• Trường hợp đặc biệt bất quy tắc: good -> better, bad -> worse, far -> farther/further.',
    example: 'Example: "He is taller than his brother." / "This car is more expensive than that one."',
    notes: 'Lưu ý: Tính từ 2 âm tiết tận cùng là -y (happy, easy) đổi y thành i rồi thêm -er (happier, easier).',
    tags: ['So sánh hơn', 'Adjectives']
  },

  // ==========================
  // 5. TOÁN HỌC
  // ==========================
  {
    id: 'fc-math-1',
    subject: 'math',
    subjectName: 'Toán học',
    category: 'definition',
    topic: 'Đại số 7',
    front: 'Số hữu tỉ là gì và tập hợp số hữu tỉ được ký hiệu là gì?',
    back: 'Số hữu tỉ là số viết được dưới dạng phân số a/b với a, b thuộc Z (tập hợp số nguyên) và b khác 0.\nTập hợp các số hữu tỉ được ký hiệu là chữ Q.',
    example: 'Các số 0,5 (= 1/2); -3 (= -3/1); 0 (= 0/1); 1 1/3 (= 4/3) đều là số hữu tỉ.',
    notes: 'Quy tắc: Mọi số nguyên đều là số hữu tỉ vì số nguyên n luôn viết được thành n/1.',
    tags: ['Số hữu tỉ', 'Tập hợp Q']
  },
  {
    id: 'fc-math-2',
    subject: 'math',
    subjectName: 'Toán học',
    category: 'rule_note',
    topic: 'Hình học 7',
    front: 'Tính chất của hai đường thẳng song song bị cắt bởi một đường thẳng thứ ba?',
    back: 'Nếu đường thẳng c cắt hai đường thẳng song song a và b thì:\n1. Hai góc so le trong bằng nhau.\n2. Hai góc đồng vị bằng nhau.\n3. Hai góc trong cùng phía bù nhau (tổng số đo bằng 180°).',
    example: 'Nếu góc A1 (so le trong) = 60° thì góc B2 (so le trong tương ứng) cũng bằng 60°.',
    notes: 'Quy tắc nhận biết: Muốn chứng minh a // b, chỉ cần chỉ ra 1 cặp góc so le trong bằng nhau hoặc 1 cặp góc đồng vị bằng nhau.',
    tags: ['Hai đường thẳng song song', 'Hình học']
  },

  // ==========================
  // 6. GIÁO DỤC CÔNG DÂN
  // ==========================
  {
    id: 'fc-civ-1',
    subject: 'civics',
    subjectName: 'Giáo dục công dân',
    category: 'definition',
    topic: 'Đạo đức & Kỹ năng sống',
    front: 'Giữ chữ tín là gì và biểu hiện cụ thể của người biết giữ chữ tín?',
    back: 'Giữ chữ tín là coi trọng lòng tin của mọi người đối với mình, biết trọng lời hứa và biết tin tưởng nhau.\nBiểu hiện:\n- Nói đi đôi với làm, hoàn thành đúng hẹn các lời hứa.\n- Tôn trọng và bảo vệ danh dự, lời nói của bản thân.',
    example: 'Hứa nộp bài tập đúng hạn cho thầy cô và nghiêm túc thực hiện; đúng giờ khi hẹn bạn bè.',
    notes: 'Lời khuyên: "Nói lời phải giữ lấy lời / Đừng như con bướm đậu rồi lại bay".',
    tags: ['Giữ chữ tín', 'GDCD 7']
  }
];

export const FLASHCARDS: FlashCardItem[] = INITIAL_FLASHCARDS;
