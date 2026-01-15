import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { caseApi, CaseDetail, SaveProgressRequest } from '../../services/api';

export const ClueDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get('caseId') || '';
  const [caseData, setCaseData] = useState<CaseDetail | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (caseId && id) {
      loadCaseData();
    }
  }, [caseId, id]);

  const loadCaseData = async () => {
    try {
      setLoading(true);
      const data = await caseApi.getCaseDetail(caseId);
      setCaseData(data);
      const clue = data.clues.find((c) => c.id === id);
      if (clue && !clue.isUnlocked) {
        navigate(`/investigation?caseId=${caseId}`);
      }
    } catch (err: any) {
      console.error('Failed to load clue:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!caseId) return;
    try {
      const saveData: SaveProgressRequest = {
        progressData: JSON.stringify({ notes }),
        notesData: notes,
      };
      await caseApi.saveProgress(caseId, saveData);
      alert('Đã lưu ghi chú thành công');
    } catch (err: any) {
      alert(err.message || 'Không thể lưu ghi chú');
    }
  };

  if (loading || !caseData || !id) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-primary text-xl">Đang tải...</div>
      </div>
    );
  }

  const clue = caseData.clues.find((c) => c.id === id);
  if (!clue) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-red-400 text-xl">Không tìm thấy gợi ý</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div className="lg:col-span-2 xl:col-span-3">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate(`/investigation?caseId=${caseId}`)}
                className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-medium leading-normal w-fit"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
                <span>Quay lại Bảng Điều tra</span>
              </button>
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Chi tiết: {clue.title}
              </h1>
              <p className="text-[#9abcbc] text-base font-normal leading-normal">
                Xem xét kỹ lưỡng từng chi tiết để tìm ra manh mối.
              </p>
            </div>
            <div className="rounded-xl p-6 lg:p-8" style={{
              background: 'rgba(0, 0, 0, 0.85)',
              border: '1px solid rgba(220, 38, 38, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}>
              {clue.imageUrl && (
                <div className="mb-6">
                  <img
                    src={clue.imageUrl}
                    alt={clue.title}
                    className="w-full rounded-lg max-h-[600px] object-contain"
                  />
                </div>
              )}
              <div className="max-h-[600px] overflow-y-auto pr-4 text-[#e0f2f2] space-y-6 custom-scrollbar">
                <div className="whitespace-pre-wrap text-base leading-relaxed">
                  {clue.content}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 xl:col-span-1 h-full">
          <div className="sticky top-24 flex flex-col min-h-[500px] rounded-xl glass-panel p-4">
            <div className="flex flex-col gap-4 h-full">
              <div className="flex bg-black/20 rounded-lg p-1">
                <button className="flex-1 text-primary bg-surface-dark shadow-sm font-bold py-2 text-sm flex items-center justify-center gap-2 rounded">
                  <span className="material-symbols-outlined text-lg">edit_note</span>
                  Ghi chú
                </button>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex flex-col flex-1 gap-2">
                  <p className="text-white text-base font-medium leading-normal">
                    Suy luận của bạn
                  </p>
                  <textarea
                    className="flex-1 w-full bg-surface-dark border border-gray-700 rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 resize-none font-mono text-sm leading-relaxed"
                    placeholder="Ghi lại những suy luận của bạn ở đây..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
                <button
                  onClick={handleSaveNotes}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-blood-red text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blood-red-dark transition-colors typewriter-font uppercase tracking-wider border-2 border-blood-red"
                  style={{
                    boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)',
                  }}
                >
                  <span className="truncate">Lưu Ghi chú</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

