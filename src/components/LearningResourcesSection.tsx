import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Search, 
  BookOpen, 
  Layers, 
  Award, 
  Filter, 
  Printer, 
  ExternalLink, 
  Bookmark,
  CheckCircle2,
  HelpCircle,
  FolderOpen,
  ArrowRight
} from 'lucide-react';
import { LEARNING_RESOURCES, GLOSSARY_TERMS, CURRICULUM_COMPARISONS } from '../data/learningResources';
import { LearningResourceItem, ResourceCategoryType, GlossaryTerm } from '../types/literature';
import { downloadTextFile, safePrintContent } from '../utils/fileSaver';

export const LearningResourcesSection: React.FC = () => {
  const [subTab, setSubTab] = useState<'all' | 'exams' | 'worksheets' | 'curriculum' | 'glossary'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<'all' | '1' | '2'>('all');
  const [selectedResource, setSelectedResource] = useState<LearningResourceItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  
  // Glossary filters
  const [glossaryCategory, setGlossaryCategory] = useState<string>('all');
  const [glossarySearch, setGlossarySearch] = useState<string>('');

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (resource: LearningResourceItem) => {
    downloadTextFile(resource.title, resource.content);
    setDownloadedId(resource.id);
    setTimeout(() => setDownloadedId(null), 2000);
  };

  const handlePrint = (resource: LearningResourceItem) => {
    safePrintContent(resource.title, resource.content, `Học liệu Ngữ văn 7 · ${resource.format}`);
  };

  // Filtered resources
  const filteredResources = useMemo(() => {
    return LEARNING_RESOURCES.filter((res) => {
      // Tab category filter
      if (subTab === 'exams' && res.category !== 'exam_bank') return false;
      if (subTab === 'worksheets' && res.category !== 'worksheet' && res.category !== 'reference_doc') return false;

      // Semester filter
      if (selectedSemester !== 'all') {
        const semNum = Number(selectedSemester);
        if (res.semester !== 'both' && res.semester !== semNum) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = res.title.toLowerCase().includes(q);
        const matchDesc = res.description.toLowerCase().includes(q);
        const matchTags = res.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTags) return false;
      }

      return true;
    });
  }, [subTab, selectedSemester, searchQuery]);

  // Filtered glossary
  const filteredGlossary = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      if (glossaryCategory !== 'all' && term.category !== glossaryCategory) return false;
      if (glossarySearch.trim()) {
        const q = glossarySearch.toLowerCase().trim();
        return (
          term.term.toLowerCase().includes(q) ||
          term.definition.toLowerCase().includes(q) ||
          term.manifestation.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [glossaryCategory, glossarySearch]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div>
        <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1">
          Hệ sinh thái Học liệu số & Ma trận kiểm tra
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
          Kho Học Liệu & Đề Kiểm Tra Ngữ Văn 7
        </h2>
        <p className="text-stone-600 text-sm max-w-3xl leading-relaxed">
          Tổng hợp tài liệu học tập toàn diện theo chuẩn Thông tư 22 và Công văn 3175/BGDĐT: Đề kiểm tra có ma trận đặc tả, phiếu rèn luyện kỹ năng P-E-E-L, bảng đối chiếu 3 bộ sách và từ điển thuật ngữ văn học.
        </p>
      </div>

      {/* Main Subtabs Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setSubTab('all')}
          className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
            subTab === 'all'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Tất cả tài liệu ({LEARNING_RESOURCES.length})
        </button>
        <button
          onClick={() => setSubTab('exams')}
          className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
            subTab === 'exams'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Ngân hàng Đề thi & Ma trận
        </button>
        <button
          onClick={() => setSubTab('worksheets')}
          className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
            subTab === 'worksheets'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Phiếu học tập & Rubrics
        </button>
        <button
          onClick={() => setSubTab('curriculum')}
          className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
            subTab === 'curriculum'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Bảng đối chiếu 3 Bộ sách
        </button>
        <button
          onClick={() => setSubTab('glossary')}
          className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
            subTab === 'glossary'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Từ điển thuật ngữ ({GLOSSARY_TERMS.length})
        </button>
      </div>

      {/* VIEW 1: RESOURCE ITEMS LIST (All, Exams, Worksheets) */}
      {(subTab === 'all' || subTab === 'exams' || subTab === 'worksheets') && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên đề thi, phiếu học tập, từ khóa..."
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium">Học kỳ:</span>
              <button
                onClick={() => setSelectedSemester('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedSemester === 'all'
                    ? 'bg-amber-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Cả năm
              </button>
              <button
                onClick={() => setSelectedSemester('1')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedSemester === '1'
                    ? 'bg-amber-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Học kì 1
              </button>
              <button
                onClick={() => setSelectedSemester('2')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedSemester === '2'
                    ? 'bg-amber-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Học kì 2
              </button>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top metadata tags */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-amber-800">
                      {res.format}
                    </span>
                    <span className="text-[11px] font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                      {res.semester === 'both' ? 'Cả năm' : `Học kì ${res.semester}`}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-lg font-bold text-stone-900 mb-2 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {res.description}
                  </p>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-700 mb-4 font-mono line-clamp-2">
                    {res.previewSnippet}
                  </div>

                  {/* Anti-pill tag list with interpunct */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-400 mb-4">
                    {res.tags.map((tag, idx) => (
                      <span key={idx} className="after:content-['·'] last:after:content-none mr-1 text-stone-500 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyText(res.id, res.content)}
                      className="flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900 py-1.5 px-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Sao chép toàn bộ nội dung"
                    >
                      {copiedId === res.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDownload(res)}
                      className="flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900 py-1.5 px-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Tải văn bản về máy (.txt)"
                    >
                      {downloadedId === res.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Đã tải</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-amber-700" />
                          <span>Tải về</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handlePrint(res)}
                      className="flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900 py-1.5 px-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                      title="In hoặc lưu dạng PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>In / PDF</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedResource(res)}
                    className="flex items-center gap-1 text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 py-2 px-3 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: CURRICULUM COMPARISON TABLE */}
      {subTab === 'curriculum' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="font-serif-display text-xl font-bold text-stone-900">
              Ma Trận So Sánh & Quy Chiếu 3 Bộ Sách Giáo Khoa Lớp 7
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Chương trình GDPT 2018 định hướng phát triển năng lực chung. Dù các trường học sử dụng bộ sách khác nhau, các thể loại và chuẩn kiến thức - kĩ năng vẫn đồng nhất.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-700 uppercase tracking-wider font-semibold border-b border-stone-300">
                  <th className="p-3 w-12 text-center">HK</th>
                  <th className="p-3 min-w-[160px]">Chủ đề cốt lõi</th>
                  <th className="p-3 min-w-[200px] bg-amber-50/50">Kết nối tri thức với cuộc sống</th>
                  <th className="p-3 min-w-[200px]">Cánh diều</th>
                  <th className="p-3 min-w-[200px]">Chân trời sáng tạo</th>
                  <th className="p-3 min-w-[220px]">Chuẩn năng lực đầu ra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {CURRICULUM_COMPARISONS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                    <td className="p-3 text-center font-mono font-bold text-stone-500">
                      HK{row.semester}
                    </td>
                    <td className="p-3 font-semibold text-stone-900">
                      {row.coreTheme}
                    </td>
                    <td className="p-3 bg-amber-50/30">
                      <div className="font-bold text-amber-900 mb-1">{row.ketNoi.unitName}</div>
                      <div className="text-stone-600 text-[11px] leading-relaxed">
                        {row.ketNoi.keyWorks.join(', ')}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-stone-800 mb-1">{row.canhDieu.unitName}</div>
                      <div className="text-stone-600 text-[11px] leading-relaxed">
                        {row.canhDieu.keyWorks.join(', ')}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-stone-800 mb-1">{row.chanTroi.unitName}</div>
                      <div className="text-stone-600 text-[11px] leading-relaxed">
                        {row.chanTroi.keyWorks.join(', ')}
                      </div>
                    </td>
                    <td className="p-3 text-stone-700 leading-relaxed font-medium">
                      {row.mainCompetency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: GLOSSARY OF LITERARY TERMS */}
      {subTab === 'glossary' && (
        <div className="space-y-6">
          {/* Glossary Search & Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Tra cứu thuật ngữ (Điểm nhìn, Thể thơ, Ngụ ngôn, Tùy bút...)"
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setGlossaryCategory('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  glossaryCategory === 'all'
                    ? 'bg-amber-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Tất cả
              </button>
              {['Truyện', 'Thơ', 'Ký - Tùy bút', 'Nghị luận', 'Tiếng Việt'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGlossaryCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    glossaryCategory === cat
                      ? 'bg-amber-900 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif-display text-base font-bold text-stone-900">
                    {item.term}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-semibold">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 font-medium">Khái niệm:</strong> {item.definition}
                </p>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-800 space-y-1">
                  <div>
                    <span className="font-semibold text-amber-800">Biểu hiện ở lớp 7:</span> {item.manifestation}
                  </div>
                  <div className="italic text-stone-600">
                    <span className="font-semibold not-italic text-stone-700">Ví dụ:</span> {item.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RESOURCE DETAIL MODAL DIALOG */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div>
                <div className="text-xs text-amber-800 font-semibold">
                  {selectedResource.format} · {selectedResource.semester === 'both' ? 'Cả năm' : `Học kì ${selectedResource.semester}`}
                </div>
                <h3 className="font-serif-display text-lg sm:text-xl font-bold text-stone-900">
                  {selectedResource.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyText(selectedResource.id, selectedResource.content)}
                  className="p-2 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  title="Sao chép nội dung"
                >
                  {copiedId === selectedResource.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="hidden sm:inline text-emerald-700">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">Sao chép</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDownload(selectedResource)}
                  className="p-2 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  title="Tải văn bản về máy (.txt)"
                >
                  {downloadedId === selectedResource.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="hidden sm:inline text-emerald-700">Đã tải về máy</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-amber-700" />
                      <span className="hidden sm:inline">Tải về (.txt)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handlePrint(selectedResource)}
                  className="p-2 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  title="In / PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">In / PDF</span>
                </button>

                <button
                  onClick={() => setSelectedResource(null)}
                  className="p-2 rounded-lg border border-stone-200 bg-white text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <pre className="font-sans text-xs sm:text-sm text-stone-800 whitespace-pre-wrap leading-relaxed select-text bg-stone-50 p-6 rounded-xl border border-stone-200">
                {selectedResource.content}
              </pre>
            </div>

            <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <div>Chuẩn chương trình Giáo dục phổ thông 2018</div>
              <button
                onClick={() => setSelectedResource(null)}
                className="px-4 py-1.5 bg-white border border-stone-300 rounded-lg font-medium text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
