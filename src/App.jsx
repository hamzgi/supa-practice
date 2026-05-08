import { useEffect, useState } from 'react'
import { supabase } from "./assets/supabase";

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    setUser(user)
  }

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('회원가입 성공')
    }
  }

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('로그인 성공')
      getUser()
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <div style={{ padding: '30px' }}>
      <h1>Supabase 게시판</h1>

      {user ? (
        <>
          <p>로그인됨: {user.email}</p>
          <button onClick={logout}>로그아웃</button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />
          <br />

          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <br />

          <button onClick={signUp}>회원가입</button>

          <button onClick={login}>로그인</button>
        </>
      )}
    </div>
  )
}

export default App