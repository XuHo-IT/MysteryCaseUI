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
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: `url('${BACKGROUND_URL}')`, backgroundAttachment: 'fixed' }}
      ></div>
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background-dark/80 via-background-dark/90 to-background-dark pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <footer className="w-full py-6 border-t border-primary/10 mt-auto bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2024 Detective Noir. All rights reserved.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-primary">Điều khoản</a>
              <a href="#" className="hover:text-primary">Bảo mật</a>
              <a href="#" className="hover:text-primary">Liên hệ</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

