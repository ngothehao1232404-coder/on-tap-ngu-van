export type CurriculumGrade = 7;

export type LessonCategory = 
  | 'reading'       // Đọc hiểu văn bản
  | 'language'      // Thực hành tiếng Việt
  | 'writing'       // Tập làm văn & Kỹ năng viết
  | 'mindmap'       // Sơ đồ tư duy
  | 'resources'     // Kho học liệu số & Đề thi ma trận
  | 'quiz'          // Luyện đề & Trắc nghiệm
  | 'flashcard'     // Thẻ ghi nhớ
  | 'chatbot'       // Chatbot Grounded Ôn Bài
  | 'notebook'      // Sổ tay học tập
  | 'personal_space'; // Góc học tập của riêng em (Không gian cá nhân)

export interface GroundedChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isGrounded?: boolean;
  citationSources?: Array<'sources' | 'analysisPreview' | 'studyPack'>;
  citationDetail?: string;
}

export interface LiteraryWork {
  id: string;
  title: string;
  author: string;
  authorBio: string;
  genre: string; // Thể loại (Truyện ngắn, Thơ bốn chữ, Tùy bút...)
  topicId: string;
  topicName: string;
  image: string;
  excerpt: string;
  readTime: string;
  summary: string;
  structure: {
    part: string;
    range: string;
    content: string;
  }[];
  keyThemes: string[];
  artisticValues: string[];
  ideologicalValue: string;
  analysisSections: {
    title: string;
    content: string;
    quote?: string;
  }[];
  discussionQuestions: {
    question: string;
    hint: string;
    answer: string;
  }[];
  mindMap: MindMapData;
}

export interface MindMapData {
  root: string;
  branches: {
    title: string;
    color: string;
    subNodes: string[];
  }[];
}

export interface LanguageTopic {
  id: string;
  title: string;
  concept: string;
  examples: {
    sentence: string;
    analysis: string;
  }[];
  rules: string[];
  practiceExercises: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface WritingGenreGuide {
  id: string;
  title: string;
  targetGenre: string;
  requirements: string[];
  outlineTemplate: {
    introduction: string[];
    body: string[];
    conclusion: string[];
  };
  sampleEssays: {
    topic: string;
    gradeLevel: string;
    fullText: string;
    commentary: string;
  }[];
  goodOpenings: string[];
  goodEndings: string[];
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type FlashCardCategory = 'concept' | 'definition' | 'example' | 'comparison' | 'rule_note';

export type FlashCardSubject = 
  | 'literature' 
  | 'history_geography' 
  | 'natural_sciences' 
  | 'english' 
  | 'math' 
  | 'civics' 
  | 'other';

export interface FlashCardItem {
  id: string;
  topic: string;
  subject?: FlashCardSubject;
  subjectName?: string;
  category?: FlashCardCategory;
  front: string; // Mặt trước: Khái niệm / Thuật ngữ / Câu hỏi
  back: string;  // Mặt sau: Định nghĩa / Giải thích cốt lõi
  example?: string; // Ví dụ minh họa ngắn gọn
  notes?: string;   // Quy tắc hoặc lưu ý quan trọng cần nhớ
  tags: string[];
  isCustom?: boolean;
  createdAt?: string;
}

export interface UserNote {
  id: string;
  title: string;
  workId?: string;
  content: string;
  createdAt: string;
  tags: string[];
}

export type ResourceCategoryType = 'exam_bank' | 'worksheet' | 'curriculum_map' | 'glossary' | 'reference_doc';

export interface LearningResourceItem {
  id: string;
  title: string;
  category: ResourceCategoryType;
  textbook: 'all' | 'ket_noi' | 'canh_dieu' | 'chan_troi';
  semester: 1 | 2 | 'both';
  description: string;
  previewSnippet: string;
  content: string;
  format: 'Bản in PDF/Doc' | 'Phiếu học tập' | 'Ma trận đề thi' | 'Bảng tổng hợp';
  tags: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Thơ' | 'Truyện' | 'Nghị luận' | 'Ký - Tùy bút' | 'Tiếng Việt';
  definition: string;
  manifestation: string; // Biểu hiện trong ngữ văn 7
  example: string;
}

export interface CurriculumComparisonItem {
  unit: number;
  semester: 1 | 2;
  coreTheme: string;
  ketNoi: { unitName: string; keyWorks: string[] };
  canhDieu: { unitName: string; keyWorks: string[] };
  chanTroi: { unitName: string; keyWorks: string[] };
  mainCompetency: string;
}

export interface StudentProfile {
  name: string;
  nickname: string;
  targetGrade: number; // Điểm mục tiêu (ví dụ 8.5 hoặc 9.0)
  favoriteGenre: string;
  targetBook: 'ket_noi' | 'canh_dieu' | 'chan_troi';
  motto: string;
}

export interface StudyTask {
  id: string;
  title: string;
  category: 'Đọc hiểu' | 'Tiếng Việt' | 'Tập làm văn' | 'Ôn thi' | 'Học thuộc thơ';
  deadline?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface PersonalEssayDraft {
  id: string;
  title: string;
  genre: string;
  prompt: string;
  bodyText: string;
  wordCount: number;
  updatedAt: string;
  reflectionNotes?: string;
}

export interface FavoriteQuoteEntry {
  id: string;
  quote: string;
  source: string;
  author: string;
  meaning: string;
  dateAdded: string;
}

export interface ExamScoreEntry {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
  type: '15 phút' | 'Giữa kì' | 'Cuối kì' | 'Tự luyện';
  notes: string;
}

export type PracticeQuestionType = 'true_false' | 'multiple_choice' | 'fill_blank' | 'short_answer';

export interface PracticeQuestionItem {
  id: string;
  topicId: string;
  topicName: string;
  type: PracticeQuestionType;
  question: string;
  // Multiple choice
  options?: string[];
  correctIndex?: number;
  // True / False
  correctBoolean?: boolean;
  // Fill blank
  correctText?: string;
  acceptableAnswers?: string[];
  // Short answer
  sampleAnswer?: string;
  keyPoints?: string[];
  explanation: string;
  isCustom?: boolean;
  createdAt?: string;
}

export interface TopicPracticeSet {
  id: string;
  title: string;
  topicId: string;
  description: string;
  questions: PracticeQuestionItem[];
}
