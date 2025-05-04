import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../services/auth';
import { LogOut, User, Book } from 'lucide-react';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm('Yakin ingin logout?')) {
      removeUser();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Book size={24} className="text-[#e63946]" />
        Noted, Dim!
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-600" />
              <span className="text-sm">{user.username}</span>
            </div>
            <button onClick={logout} className="flex items-center gap-1 text-gray-600">
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 font-medium">Login</Link>
            <Link to="/register" className="bg-[#e63946] text-white px-4 py-1 rounded-md">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;