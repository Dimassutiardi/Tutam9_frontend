import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const shortText = (text) => {
    if (!text) return '';
    return text.length > 100 ? text.slice(0, 100) + '...' : text;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <div className="flex gap-2">
          <button onClick={() => onEdit(note)} className="text-blue-500">
            <Pencil size={18} />
          </button>
          <button onClick={() => onDelete(note.id)} className="text-[#e63946]">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-3 text-sm min-h-[50px]">
        {shortText(note.content)}
      </p>
      <div className="text-xs text-gray-500">
        Updated: {formatDate(note.updated_at)}
      </div>
    </div>
  );
};

export default NoteCard;