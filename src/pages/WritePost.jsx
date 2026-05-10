import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../assets/supabase';

export default function WritePost({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const createPost = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const { error } = await supabase.from('posts').insert({
      title,
      content,
      user_id: user.id,
      user_nickname: user.user_metadata?.nickname,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('게시글 작성 완료');
      navigate('/');
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div className="empty-state">로그인이 필요한 서비스입니다.</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="write-container">
        <h2 className="auth-title">새 게시글 작성</h2>
        
        <div className="form-group">
          <label className="form-label">제목</label>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">내용</label>
          <textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ minHeight: '300px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={createPost} className="btn" style={{ flex: 1 }}>작성하기</button>
          <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ flex: 1 }}>취소</button>
        </div>
      </div>
    </div>
  );
}
