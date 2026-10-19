import { LiteraryWork } from '../types/literature';

export const HERO_IMAGE = '/src/assets/images/hero_literary_study_1790423422843.jpg';
export const TOPIC_NATURE_IMAGE = '/src/assets/images/topic_nature_wildlife_1790423441732.jpg';
export const TOPIC_HOMELAND_IMAGE = '/src/assets/images/topic_homeland_culture_1790423457954.jpg';
export const TOPIC_FOLKLORE_IMAGE = '/src/assets/images/topic_folklore_proverbs_1790423473582.jpg';

export interface TopicCategory {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  worksCount: number;
}

export const TOPICS: TopicCategory[] = [
  {
    id: 'bau-troi-tuoi-tho',
    name: 'Bầu trời tuổi thơ',
    subtitle: 'Truyện ngắn & Thế giới thiên nhiên',
    description: 'Khám phá thế giới tuổi thơ trong trẻo, lòng nhân hậu trắc ẩn và sự hòa hợp diệu kỳ giữa con người với muôn loài thiên nhiên.',
    image: TOPIC_NATURE_IMAGE,
    worksCount: 2,
  },
  {
    id: 'khuc-nhac-tam-hon',
    name: 'Khúc nhạc tâm hồn',
    subtitle: 'Thơ bốn chữ, năm chữ & Tản văn',
    description: 'Lắng nghe những giai điệu ân tình sâu lắng về quê hương, người lính Trường Sơn và tình mẫu tử thiêng liêng.',
    image: TOPIC_HOMELAND_IMAGE,
    worksCount: 3,
  },
  {
    id: 'tri-tue-dan-gian',
    name: 'Trí tuệ dân gian & Bài học cuộc sống',
    subtitle: 'Truyện ngụ ngôn, tục ngữ & Triết lý nhân sinh',
    description: 'Đúc kết bài học làm người, thái độ sống khiêm nhường, tránh thói tự cao kiêu ngạo và tôn trọng sự khác biệt.',
    image: TOPIC_FOLKLORE_IMAGE,
    worksCount: 2,
  },
  {
    id: 'giai-dieu-dat-nuoc',
    name: 'Giai điệu đất nước',
    subtitle: 'Tùy bút, tản văn & Ký sắc màu dân tộc',
    description: 'Cảm nhận vẻ đẹp thiên nhiên bốn mùa xứ Bắc và âm hưởng văn hóa dân tộc ngân vang dọc dải đất chữ S.',
    image: HERO_IMAGE,
    worksCount: 2,
  }
];

export const LITERARY_WORKS: LiteraryWork[] = [
  {
    id: 'bay-chim-chia-voi',
    title: 'Bầy chim chìa vôi',
    author: 'Nguyễn Quang Thiều',
    authorBio: 'Nguyễn Quang Thiều (sinh năm 1957) quê tại Hà Nội. Ông là nhà thơ, nhà văn có phong cách viết hiện đại, giàu tính biểu tượng, ấm áp tình cảm với thế giới tự nhiên thôn dã.',
    genre: 'Truyện ngắn hiện đại',
    topicId: 'bau-troi-tuoi-tho',
    topicName: 'Bầu trời tuổi thơ',
    image: TOPIC_NATURE_IMAGE,
    excerpt: 'Hai đứa bé nắm chặt tay nhau, mắt không rời bờ cát... Giữa làn nước xiết, những đôi cánh non nớt run rẩy nhưng kiên cường đập gió vút bay lên...',
    readTime: '8 phút đọc',
    summary: 'Vào một đêm mưa lớn nước sông Đáy dâng cao, hai anh em Mên và Mon thao thức không ngủ được vì lo cho bầy chim chìa vôi non ở dải cát giữa sông. Đến rạng sáng, hai đứa trẻ quyết định chèo đò vượt dòng nước cuồn cuộn ra cứu bầy chim. Đứng trên bờ nhìn những cánh chim non dũng cảm đập cánh bay lên bầu trời, hai giọt nước mắt hạnh phúc lăn dài trên má hai đứa trẻ.',
    structure: [
      {
        part: 'Phần 1',
        range: 'Từ đầu đến "mùa sinh nở của chúng"',
        content: 'Cuộc trò chuyện giữa đêm mưa của hai anh em Mên và Mon về dải cát sông Đáy và bầy chim chìa vôi non.'
      },
      {
        part: 'Phần 2',
        range: 'Tiếp theo đến "hai đứa bé cùng kêu lên"',
        content: 'Hành trình vượt qua nỗi sợ hãi, hai anh em chèo đò trong đêm mưa gió để tiếp cận bãi cát cứu đàn chim non.'
      },
      {
        part: 'Phần 3',
        range: 'Đoạn còn lại',
        content: 'Cảnh tượng bầy chim non cất cánh bay lên kì diệu trong sớm mai và niềm xúc động nghẹn ngào của hai anh em.'
      }
    ],
    keyThemes: [
      'Tấm lòng nhân hậu, sự đồng cảm và trắc ẩn của trẻ thơ đối với thế giới tự nhiên',
      'Sức sống mãnh liệt, kỳ diệu của sinh mệnh trước thử thách khắc nghiệt của thiên nhiên',
      'Vẻ đẹp trong sáng của tình anh em cùng chung một trái tim ấm áp'
    ],
    artisticValues: [
      'Nghệ thuật miêu tả tâm lý trẻ em tinh tế, tự nhiên qua lời thoại đối thoại ngây thơ mà xúc động',
      'Nghệ thuật tạo dựng không gian đêm mưa đối lập với khoảnh khắc bình minh rực rỡ hi vọng',
      'Chi tiết giọt nước mắt cuối tác phẩm mang giá trị thanh lọc tâm hồn (catharsis)'
    ],
    ideologicalValue: 'Tác phẩm nhắc nhở con người hãy biết lắng nghe và che chở cho sự sống mong manh quanh mình; tình yêu thiên nhiên chính là khởi nguồn của nhân cách cao đẹp.',
    analysisSections: [
      {
        title: '1. Nỗi lo lắng hồn nhiên và tình thương của hai đứa trẻ',
        content: 'Trong đêm mưa gió gầm gào, hai đứa trẻ không ngủ được. Mon liên tục thì thào gọi anh Mên. Những câu hỏi lặp đi lặp lại: "Anh Mên ơi, có khi nào nước ngập bãi cát không?", "Thế bầy chim có bị chết đuối không anh?". Nỗi băn khoăn chân thành ấy cho thấy một tâm hồn trong trẻo, giàu lòng trắc ẩn, luôn thấu cảm với hiểm nguy của sinh linh bé nhỏ.',
        quote: '“Anh có sợ bầy chim chìa vôi non bị ngập không?”'
      },
      {
        title: '2. Hành động dũng cảm chèo đò trong sớm mai',
        content: 'Tình thương không chỉ dừng ở suy nghĩ mà đã chuyển hóa thành hành động dũng cảm. Dù sợ bóng tối, sợ dòng nước sông Đáy dâng cao chảy xiết, hai anh em vẫn quyết tâm lấy chiếc đò của gia đình đi cứu chim. Đó là lòng dũng cảm xuất phát từ tình thương vô điều kiện.',
        quote: '“Mưa vẫn đổ nhưng hai anh em vẫn cắm cúi đẩy con thuyền ra khỏi bờ cát...”'
      },
      {
        title: '3. Khúc ca khải hoàn của sự sống và giọt nước mắt hạnh phúc',
        content: 'Khoảnh khắc bầy chim non vỗ cánh bay vút lên khỏi mặt nước đang cuộn dâng là một bức tranh tráng lệ của nghị lực sinh tồn. Hai anh em đứng im lặng, nắm chặt tay nhau và khóc. Đó không phải giọt nước mắt sợ hãi hay tiếc nuối, mà là sự xúc động tột cùng trước điều kỳ diệu của sự sống được bảo toàn.',
        quote: '“Hai anh em đứng lặng nhìn theo bầy chim, trên má chúng đầm đìa nước mắt từ lúc nào không hay.”'
      }
    ],
    discussionQuestions: [
      {
        question: 'Tại sao tác giả lại để hai anh em Mên và Mon khóc ở cuối truyện?',
        hint: 'Xem xét ý nghĩa của giọt nước mắt xúc động, giải tỏa âu lo và niềm tự hào trước vẻ đẹp kì diệu của sự sống.',
        answer: 'Đó là giọt nước mắt của sự trút bỏ nỗi lo âu phấp phỏng suốt đêm dài, là niềm hạnh phúc vỡ òa khi chứng kiến bầy chim non đã chiến thắng hiểm nguy. Giọt nước mắt ấy khẳng định tâm hồn nhân hậu, thánh thiện của tuổi thơ.'
      },
      {
        question: 'Chi tiết bầy chim non cất cánh bay lên gợi cho em suy nghĩ gì về quy luật sinh tồn?',
        hint: 'Liên hệ giữa hoàn cảnh thử thách cam go với sự trưởng thành vượt bậc.',
        answer: 'Chi tiết đó tượng trưng cho sức mạnh phi thường của bản năng sinh tồn. Khi bị đẩy vào lằn ranh sinh tử, ngay cả sinh linh nhỏ bé nhất cũng có thể phát huy sức mạnh tiềm ẩn để bứt phá và vút cao.'
      }
    ],
    mindMap: {
      root: 'Bầy chim chìa vôi',
      branches: [
        {
          title: 'Hai anh em Mên & Mon',
          color: 'emerald',
          subNodes: [
            'Thao thức lo lắng suốt đêm mưa sông Đáy',
            'Quyết tâm chèo đò cứu chim non trong nguy hiểm',
            'Giọt nước mắt hạnh phúc, thanh lọc tâm hồn'
          ]
        },
        {
          title: 'Bầy chim non',
          color: 'amber',
          subNodes: [
            'Tổ chim chìa vôi trên dải cát chìm trong nước lũ',
            'Cánh non nớt bứt phá bay lên khỏi dòng xoáy',
            'Biểu tượng của sức sống kiên cường và nghị lực'
          ]
        },
        {
          title: 'Thông điệp nghệ thuật',
          color: 'sky',
          subNodes: [
            'Tình thương yêu và trân trọng sự sống tự nhiên',
            'Vẻ đẹp tâm hồn trong sáng thánh thiện của tuổi thơ',
            'Nghệ thuật miêu tả tâm lý và bối cảnh đối lập xuất sắc'
          ]
        }
      ]
    }
  },
  {
    id: 'di-lay-mat',
    title: 'Đi lấy mật (Trích Đất rừng phương Nam)',
    author: 'Đoàn Giỏi',
    authorBio: 'Đoàn Giỏi (1925 - 1989), quê Tiền Giang. Nhà văn Nam Bộ tiêu biểu với ngòi bút đặc sắc viết về thiên nhiên hoang dã, con người hào sảng, phóng khoáng của đất rừng phương Nam.',
    genre: 'Tiểu thuyết phiêu lưu / Ký sự',
    topicId: 'bau-troi-tuoi-tho',
    topicName: 'Bầu trời tuổi thơ',
    image: TOPIC_NATURE_IMAGE,
    excerpt: 'Rừng U Minh ban mai thức giấc trong tiếng chim hót ríu rít, mùi hoa tràm thoang thoảng bay. Tía nuôi bước thoăn thoắt, mắt ngước nhìn lên những chạc cây nơi kèo ong đóng tổ...',
    readTime: '7 phút đọc',
    summary: 'Đoạn trích kể về chuyến đi lấy mật ong rừng U Minh của cậu bé An cùng tía nuôi và thằng Cò. Dưới con mắt quan sát tinh tế của An, vẻ đẹp hoang sơ, trù phú của rừng tràm hiện lên sống động. An học hỏi được kinh nghiệm gác kèo ong độc đáo chỉ có ở người dân Nam Bộ, đồng thời cảm nhận tình thương ấm áp và sự gan dạ của tía nuôi.',
    structure: [
      {
        part: 'Đoạn 1',
        range: 'Từ đầu đến "không thể nào tả xiết"',
        content: 'Cảnh ba cha con lên đường lúc sáng sớm và bức tranh thiên nhiên rừng tràm U Minh rực rỡ sức sống.'
      },
      {
        part: 'Đoạn 2',
        range: 'Tiếp theo đến "cứ yên trí đi"',
        content: 'Phút nghỉ chân bên gốc cây tràm, lời chỉ dẫn của Cò và tía nuôi về cách nhận biết kèo ong mật.'
      },
      {
        part: 'Đoạn 3',
        range: 'Đoạn còn lại',
        content: 'Cảnh tượng tía nuôi lấy mật điêu luyện, vẻ đẹp kỳ vĩ của tổ ong khổng lồ và cảm nhận khâm phục của An.'
      }
    ],
    keyThemes: [
      'Bức tranh thiên nhiên rừng U Minh trù phú, hoang dã và đậm chất thơ Nam Bộ',
      'Trí tuệ dân gian, kinh nghiệm lao động độc đáo trong nghề gác kèo ong mật',
      'Vẻ đẹp khỏe khoắn, phóng khoáng và ân tình của con người lao động phương Nam'
    ],
    artisticValues: [
      'Ngôn ngữ đậm đà phong vị Nam Bộ, giàu chất gợi hình và gợi cảm',
      'Nghệ thuật miêu tả thiên nhiên bằng nhiều giác quan (thị giác, khứu giác, thính giác)',
      'Cách xây dựng tính cách nhân vật tự nhiên, sinh động qua hành động và đối thoại'
    ],
    ideologicalValue: 'Ca ngợi mối quan hệ gắn bó máu thịt giữa con người với rừng thiêng nước độc, đồng thời giáo dục tình yêu thiên nhiên, lòng tự hào về cảnh sắc non sông gấm vóc.',
    analysisSections: [
      {
        title: '1. Bức tranh thiên nhiên rừng U Minh rạng rỡ buổi sớm',
        content: 'Rừng U Minh không chỉ hoang vu mà rực tràn sức sống: ánh nắng len lỏi qua tán tràm, mùi hương hoa tràm ngào ngạt phảng phất, tiếng chim hót líu lo, đàn chim muông cất cánh rợp trời. Tác giả đã dùng con mắt trẻ thơ của An để phát hiện vẻ đẹp tươi mới, huyền ảo của rừng già.',
        quote: '“Gió thổi nhè nhẹ làm lay động những cành lá tràm non, mùi hoa tràm thơm ngan ngát...”'
      },
      {
        title: '2. Nghệ thuật gác kèo ong và trí tuệ của người dân phương Nam',
        content: 'Khác với cách nuôi ong trong thùng gỗ ở các nơi trên thế giới, người dân U Minh có nghề "gác kèo" cha truyền con nối. Họ hiểu tập tính của loài ong như chính lòng bàn tay mình: chọn hướng gió, chọn nhánh cây tràm ngả bóng vừa phải. Đó là bài học sống hài hòa, nương tựa vào mẹ thiên nhiên chứ không tận diệt.',
        quote: '“Nuôi ong như người rừng U Minh này thì trên đời chưa từng thấy ở đâu!”'
      },
      {
        title: '3. Nhân vật tía nuôi và thằng Cò',
        content: 'Tía nuôi hiện lên với dáng vóc vạm vỡ, kinh nghiệm từng trải và sự điềm tĩnh phi thường. Thằng Cò nhanh nhẹn, tinh nghịch, sinh ra từ rừng nên thuộc từng gốc cây ngọn cỏ. Hai nhân vật làm nổi bật vẻ đẹp phóng khoáng, mộc mạc và nghĩa tình của người miền sông nước.',
        quote: '“Tía nuôi tôi bước đi thoăn thoắt, chiếc nỏ đeo sau lưng, đôi mắt sáng quắc dõi tìm.”'
      }
    ],
    discussionQuestions: [
      {
        question: 'Nghề gác kèo ong ở rừng U Minh có nét gì độc đáo so với việc nuôi ong thông thường?',
        hint: 'Tìm hiểu cách chọn cành cây tràm làm kèo, phán đoán luồng bay của ong và thu hoạch mật.',
        answer: 'Người dân không nhốt ong trong thùng mà bắc những thân tràm (gọi là kèo) vào góc nghiêng thích hợp trong rừng để ong rừng tự tìm đến làm tổ. Đây là hình thức thuần dưỡng dựa trên sự thấu hiểu sâu sắc quy luật tự nhiên.'
      },
      {
        question: 'Tính cách của cậu bé Cò và An được khắc họa đối lập như thế nào?',
        hint: 'So sánh xuất thân và kinh nghiệm rừng nước giữa An (trẻ thành thị lưu lạc) và Cò (trẻ sinh ra nơi rừng tràm).',
        answer: 'Cò lanh lẹ, tự tin, rành rẽ đời sống rừng nước; An nhạy cảm, ham hiểu biết, quan sát kỹ lưỡng và luôn ngưỡng mộ những điều mới mẻ nơi chốn hoang dã.'
      }
    ],
    mindMap: {
      root: 'Đi lấy mật (Đoàn Giỏi)',
      branches: [
        {
          title: 'Thiên nhiên rừng U Minh',
          color: 'emerald',
          subNodes: [
            'Hương tràm thơm ngát thoang thoảng trong gió sớm',
            'Ánh nắng len lỏi qua vòm lá xanh mướt',
            'Thế giới sinh động của bầy chim và đàn ong rừng'
          ]
        },
        {
          title: 'Trí tuệ gác kèo ong',
          color: 'amber',
          subNodes: [
            'Nghề độc nhất vô nhị chỉ có ở xứ U Minh',
            'Chọn hướng gió, bóng râm và nhánh cây thích hợp',
            'Hòa hợp và tôn trọng nhịp điệu tự nhiên'
          ]
        },
        {
          title: 'Con người phương Nam',
          color: 'sky',
          subNodes: [
            'Tía nuôi: Vạm vỡ, dày dạn sương gió, nhân hậu',
            'Thằng Cò: Nhanh nhảu, thạo rừng, gắn bó thiên nhiên',
            'Cậu bé An: Ham học hỏi, quan sát tinh tế'
          ]
        }
      ]
    }
  },
  {
    id: 'dong-dao-mua-xuan',
    title: 'Đồng dao mùa xuân',
    author: 'Nguyễn Khoa Điềm',
    authorBio: 'Nguyễn Khoa Điềm (sinh năm 1943) quê ở Thừa Thiên Huế. Thơ ông giàu chất suy tư, cảm xúc dồn nén, mang đậm hơi thở thời đại và tình yêu thiết tha với đất nước, nhân dân.',
    genre: 'Thơ bốn chữ',
    topicId: 'khuc-nhac-tam-hon',
    topicName: 'Khúc nhạc tâm hồn',
    image: TOPIC_HOMELAND_IMAGE,
    excerpt: 'Có một người lính / Đi vào núi xanh / Những năm máu lửa... / Một ngày hòa bình / Anh không về nữa...',
    readTime: '6 phút đọc',
    summary: 'Bài thơ tái hiện hình ảnh người lính trẻ đi vào chiến trường những năm kháng chiến chống Mỹ ác liệt. Anh hi sinh giữa núi rừng đại ngàn khi tuổi đời còn rất trẻ, chưa từng yêu, mê thả diều. Nhưng linh hồn anh đã hòa vào cỏ cây, non nước, gửi lại nụ cười và sức trẻ vào mỗi mùa xuân của đất nước.',
    structure: [
      {
        part: 'Khổ 1',
        range: '4 câu thơ đầu',
        content: 'Hoàn cảnh người lính lên đường ra mặt trận thời hoa lửa.'
      },
      {
        part: 'Khổ 2, 3, 4',
        range: 'Từ "Anh không về nữa" đến "Cười hiền lành"',
        content: 'Khoảnh khắc người lính ngã xuống và chân dung hồn nhiên, mộc mạc của anh qua ký ức đồng đội.'
      },
      {
        part: 'Khổ 5, 6, 7, 8, 9',
        range: 'Các khổ thơ còn lại',
        content: 'Sự hóa thân bất tử của người lính vào thiên nhiên Trường Sơn và mùa xuân vĩnh hằng của dân tộc.'
      }
    ],
    keyThemes: [
      'Khúc ca tri ân sâu sắc những người lính đã hiến dâng thanh xuân cho Tổ quốc',
      'Vẻ đẹp trong sáng, bình dị của thế hệ trẻ Việt Nam thời chống Mỹ cứu nước',
      'Sự bất tử của anh hùng liệt sĩ trong lòng nhân dân và non sông'
    ],
    artisticValues: [
      'Thể thơ bốn chữ nhịp nhàng, mang âm hưởng đồng dao dân gian trong trẻo',
      'Hình ảnh thơ giản dị mà giàu sức khái quát, gợi cảm xúc rưng rưng',
      'Biện pháp điệp từ, điệp cấu trúc và ẩn dụ hóa thân tạo ấn tượng thiêng liêng'
    ],
    ideologicalValue: 'Khắc ghi đạo lý "Uống nước nhớ nguồn", bồi đắp lòng biết ơn và lý tưởng sống cống hiến cho thế hệ học sinh hôm nay.',
    analysisSections: [
      {
        title: '1. Chân dung người lính trẻ trong sáng, hồn nhiên',
        content: 'Người lính bước vào chiến trường mang theo cả sự ngây thơ của tuổi học trò: "Chưa một lần yêu / Cà phê chưa uống / Còn mê thả diều". Những chi tiết đời thường ấy làm nổi bật sự hy sinh vô cùng to lớn. Họ từ giã ước mơ riêng tư để gánh vác sứ mệnh thiêng liêng của dân tộc.',
        quote: '“Anh thành ngọn lửa / Bạn bè mang theo”'
      },
      {
        title: '2. Khoảnh khắc hi sinh và sự hóa thân bất tử',
        content: 'Tác giả không miêu tả cảnh chết chóc bi thương mà dùng cách nói giảm nói tránh: "Một ngày hòa bình / Anh không về nữa". Người lính vẫn ngồi đó dưới cội mai vàng, ngực ôm khẩu súng, nụ cười hiền lành mãi mãi gắn với màu xanh Trường Sơn.',
        quote: '“Anh ngồi một mình / Mắt như suối biếc / Vai ba lô con / Mùa xuân vĩnh hằng...”'
      },
      {
        title: '3. Âm hưởng đồng dao ngân vang muôn đời',
        content: 'Nhịp điệu 2/2 quen thuộc của đồng dao tạo cảm giác vừa gần gũi như lời hát ru con trẻ, vừa trang nghiêm như một bài văn tế hiện đại. Mùa xuân của đất nước được dệt nên từ chính máu xương và tuổi xuân của những người lính vô danh.',
        quote: '“Tên anh thành tên đất nước / Bốn mùa xanh ngắt hương bay.”'
      }
    ],
    discussionQuestions: [
      {
        question: 'Tại sao nhan đề bài thơ lại là "Đồng dao mùa xuân"?',
        hint: 'Phân tích hai yếu tố: thể điệu "đồng dao" (dân gian, trong trẻo, trường tồn) và hình tượng "mùa xuân" (tuổi trẻ, đất nước hòa bình).',
        answer: 'Đồng dao là khúc ca dân gian hồn nhiên truyền từ đời này sang đời khác. Mùa xuân là biểu tượng của tuổi trẻ người lính và sức sống mới của dân tộc. Nhan đề là khúc ca bất tử ca ngợi vẻ đẹp trẻ trung, trường tồn của người lính cách mạng.'
      },
      {
        question: 'Tình cảm của nhà thơ và nhân dân đối với người lính được thể hiện qua những hình ảnh nào?',
        hint: 'Chú ý các hình ảnh: suối biếc, ngọn lửa bạn bè mang theo, mùa xuân vĩnh hằng.',
        answer: 'Đó là lòng biết ơn vô hạn, niềm tiếc thương rưng rưng và sự ngưỡng mộ thành kính. Người lính không hề mất đi mà hóa thân thành linh hồn sông núi.'
      }
    ],
    mindMap: {
      root: 'Đồng dao mùa xuân',
      branches: [
        {
          title: 'Hình tượng người lính',
          color: 'rose',
          subNodes: [
            'Hồn nhiên, chưa từng yêu, mê thả diều',
            'Dũng cảm bước vào núi xanh những năm máu lửa',
            'Ngồi lặng lẽ dưới bóng cội mai, nụ cười hiền hậu'
          ]
        },
        {
          title: 'Sự hóa thân bất tử',
          color: 'emerald',
          subNodes: [
            'Thành ngọn lửa bạn bè mang theo suốt chặng đường',
            'Hòa vào màu xanh vĩnh cửu của rừng Trường Sơn',
            'Dâng hiến trọn vẹn tuổi 20 cho mùa xuân Tổ quốc'
          ]
        },
        {
          title: 'Đặc sắc nghệ thuật',
          color: 'sky',
          subNodes: [
            'Thể thơ bốn chữ nhịp 2/2 ngân vang như lời đồng dao',
            'Nói giảm nói tránh xoa dịu nỗi đau mất mát',
            'Giọng điệu trầm lắng, trang trọng và thiết tha'
          ]
        }
      ]
    }
  },
  {
    id: 'gap-la-com-nep',
    title: 'Gặp lá cơm nếp',
    author: 'Thanh Thảo',
    authorBio: 'Thanh Thảo (sinh năm 1946) quê ở Quảng Ngãi. Ông là nhà thơ tiêu biểu thời kỳ kháng chiến chống Mỹ với giọng thơ trữ tình, giàu suy tư, gắn bó tha thiết với đất nước và nhân dân.',
    genre: 'Thơ năm chữ',
    topicId: 'khuc-nhac-tam-hon',
    topicName: 'Khúc nhạc tâm hồn',
    image: TOPIC_HOMELAND_IMAGE,
    excerpt: 'Xa nhà đã mấy năm / Thèm bát xôi mùa gặt / Khói bay màu sương cũ / Chiều nay trên đường hành quân / Bỗng gặp nhành lá nếp...',
    readTime: '5 phút đọc',
    summary: 'Trên đường hành quân xa xôi, người lính trẻ tình cờ bắt gặp nhành lá cơm nếp dại ven đường. Hương thơm mộc mạc ấy đánh thức cả miền ký ức tuổi thơ: nhớ bát xôi nếp mùa gặt mẹ nấu, nhớ hình dáng mẹ già gầy guộc cặm cụi nhóm lửa trong chiều khói lam bay. Tình yêu mẹ hòa quyện sâu sắc với tình yêu non sông đất nước.',
    structure: [
      {
        part: 'Khổ 1',
        range: '5 câu đầu',
        content: 'Hoàn cảnh gặp gỡ nhành lá cơm nếp trên đường hành quân và nỗi nhớ dâng trào.'
      },
      {
        part: 'Khổ 2',
        range: 'Từ "Mẹ ở đâu, chiều nay" đến "Bên bếp lửa củi rừng"',
        content: 'Hình ảnh người mẹ tần tảo sớm hôm nấu xôi nơi quê nghèo.'
      },
      {
        part: 'Khổ 3, 4',
        range: 'Các câu còn lại',
        content: 'Sự gắn kết thiêng liêng giữa tình mẫu tử và lòng yêu nước trong trái tim người lính.'
      }
    ],
    keyThemes: [
      'Tình mẫu tử thiêng liêng và lòng hiếu thảo của người con nơi chiến trường',
      'Hương vị quê hương dung dị trở thành điểm tựa tinh thần vững chắc',
      'Sự thống nhất hài hòa giữa tình cảm gia đình và tình yêu Tổ quốc'
    ],
    artisticValues: [
      'Thể thơ năm chữ dung dị, giọng điệu tâm tình sâu lắng nghẹn ngào',
      'Nghệ thuật khơi gợi ký ức qua khứu giác (hương lá nếp -> hương xôi -> bóng mẹ)',
      'Hình ảnh thơ bình dị, thân thương chạm đến trái tim người đọc'
    ],
    ideologicalValue: 'Nhắc nhở mỗi người về cội nguồn yêu thương; tình yêu Tổ quốc không ở đâu xa mà bắt đầu từ tình yêu người mẹ, yêu từng nhành cây tấc đất quê hương.',
    analysisSections: [
      {
        title: '1. Ngọn nguồn cảm xúc từ hương lá cơm nếp',
        content: 'Mùi hương lá nếp ven đường như chiếc chìa khóa mở toang cánh cửa ký ức. Sau nhiều năm xa quê, giữa rừng sâu gian khổ, chỉ một làn hương thoảng qua cũng đủ khiến tâm hồn người chiến sĩ xao động khôn nguôi.',
        quote: '“Ôi mùi vị quê hương / Con quên làm sao được”'
      },
      {
        title: '2. Hình ảnh người mẹ hiền bên bếp lửa chiều đông',
        content: 'Hiện lên trong tâm trí người lính là hình bóng mẹ già cặm cụi nhặt từng hạt nếp, nhóm từng que củi. Nồi xôi mùa gặt không chỉ ấm lòng bởi hạt gạo mới mà ấm bởi tình mẹ chắt chiu, lam lũ suốt cuộc đời vì con.',
        quote: '“Mẹ già như chuối ba hương / Mùi xôi nếp quyện khói sương lam chiều”'
      },
      {
        title: '3. Tình yêu mẹ hòa cùng tình yêu đất nước',
        content: 'Hai tình cảm lớn nhất trong đời người hòa làm một: "Một bát cơm nếp thơm / Bằng cả tình đất nước". Người lính cầm súng chiến đấu để bảo vệ Tổ quốc, và cũng chính là để bảo vệ mái nhà tranh có dáng mẹ ngồi đợi con về.',
        quote: '“Tình yêu mẹ quyện cùng tình yêu đất nước / Đi suốt đời con chẳng thể nào phai.”'
      }
    ],
    discussionQuestions: [
      {
        question: 'Tác giả đã dùng giác quan nào để khơi nguồn cảm xúc nhớ mẹ và quê hương?',
        hint: 'Chú ý sự cảm nhận mùi hương lá nếp (khứu giác) dẫn đến thị giác và tâm tưởng.',
        answer: 'Tác giả dùng khứu giác (ngửi thấy mùi thơm lá nếp) để kích hoạt toàn bộ ký ức, gợi nhớ hương xôi nóng hổi và hình ảnh người mẹ bên bếp lửa chiều tà.'
      },
      {
        question: 'Câu thơ "Mẹ già như chuối ba hương" gợi lên phẩm chất gì của người mẹ Việt Nam?',
        hint: 'Ý nghĩa của hình ảnh chuối ba hương ngọt ngào, thơm thảo, cả đời dâng hiến.',
        answer: 'Gợi lên vẻ đẹp tần tảo, chịu thương chịu khó, giàu đức hi sinh và tình thương yêu con vô bờ bến của người mẹ Việt Nam truyền thống.'
      }
    ],
    mindMap: {
      root: 'Gặp lá cơm nếp',
      branches: [
        {
          title: 'Khơi nguồn cảm xúc',
          color: 'emerald',
          subNodes: [
            'Hành quân xa nhà nhiều năm giữa rừng sâu',
            'Bất ngờ gặp nhành lá nếp dại ven đường',
            'Đánh thức mùi vị thân thương của quê nhà'
          ]
        },
        {
          title: 'Hình bóng người mẹ',
          color: 'amber',
          subNodes: [
            'Mẹ cặm cụi nhóm bếp, nấu xôi mùa gặt',
            'Bàn tay chai sần chắt chiu từng hạt gạo',
            'Tình thương bao la sưởi ấm tâm hồn con'
          ]
        },
        {
          title: 'Chân lý tình cảm',
          color: 'rose',
          subNodes: [
            'Tình mẫu tử thiêng liêng hóa thành sức mạnh chiến đấu',
            'Yêu quê hương bắt đầu từ yêu dáng hình người mẹ',
            'Điểm tựa tinh thần bất diệt trên mọi nẻo đường'
          ]
        }
      ]
    }
  },
  {
    id: 'mua-xuan-cua-toi',
    title: 'Mùa xuân của tôi',
    author: 'Vũ Bằng',
    authorBio: 'Vũ Bằng (1913 - 1984), sinh tại Hà Nội. Ông là nhà văn, nhà báo tài hoa có sở trường viết tùy bút, tản văn với ngòi bút tinh tế, giàu nhạc điệu, đậm đà phong vị Bắc Việt.',
    genre: 'Tùy bút',
    topicId: 'giai-dieu-dat-nuoc',
    topicName: 'Giai điệu đất nước',
    image: HERO_IMAGE,
    excerpt: 'Tự nhiên như thế: ai cũng chuộng mùa xuân. Mà tháng giêng là tháng đầu của mùa xuân, người ta càng trìu mến, không có gì lạ hết...',
    readTime: '8 phút đọc',
    summary: 'Đoạn trích từ tùy bút "Thương nhớ mười hai" thể hiện nỗi hoài niệm da diết của tác giả về mùa xuân Hà Nội khi đang sống xa quê ở miền Nam. Bức tranh mùa xuân Bắc Việt hiện lên với mưa riêu riêu, gió lành lạnh, tiếng nhạn kêu trong đêm và không khí gia đình sum vầy đầm ấm bên bàn thờ tổ tiên.',
    structure: [
      {
        part: 'Đoạn 1',
        range: 'Từ đầu đến "mê luyến mùa xuân"',
        content: 'Quy luật tự nhiên và lòng yêu mến mùa xuân tha thiết của con người.'
      },
      {
        part: 'Đoạn 2',
        range: 'Tiếp theo đến "mở hội liên hoan"',
        content: 'Bức tranh cảnh sắc thiên nhiên và không khí xuân Hà Nội tháng Giêng tuyệt đẹp.'
      },
      {
        part: 'Đoạn 3',
        range: 'Đoạn còn lại',
        content: 'Cảnh sắc mùa xuân sau ngày rằm tháng Giêng êm đềm, thanh nhẹ trở lại nhịp sống thường nhật.'
      }
    ],
    keyThemes: [
      'Tình yêu say đắm, nồng nàn dành cho mùa xuân Hà Nội và đất trời phương Bắc',
      'Nỗi nhớ quê hương cháy bỏng của một người con xa xứ',
      'Nét đẹp văn hóa truyền thống Tết cổ truyền dân tộc'
    ],
    artisticValues: [
      'Văn phong tùy bút tài hoa, bay bổng, nhịp điệu dạt dào cảm xúc',
      'Nghệ thuật so sánh, nhân hóa độc đáo, ngôn từ gợi cảm tinh tế',
      'Kết hợp nhuần nhuyễn giữa miêu tả cảnh sắc với bộc lộ nội tâm tha thiết'
    ],
    ideologicalValue: 'Bồi đắp tình cảm yêu mến cảnh sắc bốn mùa của quê hương, trân trọng cội nguồn văn hóa và các giá trị truyền thống dân tộc.',
    analysisSections: [
      {
        title: '1. Quy luật vĩnh hằng: Ai cũng chuộng mùa xuân',
        content: 'Tác giả mở đầu bằng lời khẳng định dứt khoát nhưng tràn đầy tình cảm: ai cũng chuộng mùa xuân như chim non chuộng tổ, như gái chuộng chồng. Mùa xuân đem lại sự tái sinh cho vạn vật và thổi vào lòng người luồng sinh khí mới.',
        quote: '“Ai bảo được non đừng thương nước, bướm đừng thương hoa, trăng đừng thương gió thì mới bảo được người mê luyến mùa xuân.”'
      },
      {
        title: '2. Bức tranh xuân Bắc Việt với nét đẹp đặc trưng',
        content: 'Mùa xuân xứ Bắc không chói chang mà đằm thắm: "Mưa riêu riêu, gió lành lạnh, có tiếng nhạn kêu trong đêm xanh". Đi kèm là không khí đoàn viên gia đình bên mâm cỗ Tết, mùi nhang trầm nghi ngút ấm cúng, đôi mắt người thương nhìn nhau trong trìu mến.',
        quote: '“Cái rét ngọt ngào của tháng Giêng làm cho người ta thấy trẻ lại như tuổi mười tám.”'
      },
      {
        title: '3. Nỗi nhớ thương cồn cào của người con xa xứ',
        content: 'Viết về mùa xuân Hà Nội khi đang ở Sài Gòn, từng câu chữ của Vũ Bằng như được chắt ra từ ruột gan, từ nỗi nhớ quay quắt về mảnh đất nghìn năm văn hiến. Tình yêu xuân chính là hiện thân cao nhất của tình yêu quê mẹ.',
        quote: '“Thương nhớ mười hai tháng, nhưng tháng Giêng vẫn là tháng của trái tim...”'
      }
    ],
    discussionQuestions: [
      {
        question: 'Thời tiết đặc trưng của mùa xuân đất Bắc được miêu tả qua những từ ngữ nào?',
        hint: 'Tìm các từ láy gợi cảm giác về mưa, gió, tiếng chim trong bài.',
        answer: 'Mưa riêu riêu, gió lành lạnh, tiếng nhạn kêu trong đêm xanh, cái rét ngọt ngào êm ái.'
      },
      {
        question: 'Vì sao tác giả lại khẳng định mùa xuân làm cho con người muốn sống thêm và trẻ lại?',
        hint: 'Mối liên hệ giữa sự nảy nở của cây cỏ với tâm trạng phơi phới của con người.',
        answer: 'Vì mùa xuân đánh thức vạn vật sau giấc ngủ đông, nhựa sống trào dâng trong từng chồi non mầm biếc, khiến con người cũng cảm thấy lòng mình phơi phới, rạo rực khát vọng yêu thương và hi vọng.'
      }
    ],
    mindMap: {
      root: 'Mùa xuân của tôi (Vũ Bằng)',
      branches: [
        {
          title: 'Cảnh sắc xuân Bắc Việt',
          color: 'sky',
          subNodes: [
            'Mưa riêu riêu, gió lành lạnh, đêm xanh tiếng nhạn',
            'Đào phai hé nụ, chồi non lộc biếc rạo rực',
            'Khói nhang trầm sum vầy bên bàn thờ gia tiên'
          ]
        },
        {
          title: 'Tâm trạng con người',
          color: 'rose',
          subNodes: [
            'Thấy lòng trẻ lại như tuổi mười tám mười đôi',
            'Khao khát yêu thương và gắn kết cuộc đời',
            'Nỗi hoài niệm khôn nguôi của người con xa xứ'
          ]
        },
        {
          title: 'Nghệ thuật tùy bút',
          color: 'amber',
          subNodes: [
            'Câu văn giàu nhạc điệu, so sánh trùng điệp',
            'Cảm xúc trữ tình đằm thắm, thiết tha',
            'Vốn văn hóa phong phú về phong tục Tết Hà thành'
          ]
        }
      ]
    }
  },
  {
    id: 'tinh-than-yeu-nuoc-nhan-dan-ta',
    title: 'Tinh thần yêu nước của nhân dân ta',
    author: 'Hồ Chí Minh',
    authorBio: 'Chủ tịch Hồ Chí Minh (1890 - 1969) - Vị lãnh tụ kính yêu của dân tộc Việt Nam, danh nhân văn hóa thế giới. Văn chính luận của Người mẫu mực, đanh thép, lập luận chặt chẽ, giàu hình ảnh và sức thuyết phục.',
    genre: 'Nghị luận xã hội / Văn chính luận',
    topicId: 'tri-tue-dan-gian',
    topicName: 'Bài học cuộc sống & Lý tưởng',
    image: TOPIC_FOLKLORE_IMAGE,
    excerpt: 'Dân ta có một lòng nồng nàn yêu nước. Đó là một truyền thống quý báu của ta. Từ xưa đến nay, mỗi khi Tổ quốc bị xâm lăng, thì tinh thần ấy lại sôi nổi...',
    readTime: '6 phút đọc',
    summary: 'Văn bản trích Báo cáo Chính trị tại Đại hội lần thứ II của Đảng (1951). Bằng lập luận mẫu mực, dẫn chứng phong phú và toàn diện từ quá khứ đến hiện tại, Chủ tịch Hồ Chí Minh đã khẳng định lòng yêu nước nồng nàn là truyền thống ngàn đời của dân tộc ta, là vũ khí bách chiến bách thắng nhấn chìm mọi lũ bán nước và cướp nước.',
    structure: [
      {
        part: 'Mở đoạn',
        range: 'Từ đầu đến "lũ cướp nước"',
        content: 'Nêu luận điểm chính: Dân ta có một lòng nồng nàn yêu nước, đó là truyền thống quý báu tạo nên sức mạnh vô địch.'
      },
      {
        part: 'Thân đoạn',
        range: 'Tiếp theo đến "nồng nàn yêu nước"',
        content: 'Chứng minh lòng yêu nước qua các trang sử vẻ vang thời phong kiến và qua cuộc kháng chiến chống thực dân Pháp toàn diện.'
      },
      {
        part: 'Kết đoạn',
        range: 'Đoạn còn lại',
        content: 'Nhiệm vụ của toàn Đảng, toàn dân: giải thích, tuyên truyền, tổ chức để đưa tinh thần yêu nước thực hành vào công việc kháng chiến.'
      }
    ],
    keyThemes: [
      'Lòng yêu nước nồng nàn là sức mạnh vô song của nhân dân Việt Nam',
      'Tinh thần đoàn kết không phân biệt già trẻ gái trai, miền xuôi miền ngược',
      'Trách nhiệm phát huy truyền thống yêu nước thành hành động cụ thể'
    ],
    artisticValues: [
      'Bố cục chặt chẽ theo mô hình diễn dịch - quy nạp chuẩn mực của văn nghị luận',
      'Hình ảnh so sánh bất hủ: "như một làn sóng vô cùng mạnh mẽ, to lớn"',
      'Dẫn chứng toàn diện, liệt kê theo từng cặp đối ứng (già - trẻ, xuôi - ngược, tiền tuyến - hậu phương)'
    ],
    ideologicalValue: 'Khơi dậy lòng tự hào dân tộc, ý thức trách nhiệm và thôi thúc tinh thần cống hiến xây dựng, bảo vệ Tổ quốc.',
    analysisSections: [
      {
        title: '1. Luận điểm xuất phát rực lửa niềm tin',
        content: 'Mở đầu bài viết, Bác dùng ngay câu văn ngắn gọn, khẳng định chắc nịch: "Dân ta có một lòng nồng nàn yêu nước". Tính từ "nồng nàn" chỉ tình cảm chân thành, sôi sục, không vụ lợi.',
        quote: '“Nó kết thành một làn sóng vô cùng mạnh mẽ, to lớn, nó lướt qua mọi sự nguy hiểm, khó khăn, nó nhấn chìm tất cả lũ bán nước và lũ cướp nước.”'
      },
      {
        title: '2. Dẫn chứng mẫu mực theo dòng thời gian và không gian',
        content: 'Trong lịch sử: Bà Trưng, Bà Triệu, Trần Hưng Đạo, Lê Lợi, Quang Trung... Trong hiện tại: từ các cụ già tóc bạc đến các cháu nhi đồng, từ kiều bào nước ngoài đến đồng bào vùng tạm chiếm, từ chiến sĩ tiền tuyến đến phụ nữ hậu phương. Dẫn chứng toàn diện khiến luận điểm trở nên bất khả bác bỏ.',
        quote: '“Những cử chỉ cao quý đó, tuy khác nhau nơi việc làm, nhưng đều giống nhau nơi lòng nồng nàn yêu nước.”'
      },
      {
        title: '3. Hình ảnh so sánh độc đáo về hai trạng thái yêu nước',
        content: 'Bác ví tinh thần yêu nước như các thứ của quý: có khi được trưng bày trong tủ kính pha lê sáng rõ, nhưng cũng có khi cất giấu kín đáo trong rương, trong hòm. Bổn phận của chúng ta là làm cho của quý ấy được đem ra trưng bày, biến thành sức mạnh thực tiễn.',
        quote: '“Bổn phận của chúng ta là làm cho những của quý kín đáo ấy đều được đưa ra trưng bày.”'
      }
    ],
    discussionQuestions: [
      {
        question: 'Hình ảnh so sánh "như một làn sóng vô cùng mạnh mẽ, to lớn" có tác dụng gì?',
        hint: 'Phân tích sức gợi tả về quy mô, tốc độ và sức công phá của ngọn sóng trước quân thù.',
        answer: 'Cụ thể hóa sức mạnh vô hình của tinh thần yêu nước thành một thực thể hữu hình, cuồn cuộn dâng trào, có sức mạnh quét sạch mọi hiểm họa, khẳng định ý chí quật cường của cả dân tộc.'
      },
      {
        question: 'Cách Bác Hồ sắp xếp các dẫn chứng trong phần thân bài có điểm gì đặc sắc?',
        hint: 'Sắp xếp theo thứ tự thời gian (quá khứ -> hiện tại) và cấu trúc sóng đôi (già - trẻ, xuôi - ngược).',
        answer: 'Dẫn chứng được sắp xếp mạch lạc từ lịch sử vẻ vang đến thực tế kháng chiến; trong thực tế lại đan cài các cặp đối xứng giúp bao quát mọi giai tầng xã hội, tạo tính thuyết phục tuyệt đối.'
      }
    ],
    mindMap: {
      root: 'Tinh thần yêu nước (Hồ Chí Minh)',
      branches: [
        {
          title: 'Luận điểm khái quát',
          color: 'rose',
          subNodes: [
            'Dân ta có lòng nồng nàn yêu nước từ ngàn đời',
            'Kết thành làn sóng mạnh mẽ quét sạch quân thù',
            'Truyền thống quý báu làm nên lịch sử'
          ]
        },
        {
          title: 'Hệ thống dẫn chứng',
          color: 'amber',
          subNodes: [
            'Lịch sử: Bà Trưng, Bà Triệu, Trần Hưng Đạo, Quang Trung',
            'Hiện tại: Toàn dân đồng lòng kháng chiến chống Pháp',
            'Cặp sóng đôi: Già - trẻ, xuôi - ngược, tiền tuyến - hậu phương'
          ]
        },
        {
          title: 'Nhiệm vụ hành động',
          color: 'emerald',
          subNodes: [
            'Ví lòng yêu nước như của quý trong rương hòm',
            'Tuyên truyền, cổ vũ để ai cũng được cống hiến',
            'Chuyển hóa tình cảm thành hành động thực tế'
          ]
        }
      ]
    }
  },
  {
    id: 'ech-ngoi-day-gieng',
    title: 'Ếch ngồi đáy giếng & Thầy bói xem voi',
    author: 'Truyện ngụ ngôn dân gian Việt Nam',
    authorBio: 'Truyện ngụ ngôn là thể loại văn học dân gian dùng cách nói ẩn dụ, mượn chuyện loài vật hoặc con người để răn dạy những bài học triết lý nhân sinh sâu sắc.',
    genre: 'Truyện ngụ ngôn',
    topicId: 'tri-tue-dan-gian',
    topicName: 'Trí tuệ dân gian & Bài học cuộc sống',
    image: TOPIC_FOLKLORE_IMAGE,
    excerpt: 'Ếch cứ tưởng bầu trời trên đầu chỉ bé bằng chiếc vung và nó thì oai như một vị chúa tể... Năm ông thầy bói mù sờ voi, ai cũng quả quyết mình đúng...',
    readTime: '5 phút đọc',
    summary: 'Hai truyện ngụ ngôn kinh điển của kho tàng dân gian Việt Nam. "Ếch ngồi đáy giếng" phê phán kẻ thiển cận, hiểu biết hạn hẹp nhưng lại tự cao tự đại, cuối cùng phải nhận hậu quả bi thảm. "Thầy bói xem voi" châm biếm những người nhìn nhận sự việc một cách phiến diện, lấy bộ phận thay thế cho toàn thể rồi tranh cãi vô bổ.',
    structure: [
      {
        part: 'Truyện 1',
        range: 'Ếch ngồi đáy giếng',
        content: 'Cuộc sống ngạo mạn dưới đáy giếng, cú nhảy định mệnh ra ngoài giếng và cái giá phải trả vì nghênh ngang.'
      },
      {
        part: 'Truyện 2',
        range: 'Thầy bói xem voi',
        content: 'Năm thầy bói mù mỗi người sờ một bộ phận của con voi, cãi vã đánh nhau toác đầu vì cố chấp cho rằng mình đúng.'
      }
    ],
    keyThemes: [
      'Bài học về sự khiêm tốn, không ngừng học hỏi mở rộng tầm nhìn',
      'Phê phán thói chủ quan, thiển cận và kiêu ngạo',
      'Cách nhìn nhận vấn đề toàn diện, đa chiều, tránh phiến diện cực đoan'
    ],
    artisticValues: [
      'Cốt truyện ngắn gọn, tình huống kịch tính, kết thúc bất ngờ mang tính răn đe',
      'Nghệ thuật nhân hóa loài vật và phóng đại trào phúng con người',
      'Tạo ra các thành ngữ phổ biến trong đời sống: "ếch ngồi đáy giếng", "thầy bói xem voi"'
    ],
    ideologicalValue: 'Răn dạy con người phải luôn giữ thái độ cầu thị, biết lắng nghe người khác và không ngừng trau dồi tri thức.',
    analysisSections: [
      {
        title: '1. Không gian đáy giếng và sự ngộ nhận tai hại',
        content: 'Sống lâu ngày trong một cái giếng hẹp, xung quanh chỉ có vài con cua, con ốc bé nhỏ, tiếng ếch kêu ồm ộp vang động làm các con vật khác khiếp sợ. Từ đó ếch ngỡ mình là chúa tể, bầu trời chỉ bé bằng cái vung. Hoàn cảnh sống chật hẹp đã giới hạn tư duy và nhận thức của ếch.',
        quote: '“Nó tưởng bầu trời trên đầu chỉ bé bằng chiếc vung và nó thì oai như một vị chúa tể.”'
      },
      {
        title: '2. Cú va chạm với thực tế và cái giá của thói kiêu căng',
        content: 'Khi trời mưa to, nước ngập đưa ếch ra ngoài, ếch vẫn giữ thói quen cũ: nghênh ngang đi lại, giương mắt nhìn trời, chả thèm để ý xung quanh. Kết quả là bị trâu dẫm bẹp. Cái chết của ếch là lời cảnh tỉnh nghiêm khắc cho những ai bước ra thế giới rộng lớn mà vẫn giữ tư tưởng ngạo mạn cũ kỹ.',
        quote: '“Quen thói cũ, ếch nghênh ngang đi lại... nên bị một con trâu đi qua giẫm bẹp.”'
      },
      {
        title: '3. Bài học nhận thức toàn diện từ câu chuyện thầy bói xem voi',
        content: 'Năm thầy bói mù đều sờ đúng một phần thật của con voi (vòi như con đỉa, ngà như đòn càn, tai như cái quạt thóc, chân như cột đình, đuôi như chổi sể). Nhưng sai lầm tai hại là họ lấy cái bộ phận để quy kết cho toàn thể, ai cũng bảo thủ coi mình là chân lý dẫn đến đánh nhau chảy máu.',
        quote: '“Thầy nào cũng cho mình là đúng, không ai chịu ai, thành ra xô xát đánh nhau toác đầu.”'
      }
    ],
    discussionQuestions: [
      {
        question: 'Nguyên nhân dẫn đến cái chết bi thảm của con ếch là gì?',
        hint: 'Phân tích cả hai yếu tố: hoàn cảnh sống thay đổi nhưng thái độ nhận thức không đổi.',
        answer: 'Do ếch sống trong môi trường hạn hẹp lâu ngày sinh ra kiêu ngạo, khi hoàn cảnh sống thay đổi ra thế giới rộng lớn vẫn không chịu quan sát, học hỏi mà giữ thói huênh hoang, coi thường xung quanh.'
      },
      {
        question: 'Từ câu chuyện "Thầy bói xem voi", em rút ra bài học gì khi đánh giá một sự vật, hiện tượng trong học tập và đời sống?',
        hint: 'Cần nhìn nhận nhiều góc độ, kết hợp các giác quan và lắng nghe ý kiến đóng góp.',
        answer: 'Muốn hiểu đúng bản chất của sự vật, hiện tượng, ta phải quan sát toàn diện từ nhiều khía cạnh, không được lấy cái nhìn phiến diện để phán xét tổng thể, đồng thời phải biết lắng nghe và tôn trọng góc nhìn của người khác.'
      }
    ],
    mindMap: {
      root: 'Truyện ngụ ngôn dân gian',
      branches: [
        {
          title: 'Ếch ngồi đáy giếng',
          color: 'emerald',
          subNodes: [
            'Đáy giếng hạn hẹp ngỡ trời bằng vung',
            'Ra ngoài vẫn nghênh ngang kiêu ngạo',
            'Bài học: Tránh thiển cận, mở rộng tầm nhìn'
          ]
        },
        {
          title: 'Thầy bói xem voi',
          color: 'amber',
          subNodes: [
            'Mỗi thầy sờ một bộ phận: vòi, tai, chân, đuôi',
            'Lấy bộ phận suy ra toàn thể, cãi cọ xô xát',
            'Bài học: Phải có cái nhìn toàn diện đa chiều'
          ]
        },
        {
          title: 'Đặc sắc ngụ ngôn',
          color: 'sky',
          subNodes: [
            'Mượn chuyện vật, chuyện cười để răn dạy đạo lý',
            'Tính biểu tượng sâu sắc, thành ngữ bất hủ',
            'Bài học nhân sinh trường tồn theo năm tháng'
          ]
        }
      ]
    }
  }
];
