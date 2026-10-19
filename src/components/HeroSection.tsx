import React from 'react';
import { Search, Sparkles, BookOpen, PenTool, Brain, Award } from 'lucide-react';
import { HERO_IMAGE } from '../data/literatureData';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTopic: string;
  onSelectTopic: (topicId: string) => void;
  topics: { id: string; name: string }[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedTopic,
  onSelectTopic,
  topics,
}) => {
  return (
    <div className="relative border-b border-stone-200 bg-stone-900 text-stone-100 overflow-hidden">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src={HERO_IMAGE}
          alt="Bàn học văn học ấm áp"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-3 flex items-center gap-2">
            <span>Chương trình Giáo dục phổ thông 2018</span>
            <span aria-hidden="true">·</span>
            <span>Ngữ văn 7</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight text-balance">
            Khám Phá Vẻ Đẹp Ngôn Từ, Nuôi Dưỡng Tâm Hồn Trắc Ẩn
          </h1>

          <p className="text-stone-300 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl">
            Cẩm nang số toàn diện cho học sinh lớp 7: Đọc hiểu văn bản sâu sắc, thực hành tiếng Việt nhuần nhuyễn, kỹ năng viết bài chuẩn mực và sơ đồ tư duy trực quan.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mb-6">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm kiếm tác phẩm, tác giả (Bầy chim chìa vôi, Đoàn Giỏi, Điệp ngữ...)"
              className="w-full pl-11 pr-4 py-3 bg-stone-800/90 hover:bg-stone-800 focus:bg-stone-800 text-white placeholder-stone-400 rounded-xl border border-stone-700 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-stone-400 hover:text-white cursor-pointer"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-400 font-medium">Chủ đề:</span>
            <button
              onClick={() => onSelectTopic('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedTopic === 'all'
                  ? 'bg-amber-400 text-stone-950 font-semibold'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
              }`}
            >
              Tất cả
            </button>
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => onSelectTopic(t.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedTopic === t.id
                    ? 'bg-amber-400 text-stone-950 font-semibold'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Quantitative Rigor Badges with Tabular Numerals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white tabular-nums">06</div>
              <div className="text-xs text-stone-400">Văn bản trọng tâm</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white tabular-nums">05</div>
              <div className="text-xs text-stone-400">Chuyên đề Tiếng Việt</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white tabular-nums">100%</div>
              <div className="text-xs text-stone-400">Sơ đồ tư duy trực quan</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white tabular-nums">15+</div>
              <div className="text-xs text-stone-400">Đề thi & Đoạn văn mẫu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
