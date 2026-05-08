import { useEffect, useState } from 'react'
import { supabase } from "./assets/supabase"

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: false })

    if (!error) {
      setPosts(data)
    }
  }

  const createPost = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase.from('posts').insert({
      title,
      content,
      user_id: user.id,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('게시글 작성 완료')

      setTitle('')
      setContent('')

      getPosts()
    }
  }

  useEffect(() => {
    getUser()
    getPosts()
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

  const deletePost = async (id) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      alert(error.message)
    } else {
      await getPosts()
      alert('삭제 완료')
    }
  }

  const updatePosts = async (id) => {
    const { error } = await supabase
      .from('posts')
      .update({
        title,
        content,
      })
      .eq('id', id)

    if (error) {
      alert(error.message)
    } else {
      await getPosts()
      alert('수정 완료')
    }
  }

  return (
    <div style={{ padding: '30px' }}>
      <h1>Supabase 게시판</h1>

      {user ? (
        <>
          <p>로그인됨: {user.email}</p>

          <button onClick={logout}>로그아웃</button>

          <br />
          <br />

          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br />
          <br />

          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <br />
          <br />

          <button onClick={createPost}>글 작성</button>
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

      <hr />

      <h2>게시글 목록</h2>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: '1px solid gray',
            marginBottom: '10px',
            padding: '10px',
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {user && user.id === post.user_id && (
            <>
              <button onClick={() => updatePosts(post.id)}>
                수정
              </button>

              <button onClick={() => deletePost(post.id)}>
                삭제
              </button>
            </>
          )}

        </div>
      ))}
    </div>
  )
}

export default App