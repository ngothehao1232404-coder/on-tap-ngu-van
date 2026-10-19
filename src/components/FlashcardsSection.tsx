import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  CheckCircle, 
  HelpCircle, 
  Download, 
  Printer, 
  Check, 
  Plus, 
  Filter, 
  Trash2, 
  Edit3, 
  BookOpen, 
  Atom, 
  Compass, 
  Globe, 
  Calculator, 
  ShieldCheck, 
  Layers, 
  Lightbulb, 
  AlertTriangle, 
  Sparkles, 
  Save, 
  X, 
  List, 
  Eye, 
  CheckCircle2, 
  Bookmark,
  Share2,
  Copy
} from 'lucide-react';
import { INITIAL_FLASHCARDS, FLASHCARD_SUBJECTS, FLASHCARD_CATEGORIES } from '../data/flashcards';
import { FlashCardItem, FlashCardSubject, FlashCardCategory } from '../types/literature';
import { downloadTextFile, safePrintContent } from '../utils/fileSaver';

export const FlashcardsSection: React.FC = () => {
  // 1. Flashcards State (Local Storage persistent)
  const [cards, setCards] = useState<FlashCardItem[]>(() => {
    try {
      const saved = localStorage.getItem('nv7_flashcards');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return INITIAL_FLASHCARDS;
    } catch {
      return INITIAL_FLASHCARDS;
    }
  });

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('nv7_flashcards', JSON.stringify(cards));
    } catch (e) {
      console.error('Failed to save flashcards to LocalStorage', e);
    }
  }, [cards]);

  // 2. View Mode: 'player' (Lật thẻ ôn nhanh) or 'manager' (Danh sách tất cả thẻ)
  const [viewMode, setViewMode] = useState<'player' | 'manager'>('player');

  // 3. Filters
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlearned' | 'learned'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 4. Player State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [rememberedIds, setRememberedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('nv7_flashcard_remembered');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save remembered state
  useEffect(() => {
    try {
      localStorage.setItem('nv7_flashcard_remembered', JSON.stringify(rememberedIds));
    } catch (e) {
      console.error(e);
    }
  }, [rememberedIds]);

  // 5. Creator Form States
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [formSubject, setFormSubject] = useState<FlashCardSubject>('literature');
  const [formCategory, setFormCategory] = useState<FlashCardCategory>('definition');
  const [formTopic, setFormTopic] = useState<string>('Thực hành Tiếng Việt');
  const [formFront, setFormFront] = useState<string>('');
  const [formBack, setFormBack] = useState<string>('');
  const [formExample, setFormExample] = useState<string>('');
  const [formNotes, setFormNotes] = useState<string>('');
  const [formTags, setFormTags] = useState<string>('');

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);
  const [downloadedFeedback, setDownloadedFeedback] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered Cards
  const filteredCards = useMemo(() => {
    return cards.filter((c) => {
      // Subject filter
      if (selectedSubject !== 'all' && c.subject !== selectedSubject) return false;

      // Category filter
      if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;

      // Learned status filter
      if (statusFilter === 'learned' && !rememberedIds[c.id]) return false;
      if (statusFilter === 'unlearned' && rememberedIds[c.id]) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchFront = c.front.toLowerCase().includes(q);
        const matchBack = c.back.toLowerCase().includes(q);
        const matchTopic = c.topic.toLowerCase().includes(q);
        const matchTags = c.tags.some(t => t.toLowerCase().includes(q));
        if (!matchFront && !matchBack && !matchTopic && !matchTags) return false;
      }

      return true;
    });
  }, [cards, selectedSubject, selectedCategory, statusFilter, searchQuery, rememberedIds]);

  // Ensure current index is valid
  useEffect(() => {
    if (currentIndex >= filteredCards.length) {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
  }, [filteredCards.length]);

  const currentCard: FlashCardItem | undefined = filteredCards[currentIndex];

  // Navigation handlers
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

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setNotification('Đã xáo trộn thứ tự thẻ ôn tập ngẫu nhiên!');
    setTimeout(() => setNotification(null), 2500);
  };

  const toggleRemembered = (id: string) => {
    setRememberedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Keyboard navigation shortcuts (Left Arrow, Right Arrow, Space to flip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (viewMode === 'player' && filteredCards.length > 0) {
        if (e.code === 'Space') {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        } else if (e.code === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        } else if (e.code === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, filteredCards.length, handleNext, handlePrev]);

  // Quick Template Applicator
  const applyQuickTemplate = (templateType: 'definition' | 'comparison' | 'rule_note') => {
    if (templateType === 'definition') {
      setFormCategory('definition');
      setFormFront('Định nghĩa: [Nhập tên khái niệm / thuật ngữ]');
      setFormBack('Là [nêu bản chất ngắn gọn, đặc điểm nhận biết cốt lõi].');
      setFormExample('Ví dụ: [Đưa ra 1 ví dụ cụ thể, dễ nhớ trong bài học]');
      setFormNotes('Lưu ý: [Ghi nhớ điểm mấu chốt để không bị nhầm lẫn]');
    } else if (templateType === 'comparison') {
      setFormCategory('comparison');
      setFormFront('Phân biệt giữa [Khái niệm A] và [Khái niệm B]?');
      setFormBack('• [Khái niệm A]: [Đặc điểm 1, 2]\n• [Khái niệm B]: [Đặc điểm 1, 2 đối lập hoặc khác biệt]');
      setFormExample('Ví dụ A: [...]\nVí dụ B: [...]');
      setFormNotes('Dấu hiệu phân biệt nhanh: [Mẹo nhận biết khi làm bài kiểm tra]');
    } else if (templateType === 'rule_note') {
      setFormCategory('rule_note');
      setFormFront('Quy tắc / Công thức: [Tên quy tắc hoặc công thức cần nhớ]');
      setFormBack('• Quy tắc: [Trình bày từng bước thực hiện ngắn gọn]\n• Công thức: [Công thức chuẩn]');
      setFormExample('Áp dụng: [Bài toán / câu văn mẫu áp dụng]');
      setFormNotes('Lỗi thường gặp: [Những sai sót học sinh hay mắc phải]');
    }
  };

  // Open creation modal
  const handleOpenCreateModal = () => {
    setEditingCardId(null);
    setFormFront('');
    setFormBack('');
    setFormExample('');
    setFormNotes('');
    setFormTags('');
    setFormTopic('Chủ đề ôn tập');
    setIsCreating(true);
  };

  // Edit existing card
  const handleEditCard = (card: FlashCardItem) => {
    setEditingCardId(card.id);
    setFormSubject(card.subject || 'literature');
    setFormCategory(card.category || 'concept');
    setFormTopic(card.topic);
    setFormFront(card.front);
    setFormBack(card.back);
    setFormExample(card.example || '');
    setFormNotes(card.notes || '');
    setFormTags(card.tags.join(', '));
    setIsCreating(true);
  };

  // Save / Submit card form
  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFront.trim() || !formBack.trim()) {
      alert('Vui lòng nhập đầy đủ cả Mặt trước và Mặt sau của thẻ!');
      return;
    }

    const subjectObj = FLASHCARD_SUBJECTS.find(s => s.id === formSubject);
    const subjectName = subjectObj ? subjectObj.name : 'Môn học';

    const tagsArray = formTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (tagsArray.length === 0) {
      tagsArray.push(subjectName);
    }

    if (editingCardId) {
      // Update existing
      setCards(prev => prev.map(c => c.id === editingCardId ? {
        ...c,
        subject: formSubject,
        subjectName,
        category: formCategory,
        topic: formTopic.trim() || subjectName,
        front: formFront.trim(),
        back: formBack.trim(),
        example: formExample.trim() || undefined,
        notes: formNotes.trim() || undefined,
        tags: tagsArray
      } : c));
      setNotification('Đã cập nhật nội dung flashcard thành công!');
    } else {
      // Create new
      const newCard: FlashCardItem = {
        id: `fc-custom-${Date.now()}`,
        subject: formSubject,
        subjectName,
        category: formCategory,
        topic: formTopic.trim() || subjectName,
        front: formFront.trim(),
        back: formBack.trim(),
        example: formExample.trim() || undefined,
        notes: formNotes.trim() || undefined,
        tags: tagsArray,
        isCustom: true,
        createdAt: new Date().toLocaleDateString('vi-VN')
      };
      setCards(prev => [newCard, ...prev]);
      setNotification('Đã tạo và lưu flashcard mới vào thiết bị thành công!');
    }

    setIsCreating(false);
    setTimeout(() => setNotification(null), 3000);
  };

  // Delete card
  const handleDeleteCard = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa thẻ flashcard này?')) {
      setCards(prev => prev.filter(c => c.id !== id));
      setNotification('Đã xóa thẻ flashcard.');
      setTimeout(() => setNotification(null), 2500);
    }
  };

  // Reset to original cards
  const handleResetDefault = () => {
    if (confirm('Khôi phục danh sách flashcard gốc chuẩn cho các môn học?')) {
      setCards(INITIAL_FLASHCARDS);
      localStorage.setItem('nv7_flashcards', JSON.stringify(INITIAL_FLASHCARDS));
      setNotification('Đã khôi phục bộ flashcard gốc thành công!');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Copy card content
  const handleCopyCard = (card: FlashCardItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let text = `[THẺ FLASHCARD: ${card.topic} - ${card.subjectName || 'Môn học'}]\n`;
    text += `MẶT TRƯỚC (HỎI/KHÁI NIỆM):\n${card.front}\n\n`;
    text += `MẶT SAU (ĐÁP/ĐỊNH NGHĨA):\n${card.back}\n`;
    if (card.example) text += `\nVÍ DỤ MINH HỌA:\n${card.example}\n`;
    if (card.notes) text += `\nQUY TẮC & LƯU Ý:\n${card.notes}\n`;

    navigator.clipboard.writeText(text);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Download all cards as .txt
  const handleDownloadAllCards = () => {
    let doc = `BỘ THẺ GHI NHỚ NHANH (FLASHCARDS ÔN TẬP ĐA MÔN HỌC)\n`;
    doc += `Tổng số thẻ: ${filteredCards.length} thẻ\n`;
    doc += `Môn học lọc: ${selectedSubject === 'all' ? 'Tất cả môn' : selectedSubject}\n`;
    doc += `Ngày tải về: ${new Date().toLocaleDateString('vi-VN')}\n`;
    doc += `=========================================================\n\n`;

    filteredCards.forEach((c, idx) => {
      const categoryName = FLASHCARD_CATEGORIES.find(cat => cat.id === c.category)?.name || 'Ghi nhớ';
      doc += `[Thẻ ${idx + 1}] Môn: ${c.subjectName || 'Chung'} · Phân loại: ${categoryName} · Chủ đề: ${c.topic}\n`;
      doc += `MẶT TRƯỚC (HỎI / KHÁI NIỆM):\n${c.front}\n\n`;
      doc += `MẶT SAU (ĐÁP / ĐỊNH NGHĨA):\n${c.back}\n`;
      if (c.example) doc += `* Ví dụ minh họa: ${c.example}\n`;
      if (c.notes) doc += `* Quy tắc / Lưu ý: ${c.notes}\n`;
      doc += `\n---------------------------------------------------------\n\n`;
    });

    downloadTextFile(`The_ghi_nho_Flashcards_${selectedSubject}`, doc);
    setDownloadedFeedback(true);
    setTimeout(() => setDownloadedFeedback(false), 2000);
  };

  // Print all cards
  const handlePrintAllCards = () => {
    let doc = `TỔNG HỢP KIẾN THỨC TRỌNG TÂM - BỘ THẺ GHI NHỚ NHANH\n\n`;
    filteredCards.forEach((c, idx) => {
      doc += `[${idx + 1}] (${c.subjectName || 'Môn học'} - ${c.topic})\n`;
      doc += `• Khái niệm: ${c.front}\n`;
      doc += `• Định nghĩa / Giải thích: ${c.back}\n`;
      if (c.example) doc += `• Ví dụ: ${c.example}\n`;
      if (c.notes) doc += `• Lưu ý: ${c.notes}\n`;
      doc += `\n`;
    });
    safePrintContent('Thẻ Ghi Nhớ Nhanh Flashcards', doc, 'Cẩm nang ôn tập kiến thức cốt lõi');
  };

  // Calculate statistics
  const learnedCount = Object.keys(rememberedIds).filter(id => rememberedIds[id] && cards.some(c => c.id === id)).length;
  const filteredLearnedCount = filteredCards.filter(c => rememberedIds[c.id]).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{notification}</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-mono">Đã đồng bộ LocalStorage</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Phương pháp Lặp lại ngắt quãng (Spaced Repetition)</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              Thẻ Ghi Nhớ Nhanh & Trình Tạo Flashcard Đa Môn Học
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Tạo và ôn tập thẻ 2 mặt ngắn gọn: ưu tiên <strong>Khái niệm</strong>, <strong>Định nghĩa</strong>, <strong>Ví dụ</strong>, <strong>Phân biệt</strong> và <strong>Quy tắc / Lưu ý</strong> cho Ngữ văn, KHTN, Lịch sử, Địa lý, Tiếng Anh, Toán và GDCD.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
              title="Tạo flashcard mới (lưu vào LocalStorage)"
            >
              <Plus className="w-4 h-4 text-amber-200" />
              <span>Tạo Flashcard mới</span>
            </button>

            <button
              onClick={handleDownloadAllCards}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-stone-200"
              title="Tải trọn bộ flashcards (.txt)"
            >
              {downloadedFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã tải về</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline">Tải về (.txt)</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrintAllCards}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-stone-200"
              title="In phiếu thẻ ghi nhớ"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>In</span>
            </button>
          </div>
        </div>

        {/* View Mode Switcher & Stats Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setViewMode('player')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
                viewMode === 'player'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 text-amber-700" />
              <span>Flashcard Mode (Lật thẻ)</span>
            </button>
            <button
              onClick={() => setViewMode('manager')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
                viewMode === 'manager'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <List className="w-3.5 h-3.5 text-amber-700" />
              <span>Quản lý danh sách ({cards.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-stone-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Đã thuộc: <strong className="font-mono text-emerald-800">{learnedCount}/{cards.length}</strong> thẻ</span>
            </div>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1 text-stone-600 hover:text-amber-800 font-semibold cursor-pointer"
              title="Xáo trộn ngẫu nhiên thứ tự thẻ"
            >
              <Shuffle className="w-3 h-3" />
              <span>Trộn thẻ</span>
            </button>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <button
              onClick={handleResetDefault}
              className="text-[11px] text-stone-400 hover:text-stone-700 underline cursor-pointer"
              title="Khôi phục danh sách flashcard gốc"
            >
              Đặt lại gốc
            </button>
          </div>
        </div>

        {/* Filters: Môn học (Subject) & Loại kiến thức (Category) */}
        <div className="pt-2 space-y-3">
          {/* 1. Môn học (Subject selector with pill buttons) */}
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
              const count = cards.filter(c => c.subject === sub.id).length;
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
                  <span>{sub.name}</span>
                  <span className="font-mono text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* 2. Loại kiến thức (Category selector) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-stone-400 font-semibold shrink-0">Phân loại:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[11px] ${
                selectedCategory === 'all'
                  ? 'bg-amber-900 text-white font-bold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              Tất cả loại
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

            {/* Trạng thái học */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="p-1 px-2 bg-stone-50 border border-stone-200 rounded-lg text-[11px] text-stone-700 focus:outline-none font-medium"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="unlearned">Chưa thuộc (cần ôn)</option>
              <option value="learned">Đã thuộc</option>
            </select>
          </div>
        </div>
      </div>

      {/* MODAL: TẠO HOẶC CHỈNH SỬA FLASHCARD CƠ BẢN */}
      {isCreating && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-stone-900">
                    {editingCardId ? 'Chỉnh Sửa Flashcard' : 'Tạo Flashcard Cơ Bản Mới'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Thẻ 2 mặt ngắn gọn, súc tích, lưu trữ an toàn trong LocalStorage
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreating(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSaveCard} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* Quick Template Selector */}
              <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-2">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                  <span>Áp dụng mẫu tạo nhanh (khuyến nghị cho học sinh):</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => applyQuickTemplate('definition')}
                    className="px-2.5 py-1.5 bg-white hover:bg-amber-100 text-amber-950 font-semibold rounded-lg border border-amber-300 transition-colors cursor-pointer shadow-2xs"
                  >
                    📖 Mẫu: Khái niệm & Định nghĩa
                  </button>
                  <button
                    type="button"
                    onClick={() => applyQuickTemplate('comparison')}
                    className="px-2.5 py-1.5 bg-white hover:bg-amber-100 text-amber-950 font-semibold rounded-lg border border-amber-300 transition-colors cursor-pointer shadow-2xs"
                  >
                    ⚖️ Mẫu: Phân biệt 2 khái niệm
                  </button>
                  <button
                    type="button"
                    onClick={() => applyQuickTemplate('rule_note')}
                    className="px-2.5 py-1.5 bg-white hover:bg-amber-100 text-amber-950 font-semibold rounded-lg border border-amber-300 transition-colors cursor-pointer shadow-2xs"
                  >
                    ⚠️ Mẫu: Quy tắc / Lưu ý
                  </button>
                </div>
              </div>

              {/* Meta: Môn học, Loại thẻ & Chủ đề */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Môn học</label>
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
                  <label className="block text-stone-700 font-bold mb-1">Loại thẻ</label>
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
                  <label className="block text-stone-700 font-bold mb-1">Chủ đề / Bài học</label>
                  <input
                    type="text"
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    placeholder="Ví dụ: Bầy chim chìa vôi, Nguyên tử..."
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {/* MẶT TRƯỚC (Front) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-600" />
                    <span>Mặt trước: Khái niệm / Thuật ngữ / Câu hỏi ngắn (*)</span>
                  </label>
                  <span className="text-[11px] text-stone-400">Trình bày ngắn gọn, dễ nhớ</span>
                </div>
                <textarea
                  value={formFront}
                  onChange={(e) => setFormFront(e.target.value)}
                  placeholder="Ví dụ: Thế nào là biện pháp tu từ Nói giảm nói tránh? Hoặc: Số hữu tỉ là gì?"
                  rows={3}
                  className="w-full p-3 bg-white border border-stone-300 rounded-xl font-serif text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                  required
                />
              </div>

              {/* MẶT SAU (Back) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>Mặt sau: Định nghĩa cốt lõi / Lời giải thích súc tích (*)</span>
                  </label>
                  <span className="text-[11px] text-stone-400">Dễ hiểu, trọng tâm</span>
                </div>
                <textarea
                  value={formBack}
                  onChange={(e) => setFormBack(e.target.value)}
                  placeholder="Ghi rõ định nghĩa, bản chất hoặc câu trả lời cốt lõi của khái niệm..."
                  rows={4}
                  className="w-full p-3 bg-white border border-stone-300 rounded-xl text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                  required
                />
              </div>

              {/* TÙY CHỌN BỔ TRỢ: VÍ DỤ & QUY TẮC/LƯU Ý */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-600" />
                    <span>Ví dụ minh họa cụ thể (Khuyến nghị)</span>
                  </label>
                  <textarea
                    value={formExample}
                    onChange={(e) => setFormExample(e.target.value)}
                    placeholder="Ví dụ cụ thể trích dẫn từ bài học hoặc đời sống..."
                    rows={2}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-rose-600" />
                    <span>Quy tắc / Lưu ý cần nhớ (Tránh nhầm lẫn)</span>
                  </label>
                  <textarea
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Những lỗi học sinh hay sai, quy tắc ghi nhớ nhanh..."
                    rows={2}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Thẻ phân loại (ngăn cách bằng dấu phẩy)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="Ví dụ: Tu từ, Tiếng Việt 7, Thi giữa kì"
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none"
                />
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingCardId ? 'Cập nhật thẻ' : 'Lưu Flashcard vào máy'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          CHẾ ĐỘ 1: LẬT THẺ ÔN NHANH (FLASHCARD PLAYER)
         ======================================================== */}
      {viewMode === 'player' && (
        <div className="space-y-6">
          {filteredCards.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-stone-500 space-y-4 shadow-2xs">
              <p className="text-sm">Không tìm thấy thẻ ghi nhớ nào phù hợp với bộ lọc đã chọn.</p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => {
                    setSelectedSubject('all');
                    setSelectedCategory('all');
                    setStatusFilter('all');
                  }}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Xem tất cả các thẻ
                </button>
                <button
                  onClick={handleOpenCreateModal}
                  className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Tạo thẻ mới cho môn học này
                </button>
              </div>
            </div>
          ) : currentCard && (
            <div className="space-y-4">
              {/* Card Meta Indicator */}
              <div className="flex items-center justify-between text-xs text-stone-500 px-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900">
                    Thẻ <span className="font-mono text-amber-800 text-sm">{currentIndex + 1}</span> / {filteredCards.length}
                  </span>
                  <span className="text-stone-300">·</span>
                  <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-medium">
                    {currentCard.subjectName || 'Môn học'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium">
                    {FLASHCARD_CATEGORIES.find(c => c.id === currentCard.category)?.name || 'Khái niệm'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCard(currentCard)}
                    className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    title="Sao chép nội dung thẻ"
                  >
                    {copiedId === currentCard.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleEditCard(currentCard)}
                    className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    title="Chỉnh sửa thẻ này"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteCard(currentCard.id)}
                    className="p-1.5 hover:bg-rose-50 rounded-lg text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Xóa thẻ này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Main Interactive Flashcard Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`w-full min-h-[340px] sm:min-h-[380px] bg-white rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between p-7 sm:p-10 relative select-none shadow-md hover:shadow-lg ${
                  isFlipped 
                    ? 'border-emerald-300 ring-2 ring-emerald-100' 
                    : 'border-amber-200/80 hover:border-amber-400'
                }`}
              >
                {/* Card Top Category Label */}
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-bold text-amber-800 tracking-wide uppercase">
                    {currentCard.topic}
                  </span>

                  <span className="flex items-center gap-1.5 text-stone-400 font-medium">
                    <RotateCw className={`w-3.5 h-3.5 transition-transform duration-300 ${isFlipped ? 'rotate-180 text-emerald-600' : ''}`} />
                    <span>{isFlipped ? 'Mặt sau (Định nghĩa & Lời giải)' : 'Mặt trước (Khái niệm & Câu hỏi)'}</span>
                  </span>
                </div>

                {/* Card Main Body Content */}
                <div className="my-auto py-4 text-center">
                  {!isFlipped ? (
                    // MẶT TRƯỚC (Front)
                    <div className="space-y-4 max-w-2xl mx-auto">
                      <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200/60">
                        {FLASHCARD_CATEGORIES.find(c => c.id === currentCard.category)?.name || 'Khái niệm'}
                      </div>

                      <h3 className="font-serif-display text-xl sm:text-3xl font-bold text-stone-900 leading-snug">
                        {currentCard.front}
                      </h3>

                      <p className="text-xs text-stone-400 pt-2 flex items-center justify-center gap-1.5">
                        <RotateCw className="w-3 h-3 text-stone-400 animate-spin" style={{ animationDuration: '4s' }} />
                        <span>Nhấp vào thẻ hoặc bấm phím <strong>Space</strong> để lật mặt sau xem lời giải</span>
                      </p>
                    </div>
                  ) : (
                    // MẶT SAU (Back)
                    <div className="space-y-4 animate-in fade-in duration-200 text-left max-w-2xl mx-auto">
                      <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/70 space-y-2">
                        <div className="text-[11px] uppercase font-bold text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Định nghĩa / Lời giải thích cốt lõi:</span>
                        </div>
                        <div className="font-serif text-sm sm:text-base text-stone-900 leading-relaxed whitespace-pre-line font-medium">
                          {currentCard.back}
                        </div>
                      </div>

                      {/* Optional Example Box */}
                      {currentCard.example && (
                        <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs text-stone-800 space-y-1">
                          <div className="font-bold text-amber-900 flex items-center gap-1">
                            <Lightbulb className="w-3 h-3 text-amber-700" />
                            <span>Ví dụ minh họa:</span>
                          </div>
                          <p className="italic text-stone-700 pl-4">{currentCard.example}</p>
                        </div>
                      )}

                      {/* Optional Rules / Notes Box */}
                      {currentCard.notes && (
                        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                          <div className="font-bold text-rose-800 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                            <span>Quy tắc & Lưu ý cần nhớ:</span>
                          </div>
                          <p className="pl-4">{currentCard.notes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Bottom: Tags & Memorized Switch */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-stone-100 text-xs">
                  <div className="flex items-center gap-1 text-stone-400">
                    {currentCard.tags.map((t, idx) => (
                      <span key={idx} className="after:content-['·'] last:after:content-none mr-1 font-mono text-[11px]">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRemembered(currentCard.id);
                    }}
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

              {/* Bottom Navigation Buttons (Arrows + Flip) */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                  title="Thẻ trước (Mũi tên trái)"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Trước</span>
                </button>

                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95"
                  title="Lật thẻ (Phím Space)"
                >
                  <RotateCw className="w-4 h-4 text-amber-300" />
                  <span>{isFlipped ? 'Xem lại Mặt trước' : 'Lật xem Mặt sau'}</span>
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                  title="Thẻ tiếp theo (Mũi tên phải)"
                >
                  <span className="hidden sm:inline">Tiếp</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center text-[11px] text-stone-400">
                Mẹo ôn nhanh: Bấm phím <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded font-mono text-[10px]">←</kbd> để lùi, <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded font-mono text-[10px]">→</kbd> để tiến, và <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded font-mono text-[10px]">Space</kbd> để lật thẻ.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          CHẾ ĐỘ 2: QUẢN LÝ TẤT CẢ THẺ (CARD GRID MANAGER)
         ======================================================== */}
      {viewMode === 'manager' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200">
            <div className="text-xs text-stone-600">
              Hiển thị <strong className="font-mono text-stone-900">{filteredCards.length}</strong> / {cards.length} thẻ flashcard
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo khái niệm, định nghĩa..."
                className="p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs w-full sm:w-64 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCards.map((card) => {
              const isLearned = rememberedIds[card.id];
              return (
                <div
                  key={card.id}
                  className={`bg-white rounded-2xl border p-5 space-y-3 flex flex-col justify-between hover:shadow-sm transition-all ${
                    isLearned ? 'border-emerald-300 bg-emerald-50/10' : 'border-stone-200'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-semibold text-[10px]">
                          {card.subjectName || 'Môn học'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold text-[10px]">
                          {FLASHCARD_CATEGORIES.find(c => c.id === card.category)?.name || 'Khái niệm'}
                        </span>
                        {card.isCustom && (
                          <span className="px-1.5 py-0.2 rounded bg-sky-100 text-sky-900 font-bold text-[10px]">
                            Tự tạo
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopyCard(card)}
                          className="p-1 hover:bg-stone-100 rounded text-stone-400 hover:text-stone-700 cursor-pointer"
                          title="Sao chép"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEditCard(card)}
                          className="p-1 hover:bg-stone-100 rounded text-stone-400 hover:text-stone-700 cursor-pointer"
                          title="Sửa"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="p-1 hover:bg-rose-50 rounded text-stone-400 hover:text-rose-600 cursor-pointer"
                          title="Xóa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-serif-display text-base font-bold text-stone-900 leading-snug">
                      {card.front}
                    </h4>

                    <div className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200/80 whitespace-pre-line font-serif">
                      {card.back}
                    </div>

                    {card.example && (
                      <div className="text-[11px] text-stone-600 italic bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
                        <strong className="text-amber-900 not-italic">Ví dụ:</strong> {card.example}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400 text-[11px]">
                      Chủ đề: {card.topic}
                    </span>

                    <button
                      onClick={() => toggleRemembered(card.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                        isLearned
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>{isLearned ? 'Đã thuộc' : 'Chưa thuộc'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
