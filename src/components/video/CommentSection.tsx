import { useState } from 'react';
import { ThumbsUp, Send } from 'lucide-react';
import { useVideo } from '@/contexts/VideoContext';
import { useAuth } from '@/contexts/AuthContext';
import { getVideoComments } from '@/data/videoMockData';

interface CommentSectionProps {
  videoId: string;
}

function formatCommentDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'À l\'instant';
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours} h`;
  if (days < 7) return `Il y a ${days} j`;
  if (days < 30) return `Il y a ${Math.floor(days / 7)} sem`;
  if (days < 365) return `Il y a ${Math.floor(days / 30)} mois`;
  return `Il y a ${Math.floor(days / 365)} ans`;
}

function formatLikes(likes: number): string {
  if (likes >= 1000) {
    return `${(likes / 1000).toFixed(1)}K`;
  }
  return likes.toString();
}

export function CommentSection({ videoId }: CommentSectionProps) {
  const { addComment, likeComment } = useVideo();
  const { isAuthenticated, user } = useAuth();
  const [newComment, setNewComment] = useState('');
  
  const comments = getVideoComments(videoId);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(videoId, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-white text-lg font-medium">
          {comments.length} commentaire{comments.length !== 1 ? 's' : ''}
        </h3>
      </div>

      {/* Add Comment */}
      {isAuthenticated && (
        <form onSubmit={handleSubmitComment} className="flex gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center text-[#0F172A] font-bold flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                className="w-full bg-transparent border-b border-white/20 focus:border-[#F59E0B] text-white placeholder:text-gray-500 py-2 pr-10 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#F59E0B] disabled:text-gray-600 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            {/* Avatar */}
            <img
              src={comment.userAvatar}
              alt={comment.userName}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-medium text-sm">
                  {comment.userName}
                </span>
                <span className="text-gray-500 text-xs">
                  {formatCommentDate(comment.createdAt)}
                </span>
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm whitespace-pre-wrap">
                {comment.content}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => likeComment(comment.id)}
                  className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{formatLikes(comment.likes)}</span>
                </button>
                <button className="text-gray-400 hover:text-white text-sm transition-colors">
                  Répondre
                </button>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">Aucun commentaire pour le moment</p>
            <p className="text-gray-500 text-sm mt-1">
              Soyez le premier à commenter !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
