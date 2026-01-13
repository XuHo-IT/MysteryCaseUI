import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { caseApi, CaseListItem } from '../../services/api';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      setLoading(true);
      const data = await caseApi.getAllCases();
      setCases(data);
    } catch (err: any) {
      setError(err.message || 'Không thể tải danh sách vụ án');
    } finally {
      setLoading(false);
    }
  };

  const filteredCases = cases.filter(caseItem =>
    caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-primary text-xl">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 gap-8 animate-fade-in">
      <div className="flex flex-col gap-3">
        <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
          Bảng Điều Tra Vụ Án
        </h1>
        <p className="text-gray-400 text-lg">
          Chọn một vụ án để bắt đầu cuộc điều tra của bạn.
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-primary/70 group-focus-within:text-primary transition-colors">
              search
            </span>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm vụ án theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-surface-dark/50 border border-primary/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCases.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-400">
            Không tìm thấy vụ án nào
          </div>
        ) : (
          filteredCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="group flex flex-col rounded-xl glass-panel overflow-hidden hover:glass-panel-active transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/case-detail/${caseItem.id}`)}
            >
              <div className="p-6 flex flex-col gap-4 h-full">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-white text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {caseItem.title}
                  </h3>
                  <div
                    className={`text-xs font-bold py-1 px-3 uppercase rounded-full ${
                      caseItem.isSolved
                        ? 'text-gray-400 bg-gray-700/30'
                        : 'text-primary bg-primary/10 border border-primary/20'
                    }`}
                  >
                    {caseItem.isSolved ? 'Đã giải' : 'Chưa giải'}
                  </div>
                </div>
                <p className="text-gray-400 text-sm flex-grow leading-relaxed">
                  {caseItem.description}
                </p>

                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex justify-between text-xs text-gray-400 font-mono uppercase tracking-wider">
                    <span>Độ khó: {caseItem.difficultyLevel}</span>
                  </div>
                </div>

                <button
                  className={`mt-4 w-full h-10 rounded-lg font-bold text-sm tracking-wide transition-all ${
                    caseItem.isSolved
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                      : 'bg-primary text-black hover:bg-cyan-300 hover:shadow-glow-cyan'
                  }`}
                >
                  {caseItem.isSolved ? 'XEM LẠI VỤ ÁN' : 'BẮT ĐẦU ĐIỀU TRA'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

