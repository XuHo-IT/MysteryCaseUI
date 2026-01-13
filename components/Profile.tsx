import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Profile: React.FC = () => {
  const { user, refreshUser, loading } = useAuth();

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-primary text-xl">Đang tải...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-red-400 text-xl">Không thể tải thông tin người dùng</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 max-w-4xl mx-auto w-full p-4 md:p-8 gap-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-primary text-4xl md:text-5xl font-black tracking-tight">
          HỒ SƠ CÁ NHÂN
        </h1>
        <p className="text-gray-400 text-lg">Thông tin tài khoản và thống kê của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Thông tin tài khoản</h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-400">Tên đăng nhập</span>
              <p className="text-white font-semibold">{user.username}</p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Email</span>
              <p className="text-white font-semibold">{user.email}</p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Vai trò</span>
              <p className="text-white font-semibold">{user.role}</p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Tham gia từ</span>
              <p className="text-white font-semibold">
                {new Date(user.joinedAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Thống kê</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Điểm hiện tại</span>
              <p className="text-primary font-bold text-2xl">{user.points}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Vụ án đã giải</span>
              <p className="text-white font-semibold text-xl">{user.totalCasesSolved}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

