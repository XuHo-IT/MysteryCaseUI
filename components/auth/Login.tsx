import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <div className="w-full max-w-md glass-panel rounded-xl p-8 relative">
        {/* Mystery overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blood-red/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
        
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-black text-white mb-2 typewriter-font uppercase tracking-wider">Agent Login</h1>
          <p className="text-charcoal-light typewriter-font tracking-wide">Welcome back, detective</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-blood-red/20 border border-blood-red/50 rounded-lg text-blood-red text-sm typewriter-font relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-sm font-medium text-charcoal-light mb-2 typewriter-font uppercase tracking-wider text-xs">
              Username or Email
            </label>
            <input
              type="text"
              value={formData.usernameOrEmail}
              onChange={(e) => setFormData({ ...formData, usernameOrEmail: e.target.value })}
              className="w-full px-4 py-2 bg-charcoal-dark border border-charcoal-dark rounded-lg text-white focus:outline-none focus:border-blood-red transition-colors typewriter-font"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-light mb-2 typewriter-font uppercase tracking-wider text-xs">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-charcoal-dark border border-charcoal-dark rounded-lg text-white focus:outline-none focus:border-blood-red transition-colors typewriter-font"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blood-red text-white font-bold rounded-lg hover:bg-blood-red-dark hover:shadow-glow-red transition-all disabled:opacity-50 disabled:cursor-not-allowed typewriter-font uppercase tracking-wider border-2 border-blood-red"
          >
            {loading ? 'AUTHENTICATING...' : 'LOGIN'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-charcoal-light typewriter-font relative z-10">
          No credentials?{' '}
          <Link to="/register" className="text-blood-red hover:underline font-bold">
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  );
};

