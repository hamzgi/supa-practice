import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../assets/supabase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const signUp = async () => {
    if (!email || !password || !nickname) {
      alert('이메일, 비밀번호, 닉네임을 모두 입력해주세요.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h2 className="auth-title">회원가입</h2>
        
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

        <div className="form-group">
          <label className="form-label">Nickname</label>
          <input
            type="text"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className="auth-buttons">
          <button onClick={signUp} className="btn">회원가입</button>
          <Link to="/login" className="btn btn-secondary">이미 계정이 있으신가요? 로그인</Link>
        </div>
      </div>
    </div>
  );
}
