import React, { useState, useEffect } from 'react';
import { 
  User, 
  Target, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Sparkles, 
  PenTool, 
  Award, 
  Calendar, 
  BookHeart, 
  Clock, 
  BookOpen, 
  Check, 
  Copy, 
  Edit3, 
  Save, 
  Flame, 
  Trophy, 
  TrendingUp, 
  Quote, 
  Compass, 
  ArrowRight,
  Printer,
  Download,
  Upload,
  HardDrive,
  FileJson,
  ShieldCheck,
  RefreshCw,
  FolderDown
} from 'lucide-react';
import { 
  StudentProfile, 
  StudyTask, 
  PersonalEssayDraft, 
  FavoriteQuoteEntry, 
  ExamScoreEntry,
  LiteraryWork
} from '../types/literature';
import { downloadTextFile, downloadJsonFile, safePrintContent } from '../utils/fileSaver';

interface PersonalLearningSpaceProps {
  allWorks: LiteraryWork[];
  onOpenWork: (work: LiteraryWork) => void;
}

export const PersonalLearningSpace: React.FC<PersonalLearningSpaceProps> = ({
  allWorks,
  onOpenWork
}) => {
  // 1. Profile State
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('nv7_my_profile');
      return saved ? JSON.parse(saved) : {
        name: 'Học sinh Ngữ văn 7',
        nickname: 'Người gieo vần',
        targetGrade: 9.0,
        favoriteGenre: 'Thơ trữ tình & Truyện ngắn',
        targetBook: 'ket_noi',
        motto: 'Mỗi ngày đọc một trang sách, mỗi tuần viết một bài văn sâu sắc.'
      };
    } catch {
      return {
        name: 'Học sinh Ngữ văn 7',
        nickname: 'Người gieo vần',
        targetGrade: 9.0,
        favoriteGenre: 'Thơ trữ tình & Truyện ngắn',
        targetBook: 'ket_noi',
        motto: 'Mỗi ngày đọc một trang sách, mỗi tuần viết một bài văn sâu sắc.'
      };
    }
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState<StudentProfile>(profile);

  // 2. Study Tasks State
  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    try {
      const saved = localStorage.getItem('nv7_my_tasks');
      return saved ? JSON.parse(saved) : [
        {
          id: 'task-1',
          title: 'Học thuộc lòng bài thơ "Đồng dao mùa xuân" (Nguyễn Khoa Điềm)',
          category: 'Học thuộc thơ',
          deadline: 'Hôm nay',
          completed: true,
          priority: 'high'
        },
        {
          id: 'task-2',
          title: 'Soạn 3 câu hỏi bài "Bầy chim chìa vôi" vào vở bài tập',
          category: 'Đọc hiểu',
          deadline: 'Ngày mai',
          completed: false,
          priority: 'high'
        },
        {
          id: 'task-3',
          title: 'Luyện 5 câu trắc nghiệm Phép nói giảm nói tránh',
          category: 'Tiếng Việt',
          deadline: 'Tuần này',
          completed: false,
          priority: 'medium'
        },
        {
          id: 'task-4',
          title: 'Lập dàn ý bài văn phân tích nhân vật Mon',
          category: 'Tập làm văn',
          deadline: 'Cuối tuần',
          completed: false,
          priority: 'medium'
        }
      ];
    } catch {
      return [];
    }
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<StudyTask['category']>('Đọc hiểu');
  const [newTaskPriority, setNewTaskPriority] = useState<StudyTask['priority']>('medium');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // 3. Personal Essays Drafts (Góc sáng tác & bài văn của riêng em)
  const [essays, setEssays] = useState<PersonalEssayDraft[]>(() => {
    try {
      const saved = localStorage.getItem('nv7_my_essays');
      return saved ? JSON.parse(saved) : [
        {
          id: 'essay-1',
          title: 'Khoảnh khắc cánh chim chìa vôi bay lên trong sớm mai',
          genre: 'Đoạn văn cảm thụ',
          prompt: 'Ghi lại cảm xúc về chi tiết bầy chim non cất cánh bay lên khỏi dải cát sông Đáy',
          bodyText: `Khi bình minh hé rạng trên dòng sông Đáy, khoảnh khắc bầy chim chìa vôi non nớt bứt phá bay lên khỏi dòng nước lũ đã làm lay động tâm can em. Những đôi cánh còn ướt sương, run rẩy nhưng chứa đựng sức sống diệu kỳ của muôn loài. Em thấu hiểu rằng: trong cuộc sống, bất kỳ thử thách cam go nào cũng có thể vượt qua nếu ta có đủ niềm tin và nghị lực. Giọt nước mắt của hai đứa trẻ trên bờ sông chính là món quà thanh khiết nhất dâng tặng mẹ thiên nhiên.`,
          wordCount: 104,
          updatedAt: '28/09/2026',
          reflectionNotes: 'Cần chú ý dùng thêm biện pháp tu từ ẩn dụ và liên hệ bản thân sâu sắc hơn.'
        }
      ];
    } catch {
      return [];
    }
  });

  const [editingEssayId, setEditingEssayId] = useState<string | null>(null);
  const [essayTitle, setEssayTitle] = useState('');
  const [essayGenre, setEssayGenre] = useState('Đoạn văn cảm thụ');
  const [essayPrompt, setEssayPrompt] = useState('');
  const [essayBody, setEssayBody] = useState('');
  const [essayNotes, setEssayNotes] = useState('');
  const [isCreatingEssay, setIsCreatingEssay] = useState(false);

  // 4. Favorite Quotes / Câu nói & Câu thơ em tâm đắc
  const [quotes, setQuotes] = useState<FavoriteQuoteEntry[]>(() => {
    try {
      const saved = localStorage.getItem('nv7_my_quotes');
      return saved ? JSON.parse(saved) : [
        {
          id: 'q-1',
          quote: '“Anh thành ngọn lửa / Bạn bè mang theo / Mười tám tuổi / Mùa xuân vĩnh hằng...”',
          source: 'Đồng dao mùa xuân',
          author: 'Nguyễn Khoa Điềm',
          meaning: 'Sự hi sinh của tuổi trẻ hòa vào màu xanh bất tử của non sông đất nước.',
          dateAdded: '28/09/2026'
        },
        {
          id: 'q-2',
          quote: '“Mẹ già như chuối ba hương / Dạt dào tình mẹ yêu thương ngút ngàn”',
          source: 'Gặp lá cơm nếp',
          author: 'Thanh Thảo',
          meaning: 'Tình mẫu tử thiêng liêng là cội nguồn sức mạnh nâng bước con trên mọi nẻo đường.',
          dateAdded: '28/09/2026'
        }
      ];
    } catch {
      return [];
    }
  });

  const [newQuoteText, setNewQuoteText] = useState('');
  const [newQuoteSource, setNewQuoteSource] = useState('');
  const [newQuoteAuthor, setNewQuoteAuthor] = useState('');
  const [newQuoteMeaning, setNewQuoteMeaning] = useState('');
  const [isAddingQuote, setIsAddingQuote] = useState(false);

  // 5. Exam Diary (Nhật ký điểm số & tự đánh giá)
  const [examScores, setExamScores] = useState<ExamScoreEntry[]>(() => {
    try {
      const saved = localStorage.getItem('nv7_my_scores');
      return saved ? JSON.parse(saved) : [
        {
          id: 'sc-1',
          title: 'Kiểm tra 15 phút - Thơ 4 chữ & 5 chữ',
          score: 9.0,
          maxScore: 10,
          date: '20/09/2026',
          type: '15 phút',
          notes: 'Phân tích tốt vần nhịp, cần viết câu mở bài mượt mà hơn.'
        },
        {
          id: 'sc-2',
          title: 'Bài tập Thực hành Tiếng Việt: Nói giảm nói tránh',
          score: 8.5,
          maxScore: 10,
          date: '25/09/2026',
          type: 'Tự luyện',
          notes: 'Nhớ kỹ quy tắc không lạm dụng khi giao tiếp thân mật.'
        }
      ];
    } catch {
      return [];
    }
  });

  const [newScoreTitle, setNewScoreTitle] = useState('');
  const [newScoreVal, setNewScoreVal] = useState<number>(9.0);
  const [newScoreType, setNewScoreType] = useState<ExamScoreEntry['type']>('15 phút');
  const [newScoreNotes, setNewScoreNotes] = useState('');
  const [isAddingScore, setIsAddingScore] = useState(false);

  // Active Subtab inside Personal Space
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'tasks' | 'essays' | 'quotes' | 'scores' | 'backup'>('overview');

  // Copied feedback & Backup states
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);
  const [restoreMessage, setRestoreMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [downloadedEssayId, setDownloadedEssayId] = useState<string | null>(null);
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<string>(() => new Date().toLocaleTimeString('vi-VN'));

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('nv7_my_profile', JSON.stringify(profile));
    setLastSavedTimestamp(new Date().toLocaleTimeString('vi-VN'));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('nv7_my_tasks', JSON.stringify(tasks));
    setLastSavedTimestamp(new Date().toLocaleTimeString('vi-VN'));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('nv7_my_essays', JSON.stringify(essays));
    setLastSavedTimestamp(new Date().toLocaleTimeString('vi-VN'));
  }, [essays]);

  useEffect(() => {
    localStorage.setItem('nv7_my_quotes', JSON.stringify(quotes));
    setLastSavedTimestamp(new Date().toLocaleTimeString('vi-VN'));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('nv7_my_scores', JSON.stringify(examScores));
    setLastSavedTimestamp(new Date().toLocaleTimeString('vi-VN'));
  }, [examScores]);

  // Export & Backup Functions
  const handleExportAllData = () => {
    try {
      const notesSaved = JSON.parse(localStorage.getItem('nv7_notes') || '[]');
      const bookmarksSaved = JSON.parse(localStorage.getItem('nv7_bookmarks') || '[]');
      const practiceQuestionsSaved = JSON.parse(localStorage.getItem('nv7_practice_questions') || '[]');
      const flashcardsSaved = JSON.parse(localStorage.getItem('nv7_flashcards') || '[]');
      const quizQuestionsSaved = JSON.parse(localStorage.getItem('nv7_quiz_questions') || '[]');
      const topicSnapshotsSaved = JSON.parse(localStorage.getItem('nv7_topic_snapshots') || '[]');

      const backupPayload = {
        app: 'Ngu_Van_7_Hoc_Tap',
        version: '1.0',
        exportedAt: new Date().toISOString(),
        profile,
        tasks,
        essays,
        quotes,
        examScores,
        notes: notesSaved,
        bookmarks: bookmarksSaved,
        practiceQuestions: practiceQuestionsSaved,
        flashcards: flashcardsSaved,
        quizQuestions: quizQuestionsSaved,
        topicSnapshots: topicSnapshotsSaved,
      };

      const dateStr = new Date().toLocaleDateString('vi-VN').replace(/\//g, '-');
      downloadJsonFile(`Ngu_Van_7_Du_lieu_cua_em_${dateStr}`, backupPayload);
      setBackupMessage('Đã sao lưu và tải xuống file dữ liệu học tập (.json) an toàn!');
      setTimeout(() => setBackupMessage(null), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);

        if (data.profile) setProfile(data.profile);
        if (Array.isArray(data.tasks)) setTasks(data.tasks);
        if (Array.isArray(data.essays)) setEssays(data.essays);
        if (Array.isArray(data.quotes)) setQuotes(data.quotes);
        if (Array.isArray(data.examScores)) setExamScores(data.examScores);
        if (Array.isArray(data.notes)) localStorage.setItem('nv7_notes', JSON.stringify(data.notes));
        if (Array.isArray(data.bookmarks)) localStorage.setItem('nv7_bookmarks', JSON.stringify(data.bookmarks));
        if (Array.isArray(data.practiceQuestions)) localStorage.setItem('nv7_practice_questions', JSON.stringify(data.practiceQuestions));
        if (Array.isArray(data.flashcards)) localStorage.setItem('nv7_flashcards', JSON.stringify(data.flashcards));
        if (Array.isArray(data.quizQuestions)) localStorage.setItem('nv7_quiz_questions', JSON.stringify(data.quizQuestions));
        if (Array.isArray(data.topicSnapshots)) localStorage.setItem('nv7_topic_snapshots', JSON.stringify(data.topicSnapshots));

        setRestoreMessage({
          text: `Khôi phục thành công! Đã nạp ${data.essays?.length || 0} bài văn, ${data.quotes?.length || 0} câu trích dẫn, ${data.examScores?.length || 0} điểm số, ${data.flashcards?.length || 0} flashcard và ${data.topicSnapshots?.length || 0} bản lưu ôn tập.`,
          success: true
        });
        setTimeout(() => setRestoreMessage(null), 6000);
      } catch (err) {
        setRestoreMessage({
          text: 'File sao lưu không hợp lệ hoặc bị lỗi định dạng. Vui lòng kiểm tra lại file .json!',
          success: false
        });
        setTimeout(() => setRestoreMessage(null), 5000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownloadCombinedPortfolio = () => {
    let doc = `TẬP SAN VĂN HỌC & GHI CHÉP CỦA RIÊNG EM - LỚP 7\n`;
    doc += `Học sinh: ${profile.name} (${profile.nickname})\n`;
    doc += `Bộ sách: ${profile.targetBook === 'ket_noi' ? 'Kết nối tri thức' : profile.targetBook === 'canh_dieu' ? 'Cánh diều' : 'Chân trời sáng tạo'}\n`;
    doc += `Châm ngôn: "${profile.motto}"\n`;
    doc += `Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}\n`;
    doc += `=========================================================\n\n`;

    doc += `PHẦN I: CÁC BÀI VĂN & ĐOẠN CẢM THỤ TỰ SÁNG TÁC (${essays.length} BÀI)\n\n`;
    essays.forEach((essay, idx) => {
      doc += `[Bài ${idx + 1}] ${essay.title.toUpperCase()}\n`;
      doc += `Thể loại: ${essay.genre} · Ngày viết: ${essay.updatedAt} · Độ dài: ${essay.wordCount} từ\n`;
      if (essay.prompt) doc += `Đề tài: ${essay.prompt}\n`;
      doc += `---------------------------------------------------------\n`;
      doc += `${essay.bodyText}\n\n`;
      if (essay.reflectionNotes) doc += `* Nhận xét tự rút kinh nghiệm: ${essay.reflectionNotes}\n\n`;
      doc += `\n`;
    });

    doc += `=========================================================\n`;
    doc += `PHẦN II: KHO CÂU NÓI & DẪN CHỨNG ĐẮT GIÁ (${quotes.length} CÂU)\n\n`;
    quotes.forEach((q, idx) => {
      doc += `${idx + 1}. ${q.quote}\n`;
      doc += `   Nguồn: ${q.source} - Tác giả: ${q.author}\n`;
      doc += `   Ý nghĩa: ${q.meaning}\n\n`;
    });

    downloadTextFile(`Tap_san_van_hoc_${profile.name.replace(/\s+/g, '_')}`, doc);
  };

  const handleDownloadSingleEssay = (draft: PersonalEssayDraft) => {
    let content = `BÀI LÀM VĂN LỚP 7: ${draft.title.toUpperCase()}\n`;
    content += `Tác giả: ${profile.name} (${profile.nickname})\n`;
    content += `Thể loại: ${draft.genre} · Ngày viết: ${draft.updatedAt}\n`;
    if (draft.prompt) content += `Đề bài gợi ý: ${draft.prompt}\n`;
    content += `Số lượng từ: ${draft.wordCount} từ\n`;
    content += `=========================================================\n\n`;
    content += `${draft.bodyText}\n\n`;
    if (draft.reflectionNotes) {
      content += `=========================================================\n`;
      content += `Ghi chú rút kinh nghiệm:\n${draft.reflectionNotes}\n`;
    }

    downloadTextFile(`Bai_van_${draft.title.slice(0, 30).replace(/\s+/g, '_')}`, content);
    setDownloadedEssayId(draft.id);
    setTimeout(() => setDownloadedEssayId(null), 2000);
  };

  const handlePrintSingleEssay = (draft: PersonalEssayDraft) => {
    let content = `BÀI LÀM VĂN: ${draft.title}\n`;
    content += `Học sinh: ${profile.name} · Thể loại: ${draft.genre}\n\n`;
    if (draft.prompt) content += `Đề bài: ${draft.prompt}\n\n`;
    content += `${draft.bodyText}\n\n`;
    if (draft.reflectionNotes) content += `Nhận xét: ${draft.reflectionNotes}\n`;
    safePrintContent(draft.title, content, `Bài văn của ${profile.name} · Ngữ văn 7`);
  };

  const [downloadedQuotesState, setDownloadedQuotesState] = useState(false);
  const [downloadedScoresState, setDownloadedScoresState] = useState(false);
  const [downloadedTasksState, setDownloadedTasksState] = useState(false);

  const handleDownloadAllQuotes = () => {
    if (quotes.length === 0) return;
    let doc = `KHO DẪN CHỨNG & CÂU THƠ / CÂU VĂN ĐẮT GIÁ - NGỮ VĂN 7\n`;
    doc += `Học sinh: ${profile.name} (${profile.nickname})\n`;
    doc += `Ngày tải về: ${new Date().toLocaleDateString('vi-VN')}\n`;
    doc += `Tổng số dẫn chứng: ${quotes.length} câu\n`;
    doc += `=========================================================\n\n`;

    quotes.forEach((q, idx) => {
      doc += `[Dẫn chứng ${idx + 1}] ${q.quote}\n`;
      doc += `Tác phẩm / Nguồn: ${q.source} - Tác giả: ${q.author}\n`;
      if (q.meaning) doc += `Ý nghĩa & Ứng dụng: ${q.meaning}\n`;
      doc += `Ngày lưu: ${q.dateAdded}\n\n`;
      doc += `---------------------------------------------------------\n\n`;
    });

    downloadTextFile(`Kho_dan_chung_Ngu_van_7_${profile.name.replace(/\s+/g, '_')}`, doc);
    setDownloadedQuotesState(true);
    setTimeout(() => setDownloadedQuotesState(false), 2000);
  };

  const handlePrintAllQuotes = () => {
    if (quotes.length === 0) return;
    let doc = `TỔNG HỢP DẪN CHỨNG VĂN HỌC LỚP 7\n\n`;
    quotes.forEach((q, idx) => {
      doc += `${idx + 1}. ${q.quote}\n(${q.source} - ${q.author})\nÝ nghĩa: ${q.meaning}\n\n`;
    });
    safePrintContent('Kho Dẫn Chứng Ngữ Văn 7', doc, `Sưu tầm bởi ${profile.name}`);
  };

  const handleDownloadScoreHistory = () => {
    if (examScores.length === 0) return;
    let doc = `NHẬT KÝ ĐIỂM SỐ & THEO DÕI TIẾN BỘ NGỮ VĂN 7\n`;
    doc += `Học sinh: ${profile.name} (${profile.nickname})\n`;
    doc += `Mục tiêu điểm số: ${profile.targetGrade}/10\n`;
    doc += `Ngày tải về: ${new Date().toLocaleDateString('vi-VN')}\n`;
    doc += `=========================================================\n\n`;

    examScores.forEach((s, idx) => {
      doc += `[Bài ${idx + 1}] ${s.title}\n`;
      doc += `Điểm: ${s.score}/${s.maxScore} · Loại: ${s.type} · Ngày làm: ${s.date}\n`;
      if (s.notes) doc += `Nhận xét: ${s.notes}\n`;
      doc += `---------------------------------------------------------\n\n`;
    });

    downloadTextFile(`Nhat_ky_diem_so_Ngu_van_7_${profile.name.replace(/\s+/g, '_')}`, doc);
    setDownloadedScoresState(true);
    setTimeout(() => setDownloadedScoresState(false), 2000);
  };

  const handlePrintScoreHistory = () => {
    if (examScores.length === 0) return;
    let doc = `BẢNG THEO DÕI ĐIỂM SỐ NGỮ VĂN 7\n\n`;
    examScores.forEach((s, idx) => {
      doc += `${idx + 1}. ${s.title}: ${s.score}/${s.maxScore} điểm (${s.date})\nNhận xét: ${s.notes}\n\n`;
    });
    safePrintContent('Nhật Ký Điểm Số Ngữ Văn 7', doc, `Học sinh: ${profile.name}`);
  };

  const handleDownloadTasksList = () => {
    if (tasks.length === 0) return;
    let doc = `DANH SÁCH NHIỆM VỤ HỌC TẬP NGỮ VĂN 7\n`;
    doc += `Học sinh: ${profile.name}\n`;
    doc += `Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}\n`;
    doc += `=========================================================\n\n`;

    tasks.forEach((t, idx) => {
      doc += `[${t.completed ? 'X' : ' '}] ${idx + 1}. ${t.title}\n`;
      doc += `Phân môn: ${t.category} · Mức ưu tiên: ${t.priority} · Hạn chót: ${t.deadline}\n\n`;
    });

    downloadTextFile(`Nhiem_vu_hoc_tap_Ngu_van_7`, doc);
    setDownloadedTasksState(true);
    setTimeout(() => setDownloadedTasksState(false), 2000);
  };

  const handlePrintTasksList = () => {
    if (tasks.length === 0) return;
    let doc = `KẾ HOẠCH HỌC TẬP NGỮ VĂN 7\n\n`;
    tasks.forEach((t, idx) => {
      doc += `[${t.completed ? 'Đã xong' : 'Chưa xong'}] ${idx + 1}. ${t.title} (${t.category} - Hạn: ${t.deadline})\n`;
    });
    safePrintContent('Kế Hoạch Học Tập Ngữ Văn 7', doc, `Học sinh: ${profile.name}`);
  };

  const handleForceSaveAll = () => {
    try {
      localStorage.setItem('nv7_my_profile', JSON.stringify(profile));
      localStorage.setItem('nv7_my_tasks', JSON.stringify(tasks));
      localStorage.setItem('nv7_my_essays', JSON.stringify(essays));
      localStorage.setItem('nv7_my_quotes', JSON.stringify(quotes));
      localStorage.setItem('nv7_my_scores', JSON.stringify(examScores));
      setLastSavedTimestamp(new Date().toLocaleTimeString('vi-VN'));
      setBackupMessage('Toàn bộ thông tin học tập của bạn đã được lưu an toàn tuyệt đối!');
      setTimeout(() => setBackupMessage(null), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  // Handlers for Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(tempProfile);
    setIsEditingProfile(false);
  };

  // Handlers for Tasks
  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: StudyTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
      deadline: newTaskDeadline.trim() || 'Hôm nay',
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setNewTaskDeadline('');
    setIsAddingTask(false);
  };

  // Handlers for Essays
  const handleSaveEssay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!essayTitle.trim() || !essayBody.trim()) return;

    const words = essayBody.trim().split(/\s+/).filter(Boolean).length;

    if (editingEssayId) {
      setEssays(prev => prev.map(item => item.id === editingEssayId ? {
        ...item,
        title: essayTitle.trim(),
        genre: essayGenre,
        prompt: essayPrompt.trim(),
        bodyText: essayBody.trim(),
        reflectionNotes: essayNotes.trim(),
        wordCount: words,
        updatedAt: new Date().toLocaleDateString('vi-VN')
      } : item));
    } else {
      const newDraft: PersonalEssayDraft = {
        id: `draft-${Date.now()}`,
        title: essayTitle.trim(),
        genre: essayGenre,
        prompt: essayPrompt.trim(),
        bodyText: essayBody.trim(),
        reflectionNotes: essayNotes.trim(),
        wordCount: words,
        updatedAt: new Date().toLocaleDateString('vi-VN')
      };
      setEssays([newDraft, ...essays]);
    }

    setEditingEssayId(null);
    setIsCreatingEssay(false);
    setEssayTitle('');
    setEssayBody('');
    setEssayPrompt('');
    setEssayNotes('');
  };

  const handleStartEditEssay = (draft: PersonalEssayDraft) => {
    setEditingEssayId(draft.id);
    setEssayTitle(draft.title);
    setEssayGenre(draft.genre);
    setEssayPrompt(draft.prompt);
    setEssayBody(draft.bodyText);
    setEssayNotes(draft.reflectionNotes || '');
    setIsCreatingEssay(true);
  };

  const handleDeleteEssay = (id: string) => {
    setEssays(prev => prev.filter(e => e.id !== id));
  };

  // Handlers for Quotes
  const handleAddQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuoteText.trim() || !newQuoteSource.trim()) return;
    const newQ: FavoriteQuoteEntry = {
      id: `q-${Date.now()}`,
      quote: newQuoteText.trim(),
      source: newQuoteSource.trim(),
      author: newQuoteAuthor.trim() || 'Khuyết danh',
      meaning: newQuoteMeaning.trim() || 'Câu nói / dẫn chứng giàu cảm xúc để đưa vào bài tập làm văn.',
      dateAdded: new Date().toLocaleDateString('vi-VN')
    };
    setQuotes([newQ, ...quotes]);
    setNewQuoteText('');
    setNewQuoteSource('');
    setNewQuoteAuthor('');
    setNewQuoteMeaning('');
    setIsAddingQuote(false);
  };

  const handleDeleteQuote = (id: string) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
  };

  const handleCopyQuote = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuoteId(id);
    setTimeout(() => setCopiedQuoteId(null), 2000);
  };

  // Handlers for Scores
  const handleAddScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScoreTitle.trim()) return;
    const newEntry: ExamScoreEntry = {
      id: `sc-${Date.now()}`,
      title: newScoreTitle.trim(),
      score: Number(newScoreVal),
      maxScore: 10,
      date: new Date().toLocaleDateString('vi-VN'),
      type: newScoreType,
      notes: newScoreNotes.trim()
    };
    setExamScores([newEntry, ...examScores]);
    setNewScoreTitle('');
    setNewScoreNotes('');
    setIsAddingScore(false);
  };

  const handleDeleteScore = (id: string) => {
    setExamScores(prev => prev.filter(s => s.id !== id));
  };

  // Calculation Metrics
  const completedTasksCount = tasks.filter(t => t.completed).length;
  const taskProgress = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;
  const averageScore = examScores.length > 0 
    ? (examScores.reduce((acc, curr) => acc + curr.score, 0) / examScores.length).toFixed(1)
    : '0';

  return (
    <div className="space-y-8">
      {/* 1. Header Banner & Profile Strip */}
      <div className="bg-gradient-to-br from-amber-950 via-stone-900 to-stone-950 rounded-3xl p-6 sm:p-8 text-white border border-stone-800 shadow-sm relative overflow-hidden">
        {/* Subtle decorative quote */}
        <div className="absolute top-4 right-6 opacity-10 text-white pointer-events-none select-none">
          <Quote className="w-32 h-32" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300 font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Góc học tập & Không gian cá nhân</span>
              <span aria-hidden="true">·</span>
              <span>Lớp 7</span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <span>Xin chào, {profile.name}!</span>
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {profile.nickname}
              </span>
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm italic max-w-2xl leading-relaxed">
              "{profile.motto}"
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-stone-400">
              <span>Sách đang học: <strong className="text-stone-200">
                {profile.targetBook === 'ket_noi' ? 'Kết nối tri thức' : profile.targetBook === 'canh_dieu' ? 'Cánh diều' : 'Chân trời sáng tạo'}
              </strong></span>
              <span aria-hidden="true">·</span>
              <span>Sở thích: <strong className="text-stone-200">{profile.favoriteGenre}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Mục tiêu điểm số: <strong className="text-amber-400 font-mono text-sm">{profile.targetGrade}/10</strong></span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/80 border border-stone-800 text-[11px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Đã lưu tự động ({lastSavedTimestamp})</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleForceSaveAll}
                className="px-3.5 py-2 bg-stone-800/80 hover:bg-stone-800 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 hover:border-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Lưu dữ liệu vào bộ nhớ máy ngay bây giờ"
              >
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lưu lại ngay</span>
              </button>

              <button
                onClick={() => setActiveSubTab('backup')}
                className="px-3.5 py-2 bg-amber-800/90 hover:bg-amber-800 text-amber-100 text-xs font-semibold rounded-xl border border-amber-700 hover:border-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Trung tâm sao lưu và xuất dữ liệu"
              >
                <HardDrive className="w-3.5 h-3.5 text-amber-300" />
                <span>Sao lưu & Xuất</span>
              </button>

              <button
                onClick={() => {
                  setTempProfile(profile);
                  setIsEditingProfile(true);
                }}
                className="px-3.5 py-2 bg-stone-800/80 hover:bg-stone-800 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 hover:border-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Sửa hồ sơ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-800/80">
          <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
            <div className="text-[11px] text-stone-400">Tiến độ nhiệm vụ</div>
            <div className="font-mono text-lg font-bold text-emerald-400 tabular-nums">
              {completedTasksCount}/{tasks.length} <span className="text-xs text-stone-400 font-sans">({taskProgress}%)</span>
            </div>
          </div>
          <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
            <div className="text-[11px] text-stone-400">Bài văn em sáng tác</div>
            <div className="font-mono text-lg font-bold text-amber-400 tabular-nums">
              {essays.length} <span className="text-xs text-stone-400 font-sans">bài viết</span>
            </div>
          </div>
          <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
            <div className="text-[11px] text-stone-400">Kho câu hay tâm đắc</div>
            <div className="font-mono text-lg font-bold text-sky-400 tabular-nums">
              {quotes.length} <span className="text-xs text-stone-400 font-sans">câu thơ/văn</span>
            </div>
          </div>
          <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
            <div className="text-[11px] text-stone-400">Điểm trung bình tự luyện</div>
            <div className="font-mono text-lg font-bold text-rose-400 tabular-nums">
              {averageScore} <span className="text-xs text-stone-400 font-sans">/ 10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif-display text-lg font-bold text-stone-900 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-800" />
                <span>Thiết lập Góc học tập của riêng em</span>
              </h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Tên của em</label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Biệt danh / Danh hiệu văn học yêu thích</label>
                <input
                  type="text"
                  value={tempProfile.nickname}
                  onChange={(e) => setTempProfile({ ...tempProfile, nickname: e.target.value })}
                  placeholder="Ví dụ: Người yêu thơ, Cây bút trẻ, Thám tử văn học..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Mục tiêu điểm Văn</label>
                  <input
                    type="number"
                    step="0.1"
                    min="5"
                    max="10"
                    value={tempProfile.targetGrade}
                    onChange={(e) => setTempProfile({ ...tempProfile, targetGrade: Number(e.target.value) })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Bộ sách ở trường</label>
                  <select
                    value={tempProfile.targetBook}
                    onChange={(e) => setTempProfile({ ...tempProfile, targetBook: e.target.value as any })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="ket_noi">Kết nối tri thức</option>
                    <option value="canh_dieu">Cánh diều</option>
                    <option value="chan_troi">Chân trời sáng tạo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Thể loại văn học em yêu thích nhất</label>
                <input
                  type="text"
                  value={tempProfile.favoriteGenre}
                  onChange={(e) => setTempProfile({ ...tempProfile, favoriteGenre: e.target.value })}
                  placeholder="Ví dụ: Thơ 4 chữ, Truyện ngắn Nam Bộ, Ngụ ngôn..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Châm ngôn học tập của em</label>
                <textarea
                  value={tempProfile.motto}
                  onChange={(e) => setTempProfile({ ...tempProfile, motto: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-3 py-1.5 bg-stone-100 text-stone-600 hover:bg-stone-200 rounded-lg cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-lg cursor-pointer"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Sub-tab Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl max-w-3xl overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'overview'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Tổng quan & Kế hoạch
        </button>
        <button
          onClick={() => setActiveSubTab('tasks')}
          className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'tasks'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <span>Nhiệm vụ học tập</span>
          <span className="font-mono text-[10px] px-1.5 py-0.2 bg-stone-200 rounded-full">
            {tasks.filter(t => !t.completed).length}
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('essays')}
          className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'essays'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Góc sáng tác của em ({essays.length})
        </button>
        <button
          onClick={() => setActiveSubTab('quotes')}
          className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'quotes'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Kho dẫn chứng đắt giá ({quotes.length})
        </button>
        <button
          onClick={() => setActiveSubTab('scores')}
          className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'scores'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Nhật ký điểm số ({examScores.length})
        </button>
        <button
          onClick={() => setActiveSubTab('backup')}
          className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'backup'
              ? 'bg-amber-900 text-white shadow-xs'
              : 'text-amber-900 bg-amber-50 hover:bg-amber-100 font-bold'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Sao lưu & Quản lý dữ liệu</span>
        </button>
      </div>

      {/* Global Notification Alerts for Backup/Restore/Save */}
      {backupMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-950 flex items-center justify-between shadow-2xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{backupMessage}</span>
          </div>
          <span className="text-emerald-700 text-xs font-mono">{lastSavedTimestamp}</span>
        </div>
      )}

      {restoreMessage && (
        <div className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center justify-between shadow-2xs animate-in fade-in duration-200 border ${
          restoreMessage.success ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
        }`}>
          <div className="flex items-center gap-2.5">
            {restoreMessage.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span className="font-semibold">{restoreMessage.text}</span>
          </div>
        </div>
      )}

      {/* 3. SUBTAB: OVERVIEW (TỔNG QUAN) */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Task Widget */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-display text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-700" />
                  <span>Kế hoạch tuần này của em</span>
                </h3>
                <button
                  onClick={() => setActiveSubTab('tasks')}
                  className="text-xs text-amber-800 hover:underline font-semibold cursor-pointer"
                >
                  Xem tất cả ({tasks.length}) →
                </button>
              </div>

              <div className="space-y-2.5">
                {tasks.slice(0, 4).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(task.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      task.completed
                        ? 'bg-stone-50 border-stone-200 text-stone-400 line-through'
                        : 'bg-white border-stone-200 hover:border-amber-400 text-stone-800 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-300 hover:text-amber-600 shrink-0" />
                      )}
                      <div>
                        <div className="text-xs sm:text-sm font-medium">{task.title}</div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-2">
                          <span>{task.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-800 font-semibold">{task.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold shrink-0 ${
                      task.priority === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {task.priority === 'high' ? 'Gấp' : 'Bình thường'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Inspiration / Gợi ý hôm nay */}
            <div className="bg-amber-50/70 rounded-2xl border border-amber-200/80 p-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-amber-900 font-bold flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Lời khuyên học tốt mỗi ngày</span>
                </div>
                <h4 className="font-serif-display text-base font-bold text-amber-950 mb-2">
                  Cách tạo mở bài ấn tượng cho bài văn nghị luận
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Thay vì mở bài trực tiếp "Hôm nay em xin phân tích...", hãy thử dẫn dắt bằng một hình ảnh tương đồng hoặc một câu danh ngôn: <em>"Như một ngọn đèn không bao giờ tắt giữa đêm giông..."</em>. Điều này giúp bài văn của em đạt điểm 9+ ngay từ 3 dòng đầu tiên!
                </p>
              </div>

              <div className="pt-4 border-t border-amber-200 text-xs">
                <button
                  onClick={() => setActiveSubTab('quotes')}
                  className="w-full py-2 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-xl transition-colors cursor-pointer text-center"
                >
                  Mở kho câu dẫn chứng mẫu
                </button>
              </div>
            </div>
          </div>

          {/* Quick Essay Preview */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-display text-lg font-bold text-stone-900 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-amber-700" />
                  <span>Bài văn tự sáng tác gần nhất của em</span>
                </h3>
                <p className="text-xs text-stone-500">Nơi rèn luyện ngòi bút và cảm xúc chân thật</p>
              </div>
              <button
                onClick={() => {
                  setEditingEssayId(null);
                  setEssayTitle('');
                  setEssayBody('');
                  setEssayPrompt('');
                  setEssayNotes('');
                  setIsCreatingEssay(true);
                  setActiveSubTab('essays');
                }}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Viết bài mới</span>
              </button>
            </div>

            {essays.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-500 bg-stone-50 rounded-xl border border-stone-200">
                Em chưa có bài văn tự sáng tác nào. Hãy nhấp "Viết bài mới" để ghi lại những dòng cảm thụ của riêng em!
              </div>
            ) : (
              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-amber-800">{essays[0].genre}</span>
                  <span className="font-mono">{essays[0].updatedAt} · {essays[0].wordCount} từ</span>
                </div>
                <h4 className="font-serif-display text-base font-bold text-stone-900">
                  {essays[0].title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 line-clamp-3 leading-relaxed font-serif-display">
                  {essays[0].bodyText}
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      handleStartEditEssay(essays[0]);
                      setActiveSubTab('essays');
                    }}
                    className="text-xs text-amber-800 hover:text-amber-950 font-semibold cursor-pointer"
                  >
                    Xem chi tiết & Chỉnh sửa →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. SUBTAB: TASKS (NHIỆM VỤ HỌC TẬP) */}
      {activeSubTab === 'tasks' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-serif-display text-xl font-bold text-stone-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-800" />
                <span>Kế Hoạch & Nhiệm Vụ Học Tập Ngữ Văn 7</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Chia nhỏ các bài học thành mục tiêu rõ ràng giúp em tự giác và tiến bộ nhanh hơn mỗi ngày.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              {tasks.length > 0 && (
                <>
                  <button
                    onClick={handleDownloadTasksList}
                    className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-stone-200"
                    title="Tải kế hoạch nhiệm vụ (.txt)"
                  >
                    {downloadedTasksState ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Đã tải về</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-stone-600" />
                        <span>Tải về (.txt)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrintTasksList}
                    className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-stone-200"
                    title="In kế hoạch nhiệm vụ"
                  >
                    <Printer className="w-3.5 h-3.5 text-stone-600" />
                    <span>In</span>
                  </button>
                </>
              )}

              {!isAddingTask && (
                <button
                  onClick={() => setIsAddingTask(true)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm nhiệm vụ mới</span>
                </button>
              )}
            </div>
          </div>

          {/* Add Task Form */}
          {isAddingTask && (
            <form onSubmit={handleAddTask} className="p-5 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-3 animate-in fade-in duration-200">
              <div className="font-bold text-xs uppercase text-amber-900">Nhiệm vụ học tập mới của em</div>
              <input
                type="text"
                placeholder="Ví dụ: Ôn lại 3 biện pháp tu từ trong bài thơ Đồng dao mùa xuân..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Phân môn</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value as any)}
                    className="w-full p-2 bg-white border border-stone-300 rounded-lg focus:outline-none"
                  >
                    <option value="Đọc hiểu">Đọc hiểu</option>
                    <option value="Tiếng Việt">Tiếng Việt</option>
                    <option value="Tập làm văn">Tập làm văn</option>
                    <option value="Học thuộc thơ">Học thuộc thơ</option>
                    <option value="Ôn thi">Ôn thi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Mức độ ưu tiên</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full p-2 bg-white border border-stone-300 rounded-lg focus:outline-none"
                  >
                    <option value="high">Gấp / Quan trọng</option>
                    <option value="medium">Bình thường</option>
                    <option value="low">Thư thả</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Thời hạn hoàn thành</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Tối nay, Thứ Năm..."
                    value={newTaskDeadline}
                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                    className="w-full p-2 bg-white border border-stone-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="px-3 py-1.5 bg-white text-stone-600 border border-stone-200 rounded-lg text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-lg text-xs cursor-pointer"
                >
                  Lưu nhiệm vụ
                </button>
              </div>
            </form>
          )}

          {/* Task List */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                  task.completed
                    ? 'bg-stone-50 border-stone-200 text-stone-400'
                    : 'bg-white border-stone-200 hover:border-stone-300 shadow-2xs'
                }`}
              >
                <div
                  onClick={() => handleToggleTask(task.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-stone-300 hover:text-amber-600 shrink-0" />
                  )}
                  <div>
                    <div className={`text-xs sm:text-sm font-medium ${task.completed ? 'line-through' : 'text-stone-900'}`}>
                      {task.title}
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                      <span className="font-semibold text-amber-800">{task.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Hạn: {task.deadline || 'Trong tuần'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                    task.priority === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {task.priority === 'high' ? 'Gấp' : 'Bình thường'}
                  </span>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Xóa nhiệm vụ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SUBTAB: PERSONAL ESSAYS (GÓC SÁNG TÁC) */}
      {activeSubTab === 'essays' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif-display text-xl font-bold text-stone-900 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-amber-800" />
                <span>Góc Sáng Tác & Bài Làm Văn Của Riêng Em</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Nơi em tự do viết đoạn văn cảm thụ, bài phân tích hay thử sức làm thơ bốn chữ, năm chữ.
              </p>
            </div>

            {!isCreatingEssay && (
              <button
                onClick={() => {
                  setEditingEssayId(null);
                  setEssayTitle('');
                  setEssayBody('');
                  setEssayPrompt('');
                  setEssayNotes('');
                  setIsCreatingEssay(true);
                }}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Viết bài văn mới</span>
              </button>
            )}
          </div>

          {/* Form Create / Edit Essay */}
          {isCreatingEssay && (
            <form onSubmit={handleSaveEssay} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h4 className="font-serif-display text-base font-bold text-stone-900">
                  {editingEssayId ? 'Chỉnh sửa bài viết' : 'Soạn bài viết mới'}
                </h4>
                <button
                  type="button"
                  onClick={() => setIsCreatingEssay(false)}
                  className="text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
                >
                  Đóng lại
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Nhan đề bài viết của em
                  </label>
                  <input
                    type="text"
                    value={essayTitle}
                    onChange={(e) => setEssayTitle(e.target.value)}
                    placeholder="Ví dụ: Suy ngẫm về tình mẫu tử qua bài thơ Gặp lá cơm nếp"
                    className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Thể loại
                  </label>
                  <select
                    value={essayGenre}
                    onChange={(e) => setEssayGenre(e.target.value)}
                    className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Đoạn văn cảm thụ">Đoạn văn cảm thụ</option>
                    <option value="Bài văn phân tích nhân vật">Bài văn phân tích nhân vật</option>
                    <option value="Bài văn nghị luận xã hội">Bài văn nghị luận xã hội</option>
                    <option value="Tự sáng tác thơ 4-5 chữ">Tự sáng tác thơ 4-5 chữ</option>
                    <option value="Tản văn / Tùy bút tuổi học trò">Tản văn / Tùy bút tuổi học trò</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Đề bài / Cảm hứng gợi ý (Nếu có)
                </label>
                <input
                  type="text"
                  value={essayPrompt}
                  onChange={(e) => setEssayPrompt(e.target.value)}
                  placeholder="Ví dụ: Ghi lại cảm xúc của em sau khi đọc bài thơ Đồng dao mùa xuân..."
                  className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-stone-700 uppercase">
                    Nội dung bài viết
                  </label>
                  <span className="font-mono text-xs text-stone-500">
                    Số từ: {essayBody.trim().split(/\s+/).filter(Boolean).length} từ
                  </span>
                </div>
                <textarea
                  value={essayBody}
                  onChange={(e) => setEssayBody(e.target.value)}
                  placeholder="Hãy để ngòi bút của em tự do bay bổng cùng những câu chữ..."
                  rows={10}
                  className="w-full p-3.5 text-sm font-serif-display bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Ghi chú tự rút kinh nghiệm (Thầy cô nhận xét / Điểm cần sửa)
                </label>
                <input
                  type="text"
                  value={essayNotes}
                  onChange={(e) => setEssayNotes(e.target.value)}
                  placeholder="Ví dụ: Cần bớt lặp từ 'rất', bổ sung thêm trích dẫn câu thơ ở đoạn kết..."
                  className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingEssay(false)}
                  className="px-3 py-1.5 bg-stone-100 text-stone-600 rounded-lg text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Lưu bài viết
                </button>
              </div>
            </form>
          )}

          {/* List of Essays */}
          <div className="space-y-4">
            {essays.map((draft) => (
              <div
                key={draft.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="font-semibold text-amber-800">{draft.genre}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{draft.updatedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{draft.wordCount} từ</span>
                    </div>
                    <h4 className="font-serif-display text-lg font-bold text-stone-900 mt-0.5">
                      {draft.title}
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => handleDownloadSingleEssay(draft)}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      title="Tải bài viết về máy (.txt)"
                    >
                      {downloadedEssayId === draft.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Đã tải</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3 h-3 text-stone-600" />
                          <span>Tải về</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handlePrintSingleEssay(draft)}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      title="In bài làm văn"
                    >
                      <Printer className="w-3 h-3 text-stone-600" />
                      <span>In bài</span>
                    </button>

                    <button
                      onClick={() => handleStartEditEssay(draft)}
                      className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => handleDeleteEssay(draft.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                      title="Xóa bài viết"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {draft.prompt && (
                  <div className="p-2.5 bg-stone-50 rounded-lg text-xs text-stone-600 italic border border-stone-200/60">
                    <span className="font-semibold not-italic text-stone-800">Đề bài gợi ý:</span> {draft.prompt}
                  </div>
                )}

                <div className="font-serif-display text-stone-800 text-sm leading-relaxed whitespace-pre-line p-4 bg-stone-50/50 rounded-xl border border-stone-200/50">
                  {draft.bodyText}
                </div>

                {draft.reflectionNotes && (
                  <div className="text-xs text-amber-900 bg-amber-50 p-3 rounded-lg border border-amber-200/80">
                    <span className="font-bold">Kinh nghiệm của em:</span> {draft.reflectionNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SUBTAB: FAVORITE QUOTES (KHO DẪN CHỨNG) */}
      {activeSubTab === 'quotes' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-serif-display text-xl font-bold text-stone-900 flex items-center gap-2">
                <Quote className="w-5 h-5 text-amber-800" />
                <span>Kho Dẫn Chứng & Câu Văn / Câu Thơ Đắt Giá</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Lưu giữ những câu thơ, câu văn xúc động nhất để làm vốn từ và dẫn chứng cho các bài tập làm văn.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              {quotes.length > 0 && (
                <>
                  <button
                    onClick={handleDownloadAllQuotes}
                    className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-stone-200"
                    title="Tải toàn bộ kho dẫn chứng (.txt)"
                  >
                    {downloadedQuotesState ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Đã tải về</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-stone-600" />
                        <span>Tải kho dẫn chứng (.txt)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrintAllQuotes}
                    className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-stone-200"
                    title="In kho dẫn chứng"
                  >
                    <Printer className="w-3.5 h-3.5 text-stone-600" />
                    <span>In</span>
                  </button>
                </>
              )}

              {!isAddingQuote && (
                <button
                  onClick={() => setIsAddingQuote(true)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm câu đắt giá</span>
                </button>
              )}
            </div>
          </div>

          {/* Add Quote Form */}
          {isAddingQuote && (
            <form onSubmit={handleAddQuote} className="p-5 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-3 animate-in fade-in duration-200">
              <div className="font-bold text-xs uppercase text-amber-900">Thêm câu văn/thơ tâm đắc vào kho dẫn chứng</div>
              <textarea
                placeholder="Nhập câu thơ hoặc trích dẫn văn học..."
                value={newQuoteText}
                onChange={(e) => setNewQuoteText(e.target.value)}
                rows={3}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs sm:text-sm font-serif-display focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Tác phẩm / Nguồn trích</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Bầy chim chìa vôi..."
                    value={newQuoteSource}
                    onChange={(e) => setNewQuoteSource(e.target.value)}
                    className="w-full p-2 bg-white border border-stone-300 rounded-lg focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Tác giả</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Nguyễn Quang Thiều..."
                    value={newQuoteAuthor}
                    onChange={(e) => setNewQuoteAuthor(e.target.value)}
                    className="w-full p-2 bg-white border border-stone-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 mb-1 text-xs font-medium">Ý nghĩa & Cách áp dụng vào bài văn</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Dùng làm dẫn chứng cho tình thương yêu loài vật và lòng dũng cảm..."
                  value={newQuoteMeaning}
                  onChange={(e) => setNewQuoteMeaning(e.target.value)}
                  className="w-full p-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingQuote(false)}
                  className="px-3 py-1.5 bg-white text-stone-600 border border-stone-200 rounded-lg text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-lg text-xs cursor-pointer"
                >
                  Lưu dẫn chứng
                </button>
              </div>
            </form>
          )}

          {/* Quotes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quotes.map((q) => (
              <div
                key={q.id}
                className="bg-stone-50 rounded-2xl border border-stone-200 p-5 space-y-3 flex flex-col justify-between hover:shadow-xs transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                    <span className="font-semibold text-amber-800">{q.source} · {q.author}</span>
                    <button
                      onClick={() => handleDeleteQuote(q.id)}
                      className="text-stone-400 hover:text-rose-600 cursor-pointer"
                      title="Xóa dẫn chứng"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <blockquote className="font-serif-display text-sm sm:text-base text-stone-900 font-medium italic border-l-2 border-amber-600 pl-3 py-1 my-2">
                    {q.quote}
                  </blockquote>

                  <p className="text-xs text-stone-600 leading-relaxed pt-1">
                    <strong className="text-stone-800">Áp dụng:</strong> {q.meaning}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-400">
                  <span>Ngày lưu: {q.dateAdded}</span>
                  <button
                    onClick={() => handleCopyQuote(q.id, q.quote)}
                    className="flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-950 cursor-pointer"
                  >
                    {copiedQuoteId === q.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Đã chép câu</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép dẫn chứng</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SUBTAB: EXAM SCORES (NHẬT KÝ ĐIỂM SỐ) */}
      {activeSubTab === 'scores' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-serif-display text-xl font-bold text-stone-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-800" />
                <span>Nhật Ký Điểm Số & Theo Dõi Tiến Bộ</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Ghi chép điểm bài kiểm tra trên lớp và đề tự luyện để nhìn thấy sự tiến bộ rõ rệt qua từng tuần.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              {examScores.length > 0 && (
                <>
                  <button
                    onClick={handleDownloadScoreHistory}
                    className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-stone-200"
                    title="Tải toàn bộ nhật ký điểm số (.txt)"
                  >
                    {downloadedScoresState ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Đã tải về</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-stone-600" />
                        <span>Tải bảng điểm (.txt)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrintScoreHistory}
                    className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-stone-200"
                    title="In bảng điểm học tập"
                  >
                    <Printer className="w-3.5 h-3.5 text-stone-600" />
                    <span>In</span>
                  </button>
                </>
              )}

              {!isAddingScore && (
                <button
                  onClick={() => setIsAddingScore(true)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm cột điểm</span>
                </button>
              )}
            </div>
          </div>

          {/* Add Score Form */}
          {isAddingScore && (
            <form onSubmit={handleAddScore} className="p-5 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-3 animate-in fade-in duration-200">
              <div className="font-bold text-xs uppercase text-amber-900">Ghi lại kết quả kiểm tra</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-stone-600 mb-1 text-xs font-medium">Tên bài kiểm tra</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Kiểm tra Giữa kì 1 môn Văn..."
                    value={newScoreTitle}
                    onChange={(e) => setNewScoreTitle(e.target.value)}
                    className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs sm:text-sm focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 text-xs font-medium">Loại bài</label>
                  <select
                    value={newScoreType}
                    onChange={(e) => setNewScoreType(e.target.value as any)}
                    className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs focus:outline-none"
                  >
                    <option value="15 phút">Kiểm tra 15 phút</option>
                    <option value="Giữa kì">Kiểm tra Giữa kì</option>
                    <option value="Cuối kì">Kiểm tra Cuối kì</option>
                    <option value="Tự luyện">Tự luyện ở nhà</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1 text-xs font-medium">Điểm số đạt được (Thang 10)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={newScoreVal}
                    onChange={(e) => setNewScoreVal(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs font-mono font-bold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 text-xs font-medium">Lời phê / Nhận xét của thầy cô</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Đoạn văn giàu cảm xúc, bài làm chữ đẹp..."
                    value={newScoreNotes}
                    onChange={(e) => setNewScoreNotes(e.target.value)}
                    className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingScore(false)}
                  className="px-3 py-1.5 bg-white text-stone-600 border border-stone-200 rounded-lg text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-lg text-xs cursor-pointer"
                >
                  Lưu điểm số
                </button>
              </div>
            </form>
          )}

          {/* Scores Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-700 uppercase font-semibold border-b border-stone-200">
                  <th className="p-3">Bài kiểm tra</th>
                  <th className="p-3">Loại đề</th>
                  <th className="p-3">Ngày làm</th>
                  <th className="p-3 text-center">Điểm số</th>
                  <th className="p-3">Ghi chú & Rút kinh nghiệm</th>
                  <th className="p-3 text-right">Xóa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {examScores.map((score) => (
                  <tr key={score.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-3 font-semibold text-stone-900">
                      {score.title}
                    </td>
                    <td className="p-3 text-stone-600">
                      <span className="px-2 py-0.5 rounded bg-stone-100 font-mono text-[11px]">
                        {score.type}
                      </span>
                    </td>
                    <td className="p-3 text-stone-500 font-mono">
                      {score.date}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`font-mono text-sm font-bold px-2.5 py-1 rounded-lg ${
                        score.score >= 8.5 ? 'bg-emerald-100 text-emerald-900' : score.score >= 7 ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-900'
                      }`}>
                        {score.score}/10
                      </span>
                    </td>
                    <td className="p-3 text-stone-700 italic max-w-xs">
                      {score.notes || '—'}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteScore(score.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. SUBTAB: BACKUP & DATA MANAGEMENT (QUẢN LÝ LƯU TRỮ & SAO LƯU DỮ LIỆU) */}
      {activeSubTab === 'backup' && (
        <div className="space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="font-serif-display text-xl font-bold text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-800" />
              <span>Trung Tâm Quản Lý Lưu Trữ & Sao Lưu Dữ Liệu Học Tập</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Toàn bộ bài văn tự sáng tác, ghi chú, kho dẫn chứng và lịch sử thi thử của em được bảo vệ trên thiết bị này. Em có thể sao lưu ra máy hoặc tải trọn bộ tập san bất cứ lúc nào.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Backup JSON */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-2xs hover:border-amber-400 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <FileJson className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-display text-base font-bold text-stone-900">
                    Sao Lưu Toàn Bộ Dữ Liệu (.json)
                  </h4>
                  <p className="text-xs text-stone-500">Xuất file dự phòng an toàn tuyệt đối</p>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Đóng gói tất cả thông tin: Hồ sơ học sinh, {essays.length} bài văn sáng tác, {quotes.length} câu thơ trích dẫn, {tasks.length} nhiệm vụ và nhật ký điểm số vào một file duy nhất để lưu vào máy tính, điện thoại hoặc USB.
              </p>

              <button
                onClick={handleExportAllData}
                className="w-full py-2.5 px-4 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Tải file sao lưu (.json) về máy</span>
              </button>
            </div>

            {/* Card 2: Restore JSON */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-2xs hover:border-amber-400 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-display text-base font-bold text-stone-900">
                    Khôi Phục Dữ Liệu Từ File (.json)
                  </h4>
                  <p className="text-xs text-stone-500">Nạp lại bài học khi đổi máy tính</p>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Khi em học trên máy tính trường học, điện thoại mới hoặc sau khi xóa bộ nhớ trình duyệt, chỉ cần chọn lại file sao lưu <code className="bg-stone-100 px-1 rounded">.json</code> đã tải để khôi phục 100% dữ liệu tức thì.
              </p>

              <div>
                <input
                  type="file"
                  id="import-backup-file-input"
                  accept=".json,application/json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
                <label
                  htmlFor="import-backup-file-input"
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs text-center"
                >
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                  <span>Chọn file sao lưu để nạp lại</span>
                </label>
              </div>
            </div>

            {/* Card 3: Export Combined Portfolio TXT */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-2xs hover:border-amber-400 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                  <FolderDown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-display text-base font-bold text-stone-900">
                    Xuất Tập San Văn Học Của Em (.txt)
                  </h4>
                  <p className="text-xs text-stone-500">Văn bản đọc & in ấn tiện lợi</p>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Tạo một file văn bản tổng hợp toàn bộ các bài văn, đoạn văn tự viết, các câu thơ tâm đắc và nhận xét kinh nghiệm. Rất phù hợp để nộp bài làm thêm cho thầy cô hoặc lưu giữ làm kỷ niệm tuổi học trò.
              </p>

              <button
                onClick={handleDownloadCombinedPortfolio}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-800" />
                <span>Tải Tập san văn học (.txt)</span>
              </button>
            </div>

            {/* Card 4: Local Storage Health */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center font-bold">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-display text-base font-bold text-stone-900">
                    Bộ Nhớ Lưu Trữ Thiết Bị
                  </h4>
                  <p className="text-xs text-stone-500">Tự động đồng bộ cục bộ (Local Storage)</p>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5 text-xs text-stone-700">
                <div className="flex justify-between">
                  <span>Bài văn tự sáng tác:</span>
                  <span className="font-mono font-bold text-amber-800">{essays.length} bài</span>
                </div>
                <div className="flex justify-between">
                  <span>Kho câu nói & dẫn chứng:</span>
                  <span className="font-mono font-bold text-amber-800">{quotes.length} câu</span>
                </div>
                <div className="flex justify-between">
                  <span>Nhiệm vụ học tập:</span>
                  <span className="font-mono font-bold text-amber-800">{tasks.length} mục</span>
                </div>
                <div className="flex justify-between">
                  <span>Lịch sử điểm số & thi thử:</span>
                  <span className="font-mono font-bold text-amber-800">{examScores.length} bài</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-stone-200 text-[11px] text-stone-500">
                  <span>Lần lưu gần nhất:</span>
                  <span className="font-mono font-bold text-emerald-700">{lastSavedTimestamp}</span>
                </div>
              </div>

              <button
                onClick={handleForceSaveAll}
                className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Save className="w-4 h-4 text-emerald-300" />
                <span>Lưu lại ngay lập tức</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
