// rafce
import React from 'react'
import { Link } from 'react-router-dom';
import shortContent from './utils/shortContent';

const NoteList = ({ notes, activeId, previewlength}) => {
  
  return (
    <ul className="rounded-md border text-lg text-slate-700">
            {notes.map((note) => (
              <li 
                key={note.id}
                className={`cursor-pointer border-b px-4 py-2 ${activeId === note.id ? 'bg-slate-200' : 'hover:bg-slate-200'}`}
              >
                <Link to={`/view/${note.id}`}>
                  <strong>
                    {note.title}
                  </strong>
                  <p className="leading text-xs text-slate-500">
                    {shortContent(note.content, previewlength)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
  )
}

export default NoteList