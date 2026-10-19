import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Download, 
  Printer, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Filter, 
  Bookmark, 
  BookOpen, 
  Layers, 
  Edit3, 
  Save, 
  ArrowRight,
  Eye,
  Send,
  AlertCircle
} from 'lucide-react';
import { PracticeQuestionItem, PracticeQuestionType, ExamScoreEntry } from '../types/literature';
import { INITIAL_PRACTICE_QUESTIONS, PRACTICE_TOPIC_OPTIONS } from '../data/topicPracticeQuestions';
import { downloadTextFile, safePrintContent } from '../utils/fileSaver';

export const TopicPracticeGenerator: React.FC = () => {
  // 1. Questions State (Loaded from LocalStorage or seeded from INITIAL_PRACTICE_QUESTIONS)
  const [questions, setQuestions] = useState<PracticeQuestionItem[]>(() => {
    try {
      const saved = localStorage.getItem('nv7_practice_questions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return INITIAL_PRACTICE_QUESTIONS;
    } catch {
      return INITIAL_PRACTICE_QUESTIONS;
    }
  });

  // Save to LocalStorage whenever questions change
  useEffect(() => {
    try {
      localStorage.setItem('nv7_practice_questions', JSON.stringify(questions));
    } catch (e) {
      console.error('Failed to save practice questions to LocalStorage', e);
    }
  }, [questions]);

  // 2. Filter & Selection States
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 3. User Answers & Interactive Evaluation States
  // For true_false & multiple_choice
  const [userSelectedChoice, setUserSelectedChoice] = useState<Record<string, number | boolean>>({});
  // For fill_blank: text input by question id
  const [userFillInput, setUserFillInput] = useState<Record<string, string>>({});
  const [fillChecked, setFillChecked] = useState<Record<string, boolean>>({});
  // For short_answer: text input and self-evaluation
  const [userShortInput, setUserShortInput] = useState<Record<string, string>>({});
  const [revealedShortAnswer, setRevealedShortAnswer] = useState<Record<string, boolean>>({});
  const [shortSelfRating, setShortSelfRating] = useState<Record<string, 'correct' | 'review'>>({});

  // 4. Quick Generator / Builder States
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newTopicId, setNewTopicId] = useState<string>('bau-troi-tuoi-tho');
  const [newType, setNewType] = useState<PracticeQuestionType>('true_false');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newExplanation, setNewExplanation] = useState('');
  // For new true_false
  const [newTFBool, setNewTFBool] = useState<boolean>(true);
  // For new multiple_choice
  const [newOptions, setNewOptions] = useState<string[]>(['', '', '', '']);
  const [newCorrectIndex, setNewCorrectIndex] = useState<number>(0);
  // For new fill_blank
  const [newFillWord, setNewFillWord] = useState<string>('');
  // For new short_answer
  const [newSampleAnswer, setNewSampleAnswer] = useState<string>('');

  // Feedback notifications
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [savedScoreSuccess, setSavedScoreSuccess] = useState(false);

  // Filter questions by topic, question type, and search query
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Topic filter
      if (selectedTopicId === 'custom-only') {
        if (!q.isCustom) return false;
      } else if (selectedTopicId !== 'all' && q.topicId !== selectedTopicId) {
        return false;
      }

      // Type filter
      if (selectedTypeFilter !== 'all' && q.type !== selectedTypeFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchQ = q.question.toLowerCase().includes(query);
        const matchTopic = q.topicName.toLowerCase().includes(query);
        const matchExp = q.explanation.toLowerCase().includes(query);
        if (!matchQ && !matchTopic && !matchExp) return false;
      }

      return true;
    });
  }, [questions, selectedTopicId, selectedTypeFilter, searchQuery]);

  // Calculate score & progress
  const answeredStats = useMemo(() => {
    let answeredCount = 0;
    let correctCount = 0;

    filteredQuestions.forEach((q) => {
      if (q.type === 'true_false') {
        const ans = userSelectedChoice[q.id];
        if (typeof ans === 'boolean') {
          answeredCount++;
          if (ans === q.correctBoolean) correctCount++;
        }
      } else if (q.type === 'multiple_choice') {
        const ans = userSelectedChoice[q.id];
        if (typeof ans === 'number') {
          answeredCount++;
          if (ans === q.correctIndex) correctCount++;
        }
      } else if (q.type === 'fill_blank') {
        if (fillChecked[q.id]) {
          answeredCount++;
          const userVal = (userFillInput[q.id] || '').trim().toLowerCase();
          const correctVal = (q.correctText || '').trim().toLowerCase();
          const isOk = userVal === correctVal || (q.acceptableAnswers && q.acceptableAnswers.some(a => a.toLowerCase() === userVal));
          if (isOk) correctCount++;
        }
      } else if (q.type === 'short_answer') {
        if (shortSelfRating[q.id]) {
          answeredCount++;
          if (shortSelfRating[q.id] === 'correct') correctCount++;
        }
      }
    });

    return {
      answered: answeredCount,
      correct: correctCount,
      total: filteredQuestions.length,
      percentage: filteredQuestions.length > 0 ? Math.round((correctCount / filteredQuestions.length) * 100) : 0
    };
  }, [filteredQuestions, userSelectedChoice, fillChecked, userFillInput, shortSelfRating]);

  // Handlers for interactive questions
  const handleSelectChoice = (questionId: string, value: number | boolean) => {
    setUserSelectedChoice((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCheckFillBlank = (questionId: string) => {
    setFillChecked((prev) => ({
      ...prev,
      [questionId]: true
    }));
  };

  const handleToggleRevealShort = (questionId: string) => {
    setRevealedShortAnswer((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleRateShortAnswer = (questionId: string, rating: 'correct' | 'review') => {
    setShortSelfRating((prev) => ({
      ...prev,
      [questionId]: rating
    }));
  };

  const handleResetProgress = () => {
    setUserSelectedChoice({});
    setUserFillInput({});
    setFillChecked({});
    setUserShortInput({});
    setRevealedShortAnswer({});
    setShortSelfRating({});
    setSuccessMessage('Đã làm mới lại bài làm của bạn!');
    setTimeout(() => setSuccessMessage(null), 2500);
  };

  // Add custom question handler (Stores in LocalStorage)
  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !newExplanation.trim()) return;

    const topicOption = PRACTICE_TOPIC_OPTIONS.find(t => t.id === newTopicId) || PRACTICE_TOPIC_OPTIONS[1];
    const topicCleanName = topicOption.name.split(':')[1]?.trim() || topicOption.name;

    const newQ: PracticeQuestionItem = {
      id: `custom-q-${Date.now()}`,
      topicId: newTopicId,
      topicName: topicCleanName,
      type: newType,
      question: newQuestionText.trim(),
      explanation: newExplanation.trim(),
      isCustom: true,
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    if (newType === 'true_false') {
      newQ.correctBoolean = newTFBool;
    } else if (newType === 'multiple_choice') {
      const validOptions = newOptions.map(o => o.trim()).filter(Boolean);
      if (validOptions.length < 2) {
        alert('Vui lòng nhập ít nhất 2 phương án lựa chọn.');
        return;
      }
      newQ.options = newOptions;
      newQ.correctIndex = newCorrectIndex;
    } else if (newType === 'fill_blank') {
      if (!newFillWord.trim()) {
        alert('Vui lòng nhập từ khóa cần điền.');
        return;
      }
      newQ.correctText = newFillWord.trim();
      newQ.acceptableAnswers = [newFillWord.trim().toLowerCase()];
    } else if (newType === 'short_answer') {
      newQ.sampleAnswer = newSampleAnswer.trim() || 'Học sinh đối chiếu các ý chính trong sách giáo khoa.';
    }

    setQuestions((prev) => [newQ, ...prev]);
    setIsAddingQuestion(false);
    // Reset form
    setNewQuestionText('');
    setNewExplanation('');
    setNewOptions(['', '', '', '']);
    setNewFillWord('');
    setNewSampleAnswer('');
    setSuccessMessage('Đã thêm và lưu câu hỏi mới vào LocalStorage thành công!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa câu hỏi này khỏi danh sách ôn tập?')) {
      setQuestions((prev) => prev.filter(q => q.id !== id));
      setSuccessMessage('Đã xóa câu hỏi khỏi bộ ôn tập.');
      setTimeout(() => setSuccessMessage(null), 2500);
    }
  };

  const handleResetToDefault = () => {
    if (confirm('Khôi phục danh sách câu hỏi gốc chuẩn của chương trình Ngữ văn 7?')) {
      setQuestions(INITIAL_PRACTICE_QUESTIONS);
      localStorage.setItem('nv7_practice_questions', JSON.stringify(INITIAL_PRACTICE_QUESTIONS));
      handleResetProgress();
      setSuccessMessage('Đã khôi phục bộ câu hỏi ôn tập chuẩn của trường!');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  // Download & Print
  const handleDownloadPracticeSet = () => {
    const topicName = PRACTICE_TOPIC_OPTIONS.find(t => t.id === selectedTopicId)?.name || 'Tất cả chủ đề';
    let doc = `BỘ CÂU HỎI ÔN TẬP CƠ BẢN NGỮ VĂN 7\n`;
    doc += `Chủ đề: ${topicName}\n`;
    doc += `Tổng số câu hỏi: ${filteredQuestions.length} câu\n`;
    doc += `Ngày tải về: ${new Date().toLocaleDateString('vi-VN')}\n`;
    doc += `=========================================================\n\n`;

    filteredQuestions.forEach((q, idx) => {
      const typeLabel = q.type === 'true_false' 
        ? '[ĐÚNG / SAI]' 
        : q.type === 'multiple_choice' 
        ? '[TRẮC NGHIỆM LỰA CHỌN]' 
        : q.type === 'fill_blank' 
        ? '[ĐIỀN TỪ NGẮN]' 
        : '[HỎI - ĐÁP NGẮN]';

      doc += `Câu ${idx + 1} ${typeLabel} (${q.topicName}):\n`;
      doc += `${q.question}\n`;

      if (q.type === 'multiple_choice' && q.options) {
        q.options.forEach((opt, oIdx) => {
          doc += `  ${String.fromCharCode(65 + oIdx)}. ${opt}\n`;
        });
        doc += `* Đáp án đúng: ${String.fromCharCode(65 + (q.correctIndex || 0))}\n`;
      } else if (q.type === 'true_false') {
        doc += `* Đáp án đúng: ${q.correctBoolean ? 'ĐÚNG' : 'SAI'}\n`;
      } else if (q.type === 'fill_blank') {
        doc += `* Từ cần điền: "${q.correctText}"\n`;
      } else if (q.type === 'short_answer') {
        doc += `* Câu trả lời mẫu chuẩn: ${q.sampleAnswer}\n`;
      }

      doc += `* Lời giải chi tiết: ${q.explanation}\n\n`;
      doc += `---------------------------------------------------------\n\n`;
    });

    downloadTextFile(`Bo_cau_hoi_on_tap_Ngu_van_7_${selectedTopicId}`, doc);
  };

  const handlePrintPracticeSet = () => {
    const topicName = PRACTICE_TOPIC_OPTIONS.find(t => t.id === selectedTopicId)?.name || 'Tất cả chủ đề';
    let doc = `PHIẾU CÂU HỎI ÔN TẬP BÀI HỌC NGỮ VĂN 7\nChủ đề: ${topicName}\n\n`;

    filteredQuestions.forEach((q, idx) => {
      doc += `Câu ${idx + 1}: ${q.question}\n`;
      if (q.type === 'multiple_choice' && q.options) {
        q.options.forEach((opt, oIdx) => {
          doc += `  ${String.fromCharCode(65 + oIdx)}. ${opt}\n`;
        });
      } else if (q.type === 'true_false') {
        doc += `  [  ] Đúng      [  ] Sai\n`;
      } else if (q.type === 'fill_blank') {
        doc += `  Trả lời: ....................................................\n`;
      } else if (q.type === 'short_answer') {
        doc += `  Trả lời: ....................................................\n\n`;
      }
      doc += `\n`;
    });

    safePrintContent('Phiếu Ôn Tập Ngữ Văn 7', doc, `Chủ đề: ${topicName}`);
  };

  // Save score to exam diary
  const handleSaveResultToDiary = () => {
    if (answeredStats.answered === 0) {
      alert('Bạn hãy làm bài ít nhất một câu trước khi lưu kết quả nhé!');
      return;
    }
    const finalScore = Number(((answeredStats.correct / filteredQuestions.length) * 10).toFixed(1));
    const topicName = PRACTICE_TOPIC_OPTIONS.find(t => t.id === selectedTopicId)?.name || 'Tất cả chủ đề';

    try {
      const existing = localStorage.getItem('nv7_my_scores');
      const list: ExamScoreEntry[] = existing ? JSON.parse(existing) : [];
      const newScore: ExamScoreEntry = {
        id: `sc-practice-${Date.now()}`,
        title: `Ôn tập theo chủ đề: ${topicName.split(':')[0]}`,
        score: finalScore,
        maxScore: 10,
        date: new Date().toLocaleDateString('vi-VN'),
        type: 'Tự luyện',
        notes: `Đạt ${answeredStats.correct}/${filteredQuestions.length} câu (${answeredStats.percentage}%). Đã ôn tập các dạng Đúng/Sai, Điền từ, Lựa chọn và Hỏi-đáp.`
      };
      localStorage.setItem('nv7_my_scores', JSON.stringify([newScore, ...list]));
      setSavedScoreSuccess(true);
      setTimeout(() => setSavedScoreSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Alert / Notification Banner */}
      {successMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{successMessage}</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-mono">Đã đồng bộ LocalStorage</span>
        </div>
      )}

      {/* Control Panel: Topic Selection & Actions */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Chương trình GDPT 2018 · Ngữ văn Lớp 7</span>
            </div>
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
              Bộ Câu Hỏi Luyện Tập Cơ Bản Theo Chủ Đề
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-2xl leading-relaxed">
              Ôn bài trên trường hiệu quả qua 4 dạng bài tập cốt lõi: <strong>Đúng/Sai</strong>, <strong>Lựa chọn</strong>, <strong>Điền từ ngắn</strong> và <strong>Hỏi–đáp ngắn</strong> bám sát kiến thức thực tế.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAddingQuestion(!isAddingQuestion)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
              title="Tạo câu hỏi mới cho chủ đề đang học và lưu vào LocalStorage"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>{isAddingQuestion ? 'Đóng form tạo' : 'Tạo thêm câu hỏi'}</span>
            </button>

            <button
              onClick={handleDownloadPracticeSet}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-stone-200"
              title="Tải bộ câu hỏi ôn tập về máy (.txt)"
            >
              <Download className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline">Tải về (.txt)</span>
            </button>

            <button
              onClick={handlePrintPracticeSet}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-stone-200"
              title="In phiếu câu hỏi ôn tập"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>In phiếu</span>
            </button>

            <button
              onClick={handleResetProgress}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
              title="Làm mới lại các câu đã trả lời"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form: Thêm câu hỏi mới (Lưu vào LocalStorage) */}
        {isAddingQuestion && (
          <form 
            onSubmit={handleCreateQuestion}
            className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-4 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="font-bold text-xs uppercase text-amber-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-700" />
                <span>Tạo câu hỏi luyện tập mới cho chủ đề (Lưu vào LocalStorage)</span>
              </div>
              <span className="text-[11px] text-amber-800 italic">Câu hỏi bám sát sách giáo khoa lớp 7</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Chủ đề bài học</label>
                <select
                  value={newTopicId}
                  onChange={(e) => setNewTopicId(e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="bau-troi-tuoi-tho">Chủ đề 1: Bầu trời tuổi thơ (Bầy chim chìa vôi, Đi lấy mật)</option>
                  <option value="khuc-nhac-tam-hon">Chủ đề 2: Khúc nhạc tâm hồn (Đồng dao mùa xuân, Gặp lá cơm nếp, Sang thu)</option>
                  <option value="tri-tue-dan-gian">Chủ đề 3: Trí tuệ dân gian & Bài học cuộc sống (Ếch ngồi đáy giếng, Thầy bói xem voi)</option>
                  <option value="tieng-viet-7">Chủ đề 4: Thực hành Tiếng Việt (Nói giảm nói tránh, Nói quá, Tu từ)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Dạng câu hỏi cơ bản</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as PracticeQuestionType)}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold text-amber-900"
                >
                  <option value="true_false">1. Đúng / Sai</option>
                  <option value="multiple_choice">2. Lựa chọn (Trắc nghiệm 4 đáp án)</option>
                  <option value="fill_blank">3. Điền từ ngắn</option>
                  <option value="short_answer">4. Hỏi - đáp ngắn</option>
                </select>
              </div>
            </div>

            {/* Nội dung câu hỏi */}
            <div>
              <label className="block text-stone-700 text-xs font-semibold mb-1">
                Nội dung câu hỏi (Cụ thể, bám sát chi tiết bài học trên trường)
              </label>
              <textarea
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="Ví dụ: Câu thơ 'Mười tám tuổi / Mùa xuân vĩnh hằng' trong bài Đồng dao mùa xuân gợi nhắc đến điều gì?"
                rows={2}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            {/* Nhập đáp án tùy theo dạng câu hỏi */}
            {newType === 'true_false' && (
              <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center gap-4 text-xs">
                <span className="font-semibold text-stone-700">Đáp án chuẩn:</span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="tf-correct"
                    checked={newTFBool === true}
                    onChange={() => setNewTFBool(true)}
                    className="text-amber-800"
                  />
                  <span className="font-bold text-emerald-700">ĐÚNG</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="tf-correct"
                    checked={newTFBool === false}
                    onChange={() => setNewTFBool(false)}
                    className="text-amber-800"
                  />
                  <span className="font-bold text-rose-700">SAI</span>
                </label>
              </div>
            )}

            {newType === 'multiple_choice' && (
              <div className="space-y-2 bg-white p-3.5 rounded-xl border border-stone-200 text-xs">
                <div className="font-semibold text-stone-700">
                  Nhập 4 phương án và tích chọn đáp án đúng:
                </div>
                {newOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="mc-correct-index"
                      checked={newCorrectIndex === i}
                      onChange={() => setNewCorrectIndex(i)}
                      title="Chọn phương án này làm đáp án đúng"
                      className="cursor-pointer"
                    />
                    <span className="font-mono font-bold text-stone-500 w-4">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const copy = [...newOptions];
                        copy[i] = e.target.value;
                        setNewOptions(copy);
                      }}
                      placeholder={`Nội dung phương án ${String.fromCharCode(65 + i)}`}
                      className="flex-1 p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                      required
                    />
                  </div>
                ))}
              </div>
            )}

            {newType === 'fill_blank' && (
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs space-y-1">
                <label className="block text-stone-700 font-semibold mb-1">
                  Từ hoặc cụm từ ngắn cần điền vào chỗ trống [ ... ]
                </label>
                <input
                  type="text"
                  value={newFillWord}
                  onChange={(e) => setNewFillWord(e.target.value)}
                  placeholder="Ví dụ: Đáy, gió se, hòa bình..."
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-amber-900"
                  required
                />
              </div>
            )}

            {newType === 'short_answer' && (
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs space-y-1">
                <label className="block text-stone-700 font-semibold mb-1">
                  Câu trả lời mẫu chuẩn (để học sinh đối chiếu chấm điểm)
                </label>
                <textarea
                  value={newSampleAnswer}
                  onChange={(e) => setNewSampleAnswer(e.target.value)}
                  placeholder="Ghi ngắn gọn các ý chính học sinh cần trả lời theo barem của giáo viên..."
                  rows={2}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                  required
                />
              </div>
            )}

            {/* Lời giải thích */}
            <div>
              <label className="block text-stone-700 text-xs font-semibold mb-1">
                Lời giải chi tiết & Ghi nhớ kiến thức
              </label>
              <input
                type="text"
                value={newExplanation}
                onChange={(e) => setNewExplanation(e.target.value)}
                placeholder="Trích dẫn kiến thức trong sách giáo khoa giải thích rõ vì sao đáp án đó là chính xác..."
                className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingQuestion(false)}
                className="px-3 py-1.5 bg-white text-stone-600 border border-stone-300 rounded-xl text-xs font-medium cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Lưu câu hỏi vào LocalStorage</span>
              </button>
            </div>
          </form>
        )}

        {/* Filters: Chọn Chủ đề đang học & Chọn dạng câu hỏi */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <label className="block text-[11px] uppercase font-bold text-stone-500 mb-1">
                Chọn chủ đề đang học trên trường:
              </label>
              <select
                value={selectedTopicId}
                onChange={(e) => setSelectedTopicId(e.target.value)}
                className="w-full sm:max-w-md p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {PRACTICE_TOPIC_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset to standard preset button */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handleResetToDefault}
                className="text-[11px] text-stone-500 hover:text-amber-800 underline cursor-pointer"
                title="Khôi phục danh sách câu hỏi gốc từ SGK"
              >
                Khôi phục ngân hàng câu hỏi gốc
              </button>
            </div>
          </div>

          {/* Type filters tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-stone-400 text-xs font-medium shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Dạng:</span>
            </span>
            <button
              onClick={() => setSelectedTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedTypeFilter === 'all'
                  ? 'bg-amber-900 text-white font-semibold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              Tất cả 4 dạng ({questions.length})
            </button>
            <button
              onClick={() => setSelectedTypeFilter('true_false')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedTypeFilter === 'true_false'
                  ? 'bg-amber-900 text-white font-semibold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              Đúng / Sai
            </button>
            <button
              onClick={() => setSelectedTypeFilter('multiple_choice')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedTypeFilter === 'multiple_choice'
                  ? 'bg-amber-900 text-white font-semibold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              Lựa chọn (Trắc nghiệm)
            </button>
            <button
              onClick={() => setSelectedTypeFilter('fill_blank')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedTypeFilter === 'fill_blank'
                  ? 'bg-amber-900 text-white font-semibold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              Điền từ ngắn
            </button>
            <button
              onClick={() => setSelectedTypeFilter('short_answer')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedTypeFilter === 'short_answer'
                  ? 'bg-amber-900 text-white font-semibold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              Hỏi – đáp ngắn
            </button>
          </div>
        </div>

        {/* Live Progress Bar */}
        <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span>Tiến độ đã làm: <strong className="font-mono text-stone-900">{answeredStats.answered}/{answeredStats.total} câu</strong></span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Số câu đúng: <strong className="font-mono text-emerald-700">{answeredStats.correct} câu</strong></span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="font-semibold text-amber-800">Tỷ lệ: {answeredStats.percentage}%</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveResultToDiary}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-lg transition-colors cursor-pointer"
              title="Lưu điểm tự luyện vào Nhật ký của em"
            >
              {savedScoreSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-emerald-100">Đã lưu điểm!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-amber-200" />
                  <span>Lưu kết quả vào Nhật ký</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Questions List Display */}
      {filteredQuestions.length === 0 ? (
        <div className="p-10 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs sm:text-sm space-y-3">
          <p>Không có câu hỏi nào phù hợp với bộ lọc hiện tại.</p>
          <button
            onClick={() => {
              setSelectedTopicId('all');
              setSelectedTypeFilter('all');
              setSearchQuery('');
            }}
            className="text-amber-800 font-semibold underline cursor-pointer"
          >
            Hiển thị tất cả câu hỏi
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredQuestions.map((q, index) => {
            const isAnswered = q.type === 'true_false' 
              ? typeof userSelectedChoice[q.id] === 'boolean'
              : q.type === 'multiple_choice'
              ? typeof userSelectedChoice[q.id] === 'number'
              : q.type === 'fill_blank'
              ? fillChecked[q.id]
              : shortSelfRating[q.id] !== undefined;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4 hover:border-stone-300 transition-colors"
              >
                {/* Question Top Meta */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-mono text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="text-xs font-semibold text-stone-500">
                      {q.topicName}
                    </span>
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium">
                      {q.type === 'true_false' ? 'Đúng / Sai' : q.type === 'multiple_choice' ? 'Trắc nghiệm' : q.type === 'fill_blank' ? 'Điền từ' : 'Hỏi-đáp ngắn'}
                    </span>
                    {q.isCustom && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                        Tự tạo
                      </span>
                    )}
                  </div>

                  {q.isCustom && (
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                      title="Xóa câu hỏi tự tạo này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Question Content */}
                <h4 className="text-sm sm:text-base font-semibold text-stone-900 leading-snug pl-1">
                  {q.question}
                </h4>

                {/* DẠNG 1: ĐÚNG / SAI */}
                {q.type === 'true_false' && (
                  <div className="space-y-3 pl-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleSelectChoice(q.id, true)}
                        className={`flex-1 sm:flex-initial sm:min-w-[120px] py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          userSelectedChoice[q.id] === true
                            ? q.correctBoolean === true
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300'
                              : 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                        }`}
                      >
                        {userSelectedChoice[q.id] === true && q.correctBoolean === true && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                        {userSelectedChoice[q.id] === true && q.correctBoolean === false && (
                          <XCircle className="w-4 h-4 text-rose-600" />
                        )}
                        <span>ĐÚNG</span>
                      </button>

                      <button
                        onClick={() => handleSelectChoice(q.id, false)}
                        className={`flex-1 sm:flex-initial sm:min-w-[120px] py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          userSelectedChoice[q.id] === false
                            ? q.correctBoolean === false
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300'
                              : 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                        }`}
                      >
                        {userSelectedChoice[q.id] === false && q.correctBoolean === false && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                        {userSelectedChoice[q.id] === false && q.correctBoolean === true && (
                          <XCircle className="w-4 h-4 text-rose-600" />
                        )}
                        <span>SAI</span>
                      </button>
                    </div>

                    {isAnswered && (
                      <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs text-stone-800 leading-relaxed animate-in fade-in duration-200">
                        <span className="font-bold text-amber-900">
                          {userSelectedChoice[q.id] === q.correctBoolean ? 'Chính xác! ' : 'Chưa đúng rồi! '}
                          Đáp án đúng là: {q.correctBoolean ? 'ĐÚNG' : 'SAI'}.
                        </span>
                        <div className="mt-1 text-stone-700">{q.explanation}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* DẠNG 2: LỰA CHỌN (TRẮC NGHIỆM 4 ĐÁP ÁN) */}
                {q.type === 'multiple_choice' && q.options && (
                  <div className="space-y-3 pl-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userSelectedChoice[q.id] === optIdx;
                        const isRevealed = isAnswered;
                        let btnStyle = 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100';

                        if (isRevealed) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                          } else if (isChosen && optIdx !== q.correctIndex) {
                            btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                          }
                        } else if (isChosen) {
                          btnStyle = 'bg-amber-50 border-amber-500 text-amber-950 font-semibold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectChoice(q.id, optIdx)}
                            className={`w-full text-left p-3 text-xs sm:text-sm rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-stone-400 font-bold">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isRevealed && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {isRevealed && isChosen && optIdx !== q.correctIndex && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs text-stone-800 leading-relaxed animate-in fade-in duration-200">
                        <span className="font-bold text-amber-900">
                          {userSelectedChoice[q.id] === q.correctIndex ? 'Chính xác! ' : 'Chưa chính xác! '}
                          Đáp án: {String.fromCharCode(65 + (q.correctIndex || 0))}.
                        </span>
                        <div className="mt-1 text-stone-700">{q.explanation}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* DẠNG 3: ĐIỀN TỪ NGẮN */}
                {q.type === 'fill_blank' && (
                  <div className="space-y-3 pl-1">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        value={userFillInput[q.id] || ''}
                        onChange={(e) => {
                          setUserFillInput({ ...userFillInput, [q.id]: e.target.value });
                          setFillChecked({ ...fillChecked, [q.id]: false });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCheckFillBlank(q.id);
                        }}
                        placeholder="Nhập từ hoặc cụm từ còn thiếu..."
                        className="flex-1 p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        onClick={() => handleCheckFillBlank(q.id)}
                        disabled={!(userFillInput[q.id] || '').trim()}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          (userFillInput[q.id] || '').trim()
                            ? 'bg-amber-800 hover:bg-amber-900 text-white shadow-xs'
                            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        }`}
                      >
                        Kiểm tra
                      </button>
                    </div>

                    {isAnswered && (
                      <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs text-stone-800 leading-relaxed animate-in fade-in duration-200">
                        {(() => {
                          const val = (userFillInput[q.id] || '').trim().toLowerCase();
                          const target = (q.correctText || '').trim().toLowerCase();
                          const isCorrect = val === target || (q.acceptableAnswers && q.acceptableAnswers.some(a => a.toLowerCase() === val));
                          return (
                            <div>
                              <div className="font-bold flex items-center gap-1.5 mb-1">
                                {isCorrect ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    <span className="text-emerald-900">Tuyệt vời, bạn đã điền chính xác!</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="w-4 h-4 text-amber-700" />
                                    <span className="text-amber-900">Từ chuẩn cần điền là: <strong className="underline text-stone-900">"{q.correctText}"</strong></span>
                                  </>
                                )}
                              </div>
                              <p className="text-stone-700">{q.explanation}</p>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}

                {/* DẠNG 4: HỎI - ĐÁP NGẮN */}
                {q.type === 'short_answer' && (
                  <div className="space-y-3 pl-1">
                    <div>
                      <textarea
                        value={userShortInput[q.id] || ''}
                        onChange={(e) => setUserShortInput({ ...userShortInput, [q.id]: e.target.value })}
                        placeholder="Gõ tóm tắt câu trả lời của em theo kiến thức đã học trên lớp..."
                        rows={2}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleRevealShort(q.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-600" />
                        <span>{revealedShortAnswer[q.id] ? 'Ẩn đáp án chuẩn' : 'Xem đáp án chuẩn của trường'}</span>
                      </button>

                      {revealedShortAnswer[q.id] && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-stone-500">Tự đánh giá câu trả lời của em:</span>
                          <button
                            onClick={() => handleRateShortAnswer(q.id, 'correct')}
                            className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                              shortSelfRating[q.id] === 'correct'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                            }`}
                          >
                            Đã làm đúng
                          </button>
                          <button
                            onClick={() => handleRateShortAnswer(q.id, 'review')}
                            className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                              shortSelfRating[q.id] === 'review'
                                ? 'bg-amber-600 text-white'
                                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                            }`}
                          >
                            Cần ôn lại
                          </button>
                        </div>
                      )}
                    </div>

                    {revealedShortAnswer[q.id] && (
                      <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 text-xs space-y-2 animate-in fade-in duration-200">
                        <div>
                          <span className="font-bold text-amber-900 block mb-1">
                            Câu trả lời mẫu chuẩn theo barem điểm của giáo viên:
                          </span>
                          <p className="text-stone-800 leading-relaxed font-serif-display text-sm bg-white p-3 rounded-lg border border-amber-200/80">
                            {q.sampleAnswer}
                          </p>
                        </div>

                        {q.keyPoints && q.keyPoints.length > 0 && (
                          <div>
                            <span className="font-bold text-stone-700 block mb-0.5">Các ý chính cần có trong bài làm:</span>
                            <ul className="list-disc list-inside space-y-0.5 text-stone-700 pl-1">
                              {q.keyPoints.map((pt, pIdx) => (
                                <li key={pIdx}>{pt}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="pt-1 text-stone-600 border-t border-amber-200/60">
                          <strong>Ghi nhớ:</strong> {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
