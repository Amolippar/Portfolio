import React, { useState } from 'react';
import { 
  Film, 
  Star, 
  Bookmark, 
  Play, 
  Search, 
  Clock, 
  Check 
} from 'lucide-react';

export const CineVaultShowcase = () => {
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [watchlist, setWatchlist] = useState([1, 3]);

  const movies = [
    {
      id: 1,
      title: 'Interstellar',
      genre: 'SCI-FI',
      rating: 8.7,
      year: 2014,
      duration: '169 min',
      desc: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft.',
      poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      title: 'Inception',
      genre: 'SCI-FI',
      rating: 8.8,
      year: 2010,
      duration: '148 min',
      desc: 'A thief who steals corporate secrets through the use of dream-sharing technology is given an inverse task.',
      poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'The Dark Knight',
      genre: 'ACTION',
      rating: 9.0,
      year: 2008,
      duration: '152 min',
      desc: 'When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept his greatest test.',
      poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      title: 'Oppenheimer',
      genre: 'DRAMA',
      rating: 8.9,
      year: 2023,
      duration: '180 min',
      desc: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
      poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const toggleWatchlist = (id) => {
    setWatchlist(prev =>
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    );
  };

  const filteredMovies = movies.filter(m => {
    if (selectedGenre === 'ALL') return true;
    return m.genre === selectedGenre;
  });

  return (
    <div className="rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5" /> TMDB Entertainment Catalog & Watchlist
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            CineVault Interactive Film Discovery & Stream Preview
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-rose-500/10 text-rose-600 dark:text-rose-400 px-3 py-1.5 rounded-xl border border-rose-500/20">
          <Bookmark className="w-3.5 h-3.5" /> {watchlist.length} in Watchlist
        </div>
      </div>

      {/* Genre Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'SCI-FI', 'ACTION', 'DRAMA'].map(g => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              selectedGenre === g
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Movies Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMovies.map(movie => {
          const isSaved = watchlist.includes(movie.id);
          return (
            <div
              key={movie.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-rose-500 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-amber-400 backdrop-blur-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {movie.rating}
                </div>
                <div className="absolute bottom-2 left-3">
                  <span className="text-[10px] font-mono font-bold text-rose-400 bg-black/60 px-2 py-0.5 rounded">
                    {movie.genre}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-rose-400 transition">
                    {movie.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {movie.duration}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {movie.desc}
                  </p>
                </div>

                <button
                  onClick={() => toggleWatchlist(movie.id)}
                  className={`w-full py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    isSaved
                      ? 'bg-rose-600/20 text-rose-400 border border-rose-500/40'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved in Watchlist' : 'Add to Watchlist'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
