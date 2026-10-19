import { LITERARY_WORKS } from './literatureData';
import { LiteraryWork } from '../types/literature';

export interface GroundedTopicScope {
  id: string;
  title: string;
  topicName: string;
  sources: {
    title: string;
    author: string;
    authorBio: string;
    genre: string;
    excerpt: string;
    structure: { part: string; range: string; content: string }[];
  };
  analysisPreview: {
    summary: string;
    keyThemes: string[];
    ideologicalValue: string;
    artisticValues: string[];
    analysisSections: { title: string; content: string; quote?: string }[];
  };
  studyPack: {
    discussionQuestions: { question: string; hint: string; answer: string }[];
    mindMapBranches: { title: string; subNodes: string[] }[];
    quickReviewPoints: string[];
  };
}

// Snapshot format specifically matching all user requirements:
// - subject
// - sources
// - analysisPreview
// - studyPack
// - metadata cần thiết
export interface TopicSnapshot {
  id: string;
  name: string; // Tên ngắn dễ nhớ do học sinh đặt hoặc chỉnh sửa
  subject: string; // Môn học / Chủ đề (ví dụ: Ngữ văn 7 - Bầu trời tuổi thơ)
  sources: {
    title: string;
    author: string;
    authorBio: string;
    genre: string;
    excerpt: string;
    structure: { part: string; range: string; content: string }[];
  };
  analysisPreview: {
    summary: string;
    keyThemes: string[];
    ideologicalValue: string;
    artisticValues: string[];
    analysisSections: { title: string; content: string; quote?: string }[];
  };
  studyPack: {
    discussionQuestions: { question: string; hint: string; answer: string }[];
    mindMapBranches: { title: string; subNodes: string[] }[];
    quickReviewPoints: string[];
  };
  metadata: {
    savedAt: string;
    savedDateFormatted: string;
    version: string;
    originalTopicId: string;
    notes?: string;
  };
  chatHistory?: any[];
}

export interface StudyPackVersion {
  id: string;
  versionNumber: number; // 1, 2, 3...
  label: string; // "v1 (Bản gốc SGK)", "v2 (Re-generate mới)"
  createdAt: string;
  timestamp: number;
  isOriginal?: boolean;
  topicId: string;
  topicTitle: string;
  subject: string;
  // Nguồn gốc ban đầu KHÔNG BỊ MẤT:
  sources: {
    title: string;
    author: string;
    authorBio: string;
    genre: string;
    excerpt: string;
    structure: { part: string; range: string; content: string }[];
  };
  summary: string;
  keyThemes: string[];
  ideologicalValue: string;
  artisticValues: string[];
  analysisSections: { title: string; content: string; quote?: string }[];
  discussionQuestions: { question: string; hint: string; answer: string }[];
  quizQuestions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  flashcards: {
    id: string;
    front: string;
    back: string;
    example?: string;
    notes?: string;
  }[];
  mindMapBranches: { title: string; subNodes: string[] }[];
  generationNotes?: string;
}

export function buildGroundedScope(work: LiteraryWork): GroundedTopicScope {
  return {
    id: work.id,
    title: work.title,
    topicName: work.topicName,
    sources: {
      title: work.title,
      author: work.author,
      authorBio: work.authorBio,
      genre: work.genre,
      excerpt: work.excerpt,
      structure: work.structure || [],
    },
    analysisPreview: {
      summary: work.summary,
      keyThemes: work.keyThemes || [],
      ideologicalValue: work.ideologicalValue,
      artisticValues: work.artisticValues || [],
      analysisSections: work.analysisSections || [],
    },
    studyPack: {
      discussionQuestions: work.discussionQuestions || [],
      mindMapBranches: work.mindMap?.branches || [],
      quickReviewPoints: [
        `Tác giả: ${work.author} - Thể loại: ${work.genre}`,
        `Chủ đề: ${work.topicName}`,
        `Thông điệp: ${work.ideologicalValue}`,
        ...(work.keyThemes || []),
      ],
    },
  };
}

export const ALL_GROUNDED_TOPICS: GroundedTopicScope[] = LITERARY_WORKS.map(buildGroundedScope);

export function getGroundedScopeById(id: string): GroundedTopicScope {
  const found = ALL_GROUNDED_TOPICS.find((t) => t.id === id);
  return found || ALL_GROUNDED_TOPICS[0];
}

// Grounded Query Answering Logic
export function answerGroundedQuestion(
  query: string,
  scope: GroundedTopicScope
): {
  text: string;
  isGrounded: boolean;
  citationSources?: Array<'sources' | 'analysisPreview' | 'studyPack'>;
  citationDetail?: string;
} {
  const qLower = query.toLowerCase().trim();

  // Normalize accents helper for flexible matching
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^\w\s]/g, ' ');

  const qNorm = normalize(qLower);

  // Check for greetings: Friendly greeting grounded to the topic
  if (
    /^(chào|xin chào|hello|hi|bạn là ai|trợ lý|ơi|giúp mình|giúp em)/.test(qLower) &&
    qLower.length < 25
  ) {
    return {
      text: `Xin chào bạn! Mình là Trợ lý Ôn bài Grounded môn Ngữ Văn 7. Mình đang hỗ trợ bạn ôn tập chuyên sâu cho chủ đề: **"${scope.title}"** (${scope.topicName}).\n\n📌 **Lưu ý ôn bài:** Mình chỉ trả lời trong phạm vi 3 phần tài liệu: **sources** (tài liệu nguồn/tác giả/bố cục), **analysisPreview** (tóm tắt & phân tích nghệ thuật), và **studyPack** (câu hỏi đọc hiểu & sơ đồ tư duy). Bạn có thể hỏi mình bất kỳ câu hỏi nào về tác phẩm nhé!`,
      isGrounded: true,
      citationSources: ['sources', 'studyPack'],
      citationDetail: `Phạm vi chủ đề: ${scope.title}`,
    };
  }

  // 1. TÁC GIẢ, XUẤT XỨ, HOÀN CẢNH SÁNG TÁC (sources)
  if (
    qNorm.includes('tac gia') ||
    qNorm.includes('ai viet') ||
    qNorm.includes('ai sang tac') ||
    qNorm.includes('tieu su') ||
    qNorm.includes('que quan') ||
    qNorm.includes('sinh nam') ||
    qNorm.includes('hoan canh') ||
    qNorm.includes('xuat xu') ||
    qNorm.includes('the loai') ||
    qNorm.includes('bo cuc') ||
    qNorm.includes('may phan')
  ) {
    let detail = '';
    const sources = scope.sources;
    const parts = [];

    if (qNorm.includes('tac gia') || qNorm.includes('ai sang tac') || qNorm.includes('ai viet') || qNorm.includes('tieu su') || qNorm.includes('que')) {
      parts.push(`• **Tác giả:** ${sources.author}\n• **Tiểu sử & Phong cách:** ${sources.authorBio}`);
    }
    if (qNorm.includes('the loai')) {
      parts.push(`• **Thể loại:** ${sources.genre}`);
    }
    if (qNorm.includes('bo cuc') || qNorm.includes('may phan')) {
      const structText = sources.structure.map((s) => `  - **${s.part}** (${s.range}): ${s.content}`).join('\n');
      parts.push(`• **Bố cục tác phẩm:**\n${structText}`);
    }

    if (parts.length === 0) {
      parts.push(`• **Tác phẩm:** "${sources.title}" do nhà văn/nhà thơ **${sources.author}** sáng tác theo thể loại **${sources.genre}**.\n• **Tiểu sử tác giả:** ${sources.authorBio}`);
    }

    detail = parts.join('\n\n');

    return {
      text: `Dựa vào tài liệu gốc (**sources**) của chủ đề "${scope.title}":\n\n${detail}`,
      isGrounded: true,
      citationSources: ['sources'],
      citationDetail: `Trích từ sources: Tác giả ${sources.author} & Thể loại ${sources.genre}`,
    };
  }

  // 2. TÓM TẮT CỐT TRUYỆN / NỘI DUNG CHÍNH (analysisPreview)
  if (
    qNorm.includes('tom tat') ||
    qNorm.includes('noi dung') ||
    qNorm.includes('cot truyen') ||
    qNorm.includes('dien bien') ||
    qNorm.includes('ke lai') ||
    qNorm.includes('chuyen gi xay ra')
  ) {
    return {
      text: `Dựa vào phần tóm tắt và nội dung chính (**analysisPreview**):\n\n📖 **Tóm tắt tác phẩm:**\n${scope.analysisPreview.summary}`,
      isGrounded: true,
      citationSources: ['analysisPreview'],
      citationDetail: `Trích từ analysisPreview: Tóm tắt nội dung văn bản`,
    };
  }

  // 3. CHỦ ĐỀ, TƯ TƯỞNG, Ý NGHĨA BÀI HỌC (analysisPreview)
  if (
    qNorm.includes('chu de') ||
    qNorm.includes('y nghia') ||
    qNorm.includes('thong diep') ||
    qNorm.includes('bai hoc') ||
    qNorm.includes('tu tuong') ||
    qNorm.includes('nhan van') ||
    qNorm.includes('triet ly')
  ) {
    const themesText = scope.analysisPreview.keyThemes.map((t, idx) => `• ${t}`).join('\n');
    return {
      text: `Dựa vào bản phân tích giá trị tư tưởng (**analysisPreview**):\n\n✨ **Chủ đề chính của bài học:**\n${themesText}\n\n💡 **Ý nghĩa tư tưởng & Bài học nhân văn:**\n${scope.analysisPreview.ideologicalValue}`,
      isGrounded: true,
      citationSources: ['analysisPreview'],
      citationDetail: `Trích từ analysisPreview: Giá trị tư tưởng & Chủ đề`,
    };
  }

  // 4. GIÁ TRỊ NGHỆ THUẬT (analysisPreview)
  if (
    qNorm.includes('nghe thuat') ||
    qNorm.includes('bien phap') ||
    qNorm.includes('tu tu') ||
    qNorm.includes('hinh anh') ||
    qNorm.includes('giong dieu') ||
    qNorm.includes('ngon ngu') ||
    qNorm.includes('dac sac')
  ) {
    const artText = scope.analysisPreview.artisticValues.map((a, idx) => `• ${a}`).join('\n');
    return {
      text: `Dựa vào phần phân tích đặc sắc nghệ thuật (**analysisPreview**):\n\n🎨 **Các giá trị nghệ thuật nổi bật:**\n${artText}`,
      isGrounded: true,
      citationSources: ['analysisPreview'],
      citationDetail: `Trích từ analysisPreview: Đặc sắc nghệ thuật`,
    };
  }

  // 5. CÂU HỎI ĐỌC HIỂU & ÔN TẬP (studyPack)
  // Check if query matches any discussion question in studyPack
  for (const dq of scope.studyPack.discussionQuestions) {
    const qWords = normalize(dq.question).split(' ').filter((w) => w.length > 2);
    const matchedCount = qWords.filter((w) => qNorm.includes(w)).length;
    if (matchedCount >= 3 || (qWords.length <= 4 && matchedCount >= 2)) {
      return {
        text: `Dựa vào bộ câu hỏi ôn tập (**studyPack**) cho tác phẩm "${scope.title}":\n\n❓ **Câu hỏi:** ${dq.question}\n\n💡 **Gợi ý tư duy:** ${dq.hint}\n\n📝 **Trả lời chuẩn ôn bài:**\n${dq.answer}`,
        isGrounded: true,
        citationSources: ['studyPack'],
        citationDetail: `Trích từ studyPack: Câu hỏi đọc hiểu và đáp án chuẩn`,
      };
    }
  }

  // 6. PHÂN TÍCH LUẬN ĐIỂM CHI TIẾT (analysisSections)
  for (const section of scope.analysisPreview.analysisSections) {
    const secWords = normalize(section.title).split(' ').filter((w) => w.length > 2);
    const matched = secWords.filter((w) => qNorm.includes(w)).length;
    if (matched >= 2) {
      return {
        text: `Dựa vào luận điểm phân tích (**analysisPreview**) - "${section.title}":\n\n${section.content}${section.quote ? `\n\n📌 **Dẫn chứng trích đoạn:** *${section.quote}*` : ''}`,
        isGrounded: true,
        citationSources: ['analysisPreview'],
        citationDetail: `Trích từ analysisPreview: ${section.title}`,
      };
    }
  }

  // 7. SƠ ĐỒ TƯ DUY (studyPack - mindMap)
  if (qNorm.includes('so do') || qNorm.includes('tu duy') || qNorm.includes('nhanh') || qNorm.includes('so do tu duy')) {
    const branchesText = scope.studyPack.mindMapBranches
      .map((b) => `• **${b.title}:**\n${b.subNodes.map((s) => `  - ${s}`).join('\n')}`)
      .join('\n\n');

    return {
      text: `Dựa vào hệ thống sơ đồ tư duy (**studyPack**) của bài học:\n\n${branchesText}`,
      isGrounded: true,
      citationSources: ['studyPack'],
      citationDetail: `Trích từ studyPack: Sơ đồ tư duy logic tác phẩm`,
    };
  }

  // 8. TÌM KIẾM TRONG ĐOẠN TRÍCH VĂN BẢN (sources excerpt)
  const keyEntities = normalize(scope.sources.title + ' ' + scope.sources.excerpt).split(' ');
  const relevantKeywordsInQuery = keyEntities.filter((k) => k.length > 3 && qNorm.includes(k));

  if (relevantKeywordsInQuery.length >= 2 || qNorm.includes('trich doan') || qNorm.includes('van ban') || qNorm.includes('doan trich')) {
    return {
      text: `Dựa vào đoạn trích văn bản (**sources**) của tác phẩm "${scope.title}":\n\n*"${scope.sources.excerpt}"*\n\n📌 **Tóm lược bối cảnh:** ${scope.analysisPreview.summary.slice(0, 180)}...`,
      isGrounded: true,
      citationSources: ['sources', 'analysisPreview'],
      citationDetail: `Trích từ sources: Đoạn trích tiêu biểu`,
    };
  }

  // 9. KIỂM TRA ĐIỀU KIỆN OUT-OF-SCOPE (NGOÀI PHẠM VI TÀI LIỆU ĐÃ CUNG CẤP)
  // THE STRICT REQUIREMENT:
  // "nếu câu hỏi không có trong tài liệu hoặc không suy ra được từ tài liệu, phải trả lời rõ:
  // "Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp.""
  return {
    text: `Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp.\n\n💡 *Gợi ý ôn bài:* Hiện tại tài liệu của chủ đề **"${scope.title}"** chỉ bao gồm:\n- **sources**: Tác giả ${scope.sources.author}, thể loại ${scope.sources.genre}, bố cục và đoạn trích.\n- **analysisPreview**: Tóm tắt cốt truyện, giá trị nghệ thuật, chủ đề và phân tích chi tiết.\n- **studyPack**: Câu hỏi thảo luận đọc hiểu và sơ đồ tư duy.\n\nBạn vui lòng đặt câu hỏi liên quan đến các nội dung trên để mình hỗ trợ ôn bài thật tốt nhé!`,
    isGrounded: false,
  };
}
