import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { USER_AVATAR_URL } from '../constants';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 px-6 py-3 glass-panel">
      <div 
        className="flex items-center gap-4 text-white cursor-pointer" 
        onClick={() => navigate('/')}
      >
        <div className="size-8 text-primary">
          <span className="material-symbols-outlined !text-3xl">fingerprint</span>
        </div>
        <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] hidden sm:block">Detective Noir</h2>
      </div>
      <nav className="flex flex-1 justify-end gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-9">
          <button 
            onClick={() => navigate('/')}
            className={`text-sm font-medium leading-normal transition-colors ${isActive('/') ? 'text-primary font-bold' : 'text-white/80 hover:text-primary'}`}
          >
            Trang chủ
          </button>
          {isAuthenticated && (
            <>
              <button 
                onClick={() => navigate('/investigation')}
                className={`text-sm font-medium leading-normal transition-colors ${isActive('/investigation') || location.pathname.startsWith('/clue') || location.pathname.startsWith('/case-detail') ? 'text-primary font-bold' : 'text-white/80 hover:text-primary'}`}
              >
                Vụ án hiện tại
              </button>
              <button 
                onClick={() => navigate('/history')}
                className={`text-sm font-medium leading-normal transition-colors ${isActive('/history') ? 'text-primary font-bold' : 'text-white/80 hover:text-primary'}`}
              >
                Lịch sử
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className={`text-sm font-medium leading-normal transition-colors ${isActive('/profile') ? 'text-primary font-bold' : 'text-white/80 hover:text-primary'}`}
              >
                Hồ sơ
              </button>
              {user?.role === 'Admin' && (
                <button 
                  onClick={() => navigate('/create-case')}
                  className={`text-sm font-medium leading-normal transition-colors ${isActive('/create-case') ? 'text-primary font-bold' : 'text-white/80 hover:text-primary'}`}
                >
                  Tạo Vụ án
                </button>
              )}
            </>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs text-gray-400">{user?.username}</span>
                <span className="text-xs text-primary">{user?.points || 0} điểm</span>
              </div>
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-primary/30 shadow-glow-cyan cursor-pointer" 
                style={{ backgroundImage: `url('${USER_AVATAR_URL}')` }}
                onClick={() => navigate('/profile')}
              ></div>
              <button
                onClick={logout}
                className="text-sm text-gray-400 hover:text-primary transition-colors"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-primary text-black font-bold rounded-lg hover:bg-cyan-300 transition-colors"
            >
              Đăng nhập
            </button>
          )}
          <span className="material-symbols-outlined md:hidden text-white cursor-pointer">menu</span>
        </div>
      </nav>
    </header>
  );
};
