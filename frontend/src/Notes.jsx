import { useEffect, useState } from 'react'
import { fetchAuthSession } from 'aws-amplify/auth'

const API_URL = import.meta.env.API_URL

async function getToken() {
  const session = await fetchAuthSession()
  return session.tokens.idToken.toString()
}

function Notes() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingNote, setEditingNote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    fetchNotes()
  }, [])
  async function fetchNotes() {
    try {
      const token = await getToken()
      const res = await fetch(`${API_URL}/notes`, {
        headers: { Authorization: token }
      })
      const data = await res.json()
      setNotes(data)
    } catch (err) {
      console.error('Error fetching notes:', err)
    }
    setLoading(false)
  }

  async function saveNote() {
    if (!title.trim()) return
    const token = await getToken()

    if (editingNote) {
      const res = await fetch(`${API_URL}/notes/${editingNote.noteId}`, {
        method: 'PUT',
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      })
      const updated = await res.json()
      setNotes(notes.map(n => n.noteId === updated.noteId ? updated : n))
      setEditingNote(null)
    } else {
      const res = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      })
      const newNote = await res.json()
      setNotes([newNote, ...notes])
    }

    setTitle('')
    setContent('')
  }

  async function deleteNote(noteId) {
    const token = await getToken()
    await fetch(`${API_URL}/notes/${noteId}`, {
      method: 'DELETE',
      headers: { Authorization: token }
    })
    setNotes(notes.filter(n => n.noteId !== noteId))
  }

  function startEdit(note) {
    setEditingNote(note)
    setTitle(note.title)
    setContent(note.content)
  }

  function cancelEdit() {
    setEditingNote(null)
    setTitle('')
    setContent('')
  }

  return (
    <div className="notes-container">
      <div className="note-form">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={4}
        />
        <div className="form-buttons">
          <button onClick={saveNote} className="save-btn">
            {editingNote ? 'Update Note' : 'Add Note'}
          </button>
          {editingNote && (
            <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="empty">No notes yet.</p>
      ) : (
        <div className="notes-list">
          {notes.map(note => (
            <div key={note.noteId} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="note-actions">
                <button onClick={() => startEdit(note)} className="edit-btn">Edit</button>
                <button onClick={() => deleteNote(note.noteId)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Notes