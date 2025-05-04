import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { isAuthenticated } from '../services/auth';
import Navbar from '../elements/Navbar';
import { User, Mail, Lock, AlertCircle, Check } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/app');
    }
  }, [navigate]);

  const doRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await registerUser({ username, email, password });
      
      if (response.success) {
        setSuccess('Registrasi berhasil! Silakan login.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(response.message || 'Registrasi gagal. Coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat register.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white w-full">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-0 w-full">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mx-4">
          <h1 className="text-3xl font-bold text-center text-[#e63946] mb-6">
            Daftar gas!
          </h1>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 flex items-center gap-2">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 flex items-center gap-2">
              <Check size={18} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={doRegister} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Username kamu"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Password minimal 8 karakter"
                />
              </div>
              <p className="text-xs text-gray-500">Password minimal 8 karakter, harus mengandung angka dan karakter spesial</p>
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className={`w-full py-2 px-4 bg-[#ffdd57] text-gray-800 rounded-md ${
                (isLoading || success) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Mendaftar...' : success ? 'Registrasi Berhasil!' : 'Daftar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="font-medium text-[#e63946]">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;