import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Layers,
  FileText,
  AlertCircle,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Bookmark,
  ShieldCheck,
  HelpCircle,
  Lightbulb,
  Save,
  FolderOpen,
  Edit3,
  Trash2,
  Clock,
  X,
  Plus,
  RefreshCw,
  Folder,
  GitBranch,
  Eye,
  CheckCircle2,
  FileQuestion,
  CreditCard,
  ArrowRight,
  Split
} from 'lucide-react';
import { LITERARY_WORKS } from '../data/literatureData';
import {
  GroundedTopicScope,
  TopicSnapshot,
  StudyPackVersion,
  answerGroundedQuestion,
  getGroundedScopeById,
} from '../data/groundedTopics';
import { regenerateStudyPackWithGemini } from '../data/regenerateEngine';
import { GroundedChatMessage } from '../types/literature';

interface GroundedChatbotSectionProps {
  initialWorkId?: string;
  onOpenNotebook?: (title: string, content: string) => void;
}

// Hàm khởi tạo Version v1 ban đầu từ nguồn học liệu gốc (đảm bảo không bao giờ mất nguồn gốc)
const getInitialVersionsForTopic = (workId: string): StudyPackVersion[] => {
  const scope = getGroundedScopeById(workId);
  const now = new Date();
  const dateFormatted = `${now.toLocaleDateString('vi-VN')} ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;

  return [
    {
      id: `ver_orig_${workId}`,
      versionNumber: 1,
      label: 'v1 (Bản gốc SGK chuẩn)',
      createdAt: dateFormatted,
      timestamp: Date.now() - 3600000,
      isOriginal: true,
      topicId: scope.id,
      topicTitle: scope.title,
      subject: scope.topicName,
      sources: scope.sources,
      summary: scope.analysisPreview.summary,
      keyThemes: scope.analysisPreview.keyThemes,
      ideologicalValue: scope.analysisPreview.ideologicalValue,
      artisticValues: scope.analysisPreview.artisticValues,
      analysisSections: scope.analysisPreview.analysisSections,
      discussionQuestions: scope.studyPack.discussionQuestions,
      quizQuestions: [
        {
          id: `quiz-orig-${workId}-1`,
          question: `Nội dung cốt lõi của bài học "${scope.title}" là gì?`,
          options: [
            scope.analysisPreview.summary.slice(0, 70) + '...',
            'Câu chuyện giả tưởng về thế giới tương lai',
            'Bài văn thuyết minh thuần túy về tự nhiên',
            'Kịch bản sân khấu cổ điển',
          ],
          correctIndex: 0,
          explanation: `Theo tài liệu chuẩn SGK: ${scope.analysisPreview.summary}`,
        },
      ],
      flashcards: [
        {
          id: `fc-orig-${workId}-1`,
          front: `Chủ đề & Tư tưởng của "${scope.title}"`,
          back: scope.analysisPreview.ideologicalValue,
          example: scope.sources.excerpt,
          notes: 'Kiến thức SGK chuẩn',
        },
      ],
      mindMapBranches: scope.studyPack.mindMapBranches,
      generationNotes: 'Bản gốc chuẩn từ Sách giáo khoa Ngữ văn 7',
    },
  ];
};

export const GroundedChatbotSection: React.FC<GroundedChatbotSectionProps> = ({
  initialWorkId,
  onOpenNotebook,
}) => {
  // 1. Quản lý chủ đề SGK được chọn
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialWorkId || LITERARY_WORKS[0].id
  );

  // 2. Quản lý các Version của chủ đề hiện tại (nv7_versions_${topicId})
  const [versions, setVersions] = useState<StudyPackVersion[]>(() => {
    try {
      const saved = localStorage.getItem(`nv7_versions_${selectedTopicId}`);
      if (saved) {
        const parsed: StudyPackVersion[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return getInitialVersionsForTopic(selectedTopicId);
  });

  // Tự động lưu versions vào LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(`nv7_versions_${selectedTopicId}`, JSON.stringify(versions));
    } catch (e) {
      console.error(e);
    }
  }, [versions, selectedTopicId]);

  // Cập nhật versions khi học sinh đổi chủ đề
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`nv7_versions_${selectedTopicId}`);
      if (saved) {
        const parsed: StudyPackVersion[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setVersions(parsed);
          setActiveVersionId(parsed[parsed.length - 1].id);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
    const initials = getInitialVersionsForTopic(selectedTopicId);
    setVersions(initials);
    setActiveVersionId(initials[0].id);
  }, [selectedTopicId]);

  // 4. Version đang hoạt động (Active Version)
  const [activeVersionId, setActiveVersionId] = useState<string>(() => {
    return versions[versions.length - 1]?.id || `ver_orig_${selectedTopicId}`;
  });

  const currentVersion: StudyPackVersion = useMemo(() => {
    const found = versions.find((v) => v.id === activeVersionId);
    return found || versions[0] || getInitialVersionsForTopic(selectedTopicId)[0];
  }, [versions, activeVersionId, selectedTopicId]);

  // 5. Working Scope hiện tại (được liên kết 100% với Active Version và giữ nguyên nguồn gốc)
  const currentWorkingScope: GroundedTopicScope = useMemo(() => {
    return {
      id: currentVersion.topicId,
      title: `${currentVersion.topicTitle} [${currentVersion.label.split(' ')[0]}]`,
      topicName: currentVersion.subject,
      sources: currentVersion.sources,
      analysisPreview: {
        summary: currentVersion.summary,
        keyThemes: currentVersion.keyThemes,
        ideologicalValue: currentVersion.ideologicalValue,
        artisticValues: currentVersion.artisticValues,
        analysisSections: currentVersion.analysisSections,
      },
      studyPack: {
        discussionQuestions: currentVersion.discussionQuestions,
        mindMapBranches: currentVersion.mindMapBranches,
        quickReviewPoints: [
          `Tác giả: ${currentVersion.sources.author} - ${currentVersion.sources.genre}`,
          `Tư tưởng: ${currentVersion.ideologicalValue}`,
          ...(currentVersion.keyThemes || []),
        ],
      },
    };
  }, [currentVersion]);

  // 6. Quản lý Snapshot đã lưu (Save/Load Working Copy)
  const [savedSnapshots, setSavedSnapshots] = useState<TopicSnapshot[]>(() => {
    try {
      const saved = localStorage.getItem('nv7_topic_snapshots');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('nv7_topic_snapshots', JSON.stringify(savedSnapshots));
    } catch (e) {
      console.error(e);
    }
  }, [savedSnapshots]);

  // 7. Modals State
  const [showDocInspector, setShowDocInspector] = useState<boolean>(false);
  const [activeDocTab, setActiveDocTab] = useState<'sources' | 'analysisPreview' | 'studyPack'>('sources');

  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState<boolean>(false);
  const [isVersionsModalOpen, setIsVersionsModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [isListModalOpen, setIsListModalOpen] = useState<boolean>(false);

  // So sánh Version
  const [compareVersion, setCompareVersion] = useState<StudyPackVersion | null>(null);

  // Đổi tên Snapshot inline
  const [editingSnapshotId, setEditingSnapshotId] = useState<string | null>(null);
  const [editingSnapshotName, setEditingSnapshotName] = useState<string>('');

  // Form Lưu Snapshot
  const [saveSnapshotName, setSaveSnapshotName] = useState<string>('');
  const [saveSnapshotNotes, setSaveSnapshotNotes] = useState<string>('');

  // Re-generate loading
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);

  // 8. Lịch sử hỏi đáp (Chat History)
  const [messages, setMessages] = useState<GroundedChatMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: `Chào bạn! Mình là Trợ lý Ôn bài Grounded môn Ngữ Văn 7.\n\nĐang học theo **${currentVersion.label}** của chủ đề: **"${currentVersion.topicTitle}"** (${currentVersion.subject}).\n\n📌 **Phạm vi tài liệu trả lời:**\n- 📂 **sources**: Tác giả ${currentVersion.sources.author}, thể loại ${currentVersion.sources.genre}, đoạn trích và bố cục (luôn giữ nguyên nguồn gốc).\n- 🔍 **analysisPreview**: Tóm tắt, giá trị tư tưởng & nghệ thuật.\n- 🎒 **studyPack**: Câu hỏi đọc hiểu và sơ đồ tư duy.\n\n⚠️ *Nếu câu hỏi nằm ngoài tài liệu, mình sẽ thông báo rõ: "Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp."*`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isGrounded: true,
        citationSources: ['sources', 'studyPack'],
      },
    ];
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ========================================================
  // PROMPT 05: RE-GENERATE TOÀN BỘ STUDY PACK BẰNG GEMINI
  // ========================================================
  const handleOpenRegenerateModal = () => {
    setIsRegenerateModalOpen(true);
  };

  const handleConfirmRegenerate = async () => {
    setIsRegenerating(true);
    const nextVerNum = versions.length + 1;

    try {
      const newVer = await regenerateStudyPackWithGemini(
        currentWorkingScope,
        nextVerNum
      );

      // Thêm version mới vào danh sách (không làm mất nguồn gốc ban đầu & các version cũ)
      setVersions((prev) => [...prev, newVer]);
      setActiveVersionId(newVer.id);
      setIsRegenerateModalOpen(false);

      // Thêm thông báo vào khung chat
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-regen-${Date.now()}`,
          sender: 'assistant',
          text: `✨ **Đã tạo thành công Version mới: ${newVer.label}!**\n\n- Đã làm mới **Summary** (Tóm tắt súc tích góc nhìn mới)\n- Đã làm mới **Q&A** (${newVer.discussionQuestions.length} câu hỏi đọc hiểu mới)\n- Đã làm mới **Quiz** (${newVer.quizQuestions.length} câu trắc nghiệm mới)\n- Đã làm mới **Flashcards** (${newVer.flashcards.length} thẻ ghi nhớ mới)\n\n📌 *Lưu ý:* Nguồn học liệu gốc (**sources**) của ${newVer.sources.author} vẫn được giữ nguyên vẹn 100%.`,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          isGrounded: true,
          citationSources: ['sources', 'analysisPreview', 'studyPack'],
        },
      ]);

      showToast(`Đã tạo và nạp thành công Version ${nextVerNum}!`);
    } catch (e) {
      console.error(e);
      showToast('Có lỗi xảy ra khi tạo version mới.');
    } finally {
      setIsRegenerating(false);
    }
  };

  // ========================================================
  // PROMPT 06: QUẢN LÝ VERSION CƠ BẢN
  // ========================================================
  // Mở lại version cũ để học tiếp hoặc so sánh
  const handleSwitchVersion = (ver: StudyPackVersion) => {
    setActiveVersionId(ver.id);
    setIsVersionsModalOpen(false);

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-ver-switch-${Date.now()}`,
        sender: 'assistant',
        text: `🔄 **Đã chuyển sang học:** **${ver.label}**.\nToàn bộ nội dung Summary, Quiz, Flashcard và Q&A của version này đã được nạp vào ứng dụng.`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isGrounded: true,
        citationSources: ['sources', 'studyPack'],
      },
    ]);

    showToast(`Đã kích hoạt ${ver.label}!`);
  };

  // Xóa version không cần thiết (không cho phép xóa version gốc v1)
  const handleDeleteVersion = (verId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const target = versions.find((v) => v.id === verId);
    if (!target) return;

    if (target.isOriginal) {
      alert('Không thể xóa Version v1 (Bản gốc SGK) vì đây là nguồn học liệu chuẩn!');
      return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa "${target.label}"?`)) {
      const remaining = versions.filter((v) => v.id !== verId);
      setVersions(remaining);

      // Nếu đang mở version bị xóa -> chuyển về version gần nhất
      if (activeVersionId === verId) {
        const nextActive = remaining[remaining.length - 1];
        setActiveVersionId(nextActive.id);
      }

      showToast(`Đã xóa ${target.label}.`);
    }
  };

  // ========================================================
  // TÍNH NĂNG SAVE / LOAD SNAPSHOT WORKING COPY
  // ========================================================
  const handleConfirmSaveSnapshot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saveSnapshotName.trim()) return;

    const now = new Date();
    const dateFormatted = `${now.toLocaleDateString('vi-VN')} ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;

    const newSnapshot: TopicSnapshot = {
      id: `snap_${Date.now()}`,
      name: saveSnapshotName.trim(),
      subject: currentWorkingScope.topicName,
      sources: JSON.parse(JSON.stringify(currentWorkingScope.sources)),
      analysisPreview: JSON.parse(JSON.stringify(currentWorkingScope.analysisPreview)),
      studyPack: JSON.parse(JSON.stringify(currentWorkingScope.studyPack)),
      metadata: {
        savedAt: now.toISOString(),
        savedDateFormatted: dateFormatted,
        version: currentVersion.label,
        originalTopicId: selectedTopicId,
        notes: saveSnapshotNotes.trim() || undefined,
      },
      chatHistory: messages,
    };

    setSavedSnapshots((prev) => [newSnapshot, ...prev]);
    setIsSaveModalOpen(false);
    showToast(`Đã lưu snapshot "${newSnapshot.name}" thành công!`);
  };

  const handleRestoreSnapshot = (snapshot: TopicSnapshot) => {
    setIsListModalOpen(false);

    if (snapshot.chatHistory && snapshot.chatHistory.length > 0) {
      setMessages([
        ...snapshot.chatHistory,
        {
          id: `msg-restore-${Date.now()}`,
          sender: 'assistant',
          text: `📥 **Đã khôi phục snapshot:** **"${snapshot.name}"** (${snapshot.subject}).\nLưu lúc: ${snapshot.metadata.savedDateFormatted}.`,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          isGrounded: true,
          citationSources: ['sources', 'studyPack'],
        },
      ]);
    }

    showToast(`Đã nạp bản lưu "${snapshot.name}"!`);
  };

  // 9. Input câu hỏi & Gửi tin nhắn
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedNoteSuccess, setSavedNoteSuccess] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Close any open modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (compareVersion) setCompareVersion(null);
        else if (isRegenerateModalOpen) setIsRegenerateModalOpen(false);
        else if (isVersionsModalOpen) setIsVersionsModalOpen(false);
        else if (isSaveModalOpen) setIsSaveModalOpen(false);
        else if (isListModalOpen) setIsListModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [compareVersion, isRegenerateModalOpen, isVersionsModalOpen, isSaveModalOpen, isListModalOpen]);

  const handleSendMessage = async (customQuery?: string) => {
    const query = (customQuery || inputQuestion).trim();
    if (!query || isLoading) return;

    const userMsg: GroundedChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      let serverResponded = false;
      let replyData: { text: string; isGrounded?: boolean; citationSources?: any; citationDetail?: string } | null = null;

      try {
        const res = await fetch('/api/grounded-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            topicTitle: currentWorkingScope.title,
            sources: currentWorkingScope.sources,
            analysisPreview: currentWorkingScope.analysisPreview,
            studyPack: currentWorkingScope.studyPack,
            history: messages.slice(-4),
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.text) {
            const isOutside = data.text.includes('Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp.');
            replyData = {
              text: data.text,
              isGrounded: !isOutside,
              citationSources: isOutside ? [] : ['sources', 'analysisPreview'],
              citationDetail: isOutside ? undefined : `Xác thực từ ${currentVersion.label}`,
            };
            serverResponded = true;
          }
        }
      } catch (err) {
        // Fallback
      }

      if (!serverResponded || !replyData) {
        await new Promise((r) => setTimeout(r, 350));
        replyData = answerGroundedQuestion(query, currentWorkingScope);
      }

      const botMsg: GroundedChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyData.text,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isGrounded: replyData.isGrounded,
        citationSources: replyData.citationSources,
        citationDetail: replyData.citationDetail,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
      const fallbackMsg: GroundedChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: 'Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isGrounded: false,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToNotebook = (msg: GroundedChatMessage) => {
    try {
      const existing = JSON.parse(localStorage.getItem('nv7_notes') || '[]');
      const newNote = {
        id: `note-grounded-${Date.now()}`,
        title: `Ôn bài: ${currentWorkingScope.title}`,
        workId: currentWorkingScope.id,
        content: msg.text,
        createdAt: new Date().toLocaleDateString('vi-VN'),
        tags: ['Grounded Chatbot', currentVersion.label],
      };
      localStorage.setItem('nv7_notes', JSON.stringify([newNote, ...existing]));
      setSavedNoteSuccess(msg.id);
      setTimeout(() => setSavedNoteSuccess(null), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const suggestedPrompts = useMemo(() => {
    const list = [
      `Tóm tắt theo phiên bản ${currentVersion.label}?`,
      `Chủ đề và thông điệp tư tưởng của bài?`,
      `Những đặc sắc nghệ thuật tiêu biểu?`,
      `Bố cục bài học được chia làm mấy phần?`,
    ];

    if (currentVersion.discussionQuestions[0]) {
      list.push(currentVersion.discussionQuestions[0].question);
    }

    return list;
  }, [currentVersion]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 bg-stone-900 text-white rounded-xl text-xs flex items-center justify-between shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Đã đồng bộ</span>
        </div>
      )}

      {/* ========================================================
          1. HEADER BAR: CHỦ ĐỀ, RE-GENERATE & QUẢN LÝ VERSION
         ======================================================== */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Grounded AI Assistant · Trợ Lý Ôn Bài Ngữ Văn 7</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              Trợ Lý Hỏi Đáp Grounded & Quản Lý Version
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Hỗ trợ <strong>Re-generate Study Pack</strong> làm mới nội dung từ học liệu gốc và <strong>Khu vực quản lý Version</strong> so sánh, khôi phục bài học.
            </p>
          </div>

          {/* CỤM NÚT HÀNH ĐỘNG: RE-GENERATE, QUẢN LÝ VERSION, LƯU SNAPSHOT */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* NÚT 1: RE-GENERATE STUDY PACK (PROMPT 05) */}
            <button
              onClick={handleOpenRegenerateModal}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-900 hover:to-stone-900 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
              title="Làm mới Summary, Quiz, Flashcard, Q&A từ nguồn học liệu gốc"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Re-generate Study Pack</span>
            </button>

            {/* NÚT 2: QUẢN LÝ VERSION (PROMPT 06) */}
            <button
              onClick={() => setIsVersionsModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              title="Xem danh sách version, mở lại version cũ hoặc so sánh"
            >
              <GitBranch className="w-3.5 h-3.5 text-amber-800" />
              <span>Quản lý Version ({versions.length})</span>
            </button>

            {/* NÚT 3: LƯU SNAPSHOT */}
            <button
              onClick={() => {
                setSaveSnapshotName(`Bản ôn: ${currentVersion.topicTitle} (${currentVersion.label})`);
                setSaveSnapshotNotes('');
                setIsSaveModalOpen(true);
              }}
              className="p-2 hover:bg-stone-100 text-stone-600 rounded-xl border border-stone-200 cursor-pointer"
              title="Lưu snapshot working copy vào LocalStorage"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thanh trạng thái Version đang hoạt động & Chọn chủ đề */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                Chủ đề SGK:
              </span>
              <select
                value={selectedTopicId}
                onChange={(e) => setSelectedTopicId(e.target.value)}
                className="p-1.5 px-2 bg-stone-50 hover:bg-stone-100 border border-stone-300 rounded-lg text-xs font-semibold text-stone-900 focus:outline-none"
              >
                {LITERARY_WORKS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.title} ({w.author})
                  </option>
                ))}
              </select>
            </div>

            <span className="text-stone-300">|</span>

            {/* Active Version Badge */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                Phiên bản đang học:
              </span>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-2xs ${
                currentVersion.isOriginal
                  ? 'bg-amber-100 text-amber-950 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-950 border border-emerald-300'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>{currentVersion.label}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDocInspector(!showDocInspector)}
              className="flex items-center gap-1 text-amber-900 hover:text-amber-950 font-bold text-xs underline cursor-pointer"
            >
              <span>{showDocInspector ? 'Đóng xem tài liệu' : 'Xem phạm vi 3 khối tài liệu'}</span>
              {showDocInspector ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsListModalOpen(true)}
              className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
            >
              Bản lưu ({savedSnapshots.length})
            </button>
          </div>
        </div>

        {/* Khay xem chi tiết 3 khối tài liệu của Active Version */}
        {showDocInspector && (
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 animate-in fade-in duration-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="font-bold text-stone-800 uppercase tracking-wide text-[11px]">
                Nội dung tài liệu nạp cho: <strong className="text-amber-900">{currentVersion.topicTitle}</strong> ({currentVersion.label})
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveDocTab('sources')}
                  className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                    activeDocTab === 'sources' ? 'bg-emerald-700 text-white' : 'bg-white text-stone-600'
                  }`}
                >
                  sources (Gốc SGK)
                </button>
                <button
                  onClick={() => setActiveDocTab('analysisPreview')}
                  className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                    activeDocTab === 'analysisPreview' ? 'bg-amber-800 text-white' : 'bg-white text-stone-600'
                  }`}
                >
                  analysisPreview
                </button>
                <button
                  onClick={() => setActiveDocTab('studyPack')}
                  className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                    activeDocTab === 'studyPack' ? 'bg-sky-700 text-white' : 'bg-white text-stone-600'
                  }`}
                >
                  studyPack
                </button>
              </div>
            </div>

            {/* Tab 1: sources */}
            {activeDocTab === 'sources' && (
              <div className="space-y-2 text-stone-700 max-h-56 overflow-y-auto pr-1">
                <div className="p-2 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-900 text-[11px] font-semibold">
                  🛡️ Nguồn học liệu gốc ban đầu được bảo toàn nguyên vẹn 100% qua tất cả các version.
                </div>
                <p><strong>Tác giả:</strong> {currentVersion.sources.author} ({currentVersion.sources.authorBio})</p>
                <p><strong>Thể loại:</strong> {currentVersion.sources.genre}</p>
                <p><strong>Đoạn trích SGK:</strong> <em>"{currentVersion.sources.excerpt}"</em></p>
                <div>
                  <strong>Bố cục văn bản:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    {currentVersion.sources.structure.map((s, idx) => (
                      <li key={idx}><strong>{s.part}</strong> ({s.range}): {s.content}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: analysisPreview */}
            {activeDocTab === 'analysisPreview' && (
              <div className="space-y-2 text-stone-700 max-h-56 overflow-y-auto pr-1">
                <p><strong>Tóm tắt nội dung ({currentVersion.label}):</strong> {currentVersion.summary}</p>
                <div>
                  <strong>Chủ đề chính:</strong>
                  <ul className="list-disc pl-5 mt-0.5">
                    {currentVersion.keyThemes.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
                <p><strong>Ý nghĩa tư tưởng:</strong> {currentVersion.ideologicalValue}</p>
                <div>
                  <strong>Đặc sắc nghệ thuật:</strong>
                  <ul className="list-disc pl-5 mt-0.5">
                    {currentVersion.artisticValues.map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 3: studyPack */}
            {activeDocTab === 'studyPack' && (
              <div className="space-y-2 text-stone-700 max-h-56 overflow-y-auto pr-1">
                <div>
                  <strong>Bộ câu hỏi đọc hiểu ôn tập ({currentVersion.discussionQuestions.length} câu):</strong>
                  {currentVersion.discussionQuestions.map((dq, idx) => (
                    <div key={idx} className="mt-1.5 p-2 bg-white rounded-lg border border-stone-200">
                      <p className="font-semibold text-stone-900">Câu {idx + 1}: {dq.question}</p>
                      <p className="text-stone-500 mt-0.5"><em>Gợi ý:</em> {dq.hint}</p>
                      <p className="text-emerald-900 mt-0.5"><strong>Đáp án:</strong> {dq.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-1">
                  <strong>Các nhánh sơ đồ tư duy:</strong>
                  <ul className="list-disc pl-5 mt-0.5">
                    {currentVersion.mindMapBranches.map((b, idx) => (
                      <li key={idx}><strong>{b.title}:</strong> {b.subNodes.join(' · ')}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================
          MODAL A: RE-GENERATE STUDY PACK (PROMPT 05)
         ======================================================== */}
      {isRegenerateModalOpen && (
        <div
          onClick={() => setIsRegenerateModalOpen(false)}
          className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col cursor-default"
          >
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-stone-900">
                    Re-generate Toàn Bộ Study Pack
                  </h3>
                  <p className="text-xs text-stone-500">
                    Làm mới summary, quiz, flashcard, Q&A từ nguồn học liệu gốc
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsRegenerateModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              {/* Nguồn học liệu gốc không bị mất */}
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1 text-amber-950">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Bảo toàn nguồn học liệu gốc ban đầu:</span>
                </div>
                <p className="text-stone-700 text-[11px] leading-relaxed">
                  Tác phẩm: <strong>"{currentVersion.sources.title}"</strong> ({currentVersion.sources.author}) · Thể loại: {currentVersion.sources.genre}.
                  <br />
                  Nguồn học liệu gốc cùng các version trước (như {currentVersion.label}) sẽ được giữ nguyên 100%, không bị ghi đè.
                </p>
              </div>

              {/* Các thành phần sẽ được làm mới */}
              <div className="space-y-2">
                <label className="block text-stone-700 font-bold uppercase tracking-wide text-[11px]">
                  Các nội dung sẽ được làm mới cho Version {versions.length + 1}:
                </label>
                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Tóm tắt mới (Summary)</span>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bộ câu hỏi mới (Q&A)</span>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Trắc nghiệm mới (Quiz)</span>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Thẻ ghi nhớ mới (Flashcard)</span>
                  </div>
                </div>
              </div>

              {/* Serverless Proxy Security Banner */}
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-amber-950 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cơ Chế Bảo Mật Serverless Proxy</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Ứng dụng gọi thông qua Proxy backend an toàn (<code className="font-mono text-amber-800 bg-amber-100/70 px-1 py-0.5 rounded">/api/regenerate-studypack</code>). Khóa API được bảo vệ trong biến môi trường máy chủ, tuyệt đối không lưu lộ trên trình duyệt người dùng.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegenerateModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer"
                  disabled={isRegenerating}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleConfirmRegenerate}
                  disabled={isRegenerating}
                  className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isRegenerating ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang Re-generate thành Version {versions.length + 1}...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Tạo thành Version {versions.length + 1} mới</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL B: KHU VỰC QUẢN LÝ VERSION CƠ BẢN (PROMPT 06)
         ======================================================== */}
      {isVersionsModalOpen && (
        <div
          onClick={() => setIsVersionsModalOpen(false)}
          className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh] cursor-default"
          >
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <GitBranch className="w-4 h-4 text-amber-800" />
                </div>
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-stone-900">
                    Khu Vực Quản Lý Version ({versions.length} phiên bản)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Xem danh sách cũ/mới, mở lại để học tiếp, so sánh hoặc xóa version
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVersionsModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 overflow-y-auto flex-1 text-xs">
              {versions.map((ver, idx) => {
                const isActive = ver.id === activeVersionId;
                const isLatest = idx === versions.length - 1;

                return (
                  <div
                    key={ver.id}
                    className={`p-4 rounded-xl border transition-all space-y-2.5 ${
                      isActive
                        ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-100'
                        : 'bg-white hover:bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif-display text-sm font-bold text-stone-900">
                            {ver.label}
                          </h4>

                          {ver.isOriginal && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                              Bản gốc SGK
                            </span>
                          )}

                          {isLatest && !ver.isOriginal && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                              Mới nhất
                            </span>
                          )}

                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white font-bold text-[10px]">
                              Đang học
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-stone-500 flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-stone-400" />
                            <span>{ver.createdAt}</span>
                          </span>
                          <span>·</span>
                          <span>{ver.discussionQuestions.length} câu hỏi Q&A</span>
                          <span>·</span>
                          <span>{ver.quizQuestions.length} câu Quiz</span>
                          <span>·</span>
                          <span>{ver.flashcards.length} thẻ Flashcard</span>
                        </div>

                        <p className="text-stone-600 text-[11px] line-clamp-2 italic pt-1">
                          "{ver.summary}"
                        </p>
                      </div>

                      {/* Các nút hành động: MỞ HỌC TIẾP, SO SÁNH, XÓA */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* NÚT 1: MỞ LẠI VERSION ĐỂ HỌC TIẾP */}
                        <button
                          onClick={() => handleSwitchVersion(ver)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-emerald-700 text-white'
                              : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
                          }`}
                          title="Nạp version này vào Chatbot và Study Pack"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>{isActive ? 'Đang mở' : 'Mở học tiếp'}</span>
                        </button>

                        {/* NÚT 2: SO SÁNH VỚI BẢN GỐC */}
                        <button
                          onClick={() => setCompareVersion(ver)}
                          className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold cursor-pointer"
                          title="So sánh nội dung với bản gốc v1"
                        >
                          <Split className="w-3.5 h-3.5" />
                        </button>

                        {/* NÚT 3: XÓA VERSION KHÔNG CẦN THIẾT */}
                        {!ver.isOriginal ? (
                          <button
                            onClick={(e) => handleDeleteVersion(ver.id, e)}
                            className="p-1.5 hover:bg-rose-100 rounded-lg text-stone-400 hover:text-rose-700 cursor-pointer"
                            title="Xóa version này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span
                            className="p-1.5 text-stone-300 cursor-not-allowed"
                            title="Bản gốc không thể xóa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
              <span className="text-stone-500 text-[11px]">
                Nguồn học liệu gốc ban đầu được lưu giữ an toàn trong Version v1.
              </span>
              <button
                onClick={() => setIsVersionsModalOpen(false)}
                className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-semibold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL C: SO SÁNH VERSION VỚI BẢN GỐC V1 */}
      {compareVersion && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2">
                <Split className="w-5 h-5 text-amber-800" />
                <h3 className="font-serif-display text-lg font-bold text-stone-900">
                  So Sánh: {compareVersion.label} vs Bản Gốc v1
                </h3>
              </div>
              <button
                onClick={() => setCompareVersion(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Cột 1: Bản gốc v1 */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <div className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                    <span>📖 Bản gốc SGK (v1)</span>
                  </div>
                  <div>
                    <strong>Tóm tắt cốt lõi:</strong>
                    <p className="mt-1 text-stone-700 leading-relaxed font-serif">
                      {versions[0]?.summary}
                    </p>
                  </div>
                  <div>
                    <strong>Tư tưởng chủ đạo:</strong>
                    <p className="mt-1 text-stone-600">{versions[0]?.ideologicalValue}</p>
                  </div>
                </div>

                {/* Cột 2: Version được chọn */}
                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3">
                  <div className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                    <span>✨ {compareVersion.label}</span>
                  </div>
                  <div>
                    <strong>Tóm tắt làm mới:</strong>
                    <p className="mt-1 text-stone-800 leading-relaxed font-serif">
                      {compareVersion.summary}
                    </p>
                  </div>
                  <div>
                    <strong>Tư tưởng bổ sung:</strong>
                    <p className="mt-1 text-stone-700">{compareVersion.ideologicalValue}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    handleSwitchVersion(compareVersion);
                    setCompareVersion(null);
                  }}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-semibold cursor-pointer shadow-xs"
                >
                  Kích hoạt và học tiếp với {compareVersion.label}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL D: LƯU SNAPSHOT WORKING COPY
         ======================================================== */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <Save className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-stone-900">
                    Lưu Snapshot Chủ Đề Này
                  </h3>
                  <p className="text-xs text-stone-500">
                    Lưu working copy ({currentVersion.label}) vào LocalStorage
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmSaveSnapshot} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Tên ngắn cho bản lưu (*):
                </label>
                <input
                  type="text"
                  value={saveSnapshotName}
                  onChange={(e) => setSaveSnapshotName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-semibold text-stone-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Ghi chú thêm:
                </label>
                <input
                  type="text"
                  value={saveSnapshotNotes}
                  onChange={(e) => setSaveSnapshotNotes(e.target.value)}
                  placeholder="Ghi chú cá nhân..."
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-700 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSaveModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Xác nhận lưu</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL E: DANH SÁCH BẢN LƯU SNAPSHOT
         ======================================================== */}
      {isListModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-emerald-700" />
                <h3 className="font-serif-display text-lg font-bold text-stone-900">
                  Bản Lưu Ôn Tập Đã Lưu ({savedSnapshots.length})
                </h3>
              </div>
              <button
                onClick={() => setIsListModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 overflow-y-auto flex-1 text-xs">
              {savedSnapshots.length === 0 ? (
                <div className="text-center py-8 text-stone-400">
                  Chưa có bản lưu nào được tạo.
                </div>
              ) : (
                savedSnapshots.map((snap) => (
                  <div key={snap.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-stone-900">{snap.name}</div>
                      <div className="text-[11px] text-stone-500">
                        {snap.subject} · Lưu lúc: {snap.metadata.savedDateFormatted}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleRestoreSnapshot(snap)}
                        className="px-3 py-1.5 bg-stone-900 text-white rounded-lg font-semibold cursor-pointer"
                      >
                        Mở
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Xóa bản lưu này?')) {
                            setSavedSnapshots(prev => prev.filter(s => s.id !== snap.id));
                            showToast('Đã xóa bản lưu.');
                          }
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          2. CHAT WINDOW: LỊCH SỬ HỎI ĐÁP & KHUNG NHẬP
         ======================================================== */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[600px] sm:h-[650px]">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#FAF8F5]/60">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isRefusal = msg.text.includes('Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp.');

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                    isUser
                      ? 'bg-amber-900 text-white'
                      : isRefusal
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[78%] space-y-1.5 ${isUser ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-2xs ${
                      isUser
                        ? 'bg-amber-900 text-white rounded-tr-xs font-medium'
                        : isRefusal
                        ? 'bg-rose-50/90 text-rose-950 border border-rose-200 rounded-tl-xs'
                        : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-xs'
                    }`}
                  >
                    {!isUser && (
                      <div className="pb-2 mb-2 border-b border-current/10 flex items-center justify-between gap-2 text-[11px]">
                        {isRefusal ? (
                          <span className="flex items-center gap-1 font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Ngoài phạm vi tài liệu</span>
                          </span>
                        ) : (
                          <div className="flex items-center gap-1 font-semibold text-emerald-800">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Grounded: {currentVersion.label}</span>
                          </div>
                        )}

                        <span className="text-stone-400 font-mono text-[10px]">{msg.timestamp}</span>
                      </div>
                    )}

                    <div className="leading-relaxed">{msg.text}</div>

                    {!isUser && msg.citationSources && msg.citationSources.length > 0 && (
                      <div className="pt-2 mt-2 border-t border-stone-100 flex flex-wrap items-center gap-1 text-[11px] text-stone-500">
                        <span className="font-semibold">Nguồn đối chiếu:</span>
                        {msg.citationSources.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 font-mono text-[10px]"
                          >
                            #{s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {!isUser && (
                    <div className="flex items-center gap-2 px-1 text-[11px] text-stone-400">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-stone-700 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Sao chép"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-medium">Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>

                      <span>·</span>

                      <button
                        onClick={() => handleSaveToNotebook(msg)}
                        className="hover:text-amber-800 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Lưu vào Sổ tay"
                      >
                        {savedNoteSuccess === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-medium">Đã lưu sổ tay</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3 h-3" />
                            <span>Lưu vào Sổ tay</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-stone-200 rounded-tl-xs shadow-2xs text-xs text-stone-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] font-medium text-stone-600">Đang đối chiếu {currentVersion.label}...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div className="p-3 bg-white border-t border-stone-100 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
            <span className="text-stone-400 font-bold text-[11px] shrink-0 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>Gợi ý câu hỏi:</span>
            </span>
            {suggestedPrompts.map((prompt: string, idx: number) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="px-3 py-1 bg-stone-50 hover:bg-amber-50 text-stone-700 hover:text-amber-950 border border-stone-200 rounded-full text-[11px] font-medium transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Khung nhập câu hỏi */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2"
          >
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`Hỏi về tác giả, tóm tắt, nghệ thuật hoặc câu hỏi ôn bài (${currentVersion.label})...`}
                rows={2}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-2xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none leading-relaxed"
                disabled={isLoading}
              />
              <div className="absolute right-3 bottom-2 text-[10px] text-stone-400 pointer-events-none">
                Bấm Enter để gửi
              </div>
            </div>

            <button
              type="submit"
              disabled={!inputQuestion.trim() || isLoading}
              className={`p-3.5 rounded-2xl font-semibold flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0 ${
                inputQuestion.trim() && !isLoading
                  ? 'bg-amber-800 hover:bg-amber-900 text-white active:scale-95'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
              title="Gửi câu hỏi"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-2 text-center text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Chatbot chỉ trả lời trong phạm vi <strong>sources</strong>, <strong>analysisPreview</strong> và <strong>studyPack</strong> của {currentVersion.label}.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
