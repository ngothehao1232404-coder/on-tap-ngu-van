import React from 'react';
import { BookOpen, Bookmark, NotebookPen, User, Compass } from 'lucide-react';
import { LessonCategory } from '../types/literature';

interface HeaderProps {
  activeTab: LessonCategory;
  onSelectTab: (tab: LessonCategory) => void;
  bookmarksCount: number;
  notesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  bookmarksCount,
  notesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <button 
          onClick={() => onSelectTab('reading')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif-display text-xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
            Ngữ Văn 7
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('reading')}
            className={`cursor-pointer transition-colors py-1 ${
              activeTab === 'reading'
                ? 'text-amber-800 font-semibold border-b-2 border-amber-800'
                : 'hover:text-stone-900'
            }`}
          >
            Đọc hiểu văn bản
          </button>
          <button
            onClick={() => onSelectTab('language')}
            className={`cursor-pointer transition-colors py-1 ${
              activeTab === 'language'
                ? 'text-amber-800 font-semibold border-b-2 border-amber-800'
                : 'hover:text-stone-900'
            }`}
          >
            Thực hành tiếng Việt
          </button>
          <button
            onClick={() => onSelectTab('writing')}
            className={`cursor-pointer transition-colors py-1 ${
              activeTab === 'writing'
                ? 'text-amber-800 font-semibold border-b-2 border-amber-800'
                : 'hover:text-stone-900'
            }`}
          >
            Tập làm văn
          </button>
          <button
            onClick={() => onSelectTab('mindmap')}
            className={`cursor-pointer transition-colors py-1 ${
              activeTab === 'mindmap'
                ? 'text-amber-800 font-semibold border-b-2 border-amber-800'
                : 'hover:text-stone-900'
            }`}
          >
            Sơ đồ tư duy
          </button>
          <button
            onClick={() => onSelectTab('resources')}
            className={`cursor-pointer transition-colors py-1 ${
              activeTab === 'resources'
                ? 'text-amber-800 font-semibold border-b-2 border-amber-800'
                : 'hover:text-stone-900'
            }`}
          >
            Kho học liệu
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`cursor-pointer transition-colors py-1 ${
              activeTab === 'quiz'
                ? 'text-amber-800 font-semibold border-b-2 border-amber-800'
                : 'hover:text-stone-900'
            }`}
          >
            Luyện đề & Đánh giá
          </button>
          <button
            onClick={() => onSelectTab('flashcard')}
            className={`cursor-pointer transition-colors py-1 ${
              activeTab === 'flashcard'
                ? 'text-amber-800 font-semibold border-b-2 border-amber-800'
                : 'hover:text-stone-900'
            }`}
          >
            Flashcard Mode
          </button>
          <button
            onClick={() => onSelectTab('chatbot')}
            className={`cursor-pointer transition-colors py-1 flex items-center gap-1 ${
              activeTab === 'chatbot'
                ? 'text-amber-800 font-semibold border-b-2 border-amber-800'
                : 'hover:text-stone-900'
            }`}
          >
            <span>Trợ lý Ôn bài</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onSelectTab('personal_space')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer shadow-2xs ${
              activeTab === 'personal_space'
                ? 'bg-amber-800 text-white border-amber-900 ring-2 ring-amber-400/40'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-200'
            }`}
            title="Góc học tập của riêng em"
          >
            <User className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-800" />
            <span>Góc của em</span>
          </button>

          <button
            onClick={() => onSelectTab('notebook')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'notebook'
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200'
            }`}
            title="Sổ tay ghi chú & Yêu thích"
          >
            <NotebookPen className="w-3.5 h-3.5" />
            <span>Sổ tay</span>
            {(notesCount > 0 || bookmarksCount > 0) && (
              <span className="font-mono text-[11px] tabular-nums px-1.5 py-0.2 bg-white/20 text-current rounded">
                {notesCount + bookmarksCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile subnav bar */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-stone-200 text-xs font-medium text-stone-600 bg-stone-50">
        <button
          onClick={() => onSelectTab('personal_space')}
          className={`whitespace-nowrap px-2.5 py-1 rounded cursor-pointer ${
            activeTab === 'personal_space' ? 'bg-amber-800 text-white font-semibold' : 'bg-amber-100/70 text-amber-950 font-medium'
          }`}
        >
          Góc của em
        </button>
        <button
          onClick={() => onSelectTab('reading')}
          className={`whitespace-nowrap px-2.5 py-1 rounded cursor-pointer ${
            activeTab === 'reading' ? 'bg-amber-100 text-amber-900 font-semibold' : ''
          }`}
        >
          Đọc hiểu
        </button>
        <button
          onClick={() => onSelectTab('language')}
          className={`whitespace-nowrap px-2.5 py-1 rounded cursor-pointer ${
            activeTab === 'language' ? 'bg-amber-100 text-amber-900 font-semibold' : ''
          }`}
        >
          Tiếng Việt
        </button>
        <button
          onClick={() => onSelectTab('writing')}
          className={`whitespace-nowrap px-2.5 py-1 rounded cursor-pointer ${
            activeTab === 'writing' ? 'bg-amber-100 text-amber-900 font-semibold' : ''
          }`}
        >
          Tập làm văn
        </button>
        <button
          onClick={() => onSelectTab('mindmap')}
          className={`whitespace-nowrap px-2.5 py-1 rounded cursor-pointer ${
            activeTab === 'mindmap' ? 'bg-amber-100 text-amber-900 font-semibold' : ''
          }`}
        >
          Sơ đồ
        </button>
        <button
          onClick={() => onSelectTab('resources')}
          className={`whitespace-nowrap px-2.5 py-1 rounded cursor-pointer ${
            activeTab === 'resources' ? 'bg-amber-100 text-amber-900 font-semibold' : ''
          }`}
        >
          Học liệu
        </button>
        <button
          onClick={() => onSelectTab('quiz')}
          className={`whitespace-nowrap px-2.5 py-1 rounded cursor-pointer ${
            activeTab === 'quiz' ? 'bg-amber-100 text-amber-900 font-semibold' : ''
          }`}
        >
          Luyện đề
        </button>
        <button
          onClick={() => onSelectTab('flashcard')}
          className={`whitespace-nowrap px-2.5 py-1 rounded cursor-pointer ${
            activeTab === 'flashcard' ? 'bg-amber-100 text-amber-900 font-semibold' : ''
          }`}
        >
          Flashcards
        </button>
        <button
          onClick={() => onSelectTab('chatbot')}
          className={`whitespace-nowrap px-2.5 py-1 rounded cursor-pointer ${
            activeTab === 'chatbot' ? 'bg-amber-100 text-amber-900 font-semibold' : ''
          }`}
        >
          Trợ lý Ôn bài
        </button>
      </div>
    </header>
  );
};
