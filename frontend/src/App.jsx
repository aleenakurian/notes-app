import { useEffect, useState } from 'react'
import { getCurrentUser, signOut } from 'aws-amplify/auth'
import Notes from './Notes'
import Login from './Login'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const user = await getCurrentUser()
      setUser(user)
    } catch {
      setUser(null)
    }
    setLoading(false)
  }

  async function handleSignOut() {
    await signOut()
    setUser(null)
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="app">
      {user ? (
        <>
          <header>
            <h1>📝 My Notes</h1>
            <button onClick={handleSignOut} className="signout-btn">
              Sign Out
            </button>
          </header>
          <Notes />
        </>
      ) : (
        <Login onLogin={checkUser} />
      )}
    </div>
  )
}

export default App