import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { USER_AVATAR_URL } from '../constants';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // Gamification: Navigation items as "clues" to find
  const navClues = [
    { path: '/dashboard', label: 'CASE FILES', clue: 'ARCHIVE', icon: 'folder' },
    { path: '/investigation', label: 'INVESTIGATION', clue: 'BOARD', icon: 'dashboard', requiresAuth: true },
    { path: '/history', label: 'HISTORY', clue: 'RECORDS', icon: 'history', requiresAuth: true },
    { path: '/profile', label: 'PROFILE', clue: 'DOSSIER', icon: 'person', requiresAuth: true },
    { path: '/create-case', label: 'CREATE', clue: 'NEW CASE', icon: 'add_circle', requiresAuth: true, requiresAdmin: true },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-blood-red/20 px-6 py-3 backdrop-blur-md" style={{
      background: 'rgba(0, 0, 0, 0.95)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(220, 38, 38, 0.1)',
    }}>
      <div 
        className="flex items-center gap-4 text-white cursor-pointer group" 
        onClick={() => navigate('/')}
      >
        {/* Large 3D Rotating Circle with Fingerprint */}
        <div 
          className="relative size-16 md:size-20 flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div 
            className="absolute inset-0 rounded-full border-4 border-blood-red animate-glow-pulse"
            style={{
              boxShadow: '0 0 30px rgba(220, 38, 38, 0.6), inset 0 0 20px rgba(220, 38, 38, 0.2)',
              animation: 'rotate-3d 20s linear infinite',
            }}
          ></div>
          <div className="relative z-10 text-blood-red group-hover:text-blood-red-dark transition-colors">
            <span className="material-symbols-outlined !text-4xl md:!text-5xl">fingerprint</span>
          </div>
        </div>
        <h2 className="text-white text-xl font-bold leading-tight tracking-wider hidden sm:block typewriter-font" style={{
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
        }}>
          DETECTIVE NOIR
        </h2>
      </div>
      <nav className="flex flex-1 justify-end gap-4 md:gap-6">
        <div className="hidden md:flex items-center gap-6">
          {navClues.map((clue) => {
            if (clue.requiresAuth && !isAuthenticated) return null;
            if (clue.requiresAdmin && user?.role !== 'Admin') return null;
            
            const isCurrentActive = isActive(clue.path) || 
              (clue.path === '/investigation' && (location.pathname.startsWith('/clue') || location.pathname.startsWith('/case-detail')));
            
            return (
              <button
                key={clue.path}
                onClick={() => navigate(clue.path)}
                className="group relative"
                title={clue.clue}
              >
                <div className={`typewriter-font text-xs uppercase tracking-wider transition-all duration-300 ${
                  isCurrentActive 
                    ? 'text-blood-red font-bold' 
                    : 'text-charcoal-light hover:text-blood-red/80'
                }`}>
                  <div className="flex items-center gap-2">
                    <span 
                      className="material-symbols-outlined !text-base transition-all duration-300"
                      style={{
                        transform: isCurrentActive 
                          ? (clue.icon === 'dashboard' ? 'rotate(360deg) scale(1.2)' : clue.icon === 'folder' ? 'scale(1.2) rotate(15deg)' : 'scale(1.2)')
                          : 'rotate(0deg) scale(1)',
                        animation: isCurrentActive && clue.icon === 'dashboard' 
                          ? 'rotate-3d 3s linear infinite' 
                          : isCurrentActive && clue.icon === 'history'
                          ? 'pulse-slow 2s ease-in-out infinite'
                          : 'none',
                        filter: isCurrentActive ? 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.8))' : 'none',
                      }}
                    >
                      {clue.icon}
                    </span>
                    <span className="hidden lg:inline">{clue.label}</span>
                  </div>
                </div>
                {/* Clue indicator line */}
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-blood-red transition-all duration-300 ${
                  isCurrentActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
                {/* Mystery tooltip on hover */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="typewriter-font text-[10px] text-charcoal-light bg-black/90 px-2 py-1 rounded border border-blood-red/30 whitespace-nowrap">
                    {clue.clue}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex flex-col items-end border-r border-charcoal-dark/50 pr-4">
                <span className="text-xs text-charcoal-light typewriter-font">{user?.username}</span>
                <span className="text-xs text-blood-red font-bold typewriter-font">{user?.points || 0} PTS</span>
              </div>
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-blood-red/30 shadow-glow-red cursor-pointer hover:border-blood-red/60 transition-all" 
                style={{ backgroundImage: `url('${USER_AVATAR_URL}')` }}
                onClick={() => navigate('/profile')}
                title="View Dossier"
              ></div>
              <button
                onClick={logout}
                className="text-sm text-charcoal-light hover:text-blood-red transition-colors typewriter-font text-xs uppercase tracking-wider"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-blood-red text-white font-bold rounded border-2 border-blood-red hover:bg-transparent hover:text-blood-red transition-all typewriter-font text-xs uppercase tracking-wider"
            >
              LOGIN
            </button>
          )}
          <span className="material-symbols-outlined md:hidden text-white cursor-pointer hover:text-blood-red transition-colors">menu</span>
        </div>
      </nav>
    </header>
  );
};
