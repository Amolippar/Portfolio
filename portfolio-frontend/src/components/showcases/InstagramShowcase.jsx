import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Smile, 
  CheckCircle2 
} from 'lucide-react';

export const InstagramShowcase = () => {
  const [likes, setLikes] = useState(148);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { user: 'rohit_sharma', text: 'Clean architectural setup Amol! 🔥' },
    { user: 'priya.dev', text: 'Love the smooth transitions and dark mode.' }
  ]);

  const toggleLike = () => {
    setIsLiked(prev => !prev);
    setLikes(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments(prev => [...prev, { user: 'guest_recruiter', text: commentText.trim() }]);
    setCommentText('');
  };

  return (
    <div className="rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
            Interactive Social Client UI
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Instagram Feed Post & Real-Time Engagement Engine
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-500">Optimistic UI State</span>
      </div>

      {/* Feed Post Simulator Container */}
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Post Top Header */}
        <div className="p-3.5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5">
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 p-0.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="Amol Ippar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div>
              <span className="font-bold text-xs text-slate-900 dark:text-white block leading-tight">
                amol_ippar
              </span>
              <span className="text-[10px] text-slate-500">Pune, Maharashtra</span>
            </div>
          </div>
          <MoreHorizontal className="w-4 h-4 text-slate-400" />
        </div>

        {/* Post Image */}
        <div
          className="relative aspect-square bg-slate-950 overflow-hidden cursor-pointer"
          onDoubleClick={toggleLike}
        >
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
            alt="Engineering Design"
            className="w-full h-full object-cover"
          />
          {isLiked && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-ping">
              <Heart className="w-20 h-20 text-white fill-white opacity-80" />
            </div>
          )}
        </div>

        {/* Action Buttons Bar */}
        <div className="p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLike}
                className="transition hover:scale-110"
                aria-label="Like post"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isLiked ? 'text-rose-500 fill-rose-500' : 'text-slate-700 dark:text-slate-200'
                  }`}
                />
              </button>
              <button className="transition hover:scale-110" aria-label="Comment">
                <MessageCircle className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              </button>
              <button className="transition hover:scale-110" aria-label="Share">
                <Send className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              </button>
            </div>
            <button
              onClick={() => setIsBookmarked(prev => !prev)}
              className="transition hover:scale-110"
              aria-label="Bookmark post"
            >
              <Bookmark
                className={`w-5 h-5 ${
                  isBookmarked ? 'text-slate-900 dark:text-white fill-current' : 'text-slate-700 dark:text-slate-200'
                }`}
              />
            </button>
          </div>

          <div className="text-xs font-bold text-slate-900 dark:text-white">
            {likes} likes
          </div>

          {/* Caption */}
          <div className="text-xs text-slate-800 dark:text-slate-200 space-x-1.5">
            <strong className="font-bold">amol_ippar</strong>
            <span>Continuous delivery pipelines and full-stack software development 🚀 #buildinpublic #react #springboot</span>
          </div>

          {/* Comments List */}
          <div className="space-y-1 pt-1">
            {comments.map((c, idx) => (
              <div key={idx} className="text-xs space-x-1.5">
                <strong className="font-bold text-slate-900 dark:text-white">{c.user}</strong>
                <span className="text-slate-600 dark:text-slate-300">{c.text}</span>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <form onSubmit={handleAddComment} className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              className="flex-1 bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="text-xs font-bold text-pink-600 hover:text-pink-500 disabled:opacity-30"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
