import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { BACKGROUND_URL } from '../constants';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div 
      className="relative flex flex-col min-h-screen w-full bg-background-dark text-white overflow-x-hidden"
    >
      {/* Grainy Texture Overlay */}
      <div className="fixed inset-0 z-0 grain-texture opacity-20 pointer-events-none"></div>
      
      {/* Moody Lighting Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blood-red/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blood-red-dark/15 rounded-full blur-3xl"></div>
      </div>
      
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: `url('${BACKGROUND_URL}')`, backgroundAttachment: 'fixed' }}
      ></div>
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/90 via-black/95 to-black pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <footer className="w-full py-6 border-t border-charcoal-dark/50 mt-auto bg-black/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-charcoal-light">
            <p className="typewriter-font text-xs tracking-wider">© 2024 Detective Noir Agency • All Cases Classified</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-blood-red transition-colors typewriter-font text-xs tracking-wider">CLASSIFIED</a>
              <a href="#" className="hover:text-blood-red transition-colors typewriter-font text-xs tracking-wider">RESTRICTED</a>
              <a href="#" className="hover:text-blood-red transition-colors typewriter-font text-xs tracking-wider">CONFIDENTIAL</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

