import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../assets/supabase';

export default function Login({ getUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      await getUser();
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h2 className="auth-title">로그인</h2>
        
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="auth-buttons">
          <button onClick={login} className="btn">로그인</button>
          <Link to="/signup" className="btn btn-secondary">회원가입하러 가기</Link>
        </div>
      </div>
    </div>
  );
}
