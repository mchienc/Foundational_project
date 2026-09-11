import React, { useState } from 'react';
import { Download, FileText, Package, CheckCircle2, AlertTriangle, Info, Loader2 } from 'lucide-react';
import { useVocabularyVault } from '../../context/VocabularyVaultContext';
import JSZip from 'jszip';

export const AnkiExportPanel: React.FC = () => {
  const { savedWords, totalSavedCount } = useVocabularyVault();
  const [activeTab, setActiveTab] = useState<'csv' | 'apkg'>('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  const generateCSVContent = (): string => {
    const BOM = '\uFEFF';
    const header = 'Front\tBack\tTags\n';
    
    const rows = savedWords.map((item) => {
      // Field 1: Front
      const word = item.word;
      const sentence = item.contextSentence || '';
      const wordRegex = new RegExp('\\b' + word + '\\b', 'gi');
      
      let front = '';
      if (wordRegex.test(sentence)) {
        // Reset lastIndex since we used .test()
        wordRegex.lastIndex = 0;
        front = sentence.replace(wordRegex, `{{c1::${word}}}`);
      } else {
        front = `{{c1::${word}}} — ${sentence}`;
      }

      // Field 2: Back
      const ipa = item.ipa ? `[${item.ipa}]` : '';
      const pos = item.pos || '';
      const meaning = item.contextMeaning || '';
      const collocations = item.collocations?.length 
        ? ` | Collocations: ${item.collocations.join(', ')}` 
        : '';
      
      const backComponents = [ipa, pos, meaning].filter(Boolean);
      const back = `${backComponents.join(' • ')}${collocations}`;

      // Field 3: Tags
      const articleTitleTag = (item.sourceArticleTitle || 'EduFlow_Vocab').replace(/\s+/g, '_');
      const tags = `EduFlow Cambridge IELTS_Band_7 ${articleTitleTag}`;

      // Escape tabs and newlines in fields just in case
      const cleanFront = front.replace(/\t/g, ' ').replace(/\n/g, ' ');
      const cleanBack = back.replace(/\t/g, ' ').replace(/\n/g, ' ');
      const cleanTags = tags.replace(/\t/g, ' ').replace(/\n/g, ' ');

      return `${cleanFront}\t${cleanBack}\t${cleanTags}`;
    });

    return BOM + header + rows.join('\n');
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    setExportSuccess(null);
    
    try {
      const content = generateCSVContent();
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `EduFlow_Vocabulary_${new Date().toISOString().slice(0,10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setExportSuccess('Tải file CSV thành công!');
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportSuccess(null), 3000);
    }
  };

  const handleExportAPKG = async () => {
    setIsExporting(true);
    setExportSuccess(null);

    try {
      const csvContent = generateCSVContent();
      const readmeContent = `EduFlow Anki Export\n====================\n\nThis package contains your saved vocabulary from EduFlow.\n\nTo import into Anki:\n1. Open Anki and go to File > Import...\n2. Select the 'anki_import.txt' file in this folder.\n3. Make sure to choose 'Cloze' as the note type.\n4. Map Field 1 to Text, Field 2 to Back, and Field 3 to Tags.\n5. Click Import.\n\nHappy learning!`;
      
      const instructionsHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>EduFlow Anki Import Instructions</title>
<style>
  body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; color: #333; }
  h1 { color: #064E3B; }
  .step { background: #f9f9f9; padding: 15px; margin-bottom: 20px; border-left: 4px solid #D97706; border-radius: 4px; }
</style>
</head>
<body>
  <h1>Hướng Dẫn Import EduFlow Vocabulary Vào Anki</h1>
  <p>Làm theo các bước sau để thêm từ vựng của bạn vào Anki:</p>
  
  <div class="step">
    <h3>Bước 1: Giải nén file .apkg (Nếu cần)</h3>
    <p>File .apkg này thực chất là một file ZIP chứa dữ liệu. Bạn hãy giải nén nó ra một thư mục để lấy file <strong>anki_import.txt</strong>.</p>
  </div>
  
  <div class="step">
    <h3>Bước 2: Mở Anki & Import</h3>
    <p>Mở ứng dụng Anki. Bấm vào <strong>File</strong> (Tệp) trên thanh menu > <strong>Import...</strong> (Nhập...).</p>
  </div>

  <div class="step">
    <h3>Bước 3: Chọn File Text</h3>
    <p>Tìm đến thư mục bạn vừa giải nén, chọn file <strong>anki_import.txt</strong>.</p>
  </div>

  <div class="step">
    <h3>Bước 4: Cấu hình Import</h3>
    <ul>
      <li><strong>Type (Loại thẻ):</strong> Phải chọn là <strong>Cloze</strong> (Điền khuyết).</li>
      <li><strong>Deck (Bộ bài):</strong> Chọn bộ bài bạn muốn thêm từ vào (ví dụ: EduFlow IELTS).</li>
      <li><strong>Fields separated by:</strong> Tabs (Dấu Tab).</li>
      <li><strong>Field 1:</strong> Chọn ánh xạ vào thẻ Text.</li>
      <li><strong>Field 2:</strong> Chọn ánh xạ vào thẻ Back/Extra.</li>
      <li><strong>Field 3:</strong> Chọn ánh xạ vào Tags (Nhãn).</li>
    </ul>
    <p>Cuối cùng bấm <strong>Import</strong> để hoàn tất.</p>
  </div>
</body>
</html>`;

      const zip = new JSZip();
      zip.file('anki_import.txt', csvContent);
      zip.file('README.txt', readmeContent);
      zip.file('import_instructions.html', instructionsHTML);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `EduFlow_Anki_Deck_${new Date().toISOString().slice(0,10)}.apkg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExportSuccess('Tải gói Anki (APKG) thành công!');
    } catch (error) {
      console.error('APKG Export failed:', error);
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportSuccess(null), 5000);
    }
  };

  return (
    <div className="bg-[#FAFAF9] border border-stone-200 rounded-3xl p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-serif text-[#064E3B] font-bold flex items-center gap-2">
            <Download className="w-5 h-5" />
            Xuất Dữ Liệu Anki
          </h2>
          <p className="text-sm text-stone-600 mt-1 font-sans">
            Tải toàn bộ từ vựng đã lưu về máy để ôn tập offline
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-stone-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <p className="font-medium text-stone-800 font-sans">Kho từ vựng của bạn</p>
          <p className="text-sm text-stone-500 font-sans">
            Bạn có <span className="font-bold text-[#064E3B]">{totalSavedCount}</span> từ trong kho từ vựng
          </p>
        </div>
      </div>

      {totalSavedCount === 0 ? (
        <div className="text-center p-6 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
          <AlertTriangle className="w-8 h-8 text-[#D97706] mx-auto mb-2" />
          <p className="text-stone-700 font-medium font-sans">Chưa có từ vựng nào</p>
          <p className="text-sm text-stone-500 mt-1 font-sans">
            Hãy đọc bài và lưu thêm từ vựng trước khi xuất dữ liệu.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('csv')}
              className={[
                'flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors',
                activeTab === 'csv' ? 'bg-white text-[#064E3B] shadow-sm' : 'text-stone-500 hover:text-stone-700',
              ].join(' ')}
            >
              <FileText className="w-4 h-4" />
              CSV Export
            </button>
            <button
              onClick={() => setActiveTab('apkg')}
              className={[
                'flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors',
                activeTab === 'apkg' ? 'bg-white text-[#064E3B] shadow-sm' : 'text-stone-500 hover:text-stone-700',
              ].join(' ')}
            >
              <Package className="w-4 h-4" />
              APKG Export
            </button>
          </div>

          <div className="bg-stone-50 rounded-xl p-4 text-sm font-sans">
            {activeTab === 'csv' ? (
              <div className="space-y-3">
                <p className="text-stone-700">
                  Xuất ra file định dạng Text (.txt) chuẩn Tab-separated, hỗ trợ UTF-8. 
                  Phù hợp để import thủ công vào các phần mềm Flashcard.
                </p>
                <div className="flex items-start gap-2 text-stone-600 bg-stone-100 p-3 rounded-lg border border-stone-200">
                  <Info className="w-4 h-4 mt-0.5 shrink-0 text-[#064E3B]" />
                  <div>
                    <span className="font-semibold block mb-1">Cấu trúc 3 trường (Fields):</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Front (Câu chứa từ vựng đục lỗ Cloze)</li>
                      <li>Back (Nghĩa, phát âm, từ loại, collocations)</li>
                      <li>Tags (Nguồn bài đọc & cấp độ)</li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={handleExportCSV}
                  disabled={isExporting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#064E3B] hover:bg-emerald-900 text-white font-medium rounded-xl transition-colors disabled:opacity-70"
                >
                  {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                  Tải file CSV
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-stone-700">
                  Tải xuống gói Anki Package giả lập (.apkg) chứa dữ liệu từ vựng và hướng dẫn import chi tiết.
                </p>
                <div className="flex items-start gap-2 text-stone-600 bg-[#FFFBEB] p-3 rounded-lg border border-amber-200">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-[#D97706]" />
                  <p className="text-sm">
                    <strong>Ghi chú:</strong> Đây là gói ZIP thông minh chứa file data text và HTML hướng dẫn thay vì database SQLite. Bạn hãy giải nén và làm theo hướng dẫn đính kèm để đưa vào Anki một cách an toàn nhất.
                  </p>
                </div>
                <button
                  onClick={handleExportAPKG}
                  disabled={isExporting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#064E3B] hover:bg-emerald-900 text-white font-medium rounded-xl transition-colors disabled:opacity-70"
                >
                  {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Package className="w-5 h-5" />}
                  Tải gói APKG
                </button>
              </div>
            )}

            {exportSuccess && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-2 text-emerald-700 animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">{exportSuccess}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
