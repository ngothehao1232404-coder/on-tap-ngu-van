import React from 'react';
import { BookOpen } from 'lucide-react';
import { LessonCategory } from '../types/literature';

interface FooterProps {
  onSelectTab: (tab: LessonCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-2">
            <div className="font-serif-display text-xl font-bold text-white tracking-tight">
              Ngữ Văn 7
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
              Cẩm nang học tốt và khám phá văn học lớp 7 theo định hướng phát triển năng lực và phẩm chất của Chương trình Giáo dục phổ thông 2018 (Kết nối tri thức, Cánh diều, Chân trời sáng tạo).
            </p>
          </div>

          <div>
            <div className="text-xs uppercase font-semibold text-amber-300 mb-3 tracking-wider">
              Nội dung học tập
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('reading')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Đọc hiểu tác phẩm
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('language')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Thực hành tiếng Việt
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('writing')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Tập làm văn & Viết bài
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('mindmap')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sơ đồ tư duy trực quan
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase font-semibold text-amber-300 mb-3 tracking-wider">
              Công cụ ôn luyện
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('resources')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Kho học liệu & Ma trận đề
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('quiz')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Đề thi thử 15 phút & 45 phút
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('flashcard')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Thẻ ghi nhớ Flashcards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('personal_space')}
                  className="hover:text-amber-300 font-semibold text-amber-200 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>✨ Góc học tập của riêng em</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('notebook')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sổ tay ghi chép cá nhân
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            Học liệu môn Ngữ văn 7 · Giáo dục trung học cơ sở Việt Nam
          </div>
          <div>
            Tri thức là cội nguồn của tự do và lòng nhân ái.
          </div>
        </div>
      </div>
    </footer>
  );
};
