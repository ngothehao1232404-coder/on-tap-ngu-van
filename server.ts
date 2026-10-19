import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // API endpoint for Grounded Chatbot
  app.post('/api/grounded-chat', async (req, res) => {
    const { message, topicTitle, sources, analysisPreview, studyPack } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY_NOT_CONFIGURED',
        fallback: true,
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `Bạn là Trợ lý Ôn bài Grounded môn Ngữ Văn 7.
Nhiệm vụ của bạn là hỗ trợ học sinh ôn tập kiến thức cho chủ đề: "${topicTitle}".

QUY TẮC BẮT BUỘC KHÔNG THAY ĐỔI:
1. Bạn CHỈ ĐƯỢC PHÉP trả lời trong phạm vi 3 phần tài liệu được cung cấp dưới đây:
   === 1. SOURCES (Tài liệu nguồn) ===
   ${JSON.stringify(sources)}

   === 2. ANALYSIS PREVIEW (Bản xem trước phân tích) ===
   ${JSON.stringify(analysisPreview)}

   === 3. STUDY PACK (Gói ôn bài) ===
   ${JSON.stringify(studyPack)}

2. QUY TẮC TỪ CHỐI NGOÀI PHẠM VI (BẮT BUỘC):
   Nếu câu hỏi KHÔNG CÓ trong tài liệu hoặc KHÔNG THỂ suy luận logic trực tiếp từ tài liệu, bạn BẮT BUỘC PHẢI trả lời chính xác câu sau:
   "Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp."
   Tuyệt đối không giải đáp các câu hỏi ngoài lề, chuyện phiếm, hoặc kiến thức không có trong bài.

3. PHONG CÁCH TRẢ LỜI:
   - Ngôn ngữ thân thiện, chuẩn mực, dễ học, xưng "mình" và gọi học sinh là "bạn" hoặc "em".
   - Trình bày rõ ràng, trích dẫn nguồn cụ thể ([Nguồn: sources], [Nguồn: analysisPreview], hoặc [Nguồn: studyPack]).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          { role: 'user', parts: [{ text: message }] },
        ],
        config: {
          systemInstruction,
          temperature: 0.1,
        },
      });

      const replyText = response.text || 'Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp.';
      return res.json({ text: replyText });
    } catch (err: any) {
      console.error('Gemini API Grounded Chat Error:', err);
      return res.status(500).json({
        error: err.message || 'Lỗi kết nối AI',
        fallback: true,
      });
    }
  });

  // API endpoint for Re-generating Study Pack with Gemini API
  app.post('/api/regenerate-studypack', async (req, res) => {
    const { sources, topicTitle, versionNumber } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'NO_GEMINI_API_KEY',
        fallback: true,
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Bạn là chuyên gia sư phạm Ngữ Văn lớp 7.
Nhiệm vụ của bạn là RE-GENERATE làm mới toàn bộ Study Pack cho bài học: "${topicTitle}".
Nguồn học liệu gốc KHÔNG THAY ĐỔI:
${JSON.stringify(sources, null, 2)}

Yêu cầu cụ thể:
1. Tạo bản TÓM TẮT (summary) mới mẻ, súc tích (120-180 từ) nhưng đầy đủ ý chính.
2. Tạo 3 câu hỏi đọc hiểu (discussionQuestions) MỚI, kèm gợi ý (hint) và câu trả lời (answer) sâu sắc hơn.
3. Tạo 3 câu hỏi trắc nghiệm (quizQuestions) MỚI bám sát văn bản, 4 phương án A/B/C/D, correctIndex (0-3), kèm giải thích chi tiết.
4. Tạo 3-4 thẻ ghi nhớ (flashcards) MỚI với mặt trước (front), mặt sau (back), ví dụ (example), lưu ý (notes).
5. Cập nhật 3 nhánh sơ đồ tư duy (mindMapBranches).

QUY TẮC BẮT BUỘC:
Trả về DUY NHẤT một khối JSON hợp lệ theo định dạng sau (không viết thêm chữ nào khác ngoài JSON):
{
  "summary": "...",
  "keyThemes": ["...", "..."],
  "ideologicalValue": "...",
  "artisticValues": ["...", "..."],
  "analysisSections": [
    { "title": "...", "content": "...", "quote": "..." }
  ],
  "discussionQuestions": [
    { "question": "...", "hint": "...", "answer": "..." }
  ],
  "quizQuestions": [
    { "id": "q1", "question": "...", "options": ["A", "B", "C", "D"], "correctIndex": 0, "explanation": "..." }
  ],
  "flashcards": [
    { "id": "fc1", "front": "...", "back": "...", "example": "...", "notes": "..." }
  ],
  "mindMapBranches": [
    { "title": "...", "subNodes": ["...", "..."] }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.4,
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        return res.json({ success: true, data: parsed });
      } catch (jsonErr) {
        // Match JSON block if any extra tokens
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          return res.json({ success: true, data: parsed });
        }
        return res.status(500).json({ error: 'Failed to parse JSON', fallback: true });
      }
    } catch (err: any) {
      console.error('Gemini API Re-generate Error:', err);
      return res.status(500).json({
        error: err.message || 'Lỗi kết nối AI',
        fallback: true,
      });
    }
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch(console.error);
