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
        <div className="text-blood-red text-xl typewriter-font uppercase tracking-wider">Loading Case Files...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-blood-red text-xl typewriter-font uppercase tracking-wider">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 gap-8 animate-fade-in">
      <div className="flex flex-col gap-3">
        <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-wider typewriter-font uppercase">
          Case Files Archive
        </h1>
        <p className="text-charcoal-light text-lg typewriter-font tracking-wide">
          Select a case to begin your investigation.
        </p>
      </div>

      {/* Search - Styled as Evidence Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-blood-red/70 group-focus-within:text-blood-red transition-colors">
              search
            </span>
          </div>
          <input
            type="text"
            placeholder="Search case files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-charcoal-dark/80 border border-blood-red/20 rounded-lg text-white placeholder-charcoal-light focus:outline-none focus:border-blood-red/60 focus:ring-1 focus:ring-blood-red/60 transition-all typewriter-font"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCases.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-charcoal-light typewriter-font uppercase tracking-wider">
            No Cases Found
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
                  <h3 className="text-white text-2xl font-bold leading-tight group-hover:text-blood-red transition-colors typewriter-font">
                    {caseItem.title}
                  </h3>
                  <div
                    className={`text-xs font-bold py-1 px-3 uppercase rounded-full typewriter-font tracking-wider ${
                      caseItem.isSolved
                        ? 'text-charcoal-light bg-charcoal/30 border border-charcoal-dark'
                        : 'text-blood-red bg-blood-red/10 border border-blood-red/30'
                    }`}
                  >
                    {caseItem.isSolved ? 'CLOSED' : 'ACTIVE'}
                  </div>
                </div>
                <p className="text-charcoal-light text-sm flex-grow leading-relaxed">
                  {caseItem.description}
                </p>

                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex justify-between text-xs text-charcoal-light typewriter-font uppercase tracking-wider">
                    <span>DIFFICULTY: {caseItem.difficultyLevel}</span>
                  </div>
                </div>

                <button
                  className={`mt-4 w-full h-10 rounded-lg font-bold text-sm tracking-wider transition-all typewriter-font uppercase ${
                    caseItem.isSolved
                      ? 'bg-charcoal-dark text-charcoal-light cursor-not-allowed border border-charcoal-dark'
                      : 'bg-blood-red text-white hover:bg-blood-red-dark hover:shadow-glow-red border-2 border-blood-red'
                  }`}
                >
                  {caseItem.isSolved ? 'REVIEW CASE' : 'BEGIN INVESTIGATION'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

