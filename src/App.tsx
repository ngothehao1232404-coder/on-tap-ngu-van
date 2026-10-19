import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WorkCard } from './components/WorkCard';
import { TextReaderModal } from './components/TextReaderModal';
import { MindMapViewer } from './components/MindMapViewer';
import { LearningResourcesSection } from './components/LearningResourcesSection';
import { LanguagePracticeSection } from './components/LanguagePracticeSection';
import { WritingWorkshopSection } from './components/WritingWorkshopSection';
import { QuizExamSection } from './components/QuizExamSection';
import { FlashcardsSection } from './components/FlashcardsSection';
import { GroundedChatbotSection } from './components/GroundedChatbotSection';
import { NotebookSection } from './components/NotebookSection';
import { PersonalLearningSpace } from './components/PersonalLearningSpace';
import { Footer } from './components/Footer';

import { TOPICS, LITERARY_WORKS } from './data/literatureData';
import { LessonCategory, LiteraryWork, UserNote } from './types/literature';

export default function App() {
  const [activeTab, setActiveTab] = useState<LessonCategory>('reading');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');

  // Reader Modal State
  const [activeWork, setActiveWork] = useState<LiteraryWork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mind Map Viewer Tab State
  const [selectedMindMapWorkId, setSelectedMindMapWorkId] = useState<string>(LITERARY_WORKS[0].id);

  // Grounded Chatbot Selected Topic State
  const [selectedChatbotWorkId, setSelectedChatbotWorkId] = useState<string>(LITERARY_WORKS[0].id);

  // Bookmarks & Notes (Persisted in LocalStorage)
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nv7_bookmarks');
      return saved ? JSON.parse(saved) : ['bay-chim-chia-voi', 'dong-dao-mua-xuan'];
    } catch {
      return ['bay-chim-chia-voi', 'dong-dao-mua-xuan'];
    }
  });

  const [userNotes, setUserNotes] = useState<UserNote[]>(() => {
    try {
      const saved = localStorage.getItem('nv7_notes');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'init-note-1',
              title: 'Cảm nhận về chi tiết giọt nước mắt trong "Bầy chim chìa vôi"',
              content:
                'Giọt nước mắt của Mon và Mên không phải là nước mắt của sự yếu đuối hay sợ hãi, mà là giọt nước mắt của niềm hạnh phúc khôn tả khi thấy sự sống mong manh đã kiên cường vượt qua bão táp. Chi tiết này rất đắt giá và tạo nên dư âm trong trẻo cho cả câu chuyện.',
              createdAt: '26/09/2026',
              tags: ['Cảm thụ', 'Bầy chim chìa vôi'],
            },
          ];
    } catch {
      return [];
    }
  });

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('nv7_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('nv7_notes', JSON.stringify(userNotes));
    } catch (e) {
      console.error(e);
    }
  }, [userNotes]);

  // Handlers
  const handleToggleBookmark = (workId: string) => {
    setBookmarks((prev) =>
      prev.includes(workId) ? prev.filter((id) => id !== workId) : [...prev, workId]
    );
  };

  const handleOpenWork = (work: LiteraryWork) => {
    setActiveWork(work);
    setIsModalOpen(true);
  };

  const handleOpenMindMap = (work: LiteraryWork) => {
    setSelectedMindMapWorkId(work.id);
    setActiveTab('mindmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveNote = (workId: string, title: string, content: string, stayInModal?: boolean) => {
    const newNote: UserNote = {
      id: `note-${Date.now()}`,
      title,
      workId,
      content,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      tags: ['Tác phẩm'],
    };
    setUserNotes((prev) => [newNote, ...prev]);
    if (!stayInModal) {
      setIsModalOpen(false);
      setActiveTab('notebook');
    }
  };

  const handleAddCustomNote = (title: string, content: string) => {
    const newNote: UserNote = {
      id: `note-${Date.now()}`,
      title,
      content,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      tags: ['Tự tạo'],
    };
    setUserNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = (noteId: string) => {
    setUserNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  // Filtered Literary Works
  const filteredWorks = useMemo(() => {
    return LITERARY_WORKS.filter((work) => {
      const matchTopic = selectedTopic === 'all' || work.topicId === selectedTopic;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        work.title.toLowerCase().includes(q) ||
        work.author.toLowerCase().includes(q) ||
        work.topicName.toLowerCase().includes(q) ||
        work.summary.toLowerCase().includes(q) ||
        work.keyThemes.some((t) => t.toLowerCase().includes(q));

      return matchTopic && matchSearch;
    });
  }, [selectedTopic, searchQuery]);

  const selectedMindMapWork =
    LITERARY_WORKS.find((w) => w.id === selectedMindMapWorkId) || LITERARY_WORKS[0];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans">
      {/* Top Bar Contract Compliant Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        bookmarksCount={bookmarks.length}
        notesCount={userNotes.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* TAB 1: READING & COMPREHENSION (HOMEPAGE) */}
        {activeTab === 'reading' && (
          <div>
            <HeroSection
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTopic={selectedTopic}
              onSelectTopic={setSelectedTopic}
              topics={TOPICS}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
              {/* Category Topic Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TOPICS.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic.id);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedTopic === topic.id
                        ? 'bg-amber-900 text-white border-amber-950 shadow-md ring-2 ring-amber-400/50'
                        : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800 shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    <div>
                      <div
                        className={`text-xs font-semibold mb-1 ${
                          selectedTopic === topic.id ? 'text-amber-200' : 'text-amber-800'
                        }`}
                      >
                        {topic.subtitle}
                      </div>
                      <h3 className="font-serif-display text-lg font-bold mb-2">
                        {topic.name}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed line-clamp-2 ${
                          selectedTopic === topic.id ? 'text-stone-300' : 'text-stone-600'
                        }`}
                      >
                        {topic.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-current/10 flex items-center justify-between text-xs">
                      <span>{topic.worksCount} bài trọng tâm</span>
                      <span className="font-semibold underline">Khám phá →</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Literary Works Grid */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-serif-display text-2xl font-bold text-stone-900">
                      Tác Phẩm & Bài Học Trọng Tâm
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      Hiển thị {filteredWorks.length} văn bản đọc hiểu chọn lọc
                    </p>
                  </div>

                  {selectedTopic !== 'all' && (
                    <button
                      onClick={() => setSelectedTopic('all')}
                      className="text-xs font-medium text-amber-800 hover:underline cursor-pointer self-start sm:self-auto"
                    >
                      Hiển thị tất cả các chủ đề
                    </button>
                  )}
                </div>

                {filteredWorks.length === 0 ? (
                  <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-500 max-w-lg mx-auto">
                    <p className="text-sm">Không tìm thấy tác phẩm phù hợp với từ khóa "{searchQuery}".</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedTopic('all');
                      }}
                      className="mt-3 text-xs font-semibold text-amber-800 underline cursor-pointer"
                    >
                      Đặt lại bộ lọc tìm kiếm
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorks.map((work) => (
                      <WorkCard
                        key={work.id}
                        work={work}
                        isBookmarked={bookmarks.includes(work.id)}
                        onToggleBookmark={handleToggleBookmark}
                        onOpenDetails={handleOpenWork}
                        onOpenMindMap={handleOpenMindMap}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Callout Section: Kho học liệu & Ma trận đề */}
              <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 rounded-3xl p-6 sm:p-8 text-white border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
                <div className="space-y-2 max-w-2xl">
                  <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                    Tài liệu dành cho Giáo viên & Học sinh
                  </div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold">
                    Khám phá Kho Học Liệu, Đề Thi Ma Trận & Bảng Đối Chiếu 3 Bộ Sách
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Đầy đủ đề kiểm tra giữa kì, cuối kì có ma trận đặc tả & đáp án biểu điểm chuẩn, phiếu học tập phương pháp P-E-E-L, cùng từ điển thuật ngữ văn học lớp 7.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('resources');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shrink-0 shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Truy cập Kho học liệu</span>
                  <span>→</span>
                </button>
              </div>

              {/* Callout Section 2: Góc học tập của riêng em */}
              <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950/90 rounded-3xl p-6 sm:p-8 text-white border border-amber-800/60 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                <div className="space-y-2 max-w-2xl">
                  <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-2">
                    <span>✨ Không gian học tập cá nhân hóa</span>
                    <span aria-hidden="true">·</span>
                    <span>Dành riêng cho em</span>
                  </div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold">
                    Góc Học Tập Của Riêng Em: Kế Hoạch, Sáng Tác & Theo Dõi Tiến Bộ
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Thiết lập mục tiêu điểm số Văn 7, quản lý nhiệm vụ cần làm, lưu giữ những câu thơ/câu văn tâm đắc làm vốn từ và tự do sáng tác các bài văn cảm thụ của chính em.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('personal_space');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 bg-white hover:bg-amber-100 text-amber-950 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shrink-0 shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Mở Góc của riêng em</span>
                  <span>✨</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VIETNAMESE LANGUAGE LAB */}
        {activeTab === 'language' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <LanguagePracticeSection />
          </div>
        )}

        {/* TAB 3: WRITING WORKSHOP */}
        {activeTab === 'writing' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <WritingWorkshopSection />
          </div>
        )}

        {/* TAB 4: MIND MAPS */}
        {activeTab === 'mindmap' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1">
                Tư duy trực quan hóa
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                Hệ Thống Sơ Đồ Tư Duy Ngữ Văn 7
              </h2>
              <p className="text-stone-600 text-sm max-w-3xl leading-relaxed">
                Tóm tắt cấu trúc cốt truyện, nhân vật, hình ảnh thơ và bài học triết lý qua các nhánh tư duy logic, dễ nhớ và ôn tập hiệu quả trước giờ thi.
              </p>
            </div>

            {/* Select Work for Mindmap */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
              {LITERARY_WORKS.map((work) => (
                <button
                  key={work.id}
                  onClick={() => setSelectedMindMapWorkId(work.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                    selectedMindMapWorkId === work.id
                      ? 'bg-amber-900 text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {work.title}
                </button>
              ))}
            </div>

            {/* Interactive Mind Map Component */}
            <MindMapViewer
              data={selectedMindMapWork.mindMap}
              title={`Sơ đồ tư duy tác phẩm: ${selectedMindMapWork.title}`}
              isStandalone={true}
            />
          </div>
        )}

        {/* TAB 5: LEARNING RESOURCES (KHO HỌC LIỆU) */}
        {activeTab === 'resources' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <LearningResourcesSection />
          </div>
        )}

        {/* TAB 6: QUIZZES & EXAMS */}
        {activeTab === 'quiz' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <QuizExamSection />
          </div>
        )}

        {/* TAB 6: FLASHCARDS */}
        {activeTab === 'flashcard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <FlashcardsSection />
          </div>
        )}

        {/* TAB 7: GROUNDED CHATBOT */}
        {activeTab === 'chatbot' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <GroundedChatbotSection
              initialWorkId={selectedChatbotWorkId}
              onOpenNotebook={(title, content) => handleAddCustomNote(title, content)}
            />
          </div>
        )}

        {/* TAB 8: NOTEBOOK */}
        {activeTab === 'notebook' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <NotebookSection
              notes={userNotes}
              bookmarks={bookmarks}
              allWorks={LITERARY_WORKS}
              onAddNote={handleAddCustomNote}
              onDeleteNote={handleDeleteNote}
              onOpenWork={handleOpenWork}
              onRemoveBookmark={handleToggleBookmark}
            />
          </div>
        )}

        {/* TAB 8: PERSONAL LEARNING SPACE (GÓC HỌC TẬP CỦA RIÊNG EM) */}
        {activeTab === 'personal_space' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <PersonalLearningSpace
              allWorks={LITERARY_WORKS}
              onOpenWork={handleOpenWork}
            />
          </div>
        )}
      </main>

      {/* Reader & Deep Analysis Modal Dialog */}
      <TextReaderModal
        work={activeWork}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isBookmarked={activeWork ? bookmarks.includes(activeWork.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onSaveNote={handleSaveNote}
        onNavigateToNotebook={() => setActiveTab('notebook')}
        onNavigateToPractice={() => {
          setIsModalOpen(false);
          setActiveTab('quiz');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToChatbot={(workId) => {
          setSelectedChatbotWorkId(workId);
          setIsModalOpen(false);
          setActiveTab('chatbot');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Quiet, Dignified Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
