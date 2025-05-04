import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../elements/Navbar';
import { Book, PenTool, ArrowRight } from 'lucide-react';
import { isAuthenticated, getUser } from '../services/auth';

const Landing = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/app');
    }
  }, [navigate]);

  const features = [
    {
      title: "Easy",
      description: "Tinggal dipakai niscaya nilai kuliah anti melambai"
    },
    {
      title: "Aman",
      description: "Privacy disini aman aja ces"
    },
    {
      title: "Gratis",
      description: "Duitnya dibuat beli kopi di WK aja ya"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#fff8e8]">
      <Navbar user={getUser()} />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full text-center">
          <div className="flex justify-center mb-6">
            <Book size={80} className="text-[#e63946]" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-center text-gray-800 mb-6">
            Noted, Dim!
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Catatan cepat, tidur lebih cepat
          </p>
          
          <div className="flex justify-center mb-12 gap-4">
            <Link
              to="/login"
              className="bg-[#e63946] text-white px-8 py-3 rounded-lg text-lg flex items-center gap-2"
            >
              <PenTool size={20} />
              Mulai Note
            </Link>
            
            <Link
              to="/register"
              className="border-2 border-[#e63946] text-[#e63946] px-8 py-3 rounded-lg text-lg flex items-center gap-2"
            >
              Daftar Now
              <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;