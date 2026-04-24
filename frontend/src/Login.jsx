import { signInWithRedirect } from 'aws-amplify/auth'

function Login({ onLogin }) {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Notes App</h1>
        <p>Sign in to access your notes!</p>
        <button onClick={() => signInWithRedirect()} className="login-btn">
          Sign In
        </button>
      </div>
    </div>
  )
}

export default Login