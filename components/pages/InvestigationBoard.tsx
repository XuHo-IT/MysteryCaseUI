import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { caseApi, CaseDetail, CaseProgress, SaveProgressRequest, suspectApi, Suspect } from '../../services/api';
import { clueApi } from '../../services/api';
import { SubmitAnswer } from '../SubmitAnswer';

export const InvestigationBoard: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get('caseId') || '';
  const [caseData, setCaseData] = useState<CaseDetail | null>(null);
  const [progress, setProgress] = useState<CaseProgress | null>(null);
  const [suspects, setSuspects] = useState<Suspect[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'notes' | 'suspects' | 'submit'>('notes');

  useEffect(() => {
    if (caseId) {
      loadData();
    } else {
      setError('Không có ID vụ án');
      setLoading(false);
    }
  }, [caseId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [caseDetail, caseProgress, suspectsData] = await Promise.all([
        caseApi.getCaseDetail(caseId),
        caseApi.getCaseProgress(caseId),
        suspectApi.getSuspects(caseId),
      ]);
      setCaseData(caseDetail);
      setProgress(caseProgress);
      setSuspects(suspectsData);
      // If notes are saved in progressData, we should parse them
      // But based on the save logic, it's already being handled in the state if needed
      // Actually, we should probably set initial notes from progress
    } catch (err: any) {
      setError(err.message || 'Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleUnlockClue = async (clueId: string) => {
    try {
      await clueApi.unlockClue(clueId);
      await loadData(); // Reload to get updated data
    } catch (err: any) {
      alert(err.message || 'Không thể mở khóa gợi ý');
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-primary text-xl">Đang tải...</div>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-red-400 text-xl">{error || 'Không tìm thấy vụ án'}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 gap-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            Bảng Điều tra: {caseData.title}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Điểm:</span>
              <span className="text-primary font-bold">{caseData.userPoints}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Manh mối:</span>
              <span className="text-primary font-bold">{caseData.cluesFoundCount}/{caseData.clues.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Trạng thái:</span>
              <span className={`font-bold ${caseData.hasBeenSolved ? 'text-green-400' : 'text-yellow-400'}`}>
                {caseData.hasBeenSolved ? 'Hoàn thành' : 'Đang tiến hành'}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate(`/case-detail/${caseId}`)}
          className="px-4 py-2 rounded border border-red-500/50 text-red-400 hover:bg-red-500/10 text-sm font-bold flex items-center gap-2"
        >
          <span className="material-symbols-outlined">exit_to_app</span>
          Thoát Vụ án
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 h-full min-h-[600px]">
        {/* Main Board Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-min">
          {caseData.clues.map((clue) => (
            <div
              key={clue.id}
              className={`relative flex flex-col gap-4 p-4 rounded-xl glass-panel transition-all duration-300 hover:-translate-y-1 ${
                !clue.isUnlocked ? 'opacity-90' : 'hover:glass-panel-active'
              }`}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/50">
                {clue.imageUrl ? (
                  <img
                    src={clue.imageUrl}
                    alt={clue.title}
                    className={`w-full h-full object-cover transition-all ${
                      !clue.isUnlocked ? 'blur-md scale-110' : ''
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black/30">
                    <span className="material-symbols-outlined text-4xl text-gray-400">
                      {!clue.isUnlocked ? 'lock' : 'description'}
                    </span>
                  </div>
                )}
                {!clue.isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="material-symbols-outlined text-4xl text-gray-400">lock</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-bold text-lg leading-tight">{clue.title}</h3>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      !clue.isUnlocked
                        ? 'text-yellow-500 bg-yellow-500/10'
                        : 'text-green-500 bg-green-500/10'
                    }`}
                  >
                    <span className="material-symbols-outlined !text-sm">
                      {!clue.isUnlocked ? 'lock' : 'lock_open'}
                    </span>
                    <span>{!clue.isUnlocked ? 'Bị khóa' : 'Đã mở'}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {!clue.isUnlocked ? 'Manh mối này đang bị khóa. Hãy mở khóa để xem nội dung.' : clue.content}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-2">
                <button
                  className={`w-full h-10 rounded-lg text-sm font-bold transition-all ${
                    !clue.isUnlocked
                      ? 'border border-primary/30 text-primary bg-primary/5 hover:bg-primary/20'
                      : 'bg-primary text-black hover:bg-cyan-300 hover:shadow-glow-cyan'
                  }`}
                  onClick={() => {
                    if (!clue.isUnlocked) {
                      handleUnlockClue(clue.id);
                    } else {
                      navigate(`/clue/${clue.id}?caseId=${caseId}`);
                    }
                  }}
                >
                  {!clue.isUnlocked
                    ? `Mở khóa: ${clue.unlockCost} Điểm`
                    : 'Xem chi tiết'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Tools */}
        <div className="w-full xl:w-96 flex flex-col gap-6">
          <div className="sticky top-24 glass-panel rounded-xl p-4 min-h-[500px] flex flex-col">
            {/* Tabs */}
            <div className="flex bg-black/20 rounded-lg p-1 mb-4">
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-2 text-sm font-bold rounded shadow-sm flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'notes'
                    ? 'text-primary bg-surface-dark'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined !text-lg">edit_note</span>
                Ghi chú
              </button>
              <button
                onClick={() => setActiveTab('suspects')}
                className={`flex-1 py-2 text-sm font-bold rounded shadow-sm flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'suspects'
                    ? 'text-primary bg-surface-dark'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined !text-lg">person_search</span>
                Nghi phạm
              </button>
              <button
                onClick={() => setActiveTab('submit')}
                className={`flex-1 py-2 text-sm font-bold rounded shadow-sm flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'submit'
                    ? 'text-primary bg-surface-dark'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined !text-lg">gavel</span>
                Giải đáp
              </button>
            </div>

            <div className="flex-1 flex flex-col">
              {activeTab === 'notes' && (
                <div className="flex-1 flex flex-col animate-fade-in">
                  <label className="text-sm font-medium text-white mb-2">Suy luận của bạn</label>
                  <textarea
                    className="flex-1 w-full bg-surface-dark border border-gray-700 rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 resize-none font-mono text-sm leading-relaxed"
                    placeholder="Ghi lại những suy luận, mã số, hoặc giả thuyết của bạn ở đây..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setNotes('')}
                      className="flex-1 py-2 bg-secondary/10 text-secondary border border-secondary/30 rounded-lg text-sm font-bold hover:bg-secondary/20"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={handleSaveNotes}
                      className="flex-1 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg text-sm font-bold hover:bg-primary/20"
                    >
                      Lưu ghi chú
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'suspects' && (
                <div className="flex-1 flex flex-col gap-4 animate-fade-in overflow-y-auto max-h-[600px] pr-2">
                  <label className="text-sm font-medium text-white">Danh sách nghi phạm</label>
                  {suspects.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">Chưa có thông tin nghi phạm</div>
                  ) : (
                    suspects.map((suspect) => (
                      <div
                        key={suspect.id}
                        className="p-3 rounded-lg bg-black/40 border border-gray-700 flex gap-3 items-center cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => navigate(`/suspect/${suspect.id}`)}
                      >
                        <div className="size-10 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                          {suspect.portraitImageUrl ? (
                            <img
                              src={suspect.portraitImageUrl}
                              alt={suspect.fullName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-xl text-gray-400">person</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-sm truncate">{suspect.fullName}</p>
                          <p className="text-[10px] text-gray-400 truncate">
                            {suspect.alias || 'Không có bí danh'}
                          </p>
                        </div>
                        {suspect.isPrimarySuspect && (
                          <span className="material-symbols-outlined text-red-400 text-lg">priority_high</span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'submit' && (
                <div className="flex-1 flex flex-col animate-fade-in">
                  <SubmitAnswer caseId={caseId} onSuccess={() => loadData()} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

