import { LanguageTopic } from '../types/literature';

export const LANGUAGE_TOPICS: LanguageTopic[] = [
  {
    id: 'bien-phap-tu-tu',
    title: 'Biện pháp tu từ: Điệp ngữ, Nói giảm nói tránh & Ẩn dụ',
    concept: 'Các biện pháp tu từ là cách sử dụng ngôn ngữ đặc biệt ở một đơn vị lời nói (từ ngữ, cú pháp) nhằm tạo nên tính gợi hình, gợi cảm và ấn tượng sâu sắc cho người đọc.',
    examples: [
      {
        sentence: '“Anh không về nữa / Anh ngồi một mình / Anh thành ngọn lửa...” (Đồng dao mùa xuân)',
        analysis: 'Điệp từ "Anh" lặp lại ở đầu các câu thơ (điệp ngữ cách quãng) khắc sâu hình bóng người lính trẻ hi sinh anh dũng và cảm xúc tri ân nghẹn ngào.'
      },
      {
        sentence: '“Bác đã đi rồi sao, Bác ơi!” (Tố Hữu)',
        analysis: 'Từ "đi" là biện pháp nói giảm nói tránh thay cho từ "chết", nhằm giảm bớt nỗi đau đớn, mất mát tột cùng của dân tộc khi vị cha già kính yêu qua đời.'
      },
      {
        sentence: '“Người Cha mái tóc bạc / Đốt lửa cho anh nằm” (Minh Huệ)',
        analysis: 'Ẩn dụ "Người Cha" chỉ Bác Hồ dựa trên nét tương đồng về tình yêu thương, sự chăm sóc chu đáo, ân cần như tình phụ tử.'
      }
    ],
    rules: [
      'Điệp ngữ có 3 dạng chính: Điệp nối tiếp (từ ngữ lặp liên tục kề nhau), Điệp cách quãng (từ ngữ lặp ở các dòng/vế cách nhau), Điệp vòng / điệp chuyển tiếp (từ cuối câu trước lặp lại ở đầu câu sau).',
      'Nói giảm nói tránh thường dùng từ đồng nghĩa tế nhị, cách nói vòng, phủ định từ trái nghĩa (ví dụ: "chưa được giỏi" thay vì "kém").',
      'Phân biệt ẩn dụ và hoán dụ: Ẩn dụ dựa trên quan hệ tương đồng (giống nhau); Hoán dụ dựa trên quan hệ tương cận (gần gũi, đi liền nhau như bộ phận - toàn thể, dấu hiệu - vật mang dấu hiệu).'
    ],
    practiceExercises: [
      {
        id: 'ex-bp-1',
        question: 'Trong câu: "Mồ hôi mà đổ xuống đồng / Lúa mọc trùng trùng sáng cả đồi nương", từ "mồ hôi" được dùng theo biện pháp tu từ nào?',
        options: [
          'Ẩn dụ',
          'Hoán dụ (lấy dấu hiệu của sự vật để gọi sự vật / người lao động)',
          'So sánh',
          'Nói quá'
        ],
        correctIndex: 1,
        explanation: '"Mồ hôi" là dấu hiệu của sự lao động vất vả, cực nhọc. Dùng "mồ hôi" để biểu thị công sức lao động của người nông dân là phép hoán dụ dựa trên quan hệ tương cận.'
      },
      {
        id: 'ex-bp-2',
        question: 'Biện pháp nói giảm nói tránh trong câu: "Bác đã đi rồi sao, Bác ơi!" nhằm mục đích gì?',
        options: [
          'Nhấn mạnh hành động di chuyển của Bác',
          'Tránh sự đau buồn quá mức và thể hiện niềm tiếc thương, kính trọng vô hạn',
          'Làm cho câu thơ mang tính vui tươi, nhẹ nhàng',
          'Tạo nhịp điệu dồn dập cho câu thơ'
        ],
        correctIndex: 1,
        explanation: 'Nói giảm nói tránh ở đây thay thế từ "mất/chết" bằng từ "đi", giúp xoa dịu nỗi đau mất mát quá lớn lao của toàn thể nhân dân.'
      },
      {
        id: 'ex-bp-3',
        question: 'Dòng nào sau đây chứa biện pháp điệp ngữ cách quãng?',
        options: [
          'Tre giữ làng, giữ nước, giữ mái nhà tranh, giữ đồng lúa chín.',
          'Mai sau, Mai sau, Mai sau / Đất xanh tre mãi xanh màu tre xanh.',
          'Nhóm bếp lửa ấp iu nồng đượm / Nhóm niềm yêu thương, khoai sắn ngọt bùi',
          'Đoàn thuyền đánh cá lại ra khơi / Sóng đã cài then, đêm sập cửa'
        ],
        correctIndex: 2,
        explanation: 'Từ "Nhóm" được lặp lại ở đầu hai câu thơ cách nhau một quãng tạo nên điệp ngữ cách quãng, gợi tả hành động và ý nghĩa thiêng liêng của ngọn lửa bà truyền cho cháu.'
      }
    ]
  },
  {
    id: 'tu-han-viet',
    title: 'Từ Hán Việt & Yếu tố Hán Việt đồng âm',
    concept: 'Từ Hán Việt là từ mượn gốc Hán phát âm theo âm tiếng Việt. Yếu tố Hán Việt đồng âm là những yếu tố có cách phát âm giống nhau nhưng mang ý nghĩa hoàn toàn khác nhau.',
    examples: [
      {
        sentence: 'Phi (phi công, phi cơ) >< Phi (phi pháp, phi lý) >< Phi (hoàng phi, vương phi)',
        analysis: 'Yếu tố "phi" 1 có nghĩa là bay; "phi" 2 có nghĩa là không, trái với quy tắc; "phi" 3 có nghĩa là vợ vua/chúa. Đây là 3 yếu tố Hán Việt đồng âm khác nghĩa.'
      },
      {
        sentence: 'Gia (gia đình, gia phong) >< Gia (tham gia, gia tăng)',
        analysis: '"Gia" 1 nghĩa là nhà; "gia" 2 nghĩa là thêm vào. Nhận biết đúng nghĩa tránh dùng sai ngữ cảnh.'
      }
    ],
    rules: [
      'Từ Hán Việt tạo sắc thái trang trọng, thiêng liêng, cổ kính hoặc dùng trong văn bản chính luận, khoa học.',
      'Khi tra cứu yếu tố Hán Việt đồng âm, cần dựa vào từ ghép chứa nó để suy luận nghĩa gốc.',
      'Tránh lạm dụng từ Hán Việt trong giao tiếp thường nhật vì dễ gây cảm giác kiểu cách, xa lạ.'
    ],
    practiceExercises: [
      {
        id: 'ex-hv-1',
        question: 'Yếu tố "đồng" trong từ nào sau đây KHÔNG CÙNG NGHĨA với "đồng" trong "đồng hương" (cùng)?',
        options: [
          'Đồng chí (người cùng chí hướng)',
          'Đồng bào (người cùng sinh ra từ một bọc trứng)',
          'Nhi đồng (trẻ em)',
          'Đồng niên (người cùng tuổi)'
        ],
        correctIndex: 2,
        explanation: 'Trong từ "nhi đồng", "đồng" có nghĩa là trẻ em (đồng ấu), trong khi ở các từ còn lại "đồng" mang nghĩa là cùng chung, cùng một.'
      },
      {
        id: 'ex-hv-2',
        question: 'Trong các cặp từ sau, cặp từ nào mang sắc thái trang trọng hơn?',
        options: [
          'Phu nhân - Vợ',
          'Nhà cửa - Gia thất',
          'Ăn uống - Ẩm thực',
          'Cả A, B, C đều đúng'
        ],
        correctIndex: 3,
        explanation: 'Các từ Hán Việt như "phu nhân", "gia thất", "ẩm thực" đều mang sắc thái trang trọng, tao nhã hơn so với các từ thuần Việt tương ứng.'
      }
    ]
  },
  {
    id: 'mo-rong-thanh-phan-cau',
    title: 'Mở rộng thành phần chính của câu bằng cụm từ',
    concept: 'Câu đơn bình thường có chủ ngữ và vị ngữ là từ đơn hoặc từ ghép. Khi mở rộng bằng cụm từ (cụm danh từ, cụm động từ, cụm tính từ), câu văn sẽ diễn đạt cụ thể, sinh động và giàu thông tin hơn.',
    examples: [
      {
        sentence: 'Câu gốc: "Mưa rơi." -> Câu mở rộng: "Những cơn mưa rào đầu mùa hạ dồn dập rơi trên mái ngói rêu phong."',
        analysis: 'Chủ ngữ "mưa" được mở rộng thành cụm danh từ "Những cơn mưa rào đầu mùa hạ"; Vị ngữ "rơi" được mở rộng thành cụm động từ "dồn dập rơi trên mái ngói rêu phong".'
      },
      {
        sentence: 'Câu gốc: "Gió thổi." -> Câu mở rộng: "Ngọn gió chướng se se lạnh thổi qua những rặng dừa xanh mướt."',
        analysis: 'Câu văn trở nên giàu hình ảnh, biểu cảm và xác định rõ không gian, tính chất.'
      }
    ],
    rules: [
      'Mô hình cụm danh từ: Phần phụ trước (số lượng, toàn thể) + Danh từ trung tâm + Phần phụ sau (đặc điểm, vị trí).',
      'Mô hình cụm động từ: Phần phụ trước (thời gian, tiếp diễn) + Động từ trung tâm + Phần phụ sau (đối tượng, địa điểm, cách thức).',
      'Mở rộng thành phần câu giúp người viết truyền tải trọn vẹn cảm xúc và thông điệp mà không cần dùng quá nhiều câu vụn.'
    ],
    practiceExercises: [
      {
        id: 'ex-mr-1',
        question: 'Trong câu: "Những bông hoa mai vàng rực rỡ đang đua nhau khoe sắc trong nắng sớm", thành phần nào đã được mở rộng?',
        options: [
          'Chỉ có chủ ngữ được mở rộng thành cụm danh từ',
          'Chỉ có vị ngữ được mở rộng thành cụm động từ',
          'Cả chủ ngữ và vị ngữ đều được mở rộng bằng cụm từ',
          'Không có thành phần nào được mở rộng'
        ],
        correctIndex: 2,
        explanation: 'Chủ ngữ là cụm danh từ ("Những bông hoa mai vàng rực rỡ") và vị ngữ là cụm động từ ("đang đua nhau khoe sắc trong nắng sớm"). Cả hai đều được mở rộng chi tiết.'
      },
      {
        id: 'ex-mr-2',
        question: 'Muốn mở rộng chủ ngữ "Chim" trong câu "Chim hót" để gợi tả bầy chim non trong bài "Bầy chim chìa vôi", cách nào sau đây phù hợp nhất?',
        options: [
          'Bầy chim chìa vôi non nớt trên dải cát sông Đáy',
          'Những con chim bồ câu trắng muốt trên nóc nhà',
          'Đàn chim én báo hiệu mùa xuân',
          'Chú chim sâu nhỏ bé lách chanh'
        ],
        correctIndex: 0,
        explanation: 'Cụm danh từ "Bầy chim chìa vôi non nớt trên dải cát sông Đáy" vừa mở rộng số lượng, đặc điểm, vừa định vị chính xác không gian của tác phẩm.'
      }
    ]
  },
  {
    id: 'lien-ket-cau-doan-van',
    title: 'Liên kết câu và đoạn văn: Phép lặp, phép thế & phép nối',
    concept: 'Một đoạn văn hoặc văn bản chỉ mạch lạc khi các câu, các đoạn có sự gắn kết chặt chẽ về nội dung (chủ đề, trình tự hợp lý) và hình thức (sử dụng các phương tiện liên kết ngôn ngữ).',
    examples: [
      {
        sentence: '“Trường học của chúng ta là trường học của chế độ dân chủ. Trường học ấy phải đào tạo những công dân có ích.”',
        analysis: 'Dùng từ "Trường học ấy" vừa là phép lặp ("trường học") vừa là phép thế ("ấy") để gắn kết hai câu văn.'
      },
      {
        sentence: '“Người lính ngồi lặng lẽ dưới cội mai. Nhưng trong lòng anh, ngọn lửa chiến đấu vẫn bùng cháy.”',
        analysis: 'Từ "Nhưng" là phương tiện liên kết của phép nối, biểu thị quan hệ tương phản giữa dáng vẻ bên ngoài và ý chí bên trong.'
      }
    ],
    rules: [
      'Phép lặp từ ngữ: Lặp lại ở câu sau từ ngữ đã xuất hiện ở câu trước.',
      'Phép thế: Dùng đại từ (nó, họ, chúng, anh ấy) hoặc từ đồng nghĩa để thay thế cho từ ngữ ở câu trước nhằm tránh lặp từ vụng về.',
      'Phép nối: Sử dụng các quan hệ từ (và, nhưng, vì vậy, tuy nhiên, tóm lại, do đó) để nối câu sau với câu trước.',
      'Phép đồng nghĩa, trái nghĩa và liên tưởng: Sử dụng các từ cùng trường nghĩa hoặc đối lập nhau.'
    ],
    practiceExercises: [
      {
        id: 'ex-lk-1',
        question: 'Đoạn văn: "Mên ngập ngừng một lát rồi bước xuống đò. Cậu bé cảm thấy bàn chân mình run run." sử dụng phép liên kết nào giữa hai câu?',
        options: [
          'Phép lặp',
          'Phép thế ("Cậu bé" thay thế cho "Mên")',
          'Phép nối',
          'Phép đảo ngữ'
        ],
        correctIndex: 1,
        explanation: 'Từ "Cậu bé" ở câu thứ hai thay thế cho tên riêng "Mên" ở câu thứ nhất để tránh lặp từ, đây là đặc trưng của phép thế.'
      },
      {
        id: 'ex-lk-2',
        question: 'Từ ngữ nào sau đây thường dùng làm phương tiện cho PHÉP NỐI biểu thị quan hệ tương phản?',
        options: [
          'Bởi vì, do đó',
          'Tuy nhiên, nhưng, thế mà',
          'Đồng thời, vả lại',
          'Ví dụ, chẳng hạn'
        ],
        correctIndex: 1,
        explanation: 'Các từ "tuy nhiên", "nhưng", "thế mà" là các quan hệ từ mang nghĩa đối lập, tương phản dùng trong phép nối.'
      }
    ]
  },
  {
    id: 'dau-cau-dac-biet',
    title: 'Dấu câu đặc biệt: Dấu chấm phẩy, Dấu ngoặc kép & Dấu gạch ngang',
    concept: 'Dấu câu đóng vai trò phân tách ngữ pháp, định hình nhịp điệu và làm sáng tỏ hàm ý biểu cảm của người viết trong văn bản nghệ thuật và nghị luận.',
    examples: [
      {
        sentence: '“Mùa xuân của tôi - mùa xuân Bắc Việt, mùa xuân của Hà Nội...” (Vũ Bằng)',
        analysis: 'Dấu gạch ngang dùng để đánh dấu bộ phận chú thích, giải thích rõ hơn về mùa xuân mà tác giả đang đắm say hướng về.'
      },
      {
        sentence: '“Sáng nay, trời mưa riêu riêu; gió thổi nhè nhẹ; đàn chim ríu rít chuyền cành.”',
        analysis: 'Dấu chấm phẩy phân tách các vế trong câu ghép đẳng lập phức tạp có cấu trúc đối xứng.'
      }
    ],
    rules: [
      'Dấu chấm phẩy (;): Đánh dấu ranh giới giữa các vế của câu ghép có cấu tạo phức tạp, hoặc giữa các bộ phận trong một phép liệt kê nhiều tầng.',
      'Dấu ngoặc kép (" "): Đánh dấu từ ngữ được trích dẫn trực tiếp, hoặc từ ngữ được hiểu theo nghĩa đặc biệt / mỉa mai.',
      'Dấu gạch ngang (-): Đặt ở đầu dòng để đánh dấu lời thoại trực tiếp của nhân vật, hoặc kẹp ở giữa câu để đánh dấu bộ phận chú thích, giải thích.'
    ],
    practiceExercises: [
      {
        id: 'ex-dc-1',
        question: 'Dấu ngoặc kép trong câu: "Ấy thế mà ếch cứ tưởng mình là một vị \'chúa tể\'." có công dụng gì?',
        options: [
          'Trích dẫn nguyên văn lời nói của nhân vật',
          'Đánh dấu từ ngữ được dùng với hàm ý mỉa mai, châm biếm',
          'Đánh dấu tên của tác phẩm văn học',
          'Giải thích thêm ý nghĩa của câu'
        ],
        correctIndex: 1,
        explanation: 'Từ "chúa tể" được đặt trong ngoặc kép mang sắc thái mỉa mai thái độ tự cao tự đại, ảo tưởng của con ếch nhỏ bé dưới đáy giếng.'
      },
      {
        id: 'ex-dc-2',
        question: 'Dấu câu nào thích hợp nhất để điền vào chỗ trống: "Văn học mở ra cho ta những chân trời mới __ bồi đắp tâm hồn, thanh lọc tình cảm con người."',
        options: [
          'Dấu chấm phẩy (;)',
          'Dấu hỏi chấm (?)',
          'Dấu chấm than (!)',
          'Dấu ba chấm (...)'
        ],
        correctIndex: 0,
        explanation: 'Dấu chấm phẩy (;) là lựa chọn chính xác để ngăn cách hai vế câu có mối quan hệ liên kết ý nghĩa bổ sung sâu sắc.'
      }
    ]
  }
];
