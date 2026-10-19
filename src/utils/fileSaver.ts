/**
 * Utility functions for saving, downloading, and printing educational data
 * Safely works inside iframe environments without triggering popup blockers.
 */

export function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.txt') ? filename : `${filename}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadJsonFile(filename: string, data: unknown): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.json') ? filename : `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function safePrintContent(title: string, content: string, subheader: string = 'Ngữ văn 7 - Hệ sinh thái học tập'): void {
  // Use a hidden printable iframe to avoid window.open being blocked by iframe sandbox
  let printFrame = document.getElementById('nv7-print-iframe') as HTMLIFrameElement | null;
  if (!printFrame) {
    printFrame = document.createElement('iframe');
    printFrame.id = 'nv7-print-iframe';
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);
  }

  const frameDoc = printFrame.contentWindow?.document || printFrame.contentDocument;
  if (!frameDoc) {
    // Fallback to standard window print
    window.print();
    return;
  }

  frameDoc.open();
  frameDoc.write(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        @page { margin: 20mm; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Times New Roman", serif;
          line-height: 1.65;
          color: #1c1917;
          background: #ffffff;
          padding: 24px;
        }
        .header {
          border-bottom: 2px solid #78350f;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }
        .title {
          font-size: 20pt;
          font-weight: bold;
          color: #78350f;
          margin: 0 0 6px 0;
        }
        .subtitle {
          font-size: 10pt;
          color: #78716c;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .content {
          white-space: pre-wrap;
          font-size: 12pt;
          line-height: 1.7;
          color: #292524;
        }
        .footer {
          margin-top: 30px;
          padding-top: 12px;
          border-top: 1px solid #e7e5e4;
          font-size: 9pt;
          color: #a8a29e;
          display: flex;
          justify-content: space-between;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="subtitle">${subheader}</div>
        <h1 class="title">${title}</h1>
      </div>
      <div class="content">${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      <div class="footer">
        <span>Tài liệu tự học Ngữ văn Lớp 7</span>
        <span>Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}</span>
      </div>
    </body>
    </html>
  `);
  frameDoc.close();

  setTimeout(() => {
    try {
      printFrame?.contentWindow?.focus();
      printFrame?.contentWindow?.print();
    } catch {
      window.print();
    }
  }, 250);
}
