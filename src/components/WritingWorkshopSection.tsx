import React, { useState } from 'react';
import { PenTool, FileText, Sparkles, Copy, Check, Download, Layers, BookOpen, Save, Printer, Bookmark } from 'lucide-react';
import { WRITING_GUIDES } from '../data/writingGuides';
import { downloadTextFile, safePrintContent } from '../utils/fileSaver';
import { PersonalEssayDraft } from '../types/literature';

export const WritingWorkshopSection: React.FC = () => {
  const [activeGuideId, setActiveGuideId] = useState<string>(WRITING_GUIDES[0].id);
  const [activeTab, setActiveTab] = useState<'guides' | 'builder' | 'samples' | 'openings' | 'writer'>('guides');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [savedToPersonal, setSavedToPersonal] = useState(false);
  const [downloadedOutline, setDownloadedOutline] = useState(false);

  // Full Essay Writing Studio State
  const [draftTitle, setDraftTitle] = useState('Cảm nhận về tình cảm gia đình trong văn bản "Gặp lá cơm nếp"');
  const [draftGenre, setDraftGenre] = useState('Đoạn văn cảm thụ');
  const [draftPrompt, setDraftPrompt] = useState('Phát biểu cảm nghĩ của em về hình ảnh người mẹ trong bài thơ Gặp lá cơm nếp');
  const [draftBody, setDraftBody] = useState(`Mỗi lần đọc bài thơ "Gặp lá cơm nếp" của Thanh Thảo, lòng em lại dâng lên niềm xúc động rưng rưng trước tình mẫu tử thiêng liêng. Giữa những bước chân hành quân vất vả nơi rừng sâu Trường Sơn, chỉ một làn khói bay lên từ bếp lửa nương ngô bập bùng, thoang thoảng mùi xôi nếp mới đã đánh thức trong lòng người lính trẻ cả một trời thương nhớ về quê mẹ hiền.`);
  const [draftNotes, setDraftNotes] = useState('Cần đưa thêm câu thơ dẫn chứng trực tiếp và kết bài sâu lắng hơn.');
  const [savedDraftSuccess, setSavedDraftSuccess] = useState(false);
  const [downloadedDraftSuccess, setDownloadedDraftSuccess] = useState(false);

  // Interactive Outline Builder States
  const [builderTitle, setBuilderTitle] = useState('Phân tích nhân vật Mon trong truyện Bầy chim chìa vôi');
  const [builderIntro, setBuilderIntro] = useState('Giới thiệu truyện ngắn Bầy chim chìa vôi của Nguyễn Quang Thiều và cậu bé Mon với tấm lòng nhân hậu trong trẻo.');
  const [builderPoint1, setBuilderPoint1] = useState('Nỗi lo âu thắt ruột giữa đêm mưa bão về đàn chim non ngoài bãi cát.');
  const [builderPoint2, setBuilderPoint2] = useState('Hành động dũng cảm chèo đò trong sớm mai để cứu bầy chim non.');
  const [builderPoint3, setBuilderPoint3] = useState('Giọt nước mắt xúc động thanh lọc tâm hồn khi đàn chim vỗ cánh bay lên.');
  const [builderOutro, setBuilderOutro] = useState('Khẳng định vẻ đẹp thánh thiện của tuổi thơ và rút ra bài học bảo vệ sự sống tự nhiên.');

  const activeGuide = WRITING_GUIDES.find((g) => g.id === activeGuideId) || WRITING_GUIDES[0];

  const getFormattedOutline = () => {
    return `DÀN Ý TẬP LÀM VĂN LỚP 7\nĐề bài: ${builderTitle}\n\nI. MỞ BÀI:\n${builderIntro}\n\nII. THÂN BÀI:\n- Luận điểm 1: ${builderPoint1}\n- Luận điểm 2: ${builderPoint2}\n- Luận điểm 3: ${builderPoint3}\n\nIII. KẾT BÀI:\n${builderOutro}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleExportOutline = () => {
    const formatted = getFormattedOutline();
    handleCopy(formatted);
  };

  const handleSaveToPersonalSpace = () => {
    const formatted = getFormattedOutline();
    try {
      const existing = localStorage.getItem('nv7_my_essays');
      const list: PersonalEssayDraft[] = existing ? JSON.parse(existing) : [];
      const newDraft: PersonalEssayDraft = {
        id: `draft-outline-${Date.now()}`,
        title: `[Dàn ý] ${builderTitle}`,
        genre: 'Dàn ý Tập làm văn',
        prompt: builderTitle,
        bodyText: formatted,
        wordCount: formatted.split(/\s+/).filter(Boolean).length,
        updatedAt: new Date().toLocaleDateString('vi-VN'),
        reflectionNotes: 'Dàn ý được tạo từ Công cụ Lập Dàn Bài Thông Minh.'
      };
      localStorage.setItem('nv7_my_essays', JSON.stringify([newDraft, ...list]));
      setSavedToPersonal(true);
      setTimeout(() => setSavedToPersonal(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadOutline = () => {
    const formatted = getFormattedOutline();
    downloadTextFile(`Dan_y_${builderTitle.slice(0, 30).replace(/\s+/g, '_')}`, formatted);
    setDownloadedOutline(true);
    setTimeout(() => setDownloadedOutline(false), 2000);
  };

  const handlePrintOutline = () => {
    const formatted = getFormattedOutline();
    safePrintContent(`Dàn ý: ${builderTitle}`, formatted, 'Tập làm văn Ngữ văn 7');
  };

  const handleSaveDraftToPersonal = () => {
    if (!draftTitle.trim() || !draftBody.trim()) return;
    try {
      const existing = localStorage.getItem('nv7_my_essays');
      const list: PersonalEssayDraft[] = existing ? JSON.parse(existing) : [];
      const newDraft: PersonalEssayDraft = {
        id: `draft-written-${Date.now()}`,
        title: draftTitle.trim(),
        genre: draftGenre,
        prompt: draftPrompt.trim(),
        bodyText: draftBody.trim(),
        wordCount: draftBody.trim().split(/\s+/).filter(Boolean).length,
        updatedAt: new Date().toLocaleDateString('vi-VN'),
        reflectionNotes: draftNotes.trim() || 'Bài viết hoàn thiện tại Phòng Luyện viết bài văn.'
      };
      localStorage.setItem('nv7_my_essays', JSON.stringify([newDraft, ...list]));
      setSavedDraftSuccess(true);
      setTimeout(() => setSavedDraftSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadDraft = () => {
    if (!draftTitle.trim() || !draftBody.trim()) return;
    let content = `BÀI LÀM VĂN LỚP 7: ${draftTitle.toUpperCase()}\n`;
    content += `Thể loại: ${draftGenre}\nĐề bài: ${draftPrompt}\n`;
    content += `Số lượng từ: ${draftBody.trim().split(/\s+/).filter(Boolean).length} từ\n`;
    content += `Ngày lưu: ${new Date().toLocaleDateString('vi-VN')}\n`;
    content += `=========================================================\n\n`;
    content += `${draftBody}\n\n`;
    if (draftNotes.trim()) {
      content += `=========================================================\n`;
      content += `Ghi chú rút kinh nghiệm:\n${draftNotes}\n`;
    }
    downloadTextFile(`Bai_van_${draftTitle.slice(0, 30).replace(/\s+/g, '_')}`, content);
    setDownloadedDraftSuccess(true);
    setTimeout(() => setDownloadedDraftSuccess(false), 2000);
  };

  const handlePrintDraft = () => {
    if (!draftTitle.trim() || !draftBody.trim()) return;
    let content = `Đề bài: ${draftPrompt}\nThể loại: ${draftGenre}\n\n${draftBody}\n\n`;
    if (draftNotes.trim()) content += `Nhận xét: ${draftNotes}\n`;
    safePrintContent(draftTitle, content, 'Bài làm văn Ngữ văn 7');
  };

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div>
        <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1">
          Kỹ năng Viết & Tạo lập văn bản
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
          Góc Tập Làm Văn & Hướng Dẫn Viết Bài Điểm 9+
        </h2>
        <p className="text-stone-600 text-sm max-w-3xl leading-relaxed">
          Rèn luyện tư duy lập luận, cấu trúc bài viết mạch lạc và làm giàu vốn từ ngữ qua các dàn ý chuẩn mực, công cụ xây dựng dàn bài tự động và kho ngữ liệu mở - kết bài độc đáo.
        </p>
      </div>

      {/* Main Tabs (Interactive segmented buttons) */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl max-w-2xl text-xs font-semibold">
        <button
          onClick={() => setActiveTab('guides')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
            activeTab === 'guides'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Dàn ý & Yêu cầu
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
            activeTab === 'builder'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Xây dựng dàn bài cá nhân
        </button>
        <button
          onClick={() => setActiveTab('samples')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
            activeTab === 'samples'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Bài văn mẫu đạt điểm 9+
        </button>
        <button
          onClick={() => setActiveTab('openings')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
            activeTab === 'openings'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Mẫu Mở - Kết bài hay
        </button>
        <button
          onClick={() => setActiveTab('writer')}
          className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
            activeTab === 'writer'
              ? 'bg-amber-800 text-white shadow-xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Luyện viết bài văn
        </button>
      </div>

      {/* SUB-TAB 1: DÀN Ý & YÊU CẦU */}
      {activeTab === 'guides' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
            {WRITING_GUIDES.map((guide) => (
              <button
                key={guide.id}
                onClick={() => setActiveGuideId(guide.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                  activeGuideId === guide.id
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {guide.title}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-8">
            <div>
              <div className="text-xs text-amber-800 font-semibold mb-1">
                Thể loại: {activeGuide.targetGenre}
              </div>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 mb-3">
                {activeGuide.title}
              </h3>
            </div>

            {/* Requirements */}
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-stone-800">
                Yêu cầu tiên quyết khi viết bài
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                {activeGuide.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3-Part Outline Template */}
            <div className="space-y-4">
              <h4 className="font-serif-display text-lg font-bold text-stone-900">
                Cấu trúc Dàn ý 3 phần chi tiết
              </h4>

              {/* Mở bài */}
              <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-2xs space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  1. Mở bài
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                  {activeGuide.outlineTemplate.introduction.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-stone-400">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Thân bài */}
              <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-2xs space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  2. Thân bài
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                  {activeGuide.outlineTemplate.body.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-stone-400">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kết bài */}
              <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-2xs space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  3. Kết bài
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                  {activeGuide.outlineTemplate.conclusion.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-stone-400">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: OUTLINE BUILDER */}
      {activeTab === 'builder' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <h3 className="font-serif-display text-xl font-bold text-stone-900">
                Công Cụ Lập Dàn Bài Thông Minh
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Nhập ý tưởng của bạn theo từng phần để hoàn thiện dàn ý trước khi đặt bút viết bài văn hoàn chỉnh.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSaveToPersonalSpace}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                title="Lưu dàn ý vào Góc sáng tác cá nhân"
              >
                {savedToPersonal ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span className="text-emerald-100">Đã lưu vào Góc của em!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-amber-200" />
                    <span>Lưu vào Góc của em</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadOutline}
                className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                title="Tải dàn ý về máy (.txt)"
              >
                {downloadedOutline ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Đã tải về máy</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-stone-600" />
                    <span>Tải về (.txt)</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrintOutline}
                className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                title="In hoặc xuất PDF"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>In / PDF</span>
              </button>

              <button
                onClick={handleExportOutline}
                className="flex items-center gap-1.5 px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                Tên đề bài / Vấn đề cần viết
              </label>
              <input
                type="text"
                value={builderTitle}
                onChange={(e) => setBuilderTitle(e.target.value)}
                className="w-full p-3 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                I. Mở bài (Giới thiệu tác giả, tác phẩm / vấn đề)
              </label>
              <textarea
                value={builderIntro}
                onChange={(e) => setBuilderIntro(e.target.value)}
                rows={2}
                className="w-full p-3 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase text-stone-700">
                II. Thân bài (Hệ thống các luận điểm chính)
              </label>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 w-20 shrink-0">Luận điểm 1:</span>
                  <input
                    type="text"
                    value={builderPoint1}
                    onChange={(e) => setBuilderPoint1(e.target.value)}
                    className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 w-20 shrink-0">Luận điểm 2:</span>
                  <input
                    type="text"
                    value={builderPoint2}
                    onChange={(e) => setBuilderPoint2(e.target.value)}
                    className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 w-20 shrink-0">Luận điểm 3:</span>
                  <input
                    type="text"
                    value={builderPoint3}
                    onChange={(e) => setBuilderPoint3(e.target.value)}
                    className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                III. Kết bài (Khẳng định lại giá trị & bài học liên hệ)
              </label>
              <textarea
                value={builderOutro}
                onChange={(e) => setBuilderOutro(e.target.value)}
                rows={2}
                className="w-full p-3 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SAMPLE ESSAYS */}
      {activeTab === 'samples' && (
        <div className="space-y-6">
          {WRITING_GUIDES.map((guide) => (
            <div key={guide.id} className="space-y-4">
              {guide.sampleEssays.map((sample, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                    <div>
                      <span className="text-xs text-amber-800 font-semibold">{sample.gradeLevel}</span>
                      <h4 className="font-serif-display text-lg sm:text-xl font-bold text-stone-900 mt-0.5">
                        {sample.topic}
                      </h4>
                    </div>
                    <button
                      onClick={() => handleCopy(sample.fullText)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép bài viết</span>
                    </button>
                  </div>

                  <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950">
                    <span className="font-bold">Nhận xét sư phạm:</span> {sample.commentary}
                  </div>

                  <div className="font-serif-display text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
                    {sample.fullText}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 4: MẪU MỞ - KẾT BÀI */}
      {activeTab === 'openings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <h3 className="font-serif-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Công thức Mở bài ấn tượng</span>
            </h3>
            <p className="text-xs text-stone-500">
              Các cách mở bài gián tiếp, liên hệ câu danh ngôn hoặc hình ảnh gợi cảm để dẫn dắt tự nhiên:
            </p>

            <div className="space-y-3 pt-2">
              {WRITING_GUIDES[0].goodOpenings.map((op, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed relative group">
                  <p>{op}</p>
                  <button
                    onClick={() => handleCopy(op)}
                    className="mt-2 text-xs text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Sao chép mẫu</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <h3 className="font-serif-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Công thức Kết bài sâu lắng</span>
            </h3>
            <p className="text-xs text-stone-500">
              Khép lại bài văn bằng sự dư ba, liên hệ trách nhiệm bản thân và nâng tầm ý nghĩa:
            </p>

            <div className="space-y-3 pt-2">
              {WRITING_GUIDES[0].goodEndings.map((ed, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed relative group">
                  <p>{ed}</p>
                  <button
                    onClick={() => handleCopy(ed)}
                    className="mt-2 text-xs text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Sao chép mẫu</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: FULL ESSAY WRITING STUDIO */}
      {activeTab === 'writer' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <h3 className="font-serif-display text-xl font-bold text-stone-900 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-amber-800" />
                <span>Phòng Luyện Viết Bài Văn & Đoạn Cảm Thụ</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Thực hành viết bài hoàn chỉnh, đếm từ tự động và lưu trữ bài viết an toàn vào Góc cá nhân của em.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSaveDraftToPersonal}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                title="Lưu bài làm vào Góc của em"
              >
                {savedDraftSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span className="text-emerald-100">Đã lưu bài văn vào Góc của em!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-amber-200" />
                    <span>Lưu vào Góc của em</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadDraft}
                className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-stone-200"
                title="Tải bài viết về máy (.txt)"
              >
                {downloadedDraftSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Đã tải về máy</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-stone-600" />
                    <span>Tải về (.txt)</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrintDraft}
                className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-stone-200"
                title="In bài làm văn"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>In bài</span>
              </button>
            </div>
          </div>

          {savedDraftSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">Bài văn đã được lưu thành công vào thiết bị của bạn!</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-medium">Xem lại bất cứ lúc nào tại Góc của em</span>
            </div>
          )}

          {/* Prompt Selection & Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Tựa đề bài văn của em
              </label>
              <input
                type="text"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="Nhập tiêu đề bài viết..."
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Thể loại văn học
              </label>
              <select
                value={draftGenre}
                onChange={(e) => setDraftGenre(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="Đoạn văn cảm thụ">Đoạn văn cảm thụ (150-200 chữ)</option>
                <option value="Nghị luận văn học">Bài văn phân tích nhân vật / tác phẩm</option>
                <option value="Nghị luận xã hội">Nghị luận xã hội (lối sống, tình cảm)</option>
                <option value="Văn biểu cảm">Bài văn phát biểu cảm nghĩ</option>
                <option value="Thuyết minh">Bài văn thuyết minh quy tắc, luật lệ</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
              Đề bài / Gợi ý tạo cảm hứng
            </label>
            <input
              type="text"
              value={draftPrompt}
              onChange={(e) => setDraftPrompt(e.target.value)}
              placeholder="Ví dụ: Cảm nghĩ về nhân vật Mên và Mon trong truyện Bầy chim chìa vôi..."
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Main Writing Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-bold uppercase tracking-wider text-amber-900">
                Nội dung bài viết
              </span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-stone-700 font-bold bg-stone-100 px-2 py-0.5 rounded">
                  {draftBody.trim().split(/\s+/).filter(Boolean).length} từ
                </span>
                <span className="text-stone-400">
                  (Khuyên dùng: 150-250 từ cho đoạn văn, 400-800 từ cho bài văn)
                </span>
              </div>
            </div>

            <textarea
              value={draftBody}
              onChange={(e) => setDraftBody(e.target.value)}
              placeholder="Em hãy thỏa sức viết những câu văn giàu cảm xúc, kết hợp biện pháp so sánh, ẩn dụ và trích dẫn thơ chuẩn xác tại đây..."
              rows={12}
              className="w-full p-4 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm leading-relaxed text-stone-900 font-serif focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            />
          </div>

          {/* Self-Reflection Notes */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
              Nhận xét tự rút kinh nghiệm (Để tiến bộ cho bài sau)
            </label>
            <input
              type="text"
              value={draftNotes}
              onChange={(e) => setDraftNotes(e.target.value)}
              placeholder="Ví dụ: Bài viết khá giàu cảm xúc, cần chú ý ngắt câu rõ ràng và kiểm tra chính tả..."
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-600 focus:outline-none"
            />
          </div>

          {/* Tips for high score */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Bí quyết bài văn đạt điểm 9+:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-stone-700">
              <li>Mở bài tự nhiên bằng một câu thơ, nhận định hoặc câu chuyện giàu hình ảnh.</li>
              <li>Mỗi luận điểm ở Thân bài cần có: Câu chủ đề + Dẫn chứng tiêu biểu + Phân tích từ ngữ tu từ + Đánh giá ý nghĩa.</li>
              <li>Kết bài tạo dư ba bằng bài học nhận thức và hành động của bản thân.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
