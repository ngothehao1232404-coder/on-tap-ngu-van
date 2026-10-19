import React, { useState } from 'react';
import { GitFork, ChevronRight, ChevronDown, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { MindMapData } from '../types/literature';

interface MindMapViewerProps {
  data: MindMapData;
  title?: string;
  isStandalone?: boolean;
}

export const MindMapViewer: React.FC<MindMapViewerProps> = ({
  data,
  title,
  isStandalone = false,
}) => {
  const [collapsedBranches, setCollapsedBranches] = useState<Record<number, boolean>>({});
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const toggleBranch = (index: number) => {
    setCollapsedBranches((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const expandAll = () => setCollapsedBranches({});
  const collapseAll = () => {
    const all: Record<number, boolean> = {};
    data.branches.forEach((_, idx) => {
      all[idx] = true;
    });
    setCollapsedBranches(all);
  };

  const getBranchColorClass = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          border: 'border-emerald-500',
          bg: 'bg-emerald-50 text-emerald-950',
          badge: 'bg-emerald-100 text-emerald-800',
          line: 'bg-emerald-300',
        };
      case 'amber':
        return {
          border: 'border-amber-500',
          bg: 'bg-amber-50 text-amber-950',
          badge: 'bg-amber-100 text-amber-800',
          line: 'bg-amber-300',
        };
      case 'sky':
        return {
          border: 'border-sky-500',
          bg: 'bg-sky-50 text-sky-950',
          badge: 'bg-sky-100 text-sky-800',
          line: 'bg-sky-300',
        };
      case 'rose':
        return {
          border: 'border-rose-500',
          bg: 'bg-rose-50 text-rose-950',
          badge: 'bg-rose-100 text-rose-800',
          line: 'bg-rose-300',
        };
      default:
        return {
          border: 'border-stone-500',
          bg: 'bg-stone-50 text-stone-900',
          badge: 'bg-stone-100 text-stone-700',
          line: 'bg-stone-300',
        };
    }
  };

  return (
    <div className={`bg-stone-50/60 rounded-2xl border border-stone-200 p-4 sm:p-6 ${isStandalone ? 'shadow-sm' : ''}`}>
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-stone-200">
        <div>
          <h4 className="font-serif-display text-lg font-bold text-stone-900 flex items-center gap-2">
            <GitFork className="w-5 h-5 text-amber-700" />
            <span>{title || data.root}</span>
          </h4>
          <p className="text-xs text-stone-500 mt-0.5">
            Nhấp vào nhánh để mở rộng hoặc thu gọn luận điểm chi tiết
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={expandAll}
            className="px-2.5 py-1 bg-white border border-stone-200 rounded text-stone-700 hover:bg-stone-50 cursor-pointer"
          >
            Mở tất cả
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1 bg-white border border-stone-200 rounded text-stone-700 hover:bg-stone-50 cursor-pointer"
          >
            Thu gọn
          </button>
          <div className="h-4 w-px bg-stone-300 mx-1" />
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.1, 1.3))}
            className="p-1.5 bg-white border border-stone-200 rounded text-stone-700 hover:bg-stone-50 cursor-pointer"
            title="Phóng to"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.1, 0.8))}
            className="p-1.5 bg-white border border-stone-200 rounded text-stone-700 hover:bg-stone-50 cursor-pointer"
            title="Thu nhỏ"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 bg-white border border-stone-200 rounded text-stone-700 hover:bg-stone-50 cursor-pointer"
            title="Về cỡ gốc"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mindmap Interactive Canvas Area */}
      <div 
        className="transition-transform duration-200 origin-top overflow-x-auto py-2"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <div className="min-w-[650px] flex flex-col items-center">
          {/* Central Root Node */}
          <div className="bg-stone-900 text-white font-serif-display font-bold text-base sm:text-lg px-6 py-3.5 rounded-xl shadow-md border border-stone-700 mb-6 text-center max-w-md">
            {data.root}
          </div>

          {/* Root connecting vertical stem */}
          <div className="w-0.5 h-6 bg-stone-300 -mt-6 mb-6" />

          {/* Branches Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {data.branches.map((branch, idx) => {
              const colors = getBranchColorClass(branch.color);
              const isCollapsed = collapsedBranches[idx];

              return (
                <div
                  key={idx}
                  className={`bg-white rounded-xl border ${colors.border} p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col`}
                >
                  {/* Branch Header */}
                  <button
                    onClick={() => toggleBranch(idx)}
                    className="flex items-center justify-between text-left font-semibold text-stone-900 group cursor-pointer w-full focus:outline-none"
                  >
                    <span className="text-sm font-bold flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${colors.line}`} />
                      {branch.title}
                    </span>
                    <span className="text-stone-400 group-hover:text-stone-700">
                      {isCollapsed ? (
                        <ChevronRight className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {/* Subnodes list */}
                  {!isCollapsed && (
                    <div className="mt-3 pt-3 border-t border-stone-100 space-y-2.5">
                      {branch.subNodes.map((node, nIdx) => (
                        <div
                          key={nIdx}
                          className="flex items-start gap-2 text-xs text-stone-700 bg-stone-50/80 p-2.5 rounded-lg border border-stone-200/60 leading-relaxed"
                        >
                          <span className="font-mono text-[10px] text-stone-400 mt-0.5">
                            {idx + 1}.{nIdx + 1}
                          </span>
                          <span>{node}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
