import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { caseApi, CaseDetail as CaseDetailType, suspectApi, Suspect, userApi } from '../../services/api';

export const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('intro');
  const [caseData, setCaseData] = useState<CaseDetailType | null>(null);
  const [suspects, setSuspects] = useState<Suspect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (id) {
      loadCaseDetail();
      loadSuspects();
      checkAdminStatus();
    }
  }, [id]);

  const checkAdminStatus = async () => {
    try {
      const profile = await userApi.getProfile();
      setIsAdmin(profile.role === 'Admin');
    } catch (err) {
      console.error('Failed to check admin status:', err);
    }
  };

  const loadCaseDetail = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await caseApi.getCaseDetail(id);
      setCaseData(data);
    } catch (err: any) {
      setError(err.message || 'Không thể tải thông tin vụ án');
    } finally {
      setLoading(false);
    }
  };

  const loadSuspects = async () => {
    if (!id) return;
    try {
      const data = await suspectApi.getSuspects(id);
      setSuspects(data);
    } catch (err: any) {
      console.error('Failed to load suspects:', err);
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
    <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 gap-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest font-mono">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            VỤ ÁN #{caseData.id}
          </div>
          {isAdmin && (
            <button
              onClick={() => navigate(`/edit-case/${caseData.id}`)}
              className="px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg text-sm font-bold hover:bg-primary/20 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Chỉnh sửa
            </button>
          )}
        </div>
        <h1 className="text-white text-4xl lg:text-5xl font-black tracking-tight">
          {caseData.title}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="glass-panel rounded-xl overflow-hidden min-h-[400px]">
            {/* Tabs */}
            <div className="flex border-b border-primary/20 bg-black/20">
              {['Giới thiệu', 'Hồ sơ nghi phạm', 'Bảng chứng cứ'].map((tab, idx) => {
                const tabKey = ['intro', 'suspects', 'evidence'][idx];
                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={`px-6 py-4 text-sm font-bold uppercase tracking-wide transition-all ${
                      activeTab === tabKey
                        ? 'text-primary border-b-2 border-primary bg-primary/5'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Tab Panels */}
            <div className="p-6 md:p-8">
              {activeTab === 'intro' && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <p className="text-gray-300 leading-loose text-lg">
                    {caseData.fullNarrative}
                  </p>
                  {caseData.clues.length > 0 && caseData.clues[0].imageUrl && (
                    <div
                      className="w-full h-64 md:h-80 rounded-lg bg-cover bg-center border border-gray-700 shadow-2xl"
                      style={{ backgroundImage: `url('${caseData.clues[0].imageUrl}')` }}
                    ></div>
                  )}
                </div>
              )}
              {activeTab === 'suspects' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                  {suspects.length === 0 ? (
                    <div className="col-span-2 text-center text-gray-400 py-8">
                      Chưa có thông tin nghi phạm
                    </div>
                  ) : (
                    suspects.map((suspect) => (
                      <div
                        key={suspect.id}
                        className="p-4 rounded-lg bg-black/40 border border-gray-700 flex gap-4 items-center cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => navigate(`/suspect/${suspect.id}`)}
                      >
                        <div className="size-16 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                          {suspect.portraitImageUrl ? (
                            <img
                              src={suspect.portraitImageUrl}
                              alt={suspect.fullName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-2xl text-gray-400">
                              person
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white">{suspect.fullName}</p>
                          <p className="text-xs text-gray-400">
                            {suspect.alias || 'Không có bí danh'}
                          </p>
                          {suspect.isPrimarySuspect && (
                            <span className="text-xs text-red-400 font-bold">Nghi phạm chính</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
              {activeTab === 'evidence' && (
                <div className="flex flex-col items-center justify-center h-64 gap-4 animate-fade-in">
                  <span className="material-symbols-outlined text-6xl text-gray-600">lock</span>
                  <p className="text-gray-400">Truy cập Bảng Điều tra để xem chứng cứ.</p>
                  <button
                    onClick={() => navigate(`/investigation?caseId=${caseData.id}`)}
                    className="text-primary hover:underline"
                  >
                    Đi tới Bảng Điều tra &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-xl flex flex-col gap-6">
            {/* Progress */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-white">Tiến độ vụ án</span>
                <span className="text-primary font-bold">
                  {caseData.cluesFoundCount}/{caseData.clues.length}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full shadow-glow-cyan transition-all duration-1000"
                  style={{
                    width: `${(caseData.cluesFoundCount / caseData.clues.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <hr className="border-gray-700" />

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Độ khó</span>
                <span className="font-bold text-primary">{caseData.difficultyLevel}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Điểm của bạn</span>
                <span className="font-bold text-primary">{caseData.userPoints}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Trạng thái</span>
                <span className={`font-bold ${caseData.hasBeenSolved ? 'text-green-400' : 'text-yellow-400'}`}>
                  {caseData.hasBeenSolved ? 'Đã giải' : 'Đang điều tra'}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/investigation?caseId=${caseData.id}`)}
              className="w-full py-3 bg-primary text-black font-bold rounded-lg hover:bg-cyan-300 hover:shadow-glow-cyan transition-all"
            >
              TIẾP TỤC VỤ ÁN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

