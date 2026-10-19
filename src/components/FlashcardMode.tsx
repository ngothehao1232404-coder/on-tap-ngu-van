import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  CheckCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Atom,
  Compass,
  Globe,
  Calculator,
  ShieldCheck,
  Layers,
  Lightbulb,
  AlertTriangle,
  Play,
  Pause,
  ArrowLeft,
  Filter,
  Check,
  Plus,
  Eye,
  CheckCircle2,
  X,
  Edit3,
  Trash2,
  Save,
  Copy
} from 'lucide-react';
import { INITIAL_FLASHCARDS, FLASHCARD_SUBJECTS, FLASHCARD_CATEGORIES } from '../data/flashcards';
import { FlashCardItem, FlashCardSubject, FlashCardCategory } from '../types/literature';

interface FlashcardModeProps {
  onBackToOverview?: () => void;
  initialSubject?: FlashCardSubject;
}

export const FlashcardMode: React.FC<FlashcardModeProps> = ({
  onBackToOverview,
  initialSubject,
}) => {
  // 1. Quản lý danh sách thẻ (đọc và lưu LocalStorage để đồng bộ dữ liệu)
  const [cards, setCards] = useState<FlashCardItem[]>(() => {
    try {
      const saved = localStorage.getItem('nv7_flashcards');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_FLASHCARDS;
  });

  // Tự động lưu vào LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('nv7_flashcards', JSON.stringify(cards));
    } catch (e) {
      console.error('Failed to save flashcards to LocalStorage', e);
    }
  }, [cards]);

  // 2. Bộ lọc môn học & loại thẻ (phù hợp nhiều môn học)
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlearned' | 'learned'>('all');

  // 3. Trạng thái thẻ đã thuộc
  const [rememberedIds, setRememberedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('nv7_flashcard_remembered');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nv7_flashcard_remembered', JSON.stringify(rememberedIds));
    } catch (e) {
      console.error(e);
    }
  }, [rememberedIds]);

  // 4. Lọc thẻ theo điều kiện
  const filteredCards = useMemo(() => {
    return cards.filter((c) => {
      if (selectedSubject !== 'all' && c.subject !== selectedSubject) return false;
      if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
      if (statusFilter === 'learned' && !rememberedIds[c.id]) return false;
      if (statusFilter === 'unlearned' && rememberedIds[c.id]) return false;
      return true;
    });
  }, [cards, selectedSubject, selectedCategory, statusFilter, rememberedIds]);

  // 5. Trạng thái vị trí thẻ & lật thẻ (Front/Back)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // 6. Chế độ Tự động chạy (Auto-play slideshow)
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // 7. Thông báo ngắn gọn
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ========================================================
  // CRUD STATE & MODAL CHO FLASHCARD
  // ========================================================
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  const [formSubject, setFormSubject] = useState<FlashCardSubject>('literature');
  const [formCategory, setFormCategory] = useState<FlashCardCategory>('definition');
  const [formTopic, setFormTopic] = useState<string>('Thực hành Tiếng Việt');
  const [formFront, setFormFront] = useState<string>('');
  const [formBack, setFormBack] = useState<string>('');
  const [formExample, setFormExample] = useState<string>('');
  const [formNotes, setFormNotes] = useState<string>('');
  const [formTags, setFormTags] = useState<string>('');

  // Mở modal tạo thẻ mới
  const handleOpenCreateModal = () => {
    setEditingCardId(null);
    setFormSubject('literature');
    setFormCategory('definition');
    setFormTopic('Chủ đề ôn tập');
    setFormFront('');
    setFormBack('');
    setFormExample('');
    setFormNotes('');
    setFormTags('');
    setIsModalOpen(true);
  };

  // Mở modal sửa thẻ hiện có
  const handleOpenEditModal = (card: FlashCardItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingCardId(card.id);
    setFormSubject(card.subject || 'literature');
    setFormCategory(card.category || 'definition');
    setFormTopic(card.topic || 'Chủ đề');
    setFormFront(card.front || '');
    setFormBack(card.back || '');
    setFormExample(card.example || '');
    setFormNotes(card.notes || '');
    setFormTags(card.tags?.join(', ') || '');
    setIsModalOpen(true);
  };

  // Lưu thẻ (Thêm mới hoặc Cập nhật)
  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formFront.trim() || !formBack.trim()) {
      alert('Vui lòng nhập cả Mặt trước (Khái niệm) và Mặt sau (Định nghĩa)!');
      return;
    }

    const subName = FLASHCARD_SUBJECTS.find(s => s.id === formSubject)?.name || 'Môn học';
    const tagsArr = formTags.split(',').map(t => t.trim()).filter(Boolean);
    if (tagsArr.length === 0) tagsArr.push(subName);

    if (editingCardId) {
      // Sửa thẻ
      setCards(prev => prev.map(c => {
        if (c.id === editingCardId) {
          return {
            ...c,
            subject: formSubject,
            subjectName: subName,
            category: formCategory,
            topic: formTopic.trim() || subName,
            front: formFront.trim(),
            back: formBack.trim(),
            example: formExample.trim() || undefined,
            notes: formNotes.trim() || undefined,
            tags: tagsArr
          };
        }
        return c;
      }));
      showToast('Đã cập nhật nội dung thẻ flashcard thành công!');
    } else {
      // Thêm thẻ mới
      const newCard: FlashCardItem = {
        id: `fc-custom-${Date.now()}`,
        subject: formSubject,
        subjectName: subName,
        category: formCategory,
        topic: formTopic.trim() || subName,
        front: formFront.trim(),
        back: formBack.trim(),
        example: formExample.trim() || undefined,
        notes: formNotes.trim() || undefined,
        tags: tagsArr,
        isCustom: true,
        createdAt: new Date().toLocaleDateString('vi-VN')
      };
      setCards(prev => [newCard, ...prev]);
      showToast('Đã thêm flashcard mới vào bộ nhớ thiết bị!');
    }

    setIsModalOpen(false);
  };

  // Xóa thẻ không phù hợp
  const handleDeleteCard = (cardId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (cards.length <= 1) {
      alert('Không thể xóa thẻ cuối cùng trong danh sách!');
      return;
    }

    if (confirm('Bạn có chắc chắn muốn xóa thẻ flashcard này?')) {
      setCards(prev => prev.filter(c => c.id !== cardId));
      setRememberedIds(prev => {
        const copy = { ...prev };
        delete copy[cardId];
        return copy;
      });
      if (currentIndex >= filteredCards.length - 1) {
        setCurrentIndex(Math.max(0, filteredCards.length - 2));
      }
      showToast('Đã xóa thẻ flashcard.');
    }
  };

  // Khôi phục bộ thẻ gốc
  const handleResetDefaultCards = () => {
    if (confirm('Khôi phục danh sách thẻ flashcard gốc chuẩn ban đầu?')) {
      setCards(INITIAL_FLASHCARDS);
      localStorage.setItem('nv7_flashcards', JSON.stringify(INITIAL_FLASHCARDS));
      setCurrentIndex(0);
      setIsFlipped(false);
      showToast('Đã khôi phục bộ flashcard gốc thành công!');
    }
  };

  // Mẫu điền nhanh cho học sinh
  const applyQuickTemplate = (tpl: 'definition' | 'comparison' | 'rule_note') => {
    if (tpl === 'definition') {
      setFormCategory('definition');
      setFormFront('Định nghĩa: [Nhập tên khái niệm / thuật ngữ]');
      setFormBack('Là [nêu bản chất ngắn gọn, đặc điểm nhận biết cốt lõi].');
      setFormExample('Ví dụ: [Đưa ra 1 ví dụ cụ thể, dễ nhớ trong bài học]');
      setFormNotes('Lưu ý: [Ghi nhớ điểm mấu chốt để không bị nhầm lẫn]');
    } else if (tpl === 'comparison') {
      setFormCategory('comparison');
      setFormFront('Phân biệt giữa [Khái niệm A] và [Khái niệm B]?');
      setFormBack('• [Khái niệm A]: [Đặc điểm 1, 2]\n• [Khái niệm B]: [Đặc điểm 1, 2 đối lập hoặc khác biệt]');
      setFormExample('Ví dụ A: [...]\nVí dụ B: [...]');
      setFormNotes('Dấu hiệu phân biệt nhanh: [Mẹo nhận biết khi làm bài kiểm tra]');
    } else if (tpl === 'rule_note') {
      setFormCategory('rule_note');
      setFormFront('Quy tắc / Công thức: [Tên quy tắc hoặc công thức cần nhớ]');
      setFormBack('• Quy tắc: [Trình bày từng bước thực hiện ngắn gọn]\n• Công thức: [Công thức chuẩn]');
      setFormExample('Áp dụng: [Bài toán / câu văn mẫu áp dụng]');
      setFormNotes('Lỗi thường gặp: [Những sai sót học sinh hay mắc phải]');
    }
  };

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedSubject, selectedCategory, statusFilter]);

  useEffect(() => {
    if (currentIndex >= filteredCards.length && filteredCards.length > 0) {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
  }, [filteredCards.length]);

  const currentCard: FlashCardItem | undefined = filteredCards[currentIndex];

  const handleNext = useCallback(() => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  }, [filteredCards.length]);

  const handlePrev = useCallback(() => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  }, [filteredCards.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    showToast('Đã xáo trộn thứ tự các thẻ flashcard!');
  };

  const toggleRemembered = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRememberedIds((prev) => {
      const updated = !prev[id];
      showToast(updated ? 'Đã đánh dấu thuộc thẻ này!' : 'Đã chuyển về danh sách cần ôn tập.');
      return {
        ...prev,
        [id]: updated,
      };
    });
  };

  // Phím tắt bàn phím
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCards.length, handleFlip, handleNext, handlePrev]);

  // Tự động phát
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying && filteredCards.length > 0) {
      timer = setInterval(() => {
        setIsFlipped((prev) => {
          if (!prev) return true;
          handleNext();
          return false;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, filteredCards.length, handleNext]);

  const learnedCount = filteredCards.filter((c) => rememberedIds[c.id]).length;
  const progressPercent = filteredCards.length > 0 ? Math.round((learnedCount / filteredCards.length) * 100) : 0;

  const getSubjectIcon = (sub?: FlashCardSubject) => {
    switch (sub) {
      case 'natural_sciences':
        return <Atom className="w-4 h-4 text-emerald-700" />;
      case 'history_geography':
        return <Compass className="w-4 h-4 text-sky-700" />;
      case 'english':
        return <Globe className="w-4 h-4 text-indigo-700" />;
      case 'math':
        return <Calculator className="w-4 h-4 text-rose-700" />;
      case 'civics':
        return <ShieldCheck className="w-4 h-4 text-amber-700" />;
      case 'literature':
      default:
        return <BookOpen className="w-4 h-4 text-amber-800" />;
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

      {/* MODAL CRUD: THÊM / SỬA THẺ FLASHCARD */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
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
                    {editingCardId ? 'Chỉnh Sửa Thẻ Flashcard' : 'Tạo Thẻ Flashcard Mới'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Thẻ 2 mặt súc tích, tự động lưu trữ trên LocalStorage của máy
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCard} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* Quick Template Selector */}
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-2">
                <div className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                  <span>Áp dụng mẫu nhanh (Khuyến nghị):</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => applyQuickTemplate('definition')}
                    className="px-2.5 py-1.5 bg-white hover:bg-amber-100 text-amber-950 font-semibold rounded-lg border border-amber-300 transition-colors cursor-pointer"
                  >
                    📖 Định nghĩa
                  </button>
                  <button
                    type="button"
                    onClick={() => applyQuickTemplate('comparison')}
                    className="px-2.5 py-1.5 bg-white hover:bg-amber-100 text-amber-950 font-semibold rounded-lg border border-amber-300 transition-colors cursor-pointer"
                  >
                    ⚖️ Phân biệt
                  </button>
                  <button
                    type="button"
                    onClick={() => applyQuickTemplate('rule_note')}
                    className="px-2.5 py-1.5 bg-white hover:bg-amber-100 text-amber-950 font-semibold rounded-lg border border-amber-300 transition-colors cursor-pointer"
                  >
                    ⚠️ Quy tắc / Lưu ý
                  </button>
                </div>
              </div>

              {/* Meta: Môn học, Loại thẻ & Chủ đề */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Môn học (*)</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value as FlashCardSubject)}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold text-stone-800"
                  >
                    {FLASHCARD_SUBJECTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Dạng thẻ (*)</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as FlashCardCategory)}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold text-amber-900"
                  >
                    {FLASHCARD_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Chủ đề bài học (*)</label>
                  <input
                    type="text"
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    placeholder="Ví dụ: Bầy chim chìa vôi..."
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {/* MẶT TRƯỚC */}
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  <span>Mặt trước: Khái niệm / Câu hỏi ngắn (*)</span>
                </label>
                <textarea
                  value={formFront}
                  onChange={(e) => setFormFront(e.target.value)}
                  placeholder="Ví dụ: Biện pháp tu từ Nói giảm nói tránh là gì?"
                  rows={3}
                  className="w-full p-3 bg-white border border-stone-300 rounded-xl font-serif text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                  required
                />
              </div>

              {/* MẶT SAU */}
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Mặt sau: Định nghĩa cốt lõi / Lời giải (*)</span>
                </label>
                <textarea
                  value={formBack}
                  onChange={(e) => setFormBack(e.target.value)}
                  placeholder="Ghi rõ định nghĩa, bản chất hoặc câu trả lời cốt lõi..."
                  rows={4}
                  className="w-full p-3 bg-white border border-stone-300 rounded-xl text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                  required
                />
              </div>

              {/* TÙY CHỌN: VÍ DỤ & QUY TẮC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="font-bold text-stone-700 flex items-center gap-1 mb-1">
                    <Lightbulb className="w-3 h-3 text-amber-600" />
                    <span>Ví dụ minh họa (tùy chọn)</span>
                  </label>
                  <textarea
                    value={formExample}
                    onChange={(e) => setFormExample(e.target.value)}
                    placeholder="Ví dụ trích từ bài học..."
                    rows={2}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3 h-3 text-rose-600" />
                    <span>Quy tắc / Lưu ý cần nhớ</span>
                  </label>
                  <textarea
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Mẹo nhớ, lỗi học sinh hay sai..."
                    rows={2}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Thẻ phân loại (ngăn cách bằng dấu phẩy)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="Ví dụ: Tu từ, Ôn thi, Ngữ văn 7"
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingCardId ? 'Cập nhật thẻ' : 'Lưu thẻ vào máy'}</span>
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
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Flashcard Mode · Ôn Tập Ghi Nhớ Đa Môn Học (Có CRUD)</span>
            </div>
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
              Lật Thẻ Ôn Tập & Ghi Nhớ Nhanh
            </h2>
            <p className="text-stone-500 text-xs mt-0.5">
              Thiết kế thẻ 2 mặt rõ ràng. Có thể thêm thẻ mới, sửa nội dung hoặc xóa thẻ không phù hợp bất cứ lúc nào.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Nút THÊM THẺ MỚI (CREATE) */}
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
              title="Tạo flashcard mới (lưu vào LocalStorage)"
            >
              <Plus className="w-3.5 h-3.5 text-amber-200" />
              <span>Thêm thẻ mới</span>
            </button>

            {/* Auto Play button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer border ${
                isAutoPlaying
                  ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
              }`}
              title="Tự động lật và chuyển thẻ sau mỗi vài giây"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Dừng tự động</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden sm:inline">Tự động phát</span>
                </>
              )}
            </button>

            {/* Shuffle button */}
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              title="Xáo trộn ngẫu nhiên thứ tự thẻ"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Trộn thẻ</span>
            </button>

            <button
              onClick={handleResetDefaultCards}
              className="text-[11px] text-stone-400 hover:text-stone-700 underline cursor-pointer px-1"
              title="Khôi phục lại bộ thẻ gốc"
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

        {/* BỘ LỌC ĐA MÔN HỌC */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-stone-400 font-semibold shrink-0">Môn học:</span>
            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer font-medium ${
                selectedSubject === 'all'
                  ? 'bg-stone-900 text-white font-bold shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              Tất cả môn ({cards.length})
            </button>

            {FLASHCARD_SUBJECTS.map((sub) => {
              const count = cards.filter((c) => c.subject === sub.id).length;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer font-medium ${
                    selectedSubject === sub.id
                      ? 'bg-amber-800 text-white font-bold shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {getSubjectIcon(sub.id)}
                  <span>{sub.name}</span>
                  <span className="font-mono text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
            <span className="text-stone-400 font-semibold shrink-0">Dạng thẻ:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[11px] ${
                selectedCategory === 'all'
                  ? 'bg-amber-900 text-white font-bold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              Tất cả
            </button>

            {FLASHCARD_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[11px] font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-amber-900 text-white font-bold'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
                title={cat.description}
              >
                {cat.name}
              </button>
            ))}

            <span className="text-stone-300 mx-1">|</span>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="p-1 px-2 bg-stone-50 border border-stone-200 rounded-lg text-[11px] text-stone-700 focus:outline-none font-medium"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="unlearned">Cần ôn (chưa thuộc)</option>
              <option value="learned">Đã thuộc</option>
            </select>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-2 font-medium">
              <span>Tiến độ ghi nhớ:</span>
              <strong className="font-mono text-emerald-800 font-bold">{learnedCount} / {filteredCards.length} thẻ đã thuộc</strong>
              <span className="text-stone-300">·</span>
              <span className="text-stone-500">Đạt {progressPercent}%</span>
            </div>
            <span className="font-mono text-stone-500 font-semibold">
              Thẻ {filteredCards.length > 0 ? currentIndex + 1 : 0} / {filteredCards.length}
            </span>
          </div>

          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stepper dots */}
        {filteredCards.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
            {filteredCards.map((c, idx) => {
              const isCurrent = idx === currentIndex;
              const isLearned = rememberedIds[c.id];

              let dotStyle = 'bg-stone-100 text-stone-600 hover:bg-stone-200 border-stone-200';
              if (isCurrent) {
                dotStyle = 'ring-2 ring-amber-800 bg-amber-900 text-white font-bold';
              } else if (isLearned) {
                dotStyle = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-medium';
              }

              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsFlipped(false);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-mono shrink-0 transition-all border flex items-center justify-center cursor-pointer ${dotStyle}`}
                  title={`Thẻ ${idx + 1}: ${c.front}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================
          THẺ FLASHCARD CHÍNH: LẬT THẺ, HIỂN THỊ RÕ MẶT TRƯỚC VÀ SAU
          CÓ NÚT SỬA & XÓA TRỰC TIẾP
         ======================================================== */}
      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-stone-500 space-y-4 shadow-2xs">
          <p className="text-sm">Không tìm thấy thẻ flashcard nào phù hợp với bộ lọc đã chọn.</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                setSelectedSubject('all');
                setSelectedCategory('all');
                setStatusFilter('all');
              }}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Hiển thị tất cả các thẻ
            </button>
            <button
              onClick={handleOpenCreateModal}
              className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Thêm thẻ mới
            </button>
          </div>
        </div>
      ) : currentCard && (
        <div className="space-y-4">
          {/* Card Frame */}
          <div
            onClick={handleFlip}
            className={`w-full min-h-[360px] sm:min-h-[400px] bg-white rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between p-6 sm:p-9 relative select-none shadow-md hover:shadow-lg ${
              isFlipped
                ? 'border-emerald-400 bg-emerald-50/15 ring-2 ring-emerald-100'
                : 'border-amber-300/90 hover:border-amber-500 bg-amber-50/10'
            }`}
          >
            {/* Top Indicator: MẶT TRƯỚC hoặc MẶT SAU rõ ràng + Nút CRUD SỬA/XÓA */}
            <div className="flex items-center justify-between text-xs pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 font-semibold text-stone-700">
                  {getSubjectIcon(currentCard.subject)}
                  <span>{currentCard.subjectName || 'Môn học'}</span>
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-stone-500 font-medium">
                  {currentCard.topic}
                </span>
              </div>

              {/* Status Badge + SỬA / XÓA THẺ */}
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                    isFlipped
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  <RotateCw className={`w-3 h-3 ${isFlipped ? 'rotate-180 text-emerald-700' : 'text-amber-700'}`} />
                  <span>{isFlipped ? 'MẶT SAU: ĐỊNH NGHĨA' : 'MẶT TRƯỚC: KHÁI NIỆM'}</span>
                </span>

                {/* Nút Sửa (Update) */}
                <button
                  onClick={(e) => handleOpenEditModal(currentCard, e)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                  title="Sửa nội dung thẻ này"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-800" />
                </button>

                {/* Nút Xóa (Delete) */}
                <button
                  onClick={(e) => handleDeleteCard(currentCard.id, e)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-rose-100 text-stone-500 hover:text-rose-700 transition-colors cursor-pointer"
                  title="Xóa thẻ này"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Nội dung trung tâm của thẻ */}
            <div className="my-auto py-6">
              {!isFlipped ? (
                /* ================= MẶT TRƯỚC ================= */
                <div className="space-y-4 max-w-2xl mx-auto text-center">
                  <div className="inline-block px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-semibold border border-amber-200">
                    {FLASHCARD_CATEGORIES.find((c) => c.id === currentCard.category)?.name || 'Khái niệm & Thuật ngữ'}
                  </div>

                  <h3 className="font-serif-display text-xl sm:text-3xl font-bold text-stone-900 leading-snug">
                    {currentCard.front}
                  </h3>

                  <p className="text-xs text-stone-600 pt-3 flex items-center justify-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-stone-600" />
                    <span>Nhấp vào thẻ hoặc bấm phím <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded font-mono text-[10px] text-stone-800 font-bold">Space</kbd> để lật xem lời giải</span>
                  </p>
                </div>
              ) : (
                /* ================= MẶT SAU ================= */
                <div className="space-y-4 animate-in fade-in duration-200 text-left max-w-2xl mx-auto">
                  <div className="p-4 sm:p-5 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-2">
                    <div className="text-[11px] uppercase font-bold text-emerald-950 flex items-center gap-1.5 tracking-wide">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Định nghĩa & Bản chất cốt lõi:</span>
                    </div>
                    <div className="font-serif text-sm sm:text-base text-stone-900 leading-relaxed whitespace-pre-line font-medium">
                      {currentCard.back}
                    </div>
                  </div>

                  {currentCard.example && (
                    <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-stone-800 space-y-1">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                        <span>Ví dụ minh họa:</span>
                      </div>
                      <p className="italic text-stone-700 pl-5 leading-relaxed">{currentCard.example}</p>
                    </div>
                  )}

                  {currentCard.notes && (
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                      <div className="font-bold text-rose-800 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Quy tắc / Lưu ý cần nhớ:</span>
                      </div>
                      <p className="pl-5 leading-relaxed">{currentCard.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Card Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
              <div className="flex items-center gap-1 text-stone-400">
                {currentCard.tags.map((t, idx) => (
                  <span key={idx} className="font-mono text-[11px]">
                    #{t}{idx < currentCard.tags.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleRemembered(currentCard.id, e)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs ${
                    rememberedIds[currentCard.id]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{rememberedIds[currentCard.id] ? 'Đã thuộc thẻ này' : 'Đánh dấu đã thuộc'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Thanh điều hướng */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrev}
              className="p-3 px-4 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold active:scale-95"
              title="Thẻ trước (←)"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Thẻ trước</span>
            </button>

            <button
              onClick={handleFlip}
              className="px-7 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95"
              title="Lật thẻ (Space)"
            >
              <RotateCw className="w-4 h-4 text-amber-300" />
              <span>{isFlipped ? 'Xem Mặt trước' : 'Lật xem Mặt sau'}</span>
            </button>

            <button
              onClick={handleNext}
              className="p-3 px-4 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold active:scale-95"
              title="Thẻ sau (→)"
            >
              <span>Thẻ sau</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center text-[11px] text-stone-400">
            Phím tắt: Bấm <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded font-mono text-[10px]">←</kbd> để lùi thẻ, <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded font-mono text-[10px]">→</kbd> để tiến thẻ, và <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded font-mono text-[10px]">Space</kbd> để lật mặt thẻ.
          </div>
        </div>
      )}
    </div>
  );
};
