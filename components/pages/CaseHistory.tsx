import React, { useState, useEffect } from 'react';
import { leaderboardApi, LeaderboardEntry } from '../../services/api';

export const CaseHistory: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await leaderboardApi.getLeaderboard();
      setLeaderboard(data);
    } catch (err: any) {
      setError(err.message || 'Không thể tải bảng xếp hạng');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="flex flex-col flex-1 max-w-5xl mx-auto w-full p-4 md:p-8 gap-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-primary text-4xl md:text-5xl font-black tracking-tight drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          BẢNG XẾP HẠNG
        </h1>
        <p className="text-gray-400 text-lg">
          Xem bảng xếp hạng những người giải vụ án nhanh nhất.
        </p>
      </div>

      {/* Leaderboard List */}
      <div className="flex flex-col gap-4">
        {leaderboard.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            Chưa có dữ liệu xếp hạng
          </div>
        ) : (
          leaderboard.map((entry, index) => (
            <div
              key={`${entry.caseId}-${entry.username}-${index}`}
              className="glass-panel rounded-xl p-6 hover:glass-panel-active transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`size-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      index === 0
                        ? 'bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500'
                        : index === 1
                        ? 'bg-gray-500/20 text-gray-400 border-2 border-gray-500'
                        : index === 2
                        ? 'bg-orange-500/20 text-orange-400 border-2 border-orange-500'
                        : 'bg-primary/10 text-primary border-2 border-primary/30'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{entry.caseTitle}</h3>
                    <p className="text-gray-400 text-sm">Người chơi: {entry.username}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-primary font-bold text-lg">{entry.timeToSolve}</p>
                  <p className="text-gray-400 text-xs">Thời gian giải</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

