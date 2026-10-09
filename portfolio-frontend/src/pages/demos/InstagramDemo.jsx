import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  PlusSquare, 
  Camera, 
  Check, 
  X, 
  Sparkles, 
  UserPlus, 
  Share2 
} from 'lucide-react';
import { DemoAppHeader } from './DemoAppHeader';

const INITIAL_STORIES = [
  { id: 1, username: "your_story", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", isUser: true },
  { id: 2, username: "alex_dev", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", hasNew: true },
  { id: 3, username: "priya_codes", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", hasNew: true },
  { id: 4, username: "tech_insider", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", hasNew: true },
  { id: 5, username: "sarah_cloud", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", hasNew: true },
];

const INITIAL_POSTS = [
  {
    id: 1,
    username: "alex_dev",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    location: "Bengaluru, India • Tech Summit",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80",
    caption: "Shipping the new Spring Boot microservices cluster to production today. Zero-downtime rolling deployment with Kubernetes! 🚀💻 #DeveloperLife #SpringBoot #DevOps",
    likes: 142,
    isLiked: false,
    isSaved: false,
    comments: [
      { id: 101, username: "priya_codes", text: "Huge milestone! How was the latency benchmark?" },
      { id: 102, username: "sarah_cloud", text: "Awesome setup Alex! Clean desk too 🔥" }
    ],
    timestamp: "2 HOURS AGO"
  },
  {
    id: 2,
    username: "priya_codes",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    location: "Pune, Maharashtra",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
    caption: "Late night refactoring session. Migrated our frontend state to React Query + Zustand. UI feels instantly snappy! ⚡️ #ReactJS #WebDev #CleanCode",
    likes: 218,
    isLiked: true,
    isSaved: true,
    comments: [
      { id: 201, username: "alex_dev", text: "Zustand is such a game changer compared to legacy Redux boilerplate." }
    ],
    timestamp: "5 HOURS AGO"
  }
];

export const InstagramDemo = () => {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPostModal, setNewPostModal] = useState(false);
  const [captionInput, setCaptionInput] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [activeStory, setActiveStory] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const toggleLike = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  const toggleSave = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, isSaved: !p.isSaved };
      }
      return p;
    }));
  };

  const handleAddComment = (postId, e) => {
    e.preventDefault();
    const commentText = (commentInputs[postId] || '').trim();
    if (!commentText) return;

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            { id: Date.now(), username: "amol_dev", text: commentText }
          ]
        };
      }
      return p;
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!captionInput.trim()) return;

    const newPost = {
      id: Date.now(),
      username: "amol_dev",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      location: "Pune, India",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
      caption: captionInput,
      likes: 1,
      isLiked: true,
      isSaved: false,
      comments: [],
      timestamp: "JUST NOW"
    };

    setPosts([newPost, ...posts]);
    setCaptionInput('');
    setNewPostModal(false);
    setToastMsg("Post published successfully!");
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <DemoAppHeader
        appName="Instagram Clone"
        appTagline="Social Media Feed & Creator Studio"
        githubUrl="https://github.com/Amolippar/instagram-clone"
        detailsSlug="instagram-clone"
      />

      <div className="flex-1 max-w-2xl w-full mx-auto p-3 sm:p-6 space-y-6">
        {/* Top Story Strip */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex items-center gap-4 overflow-x-auto shadow-lg">
          {INITIAL_STORIES.map(story => (
            <button
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="flex flex-col items-center gap-1.5 focus:outline-none flex-shrink-0 group"
            >
              <div className={`p-0.5 rounded-full ${story.hasNew ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600' : 'bg-slate-700'}`}>
                <div className="p-0.5 rounded-full bg-slate-950">
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="w-14 h-14 rounded-full object-cover group-hover:scale-105 transition"
                  />
                </div>
              </div>
              <span className="text-[11px] text-slate-300 font-medium truncate max-w-[64px]">
                {story.isUser ? "Your Story" : story.username}
              </span>
            </button>
          ))}
        </div>

        {/* Creator Post Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Me"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="text-xs text-slate-400 font-medium">Share updates with the engineering community...</span>
          </div>
          <button
            onClick={() => setNewPostModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
          >
            <PlusSquare className="w-4 h-4" />
            <span>Create Post</span>
          </button>
        </div>

        {/* Toast */}
        {toastMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold text-center">
            {toastMsg}
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              {/* Header */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.userAvatar}
                    alt={post.username}
                    className="w-9 h-9 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block hover:underline cursor-pointer">
                      {post.username}
                    </span>
                    {post.location && (
                      <span className="text-[10px] text-slate-400 block">{post.location}</span>
                    )}
                  </div>
                </div>
                <button className="text-slate-400 hover:text-white p-1">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Media Image */}
              <div 
                className="relative aspect-square sm:aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer"
                onDoubleClick={() => toggleLike(post.id)}
              >
                <img
                  src={post.image}
                  alt="Post visual"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Action Buttons */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`transition transform active:scale-125 ${post.isLiked ? 'text-rose-500' : 'text-slate-300 hover:text-white'}`}
                    >
                      <Heart className={`w-6 h-6 ${post.isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <button className="text-slate-300 hover:text-white transition">
                      <MessageCircle className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => {
                        setToastMsg("Post link copied to clipboard!");
                        setTimeout(() => setToastMsg(null), 2500);
                      }}
                      className="text-slate-300 hover:text-white transition"
                    >
                      <Send className="w-6 h-6" />
                    </button>
                  </div>
                  <button
                    onClick={() => toggleSave(post.id)}
                    className={`transition ${post.isSaved ? 'text-amber-400' : 'text-slate-300 hover:text-white'}`}
                  >
                    <Bookmark className={`w-6 h-6 ${post.isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Likes Count */}
                <div className="text-xs font-bold text-white">
                  {post.likes.toLocaleString()} likes
                </div>

                {/* Caption */}
                <div className="text-xs text-slate-200 leading-relaxed">
                  <span className="font-bold text-white mr-1.5">{post.username}</span>
                  {post.caption}
                </div>

                {/* Comments List */}
                {post.comments.length > 0 && (
                  <div className="space-y-1 pt-1 border-t border-slate-800/60">
                    {post.comments.map(c => (
                      <div key={c.id} className="text-xs text-slate-300">
                        <span className="font-bold text-slate-200 mr-1.5">{c.username}</span>
                        {c.text}
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-[10px] text-slate-500 uppercase font-semibold">
                  {post.timestamp}
                </div>

                {/* Add Comment Input */}
                <form
                  onSubmit={(e) => handleAddComment(post.id, e)}
                  className="pt-2 border-t border-slate-800/80 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!commentInputs[post.id]?.trim()}
                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {newPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">Create New Post</h3>
                <button
                  onClick={() => setNewPostModal(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="aspect-video w-full rounded-2xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center relative">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-[10px] text-slate-300">
                  Pre-selected: Clean Code IDE
                </span>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Write a Caption</label>
                  <textarea
                    rows={3}
                    value={captionInput}
                    onChange={(e) => setCaptionInput(e.target.value)}
                    placeholder="What's happening in your engineering workflow today? #SpringBoot #React"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg transition"
                >
                  Share to Feed
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-sm aspect-[9/16] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between p-4">
              {/* Progress bar */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full animate-pulse w-3/4" />
              </div>

              <div className="flex items-center justify-between text-white pt-2">
                <div className="flex items-center gap-2">
                  <img src={activeStory.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-xs font-bold">{activeStory.username}</span>
                </div>
                <button onClick={() => setActiveStory(null)} className="text-slate-300 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="my-auto text-center space-y-2 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Live Story Broadcast</h4>
                <p className="text-xs text-slate-300">
                  Deploying microservice containers on Docker Swarm. Latency reduced by 42%!
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveStory(null)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
