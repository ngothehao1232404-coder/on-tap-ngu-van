import React from 'react';
import { Bookmark, ArrowRight, GitFork, BookOpen, Clock } from 'lucide-react';
import { LiteraryWork } from '../types/literature';

interface WorkCardProps {
  work: LiteraryWork;
  isBookmarked: boolean;
  onToggleBookmark: (workId: string) => void;
  onOpenDetails: (work: LiteraryWork) => void;
  onOpenMindMap: (work: LiteraryWork) => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  work,
  isBookmarked,
  onToggleBookmark,
  onOpenDetails,
  onOpenMindMap,
}) => {
  return (
    <article className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Card Header Media */}
        <div className="relative h-44 sm:h-48 overflow-hidden bg-stone-100">
          <img
            src={work.image}
            alt={work.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(work.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500 text-stone-950'
                : 'bg-stone-900/60 text-white hover:bg-stone-900/90'
            }`}
            title={isBookmarked ? 'Bỏ lưu' : 'Lưu vào sổ tay'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Category kicker on media */}
          <div className="absolute bottom-3 left-4 text-xs font-medium text-amber-200 drop-shadow-sm">
            {work.topicName}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          {/* Metadata unboxed with typographic separators (anti-pill) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>{work.genre}</span>
            <span aria-hidden="true">·</span>
            <span>Tác giả: {work.author}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{work.readTime}</span>
            </span>
          </div>

          <h3 className="font-serif-display text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors mb-2 line-clamp-1">
            {work.title}
          </h3>

          <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2 italic">
            "{work.excerpt}"
          </p>

          <p className="text-stone-700 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
            {work.summary}
          </p>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenMindMap(work)}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-800 transition-colors py-1.5 px-2 rounded-lg hover:bg-stone-50 cursor-pointer"
        >
          <GitFork className="w-3.5 h-3.5" />
          <span>Sơ đồ tư duy</span>
        </button>

        <button
          onClick={() => onOpenDetails(work)}
          className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 transition-colors py-2 px-3.5 rounded-lg cursor-pointer"
        >
          <span>Khám phá & Soạn bài</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
