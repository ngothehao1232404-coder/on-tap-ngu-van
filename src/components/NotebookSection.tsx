import React, { useState } from 'react';
import { NotebookPen, Bookmark, Trash2, Plus, Calendar, ArrowRight, BookOpen, Download, Printer, Check, Copy } from 'lucide-react';
import { UserNote, LiteraryWork } from '../types/literature';
import { downloadTextFile, safePrintContent } from '../utils/fileSaver';

interface NotebookSectionProps {
  notes: UserNote[];
  bookmarks: string[];
  allWorks: LiteraryWork[];
  onAddNote: (title: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
  onOpenWork: (work: LiteraryWork) => void;
  onRemoveBookmark: (workId: string) => void;
}

export const NotebookSection: React.FC<NotebookSectionProps> = ({
  notes,
  bookmarks,
  allWorks,
  onAddNote,
  onDeleteNote,
  onOpenWork,
  onRemoveBookmark,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [downloadedAll, setDownloadedAll] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const bookmarkedWorks = allWorks.filter((w) => bookmarks.includes(w.id));

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    onAddNote(newTitle.trim(), newContent.trim());
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDownloadAllNotes = () => {
    if (notes.length === 0) return;
    let text = `SỔ TAY GHI CHÉP NGỮ VĂN LỚP 7\n`;
    text += `Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}\n`;
    text += `Tổng số ghi chú: ${notes.length}\n`;
    text += `==========================================\n\n`;

    notes.forEach((note, idx) => {
      text += `[${idx + 1}] ${note.title.toUpperCase()}\n`;
      text += `Ngày tạo: ${note.createdAt}\n`;
      text += `Nội dung:\n${note.content}\n\n`;
      text += `------------------------------------------\n\n`;
    });

    downloadTextFile(`So_tay_ghi_chep_Ngu_van_7_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}`, text);
    setDownloadedAll(true);
    setTimeout(() => setDownloadedAll(false), 2000);
  };

  const handlePrintAllNotes = () => {
    if (notes.length === 0) return;
    let text = `SỔ TAY GHI CHÉP NGỮ VĂN LỚP 7\nTổng số ghi chú: ${notes.length}\n\n`;
    notes.forEach((note, idx) => {
      text += `[${idx + 1}] ${note.title}\n(${note.createdAt})\n${note.content}\n\n`;
    });
    safePrintContent('Sổ Tay Ghi Chép Ngữ Văn 7', text, 'Góc học tập cá nhân');
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1">
          Góc học tập cá nhân hóa
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
          Sổ Tay Học Tập & Tác Phẩm Yêu Thích
        </h2>
        <p className="text-stone-600 text-sm max-w-3xl leading-relaxed">
          Nơi lưu giữ các bài học trọng tâm cần ôn lại, những câu văn tâm đắc và ghi chép cảm thụ văn học riêng của bạn.
        </p>
      </div>

      {/* Bookmarked Works Section */}
      <div className="space-y-4">
        <h3 className="font-serif-display text-xl font-bold text-stone-900 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-700 fill-current" />
          <span>Tác phẩm đã lưu ({bookmarkedWorks.length})</span>
        </h3>

        {bookmarkedWorks.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs sm:text-sm">
            Bạn chưa lưu tác phẩm nào. Hãy bấm biểu tượng bookmark trên thẻ tác phẩm để lưu lại vào đây.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedWorks.map((work) => (
              <div
                key={work.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span>{work.topicName}</span>
                    <button
                      onClick={() => onRemoveBookmark(work.id)}
                      className="text-stone-400 hover:text-rose-600 text-xs cursor-pointer"
                    >
                      Bỏ lưu
                    </button>
                  </div>
                  <h4 className="font-serif-display text-base font-bold text-stone-900 mb-1">
                    {work.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {work.summary}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex justify-end">
                  <button
                    onClick={() => onOpenWork(work)}
                    className="flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-950 cursor-pointer"
                  >
                    <span>Xem bài học</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Personal Notes Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif-display text-xl font-bold text-stone-900 flex items-center gap-2">
              <NotebookPen className="w-5 h-5 text-amber-700" />
              <span>Ghi chú bài học của bạn ({notes.length})</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">Tự động lưu và đồng bộ trên thiết bị của bạn</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {notes.length > 0 && (
              <>
                <button
                  onClick={handleDownloadAllNotes}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  title="Tải tất cả ghi chú về máy (.txt)"
                >
                  {downloadedAll ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Đã tải về</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-stone-600" />
                      <span>Tải tất cả (.txt)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePrintAllNotes}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  title="In toàn bộ sổ tay ghi chép"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-600" />
                  <span>In sổ tay</span>
                </button>
              </>
            )}

            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Viết ghi chú mới</span>
              </button>
            )}
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Đã lưu ghi chú thành công vào thiết bị của bạn!</span>
          </div>
        )}

        {/* Note Creator Form */}
        {isAdding && (
          <form
            onSubmit={handleCreate}
            className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4 animate-in fade-in duration-200"
          >
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Tiêu đề ghi chú
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Đoạn văn cảm thụ về hình tượng người lính"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Nội dung ghi chép
              </label>
              <textarea
                placeholder="Ghi lại các ý tưởng, kiến thức cần nhớ, đoạn văn tự viết..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 bg-stone-100 text-stone-600 hover:bg-stone-200 text-xs font-medium rounded-lg cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Lưu ghi chú
              </button>
            </div>
          </form>
        )}

        {/* Notes Grid */}
        {notes.length === 0 && !isAdding ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs sm:text-sm">
            Chưa có ghi chú nào. Hãy tạo ghi chú đầu tiên để lưu giữ suy nghĩ và cảm nhận văn học của bạn!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                    <span className="flex items-center gap-1 font-mono text-[11px] tabular-nums">
                      <Calendar className="w-3 h-3" />
                      <span>{note.createdAt}</span>
                    </span>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                      title="Xóa ghi chú"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-serif-display text-base font-bold text-stone-900 mb-2">
                    {note.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                    {note.content}
                  </p>
                </div>

                <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="text-[11px] text-stone-400">
                    {note.content.split(/\s+/).filter(Boolean).length} từ
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
                      }}
                      className="p-1.5 hover:bg-stone-100 rounded text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                      title="Sao chép nội dung"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        downloadTextFile(`Ghi_chu_${note.title.slice(0, 25).replace(/\s+/g, '_')}`, `TIÊU ĐỀ: ${note.title}\nNgày tạo: ${note.createdAt}\n\nNỘI DUNG:\n${note.content}`);
                      }}
                      className="p-1.5 hover:bg-stone-100 rounded text-stone-600 hover:text-amber-800 transition-colors cursor-pointer"
                      title="Tải ghi chú này (.txt)"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        safePrintContent(note.title, note.content, 'Sổ tay học tập Ngữ văn 7');
                      }}
                      className="p-1.5 hover:bg-stone-100 rounded text-stone-600 hover:text-amber-800 transition-colors cursor-pointer"
                      title="In ghi chú"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
