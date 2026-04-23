import { useState } from 'react';
import { Heart, MessageSquare, Share2, ImageIcon, Send } from 'lucide-react';
import useRealtimeData, { FeedPost, Comment } from '../hooks/useRealtimeData';

export default function FeedPage() {
  const { feedPosts, setFeedPosts } = useRealtimeData();
  const [newPostText, setNewPostText] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleLike = (postId: number) => {
    setFeedPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now(),
      authorName: 'Pedro Silva',
      authorAvatar: 'PS',
      text: commentText,
      timeAgo: 'Agora'
    };

    setFeedPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
    
    setCommentText('');
  };

  const handleAddPost = () => {
    if (!newPostText.trim() && !recipeTitle.trim() && !ingredientsText.trim()) return;

    const newPost: FeedPost = {
      id: Date.now(),
      authorName: 'Pedro Silva',
      authorAvatar: 'PS',
      timeAgo: 'Agora',
      text: newPostText,
      recipeTitle: recipeTitle.trim() || undefined,
      ingredients: ingredientsText.trim() ? ingredientsText.split('\n').map(i => i.trim()).filter(Boolean) : undefined,
      instructions: instructionsText.trim() || undefined,
      likes: 0,
      isLiked: false,
      comments: []
    };

    setFeedPosts([newPost, ...feedPosts]);
    setNewPostText('');
    setRecipeTitle('');
    setIngredientsText('');
    setInstructionsText('');
  };

  return (
    <div className="feed-container animate-fadeIn">
      {/* Header section text */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span className="eyebrow">Comunidade MercadoMap</span>
        <h2 className="section-title" style={{ fontSize: 32, marginTop: 8 }}>Feed de Receitas</h2>
        <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
          Compartilhe o que você está cozinhando com os ingredientes em promoção!
        </p>
      </div>

      {/* Compose Card */}
      <div className="feed-compose-card">
        <div className="feed-compose-header">
          <div className="feed-avatar">PS</div>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Pedro Silva</span>
        </div>
        
        <input 
          type="text"
          className="feed-compose-input"
          style={{ minHeight: 'auto', padding: '12px 16px', fontWeight: 600, fontFamily: 'var(--serif)' }}
          placeholder="Nome da Receita (Opcional)"
          value={recipeTitle}
          onChange={(e) => setRecipeTitle(e.target.value)}
        />

        <textarea 
          className="feed-compose-input" 
          placeholder="Conte um pouco sobre essa receita..."
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <textarea 
            className="feed-compose-input" 
            placeholder="Ingredientes (um por linha)"
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
          />
          <textarea 
            className="feed-compose-input" 
            placeholder="Modo de preparo detalhado"
            value={instructionsText}
            onChange={(e) => setInstructionsText(e.target.value)}
          />
        </div>

        <div className="feed-compose-actions">
          <button style={{ background: 'none', border: 'none', color: 'var(--text-sub)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            <ImageIcon size={18} /> Adicionar Foto
          </button>
          <button className="feed-compose-btn" onClick={handleAddPost}>
            Publicar
          </button>
        </div>
      </div>

      {/* Feed List */}
      <div>
        {feedPosts.map(post => (
          <div key={post.id} className="feed-post-card">
            <div className="feed-post-header">
              <div className="feed-avatar">{post.authorAvatar}</div>
              <div>
                <div className="feed-post-author">{post.authorName}</div>
                <div className="feed-post-time">{post.timeAgo}</div>
              </div>
            </div>

            <div className="feed-post-body">
              {post.recipeTitle && <h3 className="feed-post-title">{post.recipeTitle}</h3>}
              <p className="feed-post-text">{post.text}</p>
              
              {post.ingredients && post.ingredients.length > 0 && (
                <div className="feed-post-ingredients">
                  {post.ingredients.map((ing, idx) => (
                    <span key={idx} className="feed-ingredient-tag">{ing}</span>
                  ))}
                </div>
              )}
              
              {post.instructions && (
                <div className="feed-post-instructions">
                  <strong>Modo de Preparo:</strong><br/>
                  {post.instructions}
                </div>
              )}
            </div>

            {post.img && (
              <img src={post.img} alt="Receita" className="feed-post-img" loading="lazy" />
            )}

            <div className="feed-post-actions">
              <button 
                className={`feed-action-btn ${post.isLiked ? 'liked' : ''}`}
                onClick={() => handleLike(post.id)}
              >
                <Heart size={20} /> {post.likes} Curtidas
              </button>
              <button 
                className="feed-action-btn"
                onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
              >
                <MessageSquare size={20} /> {post.comments.length} Comentários
              </button>
              <button className="feed-action-btn">
                <Share2 size={20} /> Compartilhar
              </button>
            </div>

            {/* Comments Section */}
            {(post.comments.length > 0 || activeCommentPostId === post.id) && (
              <div className="feed-comments">
                {post.comments.map(comment => (
                  <div key={comment.id} className="feed-comment">
                    <div className="feed-comment-avatar">{comment.authorAvatar}</div>
                    <div className="feed-comment-content">
                      <div className="feed-comment-bubble">
                        <div className="feed-comment-author">{comment.authorName}</div>
                        <div className="feed-comment-text">{comment.text}</div>
                      </div>
                      <div className="feed-comment-time">{comment.timeAgo}</div>
                    </div>
                  </div>
                ))}

                {activeCommentPostId === post.id && (
                  <div className="feed-comment-input-wrap">
                    <div className="feed-comment-avatar">PS</div>
                    <input 
                      type="text" 
                      className="feed-comment-input" 
                      placeholder="Escreva um comentário..." 
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    />
                    <button 
                      onClick={() => handleAddComment(post.id)}
                      style={{ background: 'var(--accent)', border: 'none', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg)', cursor: 'pointer' }}
                    >
                      <Send size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
