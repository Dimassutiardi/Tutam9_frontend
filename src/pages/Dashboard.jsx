import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../elements/Navbar';
import NoteCard from '../elements/NoteCard';
import { getNotes, createNote, updateNote, deleteNote } from '../services/api';
import { isAuthenticated, getUser } from '../services/auth';
import { Plus, X, Save, Loader, AlertCircle, Check } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const user = getUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    loadNotes();
  }, [navigate]);

  const loadNotes = async () => {
    setIsLoading(true);
    try {
      const response = await getNotes();
      setNotes(response.success ? response.payload || [] : []);
      if (!response.success) setError('Gagal memuat Note');
    } catch (err) {
      setError('Error saat memuat Note');
      console.error(err);
    }
    setIsLoading(false);
  };

  const showNotif = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const openForm = (note = null) => {
    setCurrentNote(note);
    setTitle(note ? note.title || '' : '');
    setContent(note ? note.content || '' : '');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentNote(null);
    setTitle('');
    setContent('');
  };

  const saveNote = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      showNotif('Title tidak boleh kosong', 'error');
      return;
    }

    try {
      const noteData = { title, content };
      
      if (currentNote) {
        const response = await updateNote(currentNote.id, noteData);
        if (response.success) {
          setNotes(notes.map(note => 
            note.id === currentNote.id ? { ...note, ...noteData } : note
          ));
          showNotif('Note berhasil diperbarui');
        }
      } else {
        const response = await createNote(noteData);
        if (response.success) {
          setNotes([response.payload, ...notes]);
          showNotif('Note baru berhasil dibuat');
        }
      }
      closeForm();
    } catch (err) {
      showNotif('Gagal save Note', 'error');
      console.error(err);
    }
  };

  const removeNote = async (id) => {
    if (!window.confirm('Yakin ingin menghapus Note ini?')) return;

    try {
      const response = await deleteNote(id);
      if (response.success) {
        setNotes(notes.filter(note => note.id !== id));
        showNotif('Note berhasil dihapus');
      } else {
        showNotif('Gagal menghapus Note', 'error');
      }
    } catch (err) {
      showNotif('Error saat menghapus Note', 'error');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#fff8e8] w-full">
      <Navbar user={user} />

      <main className="flex-1 w-full px-6 py-6">
        <div className="flex justify-between items-center mb-8 max-w-screen-xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Note Kamu</h1>
            {user && <p className="text-sm text-gray-600 mt-1">Selamat datang, {user.username}</p>}
          </div>
          <button
            onClick={() => openForm()}
            className="bg-[#e63946] text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2"
          >
            <Plus size={18} />
            Tambah Note
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader size={40} className="animate-spin text-[#e63946]" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-6 rounded-lg flex items-center gap-3 justify-center">
            <AlertCircle size={24} />
            <span>{error}</span>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum ada Note</h3>
            <p className="text-gray-500">Klik "Tambah Note" untuk mulai mencatat</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
            {notes.map((note) => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onEdit={() => openForm(note)} 
                onDelete={() => removeNote(note.id)} 
              />
            ))}
          </div>
        )}
      </main>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {currentNote ? 'Edit Note' : 'Note Baru'}
              </h3>
              <button onClick={closeForm} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={saveNote} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Judul Note"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Isi Note
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Isi Note"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#e63946] text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <Save size={18} />
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notification.show && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg z-50 flex items-center gap-2 ${
          notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}>
          {notification.type === 'error' ? (
            <AlertCircle size={18} />
          ) : (
            <div className="w-5 h-5 rounded-full bg-white text-green-500 flex items-center justify-center">
              <Check size={12} />
            </div>
          )}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;