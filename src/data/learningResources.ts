import { LearningResourceItem, GlossaryTerm, CurriculumComparisonItem } from '../types/literature';

export const CURRICULUM_COMPARISONS: CurriculumComparisonItem[] = [
  {
    unit: 1,
    semester: 1,
    coreTheme: 'Thế giới tuổi thơ & Gia đình bè bạn (Truyện ngắn hiện đại)',
    ketNoi: {
      unitName: 'Bài 1: Bầu trời tuổi thơ',
      keyWorks: ['Bầy chim chìa vôi (Nguyễn Quang Thiều)', 'Đi lấy mật (Đoàn Giỏi)', 'Ngàn sao làm việc (Võ Quảng)']
    },
    canhDieu: {
      unitName: 'Bài 1: Truyện ngắn và tiểu thuyết',
      keyWorks: ['Người đàn ông cô độc giữa rừng (Đoàn Giỏi)', 'Buổi học cuối cùng (Alphonse Daudet)', 'Dọc đường xứ Nghệ']
    },
    chanTroi: {
      unitName: 'Bài 1: Tiếng nói của vạn vật',
      keyWorks: ['Lời của cây (Trần Đăng Khoa)', 'Sang thu (Hữu Thỉnh)', 'Ông Một (Vũ Hùng)']
    },
    mainCompetency: 'Nhận biết đề tài, cốt truyện, nhân vật, ngôi kể và chi tiết tiêu biểu; cảm nhận tình cảm yêu thương thế giới muôn loài.'
  },
  {
    unit: 2,
    semester: 1,
    coreTheme: 'Tình cảm gia đình & Quê hương đất nước (Thơ bốn chữ, năm chữ)',
    ketNoi: {
      unitName: 'Bài 2: Khúc nhạc tâm hồn',
      keyWorks: ['Đồng dao mùa xuân (Nguyễn Khoa Điềm)', 'Gặp lá cơm nếp (Thanh Thảo)', 'Trở gió (Nguyễn Ngọc Tư)']
    },
    canhDieu: {
      unitName: 'Bài 2: Thơ bốn chữ, năm chữ',
      keyWorks: ['Mẹ (Đỗ Trung Lai)', 'Ông đồ (Vũ Đình Liên)', 'Tiếng gà trưa (Xuân Quỳnh)']
    },
    chanTroi: {
      unitName: 'Bài 2: Bài học cuộc sống',
      keyWorks: ['Những cái nhìn hạn hẹp', 'Biết người, biết ta', 'Chân, tay, tai, mắt, miệng']
    },
    mainCompetency: 'Nhận biết thể thơ bốn chữ, năm chữ, vần, nhịp, hình ảnh thơ và tình cảm, cảm xúc của người viết.'
  },
  {
    unit: 3,
    semester: 1,
    coreTheme: 'Trí tuệ dân gian & Bài học đối nhân xử thế (Truyện ngụ ngôn, Tục ngữ)',
    ketNoi: {
      unitName: 'Bài 3: Cội nguồn yêu thương & Thơ văn nghị luận',
      keyWorks: ['Vừa nhắm mắt vừa mở cửa sổ', 'Người thầy đầu tiên', 'Hình ảnh hoa sen']
    },
    canhDieu: {
      unitName: 'Bài 3: Truyện ngụ ngôn và tục ngữ',
      keyWorks: ['Ếch ngồi đáy giếng', 'Thầy bói xem voi', 'Đeo nhạc cho mèo', 'Tục ngữ về thiên nhiên']
    },
    chanTroi: {
      unitName: 'Bài 3: Những góc nhìn văn chương',
      keyWorks: ['Em bé thông minh', 'Hình ảnh hoa sen trong bài ca dao', 'Bức thư gửi thủ lĩnh da đỏ']
    },
    mainCompetency: 'Nhận diện tình huống truyện, tính cách nhân vật ngụ ngôn, rút ra bài học triết lý và ứng xử khiêm tốn.'
  },
  {
    unit: 4,
    semester: 2,
    coreTheme: 'Thiên nhiên tươi đẹp & Đất nước bốn mùa (Tùy bút, Tản văn)',
    ketNoi: {
      unitName: 'Bài 7: Giai điệu đất nước',
      keyWorks: ['Mùa xuân của tôi (Vũ Bằng)', 'Sài Gòn tôi yêu (Minh Hương)', 'Ca Huế trên sông Hương']
    },
    canhDieu: {
      unitName: 'Bài 6: Tùy bút và tản văn',
      keyWorks: ['Cây tre Việt Nam (Thép Mới)', 'Người ngồi đợi trước hiên nhà (Huỳnh Như Phương)', 'Trưa tha hương']
    },
    chanTroi: {
      unitName: 'Bài 6: Hành trình tri thức',
      keyWorks: ['Tự học - một thú chơi thanh nhã', 'Bàn về đọc sách', 'Đừng từ bỏ ước mơ']
    },
    mainCompetency: 'Nhận biết chất trữ tình, cái "tôi" tác giả, sự kết hợp giữa tự sự và miêu tả cảm xúc trong thể loại tùy bút, tản văn.'
  },
  {
    unit: 5,
    semester: 2,
    coreTheme: 'Lòng yêu nước & Trách nhiệm công dân (Văn bản nghị luận xã hội)',
    ketNoi: {
      unitName: 'Bài 8: Trải nghiệm để trưởng thành',
      keyWorks: ['Tinh thần yêu nước của nhân dân ta (Hồ Chí Minh)', 'Đức tính giản dị của Bác Hồ', 'Ý nghĩa văn chương']
    },
    canhDieu: {
      unitName: 'Bài 8: Văn bản nghị luận',
      keyWorks: ['Tinh thần yêu nước của nhân dân ta', 'Sự giàu đẹp của tiếng Việt', 'Đức tính giản dị của Bác Hồ']
    },
    chanTroi: {
      unitName: 'Bài 8: Nét đẹp văn hóa Việt',
      keyWorks: ['Trò chơi cướp cờ', 'Cách gọt củ hoa thủy tiên', 'Hương cốm mùa thu']
    },
    mainCompetency: 'Nhận diện luận đề, luận điểm, lý lẽ và bằng chứng; phân tích tính thuyết phục của văn chính luận.'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'term-1',
    term: 'Điểm nhìn trần thuật (Narrative Perspective)',
    category: 'Truyện',
    definition: 'Vị trí quan sát, cảm nhận và đánh giá của người kể chuyện đối với toàn bộ sự việc, con người và thế giới trong tác phẩm văn xuôi.',
    manifestation: 'Trong "Bầy chim chìa vôi", điểm nhìn có lúc đặt ở hai đứa trẻ (Mên và Mon) với tâm trạng lo âu hồi hộp, có lúc mở rộng bao quát dải cát sông Đáy.',
    example: '“Hai đứa bé nằm trong chăn lắng nghe tiếng mưa rơi và trò chuyện thì thào...”'
  },
  {
    id: 'term-2',
    term: 'Người kể chuyện ngôi thứ nhất & ngôi thứ ba',
    category: 'Truyện',
    definition: 'Ngôi thứ nhất (xưng "tôi", trực tiếp tham gia câu chuyện, tăng tính chân thực và biểu cảm nội tâm); Ngôi thứ ba (người kể giấu mình, biết hết mọi sự việc và tâm trạng nhân vật).',
    manifestation: 'Đoạn trích "Đi lấy mật" kể theo ngôi thứ nhất (nhân vật An xưng "tôi"), giúp người đọc cảm nhận sự ngạc nhiên và say mê khám phá rừng U Minh.',
    example: '“Tía nuôi tôi bước đi thoăn thoắt... Cò lách chanh chạy trước...”'
  },
  {
    id: 'term-3',
    term: 'Thể thơ bốn chữ & Thơ năm chữ',
    category: 'Thơ',
    definition: 'Thể thơ mỗi dòng gồm bốn hoặc năm tiếng, có cách ngắt nhịp linh hoạt (2/2 đối với thơ 4 chữ; 2/3 hoặc 3/2 đối với thơ 5 chữ), thường gieo vần chân hoặc vần lưng, mang âm điệu mộc mạc, gần gũi như đồng dao hay lời ru.',
    manifestation: '"Đồng dao mùa xuân" (thơ 4 chữ) và "Gặp lá cơm nếp" (thơ 5 chữ) mang âm điệu dạt dào ân tình, dễ thuộc, dễ rung động.',
    example: '“Có một người lính / Đi vào núi xanh / Những năm máu lửa...” (nhịp 2/2)'
  },
  {
    id: 'term-4',
    term: 'Chất trữ tình trong Tùy bút & Tản văn',
    category: 'Ký - Tùy bút',
    definition: 'Yếu tố bộc lộ trực tiếp tình cảm, cảm xúc, rung động thẩm mỹ chủ quan và thế giới nội tâm phong phú của người viết trước thiên nhiên và đời sống con người.',
    manifestation: 'Trong "Mùa xuân của tôi", Vũ Bằng không chỉ miêu tả mưa xuân, gió lạnh mà gửi gắm toàn bộ nỗi nhớ thương quê mẹ và tình yêu da diết dành cho đất Bắc.',
    example: '“Tự nhiên như thế: ai cũng chuộng mùa xuân... Ai bảo được người mê luyến mùa xuân!”'
  },
  {
    id: 'term-5',
    term: 'Luận đề, Luận điểm, Lí lẽ và Dẫn chứng',
    category: 'Nghị luận',
    definition: 'Hệ thống cốt lõi của văn nghị luận: Luận đề (vấn đề bao trùm); Luận điểm (các ý lớn làm sáng tỏ luận đề); Lí lẽ (lời giải thích, lập luận); Dẫn chứng (bằng chứng thực tế, số liệu, câu chuyện minh họa).',
    manifestation: 'Trong "Tinh thần yêu nước của nhân dân ta", luận đề là lòng yêu nước nồng nàn; luận điểm chia theo lịch sử và hiện tại; dẫn chứng bao quát từ già đến trẻ, từ miền xuôi đến miền ngược.',
    example: 'Luận đề: Dân ta có lòng nồng nàn yêu nước -> Luận điểm: Lịch sử vẻ vang thời phong kiến & Cuộc kháng chiến hiện tại.'
  },
  {
    id: 'term-6',
    term: 'Nói giảm nói tránh & Điệp ngữ',
    category: 'Tiếng Việt',
    definition: 'Nói giảm nói tránh là cách diễn đạt tế nhị giảm đau buồn, thô tục; Điệp ngữ là biện pháp lặp lại từ ngữ/câu để nhấn mạnh cảm xúc hoặc tạo nhịp điệu dồn dập.',
    manifestation: 'Câu thơ "Anh không về nữa" (nói giảm nói tránh cái chết của người lính) và điệp từ "Anh..." khắc sâu sự hy sinh bất tử.',
    example: '“Anh không về nữa / Anh ngồi một mình / Mùa xuân vĩnh hằng...”'
  },
  {
    id: 'term-7',
    term: 'Nhân vật truyện ngụ ngôn & Bài học giáo huấn',
    category: 'Truyện',
    definition: 'Nhân vật thường là con vật, đồ vật được nhân hóa hoặc con người có tính cách phiến diện nhằm phản ánh thói hư tật xấu và đúc kết triết lý sống khuyên răn con người.',
    manifestation: 'Con ếch (thói tự phụ, kiêu ngạo) và 5 thầy bói mù (thói chủ quan, bảo thủ, phiến diện) trong truyện dân gian.',
    example: 'Hình ảnh con ếch bị trâu giẫm bẹp cảnh tỉnh lối sống nghênh ngang, ảo tưởng.'
  }
];

export const LEARNING_RESOURCES: LearningResourceItem[] = [
  {
    id: 'res-de-giua-ki-1',
    title: 'Đề kiểm tra Giữa học kì 1 - Ngữ văn 7 (Có Ma trận đặc tả & Đáp án chi tiết)',
    category: 'exam_bank',
    textbook: 'all',
    semester: 1,
    format: 'Ma trận đề thi',
    description: 'Đề kiểm tra 90 phút cấu trúc chuẩn theo Thông tư 22 & Công văn 3175/BGDĐT. Phần Đọc hiểu (6.0 điểm) sử dụng ngữ liệu thơ 4 chữ/5 chữ ngoài SGK; Phần Viết (4.0 điểm) yêu cầu ghi lại cảm xúc về bài thơ.',
    previewSnippet: 'Khung ma trận: Nhận biết (40%), Thông hiểu (30%), Vận dụng (20%), Vận dụng cao (10%). Ngữ liệu đọc hiểu: Bài thơ "Lời của cây" (Trần Đăng Khoa)...',
    tags: ['Đề thi giữa kì', 'Ma trận đặc tả', 'Đáp án biểu điểm', 'Chuẩn GDPT 2018'],
    content: `UBND QUẬN/HUYỆN: ....................
TRƯỜNG THCS: .............................

MA TRẬN & ĐỀ KIỂM TRA ĐÁNH GIÁ GIỮA HỌC KÌ I
MÔN: NGỮ VĂN 7 (NĂM HỌC 2026 - 2027)
Thời gian làm bài: 90 phút (Không kể thời gian phát đề)

==================================================
PHẦN I. ĐỌC HIỂU (6,0 ĐIỂM)
Đọc đoạn trích sau và thực hiện các yêu cầu:

"Khi cây bén rễ
Lá non xanh rờn
Ngậm giọt sương sớm
Đón ánh bình minh.

Cây lớn từng ngày
Rung rinh trong gió
Cây mang bóng mát
Cho bầy chim non.

Cây ơi hãy lớn
Xanh ngát chân trời
Lặng thầm dâng hiến
Sắc xuân cho đời."
(Trích "Khúc ca mầm xanh" - Ngữ liệu mở GDPT 2018)

Câu 1 (Nhận biết - 0.5đ): Bài thơ trên được sáng tác theo thể thơ nào? Chỉ ra cách ngắt nhịp phổ biến trong bài thơ.
Câu 2 (Nhận biết - 0.5đ): Tìm các từ ngữ miêu tả sức sống của cây trong khổ thơ thứ nhất.
Câu 3 (Thông hiểu - 1.0đ): Chỉ ra và nêu tác dụng của biện pháp tu từ nhân hóa được sử dụng trong dòng thơ: "Lặng thầm dâng hiến / Sắc xuân cho đời".
Câu 4 (Thông hiểu - 1.0đ): Tình cảm của tác giả đối với cây xanh và thiên nhiên được thể hiện như thế nào trong bài thơ?
Câu 5 (Thông hiểu - 1.0đ): Tìm một từ Hán Việt có trong khổ cuối và giải nghĩa từ đó.
Câu 6 (Vận dụng - 2.0đ): Từ bài thơ trên, em hãy viết một đoạn văn ngắn (khoảng 5 - 7 câu) nêu suy nghĩ về trách nhiệm của học sinh trong việc bảo vệ cây xanh và môi trường sống quanh em.

--------------------------------------------------
PHẦN II. LÀM VĂN (4,0 ĐIỂM)
Đề bài: Viết đoạn văn (khoảng 150 - 200 chữ) ghi lại cảm xúc của em về một bài thơ bốn chữ hoặc năm chữ mà em yêu thích (Gợi ý: "Đồng dao mùa xuân" của Nguyễn Khoa Điềm hoặc "Gặp lá cơm nếp" của Thanh Thảo).

==================================================
HƯỚNG DẪN CHẤM & BIỂU ĐIỂM CHI TIẾT
PHẦN I: ĐỌC HIỂU (6.0 điểm)
- Câu 1: Thể thơ bốn chữ (0.25đ); Nhịp 2/2 nhịp nhàng, êm dịu (0.25đ).
- Câu 2: Các từ ngữ: "bén rễ", "lá non xanh rờn", "ngậm giọt sương", "đón ánh bình minh" (0.5đ).
- Câu 3: Nhân hóa qua hành động "lặng thầm dâng hiến", "sắc xuân cho đời" (0.5đ). Tác dụng: Làm cho cây xanh trở nên có linh hồn, biểu tượng cho lối sống cống hiến âm thầm, cao đẹp không màng vụ lợi (0.5đ).
- Câu 4: Tình yêu thiên nhiên trong sáng, niềm nâng niu, trân trọng và mong ước vạn vật tốt tươi dâng hiến cho đời (1.0đ).
- Câu 5: Từ Hán Việt: "dâng hiến" hoặc "sắc xuân" (0.5đ); Giải nghĩa chính xác (0.5đ).
- Câu 6: Đoạn văn đạt chuẩn hình thức 5-7 câu (0.5đ); Nêu được thông điệp nhận thức và hành động thiết thực: trồng cây, không bẻ cành bứt lá, giữ gìn vệ sinh trường lớp (1.5đ).

PHẦN II: LÀM VĂN (4.0 điểm)
- Đảm bảo cấu trúc đoạn văn biểu cảm: Mở đoạn giới thiệu bài thơ & cảm xúc chung; Thân đoạn làm rõ cảm xúc về vần, nhịp, hình ảnh thơ và biện pháp tu từ; Kết đoạn khái quát giá trị bài thơ (1.0đ).
- Trọng tâm nội dung: Thể hiện cảm xúc chân thành, sâu sắc, biết trích dẫn từ ngữ giàu hình ảnh (2.0đ).
- Diễn đạt trong sáng, không sai chính tả, sáng tạo trong cách diễn đạt (1.0đ).`
  },
  {
    id: 'res-de-cuoi-ki-1',
    title: 'Đề thi Học kì 1 chuẩn - Ngữ văn 7 (Văn bản truyện ngụ ngôn & Nghị luận)',
    category: 'exam_bank',
    textbook: 'all',
    semester: 1,
    format: 'Ma trận đề thi',
    description: 'Đề kiểm tra tổng hợp cuối học kì 1 gồm phần trắc nghiệm khách quan (8 câu - 4.0 điểm) và phần tự luận viết bài văn phân tích nhân vật hoặc bài học cuộc sống (6.0 điểm).',
    previewSnippet: 'Thời gian: 90 phút. Văn bản đọc hiểu: Câu chuyện ngụ ngôn về hai hạt lúa mầm. Phần viết: Phân tích nhân vật cậu bé Mon trong Bầy chim chìa vôi...',
    tags: ['Đề thi cuối kì 1', 'Phân tích nhân vật', 'Trắc nghiệm & Tự luận'],
    content: `ĐỀ THI ĐÁNH GIÁ CUỐI HỌC KÌ I - MÔN NGỮ VĂN 7
Thời gian: 90 phút

A. PHẦN ĐỌC HIỂU (4,0 ĐIỂM)
Đọc câu chuyện sau:
"Có hai hạt lúa nọ được người chủ giữ lại làm giống. Một hạt lúa tự nhủ: 'Nếu ta gieo mình xuống đất, thân ta sẽ nát tan trong bùn đen ẩm ướt, chịu lạnh lẽo tối tăm, ta muốn giữ nguyên hình hài vàng óng này'. Thế là nó tìm cách lăn vào góc tối của kho chứa.
Hạt lúa thứ hai lại nghĩ khác: 'Dù phải vùi mình trong đất lạnh, ta vẫn muốn nảy mầm để dâng cho đời những mùa bông trĩu hạt'. Người nông dân đem nó gieo xuống đồng đất. Chẳng bao lâu, hạt lúa nảy mầm vươn lên thành cây lúa xanh tốt, kết thành trăm hạt lúa vàng mới. Còn hạt lúa trong góc kho ngày nào dần bị mục rữa và biến mất vô ích."

Câu 1: Câu chuyện trên thuộc thể loại nào? (Truyện ngụ ngôn / Truyện ngắn / Truyện cổ tích).
Câu 2: Hai hạt lúa có suy nghĩ và lựa chọn khác nhau như thế nào?
Câu 3: Kết cục của hai hạt lúa mang lại cho em bài học gì về lý tưởng sống của con người?
Câu 4: Chỉ ra một câu văn trong văn bản có sử dụng cụm danh từ làm chủ ngữ.

B. PHẦN TẠO LẬP VĂN BẢN (6,0 ĐIỂM)
Chọn một trong hai đề sau:
Đề 1: Viết bài văn phân tích đặc điểm nhân vật Mon trong truyện ngắn "Bầy chim chìa vôi" của nhà văn Nguyễn Quang Thiều.
Đề 2: Từ câu chuyện "Hai hạt lúa", em hãy viết bài văn nghị luận ngắn bàn về lối sống dấn thân, cống hiến thay vì sống ích kỷ, khép mình.`
  },
  {
    id: 'res-phieu-hoc-tap-peel',
    title: 'Phiếu học tập P-E-E-L: Kỹ năng Viết đoạn văn Phân tích Văn học',
    category: 'worksheet',
    textbook: 'all',
    semester: 'both',
    format: 'Phiếu học tập',
    description: 'Mẫu phiếu chuẩn quốc tế P-E-E-L (Point - Evidence - Explanation - Link) áp dụng trong dạy học phát triển năng lực Ngữ văn, giúp học sinh lớp 7 viết đoạn văn phân tích luận điểm sắc sảo, không lan man.',
    previewSnippet: 'P (Point): Nêu luận điểm chính -> E (Evidence): Dẫn chứng từ tác phẩm -> E (Explanation): Phân tích nghệ thuật và ý nghĩa -> L (Link): Móc xích kết luận...',
    tags: ['Phương pháp P-E-E-L', 'Phiếu học tập', 'Viết đoạn văn', 'Tự học'],
    content: `PHIẾU HỌC TẬP: RÈN KỸ NĂNG VIẾT ĐOẠN VĂN THEO MÔ HÌNH P-E-E-L
Dành cho học sinh lớp 7 - Môn Ngữ văn

MÔ HÌNH P-E-E-L LÀ GÌ?
1. [P] Point (Nêu luận điểm): 1 câu mở đầu khẳng định rõ đặc điểm, phẩm chất hoặc giá trị nghệ thuật của đối tượng.
2. [E] Evidence (Dẫn chứng văn bản): Trích dẫn trực tiếp (đặt trong ngoặc kép) hoặc gián tiếp lời thoại, cử chỉ, hình ảnh từ tác phẩm.
3. [E] Explanation (Phân tích & Lý giải): Giải thích từ ngữ, biện pháp tu từ, tâm lý nhân vật và ý đồ nghệ thuật của tác giả.
4. [L] Link (Móc xích & Kết nối): Khái quát lại ý nghĩa và liên hệ với chủ đề chung hoặc rút ra cảm xúc bài học.

--------------------------------------------------
BÀI TẬP ÁP DỤNG TRÊN PHIẾU:
Phân tích chi tiết giọt nước mắt của hai anh em Mên và Mon ở cuối truyện "Bầy chim chìa vôi".

[P - Câu mở]: Ở cuối thiên truyện "Bầy chim chìa vôi", hình ảnh giọt nước mắt đầm đìa trên má hai anh em Mên và Mon là chi tiết nghệ thuật đắt giá làm bừng sáng tâm hồn trẻ thơ trong trẻo.
[E - Dẫn chứng]: Tác giả đã miêu tả khoảnh khắc kỳ diệu khi bầy chim non cất cánh bay lên: "Hai anh em đứng lặng nhìn theo bầy chim, trên má chúng đầm đìa nước mắt từ lúc nào không hay".
[E - Phân tích]: Đó không phải là giọt nước mắt của sợ hãi hay yếu đuối, mà là sự giải tỏa sau cả một đêm dài phấp phỏng âu lo giữa giông bão sông Đáy. Giọt nước mắt ấy kết tinh từ niềm hạnh phúc vô bờ khi chứng kiến sự sống non nớt đã chiến thắng dòng nước xiết, đồng thời thanh lọc tâm hồn của hai đứa trẻ, đưa chúng bước vào thế giới của tình thương yêu và trách nhiệm.
[L - Kết nối]: Chi tiết cảm động này đã khép lại trang văn bằng một dư âm ngọt ngào, khẳng định sức sống bất diệt của muôn loài và vẻ đẹp thánh thiện của tuổi thơ.`
  },
  {
    id: 'res-phieu-tho-bon-chu',
    title: 'Phiếu học tập: Đặc trưng Thể loại Thơ 4 chữ & Thơ 5 chữ',
    category: 'worksheet',
    textbook: 'all',
    semester: 1,
    format: 'Phiếu học tập',
    description: 'Phiếu tổng hợp giúp học sinh tự điền và nhận diện các yếu tố hình thức thơ: số tiếng, vần (chân/lưng, liền/cách), nhịp điệu (2/2, 2/3, 3/2), hình ảnh thơ và mạch cảm xúc.',
    previewSnippet: 'Bảng đối chiếu thể thơ 4 chữ và 5 chữ. Các bài tập thực hành gieo vần và ngắt nhịp trong "Đồng dao mùa xuân" và "Gặp lá cơm nếp"...',
    tags: ['Thơ 4 chữ', 'Thơ 5 chữ', 'Vần nhịp', 'Phiếu rèn luyện'],
    content: `PHIẾU HỌC TẬP TỔNG HỢP: ĐẶC TRƯNG THƠ BỐN CHỮ & THƠ NĂM CHỮ

I. BẢNG ĐỐI CHIẾU ĐẶC ĐIỂM
1. Số tiếng trong dòng:
   - Thơ bốn chữ: Mỗi dòng có đúng 4 tiếng (Ví dụ: "Có một người lính").
   - Thơ năm chữ: Mỗi dòng có đúng 5 tiếng (Ví dụ: "Xa nhà đã mấy năm").
2. Cách ngắt nhịp:
   - Thơ 4 chữ: Thường ngắt nhịp 2/2 hoặc 1/3 (Ví dụ: "Anh thành / ngọn lửa").
   - Thơ 5 chữ: Thường ngắt nhịp 2/3 hoặc 3/2 (Ví dụ: "Thèm bát xôi / mùa gặt").
3. Gieo vần:
   - Vần liền: Tiếng cuối của 2 câu liền kề bắt vần với nhau (aaa).
   - Vần cách: Tiếng cuối của các câu cách nhau bắt vần với nhau (aba / abcb).
   - Vần chân: Vần đặt ở cuối dòng thơ.
   - Vần lưng: Vần đặt ở giữa dòng thơ.

II. BÀI TẬP VẬN DỤNG TRÊN PHIẾU
Đọc đoạn thơ sau:
"Mẹ già như chuối ba hương
Dạt dào tình mẹ yêu thương ngút ngàn
Dù cho gió dập mưa chan
Vẫn luôn che chở muôn ngàn con thơ"
a) Xác định các cặp vần chân trong đoạn thơ trên.
b) Chỉ ra hình ảnh so sánh độc đáo và nêu cảm nhận của em.`
  },
  {
    id: 'res-bang-tra-cuu-tu-han-viet',
    title: 'Sổ tay tra cứu: 50 Yếu tố Hán Việt đồng âm thường gặp trong Ngữ văn 7',
    category: 'reference_doc',
    textbook: 'all',
    semester: 'both',
    format: 'Bản in PDF/Doc',
    description: 'Tài liệu tra cứu nhanh 50 yếu tố Hán Việt thông dụng giúp học sinh phân biệt chính xác nghĩa, tránh dùng sai từ ngữ trong các bài viết và bài kiểm tra tiếng Việt.',
    previewSnippet: 'Tra cứu: Ái, Bi, Bất, Cảm, Cố, Công, Đồng, Gia, Hữu, Khắc, Nhân, Phi, Quốc, Tâm, Thủy, Tiên, Tri, Vô, Xuất...',
    tags: ['Từ Hán Việt', 'Yếu tố đồng âm', 'Sổ tay tra cứu', 'Tiếng Việt'],
    content: `SỔ TAY TRA CỨU: 50 YẾU TỐ HÁN VIỆT ĐỒNG ÂM THƯỜNG GẶP - LỚP 7

1. ĐỒNG:
   - Đồng 1 (Cùng): Đồng chí (cùng chí hướng), Đồng bào (cùng bọc trứng), Đồng hương (cùng quê), Đồng niên (cùng tuổi).
   - Đồng 2 (Trẻ con): Nhi đồng, Đồng dao (lời ca trẻ nhỏ), Đồng ấu.
   - Đồng 3 (Đồng cỏ, cánh đồng): Đồng nội.
   - Đồng 4 (Kim loại đồng): Trống đồng, Đồng thau.

2. PHI:
   - Phi 1 (Bay): Phi cơ (máy bay), Phi công (người lái máy bay), Phi hành gia.
   - Phi 2 (Trái, không đúng): Phi pháp (trái pháp luật), Phi lý, Phi nghĩa.
   - Phi 3 (Vợ vua): Hoàng phi, Quý phi, Vương phi.

3. GIA:
   - Gia 1 (Nhà): Gia đình, Gia phong (nếp nhà), Gia trưởng, Gia tài.
   - Gia 2 (Thêm vào): Gia tăng, Gia vị (chất thêm vào món ăn), Tham gia.

4. NHÂN:
   - Nhân 1 (Người): Nhân dân, Thi nhân (nhà thơ), Nhân loại.
   - Nhân 2 (Lòng thương người): Nhân ái, Nhân hậu, Nhân từ.
   - Nhân 3 (Nguyên nhân): Nguyên nhân, Nhân duyên.
   - Nhân 4 (Hạt ở trong): Nhân bánh, Nhân hạt sen.

5. BẤT:
   - Mang nghĩa "Không": Bất diệt (không mất đi), Bất khuất (không chịu khuất phục), Bất tử (không chết).

6. THỦY:
   - Thủy 1 (Nước): Thủy triều, Thủy tinh (pha lê), Thủy cung.
   - Thủy 2 (Ban đầu, trước hết): Khởi thủy, Thủy chung (trước sau như một).`
  },
  {
    id: 'res-rubrics-cham-van',
    title: 'Bảng tiêu chí đánh giá (Rubrics) chấm bài văn phân tích & biểu cảm lớp 7',
    category: 'reference_doc',
    textbook: 'all',
    semester: 'both',
    format: 'Bảng tổng hợp',
    description: 'Thang đo đánh giá 4 mức độ (Xuất sắc - Khá - Đạt - Cần cố gắng) theo chuẩn giáo dục mới, giúp học sinh tự soi chiếu và hoàn thiện bài văn trước khi nộp.',
    previewSnippet: 'Tiêu chí 1: Cấu trúc bài viết (1.0đ) | Tiêu chí 2: Hệ thống luận điểm & Dẫn chứng (4.0đ) | Tiêu chí 3: Cảm xúc & Nghệ thuật (3.0đ) | Tiêu chí 4: Ngữ pháp & Sáng tạo (2.0đ)...',
    tags: ['Rubrics', 'Tiêu chí chấm điểm', 'Tự đánh giá', 'Giáo viên & Học sinh'],
    content: `BẢNG TIÊU CHÍ ĐÁNH GIÁ (RUBRICS) BÀI VĂN PHÂN TÍCH NHÂN VẬT LỚP 7

TIÊU CHÍ 1: CẤU TRÚC VÀ BỐ CỤC (1.0 ĐIỂM)
- Mức 4 (1.0đ): Đầy đủ 3 phần Mở - Thân - Kết rõ ràng; chuyển đoạn tự nhiên, có phép nối uyển chuyển.
- Mức 3 (0.75đ): Đủ 3 phần nhưng chuyển đoạn còn hơi cứng nhắc.
- Mức 2 (0.5đ): Bố cục chưa cân đối, thân bài quá ngắn hoặc thiếu kết bài.
- Mức 1 (0.25đ): Không phân biệt các đoạn, viết liền thành một khối.

TIÊU CHÍ 2: HỆ THỐNG LUẬN ĐIỂM VÀ DẪN CHỨNG (4.0 ĐIỂM)
- Mức 4 (3.5 - 4.0đ): Nêu bật được 3 luận điểm đặc trưng của nhân vật; dẫn chứng chính xác từ văn bản; phân tích sâu sắc mối liên hệ giữa hoàn cảnh và hành động.
- Mức 3 (2.5 - 3.25đ): Nêu được 2 - 3 luận điểm; có dẫn chứng nhưng phân tích còn hơi sơ sài.
- Mức 2 (1.5 - 2.25đ): Chỉ kể lại cốt truyện, chưa biết khái quát thành luận điểm phân tích.
- Mức 1 (< 1.5đ): Lạc đề, không nắm được đặc điểm nhân vật.

TIÊU CHÍ 3: ĐÁNH GIÁ NGHỆ THUẬT VÀ TƯ TƯỞNG (3.0 ĐIỂM)
- Mức 4 (2.5 - 3.0đ): Chỉ ra được nét đặc sắc nghệ thuật miêu tả tâm lý, ngôn ngữ đối thoại; nêu rõ bài học tư tưởng nhân văn sâu sắc.
- Mức 3 (2.0 - 2.25đ): Có nhắc đến nghệ thuật và ý nghĩa nhưng chưa phân tích kỹ.
- Mức 2 (1.0 - 1.75đ): Nhắc sơ lược ý nghĩa bài học, bỏ quên yếu tố nghệ thuật.
- Mức 1 (< 1.0đ): Không có phần đánh giá nghệ thuật.

TIÊU CHÍ 4: CHÍNH TẢ, DIỄN ĐẠT VÀ SÁNG TẠO (2.0 ĐIỂM)
- Mức 4 (1.75 - 2.0đ): Câu văn giàu hình ảnh, dùng từ chuẩn xác, không sai chính tả; có góc nhìn cảm thụ độc đáo.
- Mức 3 (1.25 - 1.5đ): Sai dưới 3 lỗi chính tả/ngữ pháp; hành văn mạch lạc.
- Mức 2 (0.75 - 1.0đ): Sai 4 - 6 lỗi chính tả; câu văn cụt, lủng củng.
- Mức 1 (< 0.75đ): Sai nhiều lỗi chính tả ngữ pháp nghiêm trọng.`
  }
];
