import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, ArrowRight, Lightbulb, RotateCcw, Download, Printer, Check, Copy } from 'lucide-react';
import { LANGUAGE_TOPICS } from '../data/languagePractices';
import { downloadTextFile, safePrintContent } from '../utils/fileSaver';

export const LanguagePracticeSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(LANGUAGE_TOPICS[0].id);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});
  const [downloadedTopic, setDownloadedTopic] = useState(false);

  const activeTopic = LANGUAGE_TOPICS.find((t) => t.id === selectedTopicId) || LANGUAGE_TOPICS[0];

  const handleDownloadWorksheet = () => {
    let doc = `PHIẾU HỌC TẬP THỰC HÀNH TIẾNG VIỆT LỚP 7\n`;
    doc += `Chuyên đề: ${activeTopic.title.toUpperCase()}\n`;
    doc += `Ngày tải về: ${new Date().toLocaleDateString('vi-VN')}\n`;
    doc += `=========================================================\n\n`;

    doc += `I. KHÁI NIỆM & LÝ THUYẾT TRỌNG TÂM:\n`;
    doc += `${activeTopic.concept}\n\n`;

    doc += `II. VÍ DỤ MINH HỌA TIÊU BIỂU:\n`;
    activeTopic.examples.forEach((ex, idx) => {
      doc += `[Ví dụ ${idx + 1}] "${ex.sentence}"\n`;
      doc += `-> Phân tích: ${ex.analysis}\n\n`;
    });

    doc += `III. BÀI TẬP VẬN DỤNG & LUYỆN TẬP:\n`;
    activeTopic.practiceExercises.forEach((ex, idx) => {
      doc += `Câu ${idx + 1}: ${ex.question}\n`;
      ex.options.forEach((opt, oIdx) => {
        doc += `  ${String.fromCharCode(65 + oIdx)}. ${opt}\n`;
      });
      doc += `* Đáp án đúng: ${String.fromCharCode(65 + ex.correctIndex)}\n`;
      doc += `* Giải thích: ${ex.explanation}\n\n`;
    });

    downloadTextFile(`Tieng_Viet_Lop_7_${activeTopic.id}`, doc);
    setDownloadedTopic(true);
    setTimeout(() => setDownloadedTopic(false), 2000);
  };

  const handlePrintWorksheet = () => {
    let doc = `LÝ THUYẾT TRỌNG TÂM:\n${activeTopic.concept}\n\n`;
    doc += `VÍ DỤ MINH HỌA:\n`;
    activeTopic.examples.forEach((ex, idx) => {
      doc += `${idx + 1}. "${ex.sentence}" -> ${ex.analysis}\n`;
    });
    doc += `\nBÀI TẬP TỰ LUYỆN:\n`;
    activeTopic.practiceExercises.forEach((ex, idx) => {
      doc += `Câu ${idx + 1}: ${ex.question}\n`;
      ex.options.forEach((opt, oIdx) => {
        doc += `  ${String.fromCharCode(65 + oIdx)}. ${opt}\n`;
      });
      doc += `-> Đáp án: ${String.fromCharCode(65 + ex.correctIndex)} (${ex.explanation})\n\n`;
    });
    safePrintContent(activeTopic.title, doc, 'Thực hành Tiếng Việt Lớp 7');
  };

  const handleSelectOption = (exerciseId: string, optionIdx: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [exerciseId]: optionIdx,
    }));
    // reset check state when answer changes
    setCheckedExercises((prev) => ({
      ...prev,
      [exerciseId]: false,
    }));
  };

  const handleCheckAnswer = (exerciseId: string) => {
    setCheckedExercises((prev) => ({
      ...prev,
      [exerciseId]: true,
    }));
  };

  const handleResetTopicExercises = () => {
    const updatedAnswers = { ...userAnswers };
    const updatedChecked = { ...checkedExercises };
    activeTopic.practiceExercises.forEach((ex) => {
      delete updatedAnswers[ex.id];
      delete updatedChecked[ex.id];
    });
    setUserAnswers(updatedAnswers);
    setCheckedExercises(updatedChecked);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1">
          Phân môn Ngữ pháp & Phong cách học
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
          Thực Hành Tiếng Việt Lớp 7
        </h2>
        <p className="text-stone-600 text-sm max-w-3xl leading-relaxed">
          Nắm vững quy tắc ngữ pháp, biện pháp nghệ thuật tu từ và cách dùng từ chuẩn xác qua các ví dụ kinh điển và bài tập tương tác có chấm điểm tức thì.
        </p>
      </div>

      {/* Topic Selection Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {LANGUAGE_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopicId(topic.id)}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              selectedTopicId === topic.id
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {topic.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Active Topic Content Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 mb-2">
              {activeTopic.title}
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed p-4 bg-stone-50 rounded-xl border border-stone-200">
              {activeTopic.concept}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start shrink-0">
            <button
              onClick={handleDownloadWorksheet}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-stone-200"
              title="Tải phiếu lý thuyết & bài tập tiếng Việt (.txt)"
            >
              {downloadedTopic ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã tải về</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span>Tải phiếu bài tập (.txt)</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrintWorksheet}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-stone-200"
              title="In phiếu bài tập tiếng Việt"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>In</span>
            </button>
          </div>
        </div>

        {/* Rules & Guidelines */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold text-amber-800 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span>Quy tắc ghi nhớ cốt lõi</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeTopic.rules.map((rule, idx) => (
              <div key={idx} className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs sm:text-sm text-stone-800 leading-relaxed flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                  {idx + 1}
                </span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Literary Examples Breakdown */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold text-stone-700 mb-3">
            Ví dụ phân tích từ tác phẩm văn học
          </h4>
          <div className="space-y-3">
            {activeTopic.examples.map((ex, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-stone-50/80 border border-stone-200 text-sm space-y-1.5">
                <div className="font-serif-display font-medium text-stone-900 italic">
                  {ex.sentence}
                </div>
                <div className="text-xs text-stone-600 pl-3 border-l-2 border-amber-600">
                  <span className="font-semibold text-stone-800">Phân tích:</span> {ex.analysis}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Practice Questions */}
        <div className="pt-6 border-t border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-serif-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <span>Bài tập tương tác & Kiểm tra tức thì</span>
            </h4>
            <button
              onClick={handleResetTopicExercises}
              className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại</span>
            </button>
          </div>

          <div className="space-y-6">
            {activeTopic.practiceExercises.map((exercise, idx) => {
              const selectedOpt = userAnswers[exercise.id];
              const isChecked = checkedExercises[exercise.id];
              const isCorrect = selectedOpt === exercise.correctIndex;

              return (
                <div
                  key={exercise.id}
                  className="p-5 rounded-xl border border-stone-200 bg-stone-50/40 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-stone-800 text-white font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                      {idx + 1}
                    </span>
                    <div className="text-sm font-semibold text-stone-900 leading-snug">
                      {exercise.question}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2.5 pl-9">
                    {exercise.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      let optionStyle = 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50';

                      if (isChecked) {
                        if (optIdx === exercise.correctIndex) {
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
                          onClick={() => handleSelectOption(exercise.id, optIdx)}
                          className={`w-full text-left p-3 text-xs sm:text-sm rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${optionStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-xs text-stone-400 uppercase">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isChecked && optIdx === exercise.correctIndex && (
                            <span className="text-emerald-700 text-xs font-semibold flex items-center gap-1 shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Đúng</span>
                            </span>
                          )}
                          {isChecked && isOptionSelected && !isCorrect && (
                            <span className="text-rose-700 text-xs font-semibold flex items-center gap-1 shrink-0">
                              <XCircle className="w-4 h-4 text-rose-600" />
                              <span>Chưa đúng</span>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Action & Explanation */}
                  <div className="pl-9 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      onClick={() => handleCheckAnswer(exercise.id)}
                      disabled={selectedOpt === undefined}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer self-start ${
                        selectedOpt !== undefined
                          ? 'bg-amber-800 text-white hover:bg-amber-900'
                          : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      Kiểm tra đáp án
                    </button>

                    {isChecked && (
                      <div className="text-xs text-stone-600 italic">
                        {isCorrect ? 'Chúc mừng bạn đã trả lời chính xác!' : 'Xem lời giải thích chi tiết bên dưới.'}
                      </div>
                    )}
                  </div>

                  {/* Feedback Explanation */}
                  {isChecked && (
                    <div className="mt-3 ml-9 p-3.5 bg-stone-100 rounded-lg border border-stone-200 text-xs text-stone-800 leading-relaxed">
                      <span className="font-bold text-stone-900">Giải thích:</span> {exercise.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
