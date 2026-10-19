import React, { useState, useEffect } from 'react';
import { Award, Timer, RotateCcw, CheckCircle2, XCircle, AlertCircle, ArrowRight, Play, Bookmark, Download, Printer, Check, BookOpen, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { QuizQuestion, ExamScoreEntry } from '../types/literature';
import { downloadTextFile, safePrintContent } from '../utils/fileSaver';
import { TopicPracticeGenerator } from './TopicPracticeGenerator';
import { QuizMode } from './QuizMode';

export const QuizExamSection: React.FC = () => {
  const [examMode, setExamMode] = useState<'quiz_mode' | 'topic_practice' | 'quick_practice' | 'mock_exam'>('quiz_mode');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedPractice, setRevealedPractice] = useState<Record<string, boolean>>({});

  // Mock Exam states
  const [isExamRunning, setIsExamRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 mins
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<{ correct: number; total: number; percentage: number } | null>(null);
  const [savedScoreToDiary, setSavedScoreToDiary] = useState<boolean>(false);
  const [downloadedResult, setDownloadedResult] = useState<boolean>(false);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isExamRunning && !examSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isExamRunning, examSubmitted, timeLeft]);

  const handleStartExam = (durationMinutes: number) => {
    setTimeLeft(durationMinutes * 60);
    setSelectedAnswers({});
    setExamSubmitted(false);
    setExamScore(null);
    setSavedScoreToDiary(false);
    setDownloadedResult(false);
    setIsExamRunning(true);
  };

  const handleFinishExam = () => {
    setIsExamRunning(false);
    setExamSubmitted(true);

    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    setExamScore({
      correct: correctCount,
      total: QUIZ_QUESTIONS.length,
      percentage: Math.round((correctCount / QUIZ_QUESTIONS.length) * 100),
    });
  };

  const handleSaveScoreToDiary = () => {
    if (!examScore) return;
    const finalScore = Number(((examScore.correct / examScore.total) * 10).toFixed(1));
    const rank = examScore.percentage >= 80 ? 'Xuất sắc/Giỏi' : examScore.percentage >= 65 ? 'Khá' : 'Cần ôn thêm';
    try {
      const existing = localStorage.getItem('nv7_my_scores');
      const scores: ExamScoreEntry[] = existing ? JSON.parse(existing) : [];
      const newEntry: ExamScoreEntry = {
        id: `sc-mock-${Date.now()}`,
        title: `Thi thử trắc nghiệm 15 phút (Đạt ${examScore.correct}/${examScore.total} câu)`,
        score: finalScore,
        maxScore: 10,
        date: new Date().toLocaleDateString('vi-VN'),
        type: '15 phút',
        notes: `Xếp loại: ${rank}. Thời gian hoàn thành: ${formatTime(15 * 60 - timeLeft)}.`
      };
      localStorage.setItem('nv7_my_scores', JSON.stringify([newEntry, ...scores]));
      setSavedScoreToDiary(true);
      setTimeout(() => setSavedScoreToDiary(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const generateExamReportText = () => {
    if (!examScore) return '';
    const finalScore = ((examScore.correct / examScore.total) * 10).toFixed(1);
    const rank = examScore.percentage >= 80 ? 'Xuất sắc / Giỏi' : examScore.percentage >= 65 ? 'Khá' : 'Cần ôn thêm';
    let text = `BÁO CÁO KẾT QUẢ THI THỬ NGỮ VĂN LỚP 7\n`;
    text += `Ngày thi: ${new Date().toLocaleDateString('vi-VN')}\n`;
    text += `Điểm số: ${finalScore}/10 (${examScore.correct}/${examScore.total} câu đúng - ${examScore.percentage}%)\n`;
    text += `Xếp loại: ${rank}\n`;
    text += `=========================================\n\n`;
    text += `CHI TIẾT TỪNG CÂU HỎI:\n\n`;

    QUIZ_QUESTIONS.forEach((q, idx) => {
      const chosen = selectedAnswers[q.id];
      const isCorrect = chosen === q.correctIndex;
      text += `Câu ${idx + 1}: ${q.question}\n`;
      text += `Lựa chọn của bạn: ${chosen !== undefined ? `${String.fromCharCode(65 + chosen)}. ${q.options[chosen]}` : 'Chưa chọn'}\n`;
      text += `Đáp án đúng: ${String.fromCharCode(65 + q.correctIndex)}. ${q.options[q.correctIndex]}\n`;
      text += `Kết quả: ${isCorrect ? '✓ ĐÚNG' : '✗ SAI'}\n`;
      text += `Giải thích: ${q.explanation}\n\n`;
    });

    return text;
  };

  const handleDownloadScorecard = () => {
    const text = generateExamReportText();
    downloadTextFile(`Ket_qua_thi_thu_Ngu_van_7_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}`, text);
    setDownloadedResult(true);
    setTimeout(() => setDownloadedResult(false), 2000);
  };

  const handlePrintScorecard = () => {
    const text = generateExamReportText();
    safePrintContent('Kết Quả Thi Thử Ngữ Văn 7 (15 Phút)', text, 'Bảng điểm & Đánh giá năng lực');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1">
          Đánh giá năng lực & Kiểm tra kiến thức
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
          Đấu Trường Trắc Nghiệm & Luyện Đề Ngữ Văn 7
        </h2>
        <p className="text-stone-600 text-sm max-w-3xl leading-relaxed">
          Bộ câu hỏi trắc nghiệm bám sát chương trình GDPT 2018 với 3 mức độ (Nhận biết, Thông hiểu, Vận dụng) giúp củng cố kiến thức tác phẩm, ngữ pháp và sẵn sàng cho các kỳ thi định kỳ.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl max-w-3xl text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => {
            setExamMode('quiz_mode');
            setIsExamRunning(false);
          }}
          className={`flex-1 min-w-[170px] py-2 px-3 rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
            examMode === 'quiz_mode'
              ? 'bg-amber-800 text-white shadow-xs font-bold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Quiz Mode (Từng câu)</span>
        </button>
        <button
          onClick={() => {
            setExamMode('topic_practice');
            setIsExamRunning(false);
          }}
          className={`flex-1 min-w-[170px] py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
            examMode === 'topic_practice'
              ? 'bg-amber-800 text-white shadow-xs font-bold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Ôn tập theo chủ đề (4 dạng)
        </button>
        <button
          onClick={() => {
            setExamMode('quick_practice');
            setIsExamRunning(false);
          }}
          className={`flex-1 min-w-[150px] py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
            examMode === 'quick_practice'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Trắc nghiệm nhanh (10 câu)
        </button>
        <button
          onClick={() => setExamMode('mock_exam')}
          className={`flex-1 min-w-[150px] py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
            examMode === 'mock_exam'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Thi thử tính giờ (15 phút)
        </button>
      </div>

      {/* QUIZ MODE (HIỂN THỊ TỪNG CÂU HỎI RÕ RÀNG, LƯU ĐỘC LẬP TỪNG CÂU) */}
      {examMode === 'quiz_mode' && (
        <QuizMode />
      )}

      {/* TOPIC PRACTICE MODE (Đúng/Sai, Lựa chọn, Điền từ ngắn, Hỏi-đáp ngắn) */}
      {examMode === 'topic_practice' && (
        <TopicPracticeGenerator />
      )}

      {/* QUICK PRACTICE MODE */}
      {examMode === 'quick_practice' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isRevealed = revealedPractice[q.id];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-stone-800 text-white font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm sm:text-base font-semibold text-stone-900 leading-snug">
                        {q.question}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600 shrink-0">
                      {q.difficulty === 'easy' ? 'Nhận biết' : q.difficulty === 'medium' ? 'Thông hiểu' : 'Vận dụng'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-9">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      let optionStyle = 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100';

                      if (isRevealed) {
                        if (optIdx === q.correctIndex) {
                          optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                        } else if (isOptionSelected && !isCorrect) {
                          optionStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                        }
                      } else if (isOptionSelected) {
                        optionStyle = 'bg-amber-50 border-amber-500 text-amber-950 font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                            setRevealedPractice((prev) => ({ ...prev, [q.id]: false }));
                          }}
                          className={`w-full text-left p-3 text-xs sm:text-sm rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${optionStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-stone-400">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isRevealed && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isRevealed && isOptionSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pl-9 pt-1 flex items-center justify-between">
                    <button
                      onClick={() => setRevealedPractice((prev) => ({ ...prev, [q.id]: true }))}
                      disabled={selectedOpt === undefined}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        selectedOpt !== undefined
                          ? 'bg-amber-800 text-white hover:bg-amber-900'
                          : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      Xem đáp án
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="ml-9 p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs text-stone-800 leading-relaxed">
                      <span className="font-bold text-amber-900">Lời giải chi tiết:</span> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MOCK EXAM MODE */}
      {examMode === 'mock_exam' && (
        <div className="space-y-6">
          {!isExamRunning && !examSubmitted ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto">
                <Timer className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif-display text-2xl font-bold text-stone-900 mb-2">
                  Đề Kiểm Tra Định Kỳ 15 Phút Ngữ Văn 7
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed max-w-md mx-auto">
                  Đề thi gồm 12 câu hỏi trắc nghiệm bao quát cả 3 phân môn: Đọc hiểu tác phẩm, Thực hành tiếng Việt và Lý thuyết văn bản.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs max-w-xs mx-auto text-stone-600 py-2 border-y border-stone-100">
                <div>
                  <div className="font-mono font-bold text-stone-900 tabular-nums">12 câu</div>
                  <div>Số lượng</div>
                </div>
                <div>
                  <div className="font-mono font-bold text-stone-900 tabular-nums">15:00</div>
                  <div>Thời gian</div>
                </div>
                <div>
                  <div className="font-mono font-bold text-stone-900 tabular-nums">Thang 10</div>
                  <div>Cách tính</div>
                </div>
              </div>

              <button
                onClick={() => handleStartExam(15)}
                className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Bắt đầu làm bài thi</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Sticky Exam Status Bar */}
              <div className="sticky top-18 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 p-4 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <Timer className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-stone-500 font-medium">Thời gian còn lại</div>
                    <div className={`font-mono text-lg font-bold tabular-nums ${timeLeft < 180 ? 'text-rose-600' : 'text-stone-900'}`}>
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-xs text-stone-500 hidden sm:block">
                    Đã làm: <span className="font-mono font-bold text-stone-900">{Object.keys(selectedAnswers).length}/{QUIZ_QUESTIONS.length}</span>
                  </div>
                  {!examSubmitted ? (
                    <button
                      onClick={handleFinishExam}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Nộp bài thi
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartExam(15)}
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Thi lại</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Exam Result Report */}
              {examSubmitted && examScore && (
                <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif-display text-xl font-bold text-stone-900">
                        Kết Quả Bài Kiểm Tra Của Bạn
                      </h4>
                      <p className="text-xs text-stone-500">
                        Đánh giá năng lực theo chuẩn GDPT 2018
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                      <div className="text-xs text-stone-500">Điểm số (Thang 10)</div>
                      <div className="font-mono text-2xl font-bold text-stone-900 tabular-nums">
                        {((examScore.correct / examScore.total) * 10).toFixed(1)}/10
                      </div>
                    </div>
                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                      <div className="text-xs text-stone-500">Số câu đúng</div>
                      <div className="font-mono text-2xl font-bold text-emerald-700 tabular-nums">
                        {examScore.correct}/{examScore.total} câu
                      </div>
                    </div>
                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                      <div className="text-xs text-stone-500">Xếp loại học lực</div>
                      <div className="font-serif-display text-xl font-bold text-amber-900">
                        {examScore.percentage >= 80 ? 'Xuất sắc / Giỏi' : examScore.percentage >= 65 ? 'Khá' : 'Cần ôn thêm'}
                      </div>
                    </div>
                  </div>

                  {/* Save & Export Actions */}
                  <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-stone-500">
                      Bạn có thể lưu kết quả bài thi này vào Nhật ký học tập cá nhân để theo dõi tiến bộ!
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleSaveScoreToDiary}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        title="Lưu điểm vào Nhật ký học tập của em"
                      >
                        {savedScoreToDiary ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-300" />
                            <span className="text-emerald-100">Đã lưu vào Nhật ký điểm số!</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-4 h-4 text-amber-200" />
                            <span>Lưu vào Nhật ký của em</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleDownloadScorecard}
                        className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        title="Tải phiếu điểm & đáp án (.txt)"
                      >
                        {downloadedResult ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-700">Đã tải về</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 text-stone-600" />
                            <span>Tải kết quả (.txt)</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handlePrintScorecard}
                        className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        title="In bảng điểm"
                      >
                        <Printer className="w-4 h-4 text-stone-600" />
                        <span>In bảng điểm</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Questions List in Exam Mode */}
              <div className="space-y-4">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const selectedOpt = selectedAnswers[q.id];
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <div key={q.id} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-stone-800 text-white font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                          {idx + 1}
                        </span>
                        <div className="text-sm font-semibold text-stone-900">
                          {q.question}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-9">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedOpt === optIdx;
                          let optionStyle = 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100';

                          if (examSubmitted) {
                            if (optIdx === q.correctIndex) {
                              optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                            } else if (isOptionSelected && !isCorrect) {
                              optionStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                            }
                          } else if (isOptionSelected) {
                            optionStyle = 'bg-amber-50 border-amber-500 text-amber-950 font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={examSubmitted}
                              onClick={() => setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                              className={`w-full text-left p-3 text-xs rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${optionStyle}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-stone-400">
                                  {String.fromCharCode(65 + optIdx)}.
                                </span>
                                <span>{opt}</span>
                              </div>
                              {examSubmitted && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                              {examSubmitted && isOptionSelected && !isCorrect && (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {examSubmitted && (
                        <div className="ml-9 p-3 bg-stone-100 rounded-lg text-xs text-stone-800 leading-relaxed">
                          <span className="font-bold">Giải thích:</span> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
