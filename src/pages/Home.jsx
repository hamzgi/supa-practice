import { useEffect, useState } from 'react';
import { supabase } from '../assets/supabase';

export default function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const getPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: false });

    if (!error) {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      alert(error.message);
    } else {
      await getPosts();
      alert('삭제 완료');
    }
  };

  const updatePosts = async (id) => {
    const { error } = await supabase.from('posts').update({
      title: editTitle,
      content: editContent,
    }).eq('id', id);

    if (error) {
      alert(error.message);
    } else {
      await getPosts();
      setEditingPostId(null);
      alert('수정 완료');
    }
  };

  return (
    <div className="container">
      <h2>게시글 목록</h2>
      
      {posts.length === 0 ? (
        <div className="empty-state">첫 번째 게시글을 작성해보세요!</div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="card">
            {editingPostId === post.id ? (
              <>
                <div className="form-group">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="제목"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="내용"
                  />
                </div>
                <div className="card-actions">
                  <button onClick={() => updatePosts(post.id)} className="btn">저장</button>
                  <button onClick={() => setEditingPostId(null)} className="btn btn-secondary">취소</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="card-title">{post.title}</h3>
                <div className="card-meta">
                  작성자: <strong>{post.user_email || post.user_id}</strong> • {new Date(post.created_at).toLocaleString()}
                </div>
                <div className="card-content">
                  {post.content.split('\n').map((line, idx) => (
                    <p key={idx} style={{ margin: 0, minHeight: '1em' }}>{line}</p>
                  ))}
                </div>
                {user && user.id === post.user_id && (
                  <div className="card-actions">
                    <button onClick={() => {
                      setEditingPostId(post.id);
                      setEditTitle(post.title);
                      setEditContent(post.content);
                    }} className="btn btn-secondary">수정</button>
                    <button onClick={() => deletePost(post.id)} className="btn btn-danger">삭제</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
