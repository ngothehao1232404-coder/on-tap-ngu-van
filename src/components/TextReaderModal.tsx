import React, { useState } from 'react';
import { X, Bookmark, BookOpen, Layers, HelpCircle, GitFork, PenTool, CheckCircle, Share2, Copy, Check, Download, Printer, Save, CheckCircle2, Bot } from 'lucide-react';
import { LiteraryWork } from '../types/literature';
import { MindMapViewer } from './MindMapViewer';
import { downloadTextFile, safePrintContent } from '../utils/fileSaver';

interface TextReaderModalProps {
  work: LiteraryWork | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (workId: string) => void;
  onSaveNote: (workId: string, title: string, content: string, stayInModal?: boolean) => void;
  existingNote?: string;
  onNavigateToNotebook?: () => void;
  onNavigateToPractice?: () => void;
  onNavigateToChatbot?: (workId: string) => void;
}

export const TextReaderModal: React.FC<TextReaderModalProps> = ({
  work,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSaveNote,
  existingNote = '',
  onNavigateToNotebook,
  onNavigateToPractice,
  onNavigateToChatbot,
}) => {
  if (!isOpen || !work) return null;

  const [activeTab, setActiveTab] = useState<'analysis' | 'structure' | 'questions' | 'mindmap' | 'notes'>('analysis');
  const [noteContent, setNoteContent] = useState(existingNote);
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [downloadedNote, setDownloadedNote] = useState<boolean>(false);

  const toggleAnswer = (idx: number) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleCopyQuote = (quote: string) => {
    navigator.clipboard.writeText(quote);
    setCopiedQuote(quote);
    setTimeout(() => setCopiedQuote(null), 2000);
  };

  const handleSaveUserNote = (stay: boolean = true) => {
    if (!noteContent.trim()) return;
    onSaveNote(work.id, `Ghi chú bài học: ${work.title}`, noteContent, stay);
    if (stay) {
      setSaveSuccessMessage(`Đã lưu thành công vào Sổ tay học tập lúc ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}!`);
      setTimeout(() => setSaveSuccessMessage(null), 4000);
    }
  };

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleDownloadNote = () => {
    const content = `GHI CHÚ BÀI HỌC NGỮ VĂN 7\nTác phẩm: ${work.title}\nTác giả: ${work.author}\nThể loại: ${work.genre}\nNgày ghi chú: ${new Date().toLocaleDateString('vi-VN')}\n\nNỘI DUNG GHI CHÚ:\n${noteContent || '(Chưa có nội dung ghi chú)'}\n\nTRÍCH ĐOẠN TIÊU BIỂU:\n${work.excerpt}`;
    downloadTextFile(`Ghi_chu_${work.title.replace(/\s+/g, '_')}`, content);
    setDownloadedNote(true);
    setTimeout(() => setDownloadedNote(false), 2000);
  };

  const handlePrintNote = () => {
    const content = `GHI CHÚ BÀI HỌC: ${work.title}\nTác giả: ${work.author}\n\nNội dung ghi chép cá nhân:\n${noteContent}\n\nTrích đoạn tác phẩm:\n${work.excerpt}`;
    safePrintContent(`Ghi chú: ${work.title}`, content, 'Sổ tay học tập Ngữ văn 7');
  };

  const [downloadedFullLesson, setDownloadedFullLesson] = useState(false);

  const handleDownloadFullLesson = () => {
    let doc = `TÀI LIỆU HỌC TẬP CHUYÊN SÂU: ${work.title.toUpperCase()}\n`;
    doc += `Tác giả: ${work.author}\n`;
    doc += `Thể loại: ${work.genre} · Chủ đề: ${work.topicName}\n`;
    doc += `Thời lượng đọc: ${work.readTime}\n`;
    doc += `Ngày tải về: ${new Date().toLocaleDateString('vi-VN')}\n`;
    doc += `=========================================================\n\n`;

    doc += `I. GIÁ TRỊ TƯ TƯỞNG & THÔNG ĐIỆP CỐT LÕI\n`;
    doc += `${work.ideologicalValue}\n\n`;

    doc += `II. TÓM TẮT TÁC PHẨM\n`;
    doc += `${work.summary}\n\n`;

    doc += `III. BỐ CỤC VĂN BẢN\n`;
    work.structure.forEach((s) => {
      doc += `- ${s.part} (${s.range}): ${s.content}\n`;
    });
    doc += `\n`;

    doc += `IV. PHÂN TÍCH LUẬN ĐIỂM CHI TIẾT\n`;
    work.analysisSections.forEach((sec, idx) => {
      doc += `[Luận điểm ${idx + 1}] ${sec.title}\n`;
      doc += `${sec.content}\n`;
      if (sec.quote) doc += `* Dẫn chứng đắt giá: "${sec.quote}"\n`;
      doc += `\n`;
    });

    doc += `V. GIÁ TRỊ NGHỆ THUẬT TIÊU BIỂU\n`;
    work.artisticValues.forEach((art, idx) => {
      doc += `${idx + 1}. ${art}\n`;
    });
    doc += `\n`;

    doc += `VI. CÂU HỎI SOẠN BÀI & HƯỚNG DẪN TRẢ LỜI\n`;
    work.discussionQuestions.forEach((q, idx) => {
      doc += `Câu ${idx + 1}: ${q.question}\n`;
      doc += `Gợi ý: ${q.hint}\n`;
      doc += `Trả lời chi tiết: ${q.answer}\n\n`;
    });

    if (noteContent.trim()) {
      doc += `VII. GHI CHÚ CÁ NHÂN CỦA EM\n`;
      doc += `${noteContent}\n\n`;
    }

    downloadTextFile(`Bai_hoc_${work.title.replace(/\s+/g, '_')}`, doc);
    setDownloadedFullLesson(true);
    setTimeout(() => setDownloadedFullLesson(false), 2000);
  };

  const handlePrintFullLesson = () => {
    let doc = `TÀI LIỆU HỌC TẬP: ${work.title}\nTác giả: ${work.author} · Thể loại: ${work.genre}\n\n`;
    doc += `1. THÔNG ĐIỆP CỐT LÕI:\n${work.ideologicalValue}\n\n`;
    doc += `2. TÓM TẮT:\n${work.summary}\n\n`;
    doc += `3. PHÂN TÍCH CHI TIẾT:\n`;
    work.analysisSections.forEach((sec) => {
      doc += `* ${sec.title}:\n${sec.content}\n\n`;
    });
    doc += `4. HƯỚNG DẪN TRẢ LỜI CÂU HỎI:\n`;
    work.discussionQuestions.forEach((q, idx) => {
      doc += `Câu ${idx + 1}: ${q.question}\n-> ${q.answer}\n\n`;
    });
    safePrintContent(work.title, doc, `Ngữ văn 7 · ${work.topicName}`);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] cursor-default"
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div>
            <div className="text-xs text-amber-800 font-semibold tracking-wide">
              {work.topicName} · {work.genre}
            </div>
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
              {work.title}
            </h2>
            <div className="text-xs text-stone-500 mt-0.5">
              Tác giả: {work.author} · {work.readTime}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadFullLesson}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-stone-200"
              title="Tải toàn bộ bài học & câu hỏi soạn bài (.txt)"
            >
              {downloadedFullLesson ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline text-emerald-700">Đã tải về</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline">Tải bài học (.txt)</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrintFullLesson}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-stone-200"
              title="In toàn bộ bài học"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>In</span>
            </button>

            <button
              onClick={() => onToggleBookmark(work.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
              title={isBookmarked ? 'Bỏ lưu' : 'Lưu tác phẩm'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {onNavigateToChatbot && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToChatbot(work.id);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
                title="Mở Trợ lý Hỏi đáp Grounded cho bài học này"
              >
                <Bot className="w-3.5 h-3.5 text-emerald-200" />
                <span className="hidden sm:inline">Hỏi đáp Grounded</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs (Interactive segmented buttons) */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-stone-100/70 border-b border-stone-200 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'analysis'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Phân tích chuyên sâu</span>
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'structure'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span>Tóm tắt & Bố cục</span>
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Soạn bài & Thảo luận</span>
          </button>
          <button
            onClick={() => setActiveTab('mindmap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'mindmap'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <GitFork className="w-3.5 h-3.5 text-amber-700" />
            <span>Sơ đồ tư duy</span>
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 text-amber-700" />
            <span>Ghi chú của bạn</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* TAB 1: PHÂN TÍCH CHUYÊN SÂU */}
          {activeTab === 'analysis' && (
            <div className="space-y-8">
              {/* Author Bio Box */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-amber-950 leading-relaxed">
                <span className="font-bold">Đôi nét về tác giả:</span> {work.authorBio}
              </div>

              {/* Core Ideological Value Banner */}
              <div className="p-5 rounded-xl bg-stone-900 text-stone-100 text-sm leading-relaxed">
                <div className="text-xs uppercase font-semibold text-amber-300 mb-1">
                  Giá trị tư tưởng & Thông điệp cốt lõi
                </div>
                <div className="font-serif-display text-base font-medium">
                  {work.ideologicalValue}
                </div>
              </div>

              {/* Analysis Sections */}
              <div className="space-y-6">
                <h3 className="font-serif-display text-xl font-bold text-stone-900 border-b border-stone-200 pb-2">
                  Luận điểm & Phân tích chi tiết
                </h3>

                {work.analysisSections.map((sec, idx) => (
                  <div key={idx} className="bg-stone-50/70 p-5 rounded-xl border border-stone-200 space-y-3">
                    <h4 className="font-serif-display text-base font-bold text-stone-900">
                      {sec.title}
                    </h4>
                    <p className="text-stone-700 text-sm leading-relaxed">
                      {sec.content}
                    </p>
                    {sec.quote && (
                      <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-amber-200/80 text-amber-950 text-xs sm:text-sm italic">
                        <span>{sec.quote}</span>
                        <button
                          onClick={() => handleCopyQuote(sec.quote!)}
                          className="shrink-0 p-1.5 hover:bg-amber-50 rounded text-amber-800 transition-colors cursor-pointer"
                          title="Sao chép dẫn chứng"
                        >
                          {copiedQuote === sec.quote ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Artistic Values & Themes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white border border-stone-200">
                  <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Chủ đề tiêu biểu
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {work.keyThemes.map((theme, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">·</span>
                        <span>{theme}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-white border border-stone-200">
                  <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Đặc sắc nghệ thuật
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {work.artisticValues.map((art, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">·</span>
                        <span>{art}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TÓM TẮT & BỐ CỤC */}
          {activeTab === 'structure' && (
            <div className="space-y-8">
              <div>
                <h3 className="font-serif-display text-lg font-bold text-stone-900 mb-3">
                  Tóm tắt nội dung văn bản
                </h3>
                <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 text-stone-700 text-sm leading-relaxed">
                  {work.summary}
                </div>
              </div>

              <div>
                <h3 className="font-serif-display text-lg font-bold text-stone-900 mb-3">
                  Bố cục chi tiết ({work.structure.length} phần)
                </h3>
                <div className="space-y-4">
                  {work.structure.map((item, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span className="font-bold text-amber-800">{item.part}</span>
                        <span className="italic">{item.range}</span>
                      </div>
                      <p className="text-sm text-stone-800 font-medium">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOẠN BÀI & CÂU HỎI */}
          {activeTab === 'questions' && (
            <div className="space-y-6">
              <div className="p-4 bg-sky-50 text-sky-900 text-xs sm:text-sm rounded-xl border border-sky-200">
                Gợi ý soạn bài theo sách giáo khoa mới. Hãy tự suy ngẫm câu trả lời trước khi nhấp "Xem gợi ý đáp án chi tiết".
              </div>

              <div className="space-y-4">
                {work.discussionQuestions.map((q, idx) => {
                  const isRevealed = revealedAnswers[idx];
                  return (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-semibold text-stone-900 leading-snug">
                          {q.question}
                        </h4>
                      </div>

                      <div className="text-xs text-stone-500 pl-9">
                        <span className="font-semibold text-stone-700">Định hướng suy nghĩ:</span> {q.hint}
                      </div>

                      <div className="pl-9 pt-1">
                        <button
                          onClick={() => toggleAnswer(idx)}
                          className="text-xs font-semibold text-amber-800 hover:text-amber-950 transition-colors cursor-pointer"
                        >
                          {isRevealed ? 'Ẩn câu trả lời mẫu ▲' : 'Xem câu trả lời mẫu ▼'}
                        </button>

                        {isRevealed && (
                          <div className="mt-2.5 p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs sm:text-sm text-stone-800 leading-relaxed animate-in fade-in duration-200">
                            {q.answer}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {onNavigateToPractice && (
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200/80">
                  <div>
                    <h5 className="font-bold text-xs text-amber-900">
                      Ôn tập kiểm tra cho chủ đề này trên lớp
                    </h5>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      Luyện tập 4 dạng câu hỏi cơ bản: Đúng/Sai, Điền từ ngắn, Trắc nghiệm và Hỏi–đáp.
                    </p>
                  </div>
                  <button
                    onClick={onNavigateToPractice}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer shrink-0 shadow-xs"
                  >
                    <span>Luyện câu hỏi ôn tập →</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SƠ ĐỒ TƯ DUY */}
          {activeTab === 'mindmap' && (
            <div>
              <MindMapViewer data={work.mindMap} title={work.title} />
            </div>
          )}

          {/* TAB 5: GHI CHÚ CỦA BẠN */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600 flex items-center justify-between">
                <span>Ghi chép lại những rung cảm, ý tưởng hoặc đoạn văn tự sáng tác về tác phẩm này. Ghi chú được lưu trữ an toàn trong trình duyệt của bạn.</span>
                <span className="text-[11px] font-mono text-stone-400">Tự động đồng bộ</span>
              </div>

              {saveSuccessMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">{saveSuccessMessage}</span>
                  </div>
                  {onNavigateToNotebook && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToNotebook();
                      }}
                      className="text-emerald-700 hover:text-emerald-900 underline text-xs font-semibold cursor-pointer"
                    >
                      Mở Sổ tay xem ngay →
                    </button>
                  )}
                </div>
              )}

              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Nhập cảm nhận cá nhân, từ khóa cần nhớ hoặc ý tưởng viết bài..."
                rows={8}
                className="w-full p-4 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 bg-stone-50"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadNote}
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Tải ghi chú về máy (.txt)"
                  >
                    {downloadedNote ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Đã tải về máy</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-stone-600" />
                        <span>Tải về (.txt)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrintNote}
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    title="In ghi chú"
                  >
                    <Printer className="w-3.5 h-3.5 text-stone-600" />
                    <span>In ghi chú</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSaveUserNote(true)}
                    className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-300" />
                    <span>Lưu vào sổ tay học tập</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <div>Ngữ văn 7 · Giáo dục phổ thông mới</div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-stone-300 rounded-lg font-medium text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
