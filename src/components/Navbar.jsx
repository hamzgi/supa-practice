import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../assets/supabase';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">멋쟁이게시판</Link>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">
              환영합니다! <strong>{user.user_metadata?.nickname || user.email}</strong>님
            </span>
            <Link to="/write" className="btn">새 글 쓰기</Link>
            <button onClick={handleLogout} className="btn btn-secondary">로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary">로그인</Link>
            <Link to="/signup" className="btn">회원가입</Link>
          </>
        )}
      </div>
    </nav>
  );
}
