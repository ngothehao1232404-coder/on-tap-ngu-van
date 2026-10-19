import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  BookOpen,
  Eye,
  AlertCircle,
  ChevronRight,
  Lightbulb,
  Clock,
  CheckSquare,
  Plus,
  Edit3,
  Trash2,
  Save,
  X
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { INITIAL_PRACTICE_QUESTIONS } from '../data/topicPracticeQuestions';
import { QuizQuestion, ExamScoreEntry, PracticeQuestionItem } from '../types/literature';

// Normalized generic quiz question for QuizMode
export interface QuizModeQuestion {
  id: string;
  topicName: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank';
  options?: string[];
  correctIndex?: number;
  correctBoolean?: boolean;
  correctText?: string;
  acceptableAnswers?: string[];
  explanation: string;
  reviewHint: string; // Gợi ý ngắn để học sinh ôn lại kiến thức
  difficulty?: 'easy' | 'medium' | 'hard';
  isCustom?: boolean;
}

interface QuizModeProps {
  onBackToOverview?: () => void;
  initialQuizId?: string;
}

// Built-in educational review hints for the standard 12 questions
const STANDARD_REVIEW_HINTS: Record<string, string> = {
  q1: 'Đọc lại phần chú thích tiểu sử tác giả Nguyễn Quang Thiều ở đầu bài "Bầy chim chìa vôi" (SGK Ngữ văn 7 tập 1).',
  q2: 'Xem lại đoạn kết khi Mon và Mên thấy bầy chim non cất cánh bay lên an toàn khỏi dòng nước lũ sông Đáy.',
  q3: 'Ghi nhớ hoàn cảnh xuất xứ: "Đi lấy mật" trích từ tiểu thuyết nổi tiếng "Đất rừng phương Nam" của Đoàn Giỏi.',
  q4: 'Chú ý kinh nghiệm dân gian: Kèo là nhánh tràm được gác đón hướng gió để ong rừng tự bay về làm tổ.',
  q5: 'Ôn lại đặc điểm thể thơ bốn chữ: nhịp ngắt 2/2, âm hưởng đồng dao dân gian tươi vui, trong trẻo.',
  q6: 'Đọc lại khổ thơ thứ 2 bài "Đồng dao mùa xuân": người lính chưa từng yêu, chưa uống cà phê, còn mê thả diều.',
  q7: 'Xem lại chi tiết nhành lá cơm nếp ven đường hành quân đánh thức nỗi nhớ quê nhà và hình ảnh người mẹ tần tảo.',
  q8: 'Ôn lại đặc trưng thể loại tùy bút: "Mùa xuân của tôi" trích từ tập tùy bút "Thương nhớ mười hai" của Vũ Bằng.',
  q9: 'Ghi nhớ bài học thành ngữ "Ếch ngồi đáy giếng": Tránh thói tự phụ, kiêu ngạo khi sống trong môi trường hạn hẹp.',
  q10: 'Ghi nhớ bài học nhận thức từ "Thầy bói xem voi": Cần nhìn nhận sự vật toàn diện, tránh cái nhìn phiến diện, áp đặt.',
  q11: 'Xem lại đoạn văn chính luận: Bác Hồ so sánh lòng yêu nước như một "làn sóng vô cùng mạnh mẽ, to lớn lướt qua nguy hiểm".',
  q12: 'Phân biệt biện pháp tu từ ẩn dụ: "Mặt trời của mẹ" ví đứa con như nguồn sống ấm áp sưởi ấm đời mẹ.'
};

// Initial default questions generator
const getDefaultQuizQuestions = (): QuizModeQuestion[] => {
  return QUIZ_QUESTIONS.map((q) => {
    let topicClean = 'Ngữ văn 7';
    if (q.topicId === 'bau-troi-tuoi-tho') topicClean = 'Bầu trời tuổi thơ';
    else if (q.topicId === 'khuc-nhac-tam-hon') topicClean = 'Khúc nhạc tâm hồn';
    else if (q.topicId === 'tri-tue-dan-gian') topicClean = 'Trí tuệ dân gian';
    else if (q.topicId === 'tieng-viet') topicClean = 'Thực hành Tiếng Việt';

    const customHint = STANDARD_REVIEW_HINTS[q.id] || `Đọc lại phần kiến thức trọng tâm về chủ đề ${topicClean} trong SGK.`;

    return {
      id: q.id,
      topicName: topicClean,
      question: q.question,
      type: 'multiple_choice',
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      reviewHint: customHint,
      difficulty: q.difficulty,
    };
  });
};

export const QuizMode: React.FC<QuizModeProps> = ({ onBackToOverview }) => {
  // 1. Quản lý danh sách câu hỏi Quiz với LocalStorage (Hỗ trợ CRUD đầy đủ)
  const [standardQuestions, setStandardQuestions] = useState<QuizModeQuestion[]>(() => {
    try {
      const saved = localStorage.getItem('nv7_quiz_questions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return getDefaultQuizQuestions();
  });

  // Tự động lưu vào LocalStorage khi câu hỏi thay đổi
  useEffect(() => {
    try {
      localStorage.setItem('nv7_quiz_questions', JSON.stringify(standardQuestions));
    } catch (e) {
      console.error('Failed to save nv7_quiz_questions', e);
    }
  }, [standardQuestions]);

  // Nguồn dữ liệu đã lưu
  const [selectedQuizSource, setSelectedQuizSource] = useState<'standard_quiz' | 'practice_saved'>('standard_quiz');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');

  // Chế độ xem kết quả:
  // - 'after_each_question': Xem kết quả ngay sau mỗi câu
  // - 'after_full_quiz': Xem kết quả sau khi hoàn thành cả lượt quiz
  const [feedbackTiming, setFeedbackTiming] = useState<'after_each_question' | 'after_full_quiz'>('after_each_question');

  // Load câu hỏi ôn tập khác từ LocalStorage (nv7_practice_questions)
  const [savedPracticeQuestions] = useState<PracticeQuestionItem[]>(() => {
    try {
      const saved = localStorage.getItem('nv7_practice_questions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_PRACTICE_QUESTIONS;
  });

  // Danh sách câu hỏi đang hiển thị
  const allLoadedQuestions: QuizModeQuestion[] = useMemo(() => {
    if (selectedQuizSource === 'standard_quiz') {
      return standardQuestions;
    }

    const filtered = selectedTopicFilter === 'all'
      ? savedPracticeQuestions
      : savedPracticeQuestions.filter(p => p.topicId === selectedTopicFilter);

    return filtered.map((p) => {
      let qType: 'multiple_choice' | 'true_false' | 'fill_blank' = 'multiple_choice';
      if (p.type === 'true_false') qType = 'true_false';
      else if (p.type === 'fill_blank') qType = 'fill_blank';

      const shortHint = p.keyPoints && p.keyPoints.length > 0
        ? `Lưu ý trọng tâm: ${p.keyPoints[0]}`
        : p.explanation.length > 80
        ? `Gợi ý: ${p.explanation.slice(0, 75)}...`
        : `Gợi ý: ${p.explanation}`;

      return {
        id: p.id,
        topicName: p.topicName,
        question: p.question,
        type: qType,
        options: p.options || (p.type === 'true_false' ? ['Đúng', 'Sai'] : undefined),
        correctIndex: p.correctIndex,
        correctBoolean: p.correctBoolean,
        correctText: p.correctText,
        acceptableAnswers: p.acceptableAnswers,
        explanation: p.explanation,
        reviewHint: shortHint,
        difficulty: 'medium',
      };
    });
  }, [selectedQuizSource, standardQuestions, selectedTopicFilter, savedPracticeQuestions]);

  // Bộ câu hỏi con (khi bấm làm lại câu sai)
  const [activeQuestionSubset, setActiveQuestionSubset] = useState<QuizModeQuestion[] | null>(null);
  const questions = activeQuestionSubset || allLoadedQuestions;

  // Vị trí câu hỏi hiện tại
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Lưu câu trả lời theo từng câu
  const [answersByQuestion, setAnswersByQuestion] = useState<Record<string, any>>({});
  const [checkedByQuestion, setCheckedByQuestion] = useState<Record<string, boolean>>({});

  // Trạng thái hoàn thành bài
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong_only' | 'correct_only'>('all');

  // Thông báo Toast ngắn gọn
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ========================================================
  // CRUD STATE & MODAL CHO QUIZ
  // ========================================================
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  // Form fields
  const [formTopicName, setFormTopicName] = useState<string>('Bầu trời tuổi thơ');
  const [formQuestionText, setFormQuestionText] = useState<string>('');
  const [formOptionA, setFormOptionA] = useState<string>('');
  const [formOptionB, setFormOptionB] = useState<string>('');
  const [formOptionC, setFormOptionC] = useState<string>('');
  const [formOptionD, setFormOptionD] = useState<string>('');
  const [formCorrectIndex, setFormCorrectIndex] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState<string>('');
  const [formReviewHint, setFormReviewHint] = useState<string>('');

  // Close modal on Escape
  useEffect(() => {
    if (!isQuizModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsQuizModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuizModalOpen]);

  // Mở modal tạo câu hỏi mới
  const handleOpenCreateQuizModal = () => {
    setEditingQuestionId(null);
    setFormTopicName('Thực hành Tiếng Việt');
    setFormQuestionText('');
    setFormOptionA('');
    setFormOptionB('');
    setFormOptionC('');
    setFormOptionD('');
    setFormCorrectIndex(0);
    setFormExplanation('');
    setFormReviewHint('');
    setIsQuizModalOpen(true);
  };

  // Mở modal sửa câu hỏi có sẵn
  const handleOpenEditQuizModal = (q: QuizModeQuestion, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingQuestionId(q.id);
    setFormTopicName(q.topicName);
    setFormQuestionText(q.question);
    const opts = q.options || ['', '', '', ''];
    setFormOptionA(opts[0] || '');
    setFormOptionB(opts[1] || '');
    setFormOptionC(opts[2] || '');
    setFormOptionD(opts[3] || '');
    setFormCorrectIndex(q.correctIndex || 0);
    setFormExplanation(q.explanation);
    setFormReviewHint(q.reviewHint);
    setIsQuizModalOpen(true);
  };

  // Lưu câu hỏi (Thêm mới hoặc Cập nhật)
  const handleSaveQuizQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formQuestionText.trim()) {
      alert('Vui lòng nhập nội dung câu hỏi!');
      return;
    }
    if (!formOptionA.trim() || !formOptionB.trim()) {
      alert('Vui lòng nhập ít nhất hai phương án đáp án A và B!');
      return;
    }

    const options = [
      formOptionA.trim(),
      formOptionB.trim(),
      formOptionC.trim() || 'Phương án khác',
      formOptionD.trim() || 'Phương án khác'
    ];

    if (editingQuestionId) {
      // Sửa câu hỏi
      setStandardQuestions(prev => prev.map(q => {
        if (q.id === editingQuestionId) {
          return {
            ...q,
            topicName: formTopicName.trim() || 'Ngữ văn 7',
            question: formQuestionText.trim(),
            options,
            correctIndex: formCorrectIndex,
            explanation: formExplanation.trim() || 'Đáp án chính xác theo chương trình học.',
            reviewHint: formReviewHint.trim() || `Xem lại kiến thức về chủ đề ${formTopicName}.`
          };
        }
        return q;
      }));
      showToast('Đã cập nhật câu hỏi quiz thành công!');
    } else {
      // Thêm câu hỏi mới
      const newQuestion: QuizModeQuestion = {
        id: `custom-q-${Date.now()}`,
        topicName: formTopicName.trim() || 'Ngữ văn 7',
        question: formQuestionText.trim(),
        type: 'multiple_choice',
        options,
        correctIndex: formCorrectIndex,
        explanation: formExplanation.trim() || 'Đáp án chính xác theo chương trình học.',
        reviewHint: formReviewHint.trim() || `Xem lại kiến thức về chủ đề ${formTopicName}.`,
        difficulty: 'medium',
        isCustom: true
      };
      setStandardQuestions(prev => [...prev, newQuestion]);
      showToast('Đã thêm câu hỏi mới vào bài quiz!');
    }

    setIsQuizModalOpen(false);
  };

  // Xóa câu hỏi không phù hợp
  const handleDeleteQuizQuestion = (questionId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (standardQuestions.length <= 1) {
      alert('Không thể xóa câu hỏi cuối cùng của bài quiz!');
      return;
    }

    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này khỏi bài quiz?')) {
      setStandardQuestions(prev => prev.filter(q => q.id !== questionId));
      setAnswersByQuestion(prev => {
        const copy = { ...prev };
        delete copy[questionId];
        return copy;
      });
      setCheckedByQuestion(prev => {
        const copy = { ...prev };
        delete copy[questionId];
        return copy;
      });
      if (currentIndex >= standardQuestions.length - 1) {
        setCurrentIndex(Math.max(0, standardQuestions.length - 2));
      }
      showToast('Đã xóa câu hỏi khỏi bài quiz.');
    }
  };

  // Khôi phục câu hỏi mặc định
  const handleResetToDefaultQuiz = () => {
    if (confirm('Khôi phục danh sách 12 câu hỏi trắc nghiệm chuẩn ban đầu?')) {
      const defaultList = getDefaultQuizQuestions();
      setStandardQuestions(defaultList);
      localStorage.setItem('nv7_quiz_questions', JSON.stringify(defaultList));
      setAnswersByQuestion({});
      setCheckedByQuestion({});
      setCurrentIndex(0);
      setIsFinished(false);
      showToast('Đã khôi phục bộ 12 câu hỏi mặc định!');
    }
  };

  // Reset index when source/topic changes
  useEffect(() => {
    setCurrentIndex(0);
    setAnswersByQuestion({});
    setCheckedByQuestion({});
    setIsFinished(false);
    setActiveQuestionSubset(null);
  }, [selectedQuizSource, selectedTopicFilter]);

  // Active Question
  const currentQuestion: QuizModeQuestion | undefined = questions[currentIndex];
  const currentAnswer = currentQuestion ? answersByQuestion[currentQuestion.id] : undefined;
  const isCurrentChecked = currentQuestion ? !!checkedByQuestion[currentQuestion.id] : false;

  const handleSelectAnswer = (questionId: string, answerValue: any) => {
    setAnswersByQuestion((prev) => ({
      ...prev,
      [questionId]: answerValue,
    }));
  };

  const isQuestionCorrect = (q: QuizModeQuestion, userAns: any): boolean => {
    if (userAns === undefined || userAns === null || userAns === '') return false;
    if (q.type === 'multiple_choice') return userAns === q.correctIndex;
    if (q.type === 'true_false') return userAns === q.correctBoolean;
    if (q.type === 'fill_blank') {
      const normalizedUser = String(userAns).trim().toLowerCase();
      const normalizedCorrect = String(q.correctText || '').trim().toLowerCase();
      if (normalizedUser === normalizedCorrect) return true;
      if (q.acceptableAnswers && q.acceptableAnswers.some(a => a.toLowerCase() === normalizedUser)) {
        return true;
      }
      return false;
    }
    return false;
  };

  const handleCheckCurrentAnswer = () => {
    if (!currentQuestion) return;
    if (currentAnswer === undefined || currentAnswer === '') {
      alert('Vui lòng chọn hoặc nhập đáp án trước khi kiểm tra kết quả nhé!');
      return;
    }
    setCheckedByQuestion((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    if (idx >= 0 && idx < questions.length) {
      setCurrentIndex(idx);
    }
  };

  const handleResetSession = () => {
    if (confirm('Làm lại bài quiz này từ đầu? Tất cả câu trả lời sẽ được làm mới.')) {
      setAnswersByQuestion({});
      setCheckedByQuestion({});
      setCurrentIndex(0);
      setIsFinished(false);
      setActiveQuestionSubset(null);
    }
  };

  const handlePracticeWrongQuestionsOnly = () => {
    const wrongQuestions = questions.filter((q) => {
      const ans = answersByQuestion[q.id];
      return !isQuestionCorrect(q, ans);
    });

    if (wrongQuestions.length === 0) {
      alert('Tuyệt vời! Bạn đã làm đúng tất cả các câu hỏi.');
      return;
    }

    setActiveQuestionSubset(wrongQuestions);
    setAnswersByQuestion({});
    setCheckedByQuestion({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  // Thống kê kết quả
  const stats = useMemo(() => {
    let answeredCount = 0;
    let correctCount = 0;
    let wrongCount = 0;

    questions.forEach((q) => {
      const ans = answersByQuestion[q.id];
      const hasAns = ans !== undefined && ans !== '';
      if (hasAns) {
        answeredCount++;
        if (isQuestionCorrect(q, ans)) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });

    const total = questions.length;
    const unansweredCount = total - answeredCount;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const score10 = total > 0 ? Number(((correctCount / total) * 10).toFixed(1)) : 0;

    return {
      answeredCount,
      correctCount,
      wrongCount,
      unansweredCount,
      total,
      percentage,
      score10,
    };
  }, [questions, answersByQuestion]);

  const [savedScoreSuccess, setSavedScoreSuccess] = useState<boolean>(false);
  const handleSaveResultToDiary = () => {
    try {
      const existing = localStorage.getItem('nv7_my_scores');
      const list: ExamScoreEntry[] = existing ? JSON.parse(existing) : [];

      const newEntry: ExamScoreEntry = {
        id: `sc-quizmode-${Date.now()}`,
        title: `Quiz Mode: ${selectedQuizSource === 'standard_quiz' ? 'Trắc nghiệm Ngữ văn 7' : 'Bộ câu hỏi đã lưu'}`,
        score: stats.score10,
        maxScore: 10,
        date: new Date().toLocaleDateString('vi-VN'),
        type: 'Tự luyện',
        notes: `Kết quả: Đúng ${stats.correctCount}/${stats.total} câu (${stats.percentage}%).`,
      };

      localStorage.setItem('nv7_my_scores', JSON.stringify([newEntry, ...list]));
      setSavedScoreSuccess(true);
      setTimeout(() => setSavedScoreSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 bg-stone-900 text-white rounded-xl text-xs flex items-center justify-between shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Đã đồng bộ LocalStorage</span>
        </div>
      )}

      {/* MODAL CRUD: THÊM / SỬA CÂU HỎI QUIZ */}
      {isQuizModalOpen && (
        <div
          onClick={() => setIsQuizModalOpen(false)}
          className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] cursor-default"
          >
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-stone-900">
                    {editingQuestionId ? 'Chỉnh Sửa Câu Hỏi Quiz' : 'Thêm Câu Hỏi Mới Vào Quiz'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Dữ liệu cập nhật tự động lưu trữ trên LocalStorage của máy
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsQuizModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuizQuestion} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* Chủ đề */}
              <div>
                <label className="block text-stone-700 font-bold mb-1">Chủ đề bài học (*)</label>
                <input
                  type="text"
                  value={formTopicName}
                  onChange={(e) => setFormTopicName(e.target.value)}
                  placeholder="Ví dụ: Bầu trời tuổi thơ, Tiếng Việt, Khúc nhạc tâm hồn..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Nội dung câu hỏi */}
              <div>
                <label className="block text-stone-700 font-bold mb-1">Nội dung câu hỏi (*)</label>
                <textarea
                  value={formQuestionText}
                  onChange={(e) => setFormQuestionText(e.target.value)}
                  placeholder="Nhập nội dung câu hỏi trắc nghiệm..."
                  rows={3}
                  className="w-full p-3 bg-white border border-stone-300 rounded-xl font-serif text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                  required
                />
              </div>

              {/* 4 Phương án đáp án */}
              <div className="space-y-2">
                <label className="block text-stone-700 font-bold">4 Phương án trả lời (*)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-700 font-bold flex items-center justify-center shrink-0">A</span>
                    <input
                      type="text"
                      value={formOptionA}
                      onChange={(e) => setFormOptionA(e.target.value)}
                      placeholder="Phương án A"
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-700 font-bold flex items-center justify-center shrink-0">B</span>
                    <input
                      type="text"
                      value={formOptionB}
                      onChange={(e) => setFormOptionB(e.target.value)}
                      placeholder="Phương án B"
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-700 font-bold flex items-center justify-center shrink-0">C</span>
                    <input
                      type="text"
                      value={formOptionC}
                      onChange={(e) => setFormOptionC(e.target.value)}
                      placeholder="Phương án C"
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-700 font-bold flex items-center justify-center shrink-0">D</span>
                    <input
                      type="text"
                      value={formOptionD}
                      onChange={(e) => setFormOptionD(e.target.value)}
                      placeholder="Phương án D"
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Chọn đáp án đúng */}
              <div>
                <label className="block text-stone-700 font-bold mb-1">Đáp án đúng (*)</label>
                <div className="flex items-center gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <label key={idx} className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={formCorrectIndex === idx}
                        onChange={() => setFormCorrectIndex(idx)}
                        className="text-amber-800 focus:ring-amber-500"
                      />
                      <span>Đáp án {String.fromCharCode(65 + idx)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Giải thích & Gợi ý ôn lại */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Lời giải chi tiết</label>
                  <textarea
                    value={formExplanation}
                    onChange={(e) => setFormExplanation(e.target.value)}
                    placeholder="Giải thích vì sao đáp án đó là chính xác..."
                    rows={2}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-amber-900 font-bold mb-1 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-700" />
                    <span>Gợi ý ngắn để ôn lại</span>
                  </label>
                  <textarea
                    value={formReviewHint}
                    onChange={(e) => setFormReviewHint(e.target.value)}
                    placeholder="Ví dụ: Đọc lại đoạn cuối truyện Bầy chim chìa vôi..."
                    rows={2}
                    className="w-full p-2 bg-amber-50/70 border border-amber-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsQuizModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingQuestionId ? 'Lưu thay đổi' : 'Thêm câu hỏi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Chế độ Tự Học Quiz Ngữ Văn 7 (Có CRUD Quản Lý)</span>
            </div>
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
              Luyện Tập Kiến Thức & Xem Kết Quả
            </h2>
            <p className="text-stone-500 text-xs mt-0.5">
              Dễ dàng thêm câu hỏi mới, sửa nội dung hoặc xóa câu không phù hợp. Dữ liệu lưu an toàn trên LocalStorage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Nút THÊM CÂU HỎI MỚI (CREATE) */}
            <button
              onClick={handleOpenCreateQuizModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
              title="Thêm câu hỏi mới vào bài quiz"
            >
              <Plus className="w-3.5 h-3.5 text-amber-200" />
              <span>Thêm câu hỏi</span>
            </button>

            <button
              onClick={handleResetSession}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              title="Làm mới lại toàn bộ bài quiz"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại</span>
            </button>

            <button
              onClick={handleResetToDefaultQuiz}
              className="text-[11px] text-stone-400 hover:text-stone-700 underline cursor-pointer px-1"
              title="Khôi phục lại 12 câu hỏi gốc"
            >
              Đặt lại gốc
            </button>

            {onBackToOverview && (
              <button
                onClick={onBackToOverview}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại</span>
              </button>
            )}
          </div>
        </div>

        {/* TÙY CHỌN CHẾ ĐỘ XEM KẾT QUẢ & NGUỒN ĐỀ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-bold text-stone-600 mb-1.5 uppercase tracking-wide">
              Thời điểm xem kết quả:
            </label>
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
              <button
                onClick={() => setFeedbackTiming('after_each_question')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                  feedbackTiming === 'after_each_question'
                    ? 'bg-white text-amber-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-amber-700" />
                <span>Sau mỗi câu</span>
              </button>
              <button
                onClick={() => setFeedbackTiming('after_full_quiz')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                  feedbackTiming === 'after_full_quiz'
                    ? 'bg-white text-amber-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-stone-600" />
                <span>Sau cả lượt quiz</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 mb-1.5 uppercase tracking-wide">
              Bộ câu hỏi đã lưu:
            </label>
            <select
              value={selectedQuizSource}
              onChange={(e) => setSelectedQuizSource(e.target.value as any)}
              className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="standard_quiz">Đề trắc nghiệm Ngữ văn 7 (Hiện có {standardQuestions.length} câu)</option>
              <option value="practice_saved">Bộ câu hỏi ôn tập theo chủ đề ({savedPracticeQuestions.length} câu)</option>
            </select>
          </div>
        </div>

        {/* Thông báo nếu đang làm lại riêng các câu sai */}
        {activeQuestionSubset && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-center justify-between">
            <span>Đang trong chế độ <strong>Ôn luyện lại các câu làm sai</strong> ({activeQuestionSubset.length} câu).</span>
            <button
              onClick={() => {
                setActiveQuestionSubset(null);
                setCurrentIndex(0);
              }}
              className="font-bold underline text-rose-800 hover:text-rose-950 cursor-pointer"
            >
              Quay lại toàn bộ câu hỏi
            </button>
          </div>
        )}

        {/* Progress Tracker Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-2 font-medium">
              <span>Đã làm:</span>
              <strong className="font-mono text-stone-900">{stats.answeredCount} / {stats.total} câu</strong>
              {feedbackTiming === 'after_each_question' && stats.answeredCount > 0 && (
                <>
                  <span className="text-stone-300">·</span>
                  <span className="text-emerald-700 font-semibold">Đúng: {stats.correctCount}</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-rose-700 font-semibold">Sai: {stats.wrongCount}</span>
                </>
              )}
            </div>
            <span className="text-[11px] text-stone-500">
              {feedbackTiming === 'after_each_question' ? 'Chế độ: Phản hồi tức thì' : 'Chế độ: Xem kết quả khi nộp bài'}
            </span>
          </div>

          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-800 transition-all duration-300 rounded-full"
              style={{ width: `${stats.total > 0 ? (stats.answeredCount / stats.total) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Stepper Dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const hasAnswer = answersByQuestion[q.id] !== undefined && answersByQuestion[q.id] !== '';
            const isChecked = feedbackTiming === 'after_each_question' ? !!checkedByQuestion[q.id] : false;
            const isCorrect = isChecked && isQuestionCorrect(q, answersByQuestion[q.id]);

            let dotStyle = 'bg-stone-100 text-stone-600 hover:bg-stone-200 border-stone-200';

            if (isCurrent) {
              dotStyle = 'ring-2 ring-amber-800 bg-amber-900 text-white font-bold';
            } else if (isChecked) {
              dotStyle = isCorrect
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
                : 'bg-rose-100 text-rose-900 border-rose-300 font-bold';
            } else if (hasAnswer) {
              dotStyle = 'bg-amber-100 text-amber-900 border-amber-300 font-medium';
            }

            return (
              <button
                key={q.id}
                onClick={() => handleJumpToQuestion(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-mono shrink-0 transition-all border flex items-center justify-center cursor-pointer ${dotStyle}`}
                title={`Câu ${idx + 1}: ${hasAnswer ? 'Đã trả lời' : 'Chưa làm'}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          MAIN QUIZ SCREEN: HIỂN THỊ TỪNG CÂU HỎI RÕ RÀNG
          CÓ NÚT SỬA & XÓA CÂU HỎI TRỰC TIẾP
         ======================================================== */}
      {!isFinished && currentQuestion ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Question Top Meta + CRUD Action Buttons */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-amber-800 text-white font-mono text-xs font-bold flex items-center justify-center">
                {currentIndex + 1}
              </span>
              <span className="font-bold text-xs uppercase tracking-wider text-amber-900">
                Câu hỏi {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500 font-medium">
                {currentQuestion.topicName}
              </span>
            </div>

            {/* CRUD Actions: SỬA & XÓA CÂU HỎI HIỆN TẠI */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => handleOpenEditQuizModal(currentQuestion, e)}
                className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
                title="Sửa nội dung câu hỏi này"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-800" />
                <span className="hidden sm:inline">Sửa câu</span>
              </button>

              <button
                onClick={(e) => handleDeleteQuizQuestion(currentQuestion.id, e)}
                className="p-1.5 rounded-lg bg-stone-100 hover:bg-rose-100 text-stone-600 hover:text-rose-700 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
                title="Xóa câu hỏi này khỏi bài quiz"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Xóa</span>
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="font-serif-display text-lg sm:text-xl font-bold text-stone-900 leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Đáp án */}
          <div className="space-y-3 pt-2">
            {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
              <div className="grid grid-cols-1 gap-2.5">
                {currentQuestion.options.map((opt, optIdx) => {
                  const isSelected = currentAnswer === optIdx;
                  const isChecked = feedbackTiming === 'after_each_question' && isCurrentChecked;
                  const isCorrectAnswer = optIdx === currentQuestion.correctIndex;

                  let optionStyle = 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800';

                  if (isChecked) {
                    if (isCorrectAnswer) {
                      optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300 font-semibold';
                    } else if (isSelected && !isCorrectAnswer) {
                      optionStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-200';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-amber-50 border-amber-600 text-amber-950 ring-2 ring-amber-300 font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(currentQuestion.id, optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs sm:text-sm ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-white border border-stone-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </div>

                      {isChecked && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isChecked && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Phản hồi từng câu */}
          {feedbackTiming === 'after_each_question' && (
            <div className="space-y-4 pt-2 border-t border-stone-100">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleCheckCurrentAnswer}
                  disabled={currentAnswer === undefined || currentAnswer === ''}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                    currentAnswer !== undefined && currentAnswer !== ''
                      ? 'bg-amber-800 hover:bg-amber-900 text-white active:scale-95'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>Kiểm tra kết quả câu này</span>
                </button>

                <div className="text-xs text-stone-500">
                  {currentAnswer !== undefined && currentAnswer !== '' ? (
                    <span className="text-amber-800 font-medium">✓ Đã lưu lựa chọn</span>
                  ) : (
                    <span>Hãy chọn đáp án để kiểm tra</span>
                  )}
                </div>
              </div>

              {isCurrentChecked && (
                <div className="p-4 rounded-2xl border text-xs leading-relaxed animate-in fade-in duration-200 space-y-3 bg-amber-50/60 border-amber-200">
                  {isQuestionCorrect(currentQuestion, currentAnswer) ? (
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Chính xác! Bạn đã trả lời đúng.</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Chưa chính xác!</span>
                      </div>
                      <div className="text-stone-700">
                        <strong>Đáp án đúng là: </strong>
                        {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
                          <span className="font-semibold text-emerald-900">
                            {String.fromCharCode(65 + (currentQuestion.correctIndex || 0))}. {currentQuestion.options[currentQuestion.correctIndex || 0]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-stone-800 space-y-1">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                      <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Gợi ý ngắn để ôn lại:</span>
                    </div>
                    <p className="text-stone-700 pl-5.5 leading-relaxed">{currentQuestion.reviewHint}</p>
                  </div>

                  <div className="pt-1 text-stone-600 text-[11px]">
                    <span className="font-semibold text-stone-800">Giải thích: </span>
                    <span>{currentQuestion.explanation}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentIndex === 0
                  ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                  : 'border-stone-300 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFinished(true)}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Xem kết quả lượt quiz
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>{currentIndex === questions.length - 1 ? 'Nộp bài & Hoàn thành' : 'Câu tiếp theo'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* MÀN HÌNH TỔNG KẾT KẾT QUẢ */
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-3 pb-6 border-b border-stone-100">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6 text-amber-800" />
            </div>

            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              Kết Quả Lượt Quiz
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm">
              Tổng kết kết quả tự học, phản ánh đúng tỷ lệ số câu đạt và gợi ý củng cố bài học:
            </p>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 max-w-md mx-auto">
              <div className="text-xs uppercase font-bold tracking-wider text-stone-500 mb-1">
                Số câu trả lời đúng / Tổng số câu
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                <span className="text-emerald-700">{stats.correctCount}</span>
                <span className="text-stone-400 font-sans font-normal text-2xl"> / {stats.total} câu</span>
              </div>
              <div className="text-xs text-stone-600 font-medium mt-1">
                Tỷ lệ chính xác: <strong className="text-stone-900">{stats.percentage}%</strong> · Điểm quy đổi: <strong className="text-amber-900">{stats.score10}/10</strong>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-stone-200 text-[11px]">
                <div className="text-center">
                  <div className="font-bold text-emerald-700 font-mono text-sm">{stats.correctCount}</div>
                  <div className="text-stone-500">Câu đúng</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-rose-700 font-mono text-sm">{stats.wrongCount}</div>
                  <div className="text-stone-500">Câu sai</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-stone-500 font-mono text-sm">{stats.unansweredCount}</div>
                  <div className="text-stone-500">Chưa làm</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {stats.wrongCount > 0 && (
              <button
                onClick={handlePracticeWrongQuestionsOnly}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-800 hover:bg-rose-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại {stats.wrongCount} câu sai</span>
              </button>
            )}

            <button
              onClick={handleSaveResultToDiary}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              {savedScoreSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Đã ghi vào sổ theo dõi</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-amber-200" />
                  <span>Lưu kết quả vào Nhật ký</span>
                </>
              )}
            </button>

            <button
              onClick={handleResetSession}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Luyện lại cả đề</span>
            </button>
          </div>

          {/* Review List */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="font-bold text-xs uppercase tracking-wider text-stone-700">
                Chi tiết kết quả từng câu:
              </div>

              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                    reviewFilter === 'all'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Tất cả ({questions.length})
                </button>
                <button
                  onClick={() => setReviewFilter('wrong_only')}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                    reviewFilter === 'wrong_only'
                      ? 'bg-rose-800 text-white font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Câu làm sai ({stats.wrongCount})
                </button>
                <button
                  onClick={() => setReviewFilter('correct_only')}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                    reviewFilter === 'correct_only'
                      ? 'bg-emerald-800 text-white font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Câu làm đúng ({stats.correctCount})
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {questions
                .filter((q) => {
                  const userAns = answersByQuestion[q.id];
                  const hasAnswered = userAns !== undefined && userAns !== '';
                  const isCorrect = hasAnswered && isQuestionCorrect(q, userAns);

                  if (reviewFilter === 'wrong_only') return !isCorrect;
                  if (reviewFilter === 'correct_only') return isCorrect;
                  return true;
                })
                .map((q, idx) => {
                  const userAns = answersByQuestion[q.id];
                  const hasAnswered = userAns !== undefined && userAns !== '';
                  const isCorrect = hasAnswered && isQuestionCorrect(q, userAns);

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border text-xs space-y-2.5 transition-colors ${
                        !hasAnswered
                          ? 'bg-stone-50 border-stone-200 text-stone-700'
                          : isCorrect
                          ? 'bg-emerald-50/40 border-emerald-200 text-stone-900'
                          : 'bg-rose-50/40 border-rose-200 text-stone-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-white border border-stone-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="font-semibold text-stone-900 text-xs sm:text-sm leading-snug">
                              {q.question}
                            </div>
                            <div className="text-[11px] text-stone-500 mt-0.5">
                              Chủ đề: {q.topicName}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {hasAnswered ? (
                            isCorrect ? (
                              <span className="flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                                <span>ĐÚNG</span>
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 font-bold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-md">
                                <XCircle className="w-3.5 h-3.5 text-rose-700" />
                                <span>SAI</span>
                              </span>
                            )
                          ) : (
                            <span className="text-stone-500 text-[11px] bg-stone-200 px-2 py-0.5 rounded">
                              Chưa làm
                            </span>
                          )}

                          {/* Sửa câu hỏi ngay từ bảng rà soát */}
                          <button
                            onClick={(e) => handleOpenEditQuizModal(q, e)}
                            className="p-1 rounded-md hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer"
                            title="Sửa câu hỏi này"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 bg-white/80 rounded-xl border border-stone-200/80 text-[11px]">
                        <div>
                          <span className="text-stone-500">Lựa chọn của em: </span>
                          <strong className={isCorrect ? 'text-emerald-900' : 'text-rose-900'}>
                            {hasAnswered
                              ? q.type === 'multiple_choice' && q.options
                                ? `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}`
                                : `"${userAns}"`
                              : 'Chưa chọn'}
                          </strong>
                        </div>

                        <div>
                          <span className="text-stone-500">Đáp án chuẩn: </span>
                          <strong className="text-emerald-900">
                            {q.type === 'multiple_choice' && q.options
                              ? `${String.fromCharCode(65 + (q.correctIndex || 0))}. ${q.options[q.correctIndex || 0]}`
                              : `"${q.correctText}"`}
                          </strong>
                        </div>
                      </div>

                      <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/80 text-stone-800 flex items-start gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <div className="text-[11px] leading-relaxed">
                          <strong className="text-amber-900 font-semibold">Gợi ý ôn lại: </strong>
                          <span>{q.reviewHint}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
