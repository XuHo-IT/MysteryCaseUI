import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (formData.username.length < 4) {
      setError('Tên đăng nhập phải có ít nhất 4 ký tự');
      return;
    }

    setLoading(true);

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
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
          <h1 className="text-3xl font-black text-white mb-2 typewriter-font uppercase tracking-wider">Agent Registration</h1>
          <p className="text-charcoal-light typewriter-font tracking-wide">Begin your investigation journey</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-blood-red/20 border border-blood-red/50 rounded-lg text-blood-red text-sm typewriter-font relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-sm font-medium text-charcoal-light mb-2 typewriter-font uppercase tracking-wider text-xs">
              Username (min. 4 characters)
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 bg-charcoal-dark border border-charcoal-dark rounded-lg text-white focus:outline-none focus:border-blood-red transition-colors typewriter-font"
              required
              minLength={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-light mb-2 typewriter-font uppercase tracking-wider text-xs">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-charcoal-dark border border-charcoal-dark rounded-lg text-white focus:outline-none focus:border-blood-red transition-colors typewriter-font"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-light mb-2 typewriter-font uppercase tracking-wider text-xs">
              Password (min. 6 characters)
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-charcoal-dark border border-charcoal-dark rounded-lg text-white focus:outline-none focus:border-blood-red transition-colors typewriter-font"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-light mb-2 typewriter-font uppercase tracking-wider text-xs">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 bg-charcoal-dark border border-charcoal-dark rounded-lg text-white focus:outline-none focus:border-blood-red transition-colors typewriter-font"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blood-red text-white font-bold rounded-lg hover:bg-blood-red-dark hover:shadow-glow-red transition-all disabled:opacity-50 disabled:cursor-not-allowed typewriter-font uppercase tracking-wider border-2 border-blood-red"
          >
            {loading ? 'REGISTERING...' : 'REGISTER'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-charcoal-light typewriter-font relative z-10">
          Already have credentials?{' '}
          <Link to="/login" className="text-blood-red hover:underline font-bold">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

