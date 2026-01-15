import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Create particles
  useEffect(() => {
    const particles: HTMLDivElement[] = [];
    const container = containerRef.current;
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animation = 'particle-float 15s linear infinite';
      container.appendChild(particle);
      particles.push(particle);
    }
    
    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  const mysteryTexts = [
    { id: '1', text: 'CONFIDENTIAL', blur: true },
    { id: '2', text: 'CLASSIFIED', blur: true },
    { id: '3', text: 'RESTRICTED', blur: true },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden perspective-3d"
    >
      {/* 3D Grid Background */}
      <div className="fixed inset-0 z-0 grid-3d-bg opacity-20 pointer-events-none"></div>
      
      {/* Grainy Texture Overlay */}
      <div className="fixed inset-0 z-0 grain-texture opacity-30 pointer-events-none"></div>
      
      {/* Scan Line Effect */}
      <div className="scan-line fixed inset-0 z-[1] pointer-events-none"></div>
      
      {/* Animated 3D Moody Lighting Effects */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden parallax-container"
        style={{
          transform: `translateZ(0) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      >
        {/* 3D Rotating Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blood-red/20 rounded-full blur-3xl animate-float-slow orb-3d"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blood-red-dark/30 rounded-full blur-3xl animate-float-reverse orb-3d"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black/40 rounded-full blur-3xl animate-pulse-glow orb-3d"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blood-red/10 rounded-full blur-3xl animate-float-slow orb-3d" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-blood-red-dark/15 rounded-full blur-3xl animate-float-reverse orb-3d" style={{ animationDelay: '4s' }}></div>
        
        {/* Large Glowing Processing Circle (3D) - Enhanced */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border-4 border-blood-red animate-glow-pulse"
          style={{
            transform: `translate(-50%, -50%) translateZ(50px) rotateY(${mousePosition.x * 0.1}deg) rotateX(${mousePosition.y * 0.1}deg)`,
            boxShadow: '0 0 80px rgba(220, 38, 38, 0.8), 0 0 120px rgba(220, 38, 38, 0.4), inset 0 0 60px rgba(220, 38, 38, 0.3)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="typewriter-font text-blood-red text-sm md:text-base uppercase tracking-widest opacity-80" style={{
              textShadow: '0 0 20px rgba(220, 38, 38, 0.8)',
            }}>PROCESSING</span>
          </div>
        </div>
        
        {/* Animated gradient mesh background with 3D */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(at 20% 30%, rgba(220, 38, 38, 0.15) 0px, transparent 50%),
              radial-gradient(at 80% 70%, rgba(153, 27, 27, 0.15) 0px, transparent 50%),
              radial-gradient(at 50% 50%, rgba(0, 0, 0, 0.3) 0px, transparent 50%)
            `,
            animation: 'float-slow 30s ease-in-out infinite',
            transform: `translateZ(-100px) scale(1.2)`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* 3D Typewriter Title - Enhanced Visibility */}
            <div 
              className="space-y-4 perspective-3d"
              style={{
                transform: `translateZ(100px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
              }}
            >
              <h1 className="typewriter-font text-6xl md:text-8xl font-black text-white tracking-wider leading-tight" style={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 30px rgba(220, 38, 38, 0.5)',
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
              }}>
                DETECTIVE
                <br />
                <span 
                  className="text-blood-red inline-block"
                  style={{
                    textShadow: '0 0 30px rgba(220, 38, 38, 1), 0 0 60px rgba(220, 38, 38, 0.6), 2px 2px 4px rgba(0, 0, 0, 0.8)',
                    filter: 'drop-shadow(0 0 15px rgba(220, 38, 38, 0.8))',
                    transform: `translateZ(30px)`,
                  }}
                >
                  NOIR
                </span>
              </h1>
              <div 
                className="w-32 h-1 bg-blood-red mx-auto animate-glow-pulse"
                style={{
                  boxShadow: '0 0 15px rgba(220, 38, 38, 1), 0 0 30px rgba(220, 38, 38, 0.5)',
                }}
              ></div>
            </div>

            {/* Mystery Tagline with 3D - Enhanced Visibility */}
            <p 
              className="typewriter-font text-xl md:text-2xl text-white tracking-widest uppercase"
              style={{
                transform: `translateZ(50px) rotateX(${mousePosition.y * 0.02}deg)`,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.2)',
                filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
              }}
            >
              The Truth Lies in the Shadows
            </p>

            {/* 3D Blurred Mystery Elements */}
            <div 
              className="flex justify-center gap-6 mt-12 perspective-3d"
              style={{
                transform: `translateZ(30px)`,
              }}
            >
              {mysteryTexts.map((item) => (
                <div
                  key={item.id}
                  className="relative group cursor-pointer card-3d"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  onMouseEnter={(e) => {
                    setHoveredSection(item.id);
                  }}
                  onMouseMove={(e) => {
                    if (hoveredSection === item.id) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = (y - centerY) / 20;
                      const rotateY = (centerX - x) / 20;
                      e.currentTarget.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    setHoveredSection(null);
                    e.currentTarget.style.transform = 'perspective(500px) rotateX(0) rotateY(0) translateZ(0)';
                  }}
                >
                  <div
                    className={`typewriter-font text-sm md:text-base uppercase tracking-[0.3em] transition-all duration-500 ${
                      hoveredSection === item.id ? 'blur-0 opacity-100 scale-110 text-white' : 'blur-sm opacity-80 text-gray-300'
                    }`}
                    style={{
                      textShadow: hoveredSection === item.id 
                        ? '0 0 20px rgba(220, 38, 38, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.8)' 
                        : '1px 1px 2px rgba(0, 0, 0, 0.6)',
                      transform: hoveredSection === item.id ? 'translateZ(30px)' : 'translateZ(0)',
                    }}
                  >
                    {item.text}
                  </div>
                  {hoveredSection === item.id && (
                    <div 
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-blood-red animate-pulse"
                      style={{
                        boxShadow: '0 0 10px rgba(220, 38, 38, 0.8)',
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* 3D CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-16 perspective-3d"
              style={{
                transform: `translateZ(50px)`,
              }}
            >
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="group relative px-8 py-4 bg-blood-red text-white font-bold typewriter-font tracking-wider uppercase border-2 border-blood-red hover:bg-transparent hover:text-blood-red transition-all duration-300 overflow-hidden card-3d animate-glow-pulse"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                  }}
                >
                  <span className="relative z-10">Enter the Case Files</span>
                  <div className="absolute inset-0 bg-blood-red/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="group relative px-8 py-4 bg-blood-red text-white font-bold typewriter-font tracking-wider uppercase border-2 border-blood-red hover:bg-transparent hover:text-blood-red transition-all duration-300 overflow-hidden card-3d animate-glow-pulse"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = (y - centerY) / 10;
                      const rotateY = (centerX - x) / 10;
                      e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                    }}
                  >
                    <span className="relative z-10">Begin Investigation</span>
                    <div className="absolute inset-0 bg-blood-red/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-8 py-4 bg-transparent text-charcoal-light font-bold typewriter-font tracking-wider uppercase border-2 border-charcoal-light hover:border-blood-red hover:text-blood-red transition-all duration-300 card-3d"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = (y - centerY) / 10;
                      const rotateY = (centerX - x) / 10;
                      e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                    }}
                  >
                    Join the Force
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section with Mystery Reveal */}
        <section className="py-20 px-6 border-t border-charcoal-dark/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="typewriter-font text-3xl md:text-4xl text-white text-center mb-16 tracking-wider uppercase">
              The Case Files
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Investigate',
                  description: 'Examine clues, analyze evidence, and piece together the puzzle.',
                  icon: 'fingerprint',
                  iconVariant: 'search',
                  blurText: 'EVIDENCE',
                },
                {
                  title: 'Interrogate',
                  description: 'Question suspects and uncover their secrets.',
                  icon: 'fingerprint',
                  iconVariant: 'person',
                  blurText: 'SUSPECTS',
                },
                {
                  title: 'Solve',
                  description: 'Crack the case and bring justice to light.',
                  icon: 'fingerprint',
                  iconVariant: 'gavel',
                  blurText: 'JUSTICE',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative p-8 hover:glass-panel-noir-active transition-all duration-500 cursor-pointer card-3d perspective-3d"
                  onMouseEnter={() => setHoveredSection(`feature-${idx}`)}
                  onMouseLeave={() => setHoveredSection(null)}
                  style={{
                    transformStyle: 'preserve-3d',
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(220, 38, 38, 0.2)',
                    borderRadius: '0.75rem',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 20px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blood-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 space-y-4">
                    {/* Fingerprint Icon with Pulse Animation */}
                    <div 
                      className="mb-4 flex items-center justify-center transition-all duration-500"
                      style={{
                        filter: hoveredSection === `feature-${idx}` ? 'drop-shadow(0 0 15px rgba(220, 38, 38, 0.8))' : 'drop-shadow(0 0 5px rgba(220, 38, 38, 0.3))',
                      }}
                    >
                      <div 
                        className="relative"
                        style={{
                          animation: hoveredSection === `feature-${idx}` ? 'pulse-glow 2s ease-in-out infinite' : 'none',
                          transform: hoveredSection === `feature-${idx}` ? 'scale(1.1)' : 'scale(1)',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <span 
                          className="material-symbols-outlined text-blood-red transition-all duration-300"
                          style={{
                            fontSize: '4rem',
                            filter: hoveredSection === `feature-${idx}` ? 'brightness(1.3)' : 'brightness(1)',
                          }}
                        >
                          {feature.icon}
                        </span>
                        {/* Overlay icon hint for variant */}
                        {hoveredSection === `feature-${idx}` && (
                          <span 
                            className="material-symbols-outlined absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-60"
                            style={{
                              fontSize: '1.5rem',
                              pointerEvents: 'none',
                              animation: 'pulse-slow 2s ease-in-out infinite',
                            }}
                          >
                            {feature.iconVariant}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="typewriter-font text-xl text-white font-bold tracking-wider uppercase" style={{
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                    }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed" style={{
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
                    }}>
                      {feature.description}
                    </p>
                    
                    {/* Mystery Blur Effect - Enhanced Visibility */}
                    <div
                      className={`typewriter-font text-xs uppercase tracking-[0.2em] mt-4 transition-all duration-500 ${
                        hoveredSection === `feature-${idx}` ? 'blur-0 opacity-100 text-blood-red' : 'blur-sm opacity-60 text-blood-red/70'
                      }`}
                      style={{
                        textShadow: hoveredSection === `feature-${idx}` ? '0 0 10px rgba(220, 38, 38, 0.8)' : 'none',
                      }}
                    >
                      {feature.blurText}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Atmospheric Footer */}
        <footer className="py-8 px-6 border-t border-charcoal-dark/50 text-center">
          <p className="typewriter-font text-xs text-charcoal-light tracking-[0.3em] uppercase">
            © 2024 Detective Noir Agency • All Cases Classified
          </p>
        </footer>
      </div>
    </div>
  );
};

