import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Film, 
  Search, 
  Star, 
  Bookmark, 
  Play, 
  Clock, 
  Calendar, 
  X, 
  Sparkles, 
  Filter,
  Check,
  TrendingUp,
  Award
} from 'lucide-react';
import { DemoAppHeader } from './DemoAppHeader';

const SAMPLE_MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
    duration: "2h 49m",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    poster: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    trending: true,
    topRated: true
  },
  {
    id: 2,
    title: "Oppenheimer",
    year: 2023,
    genre: "Drama",
    rating: 8.9,
    duration: "3h 00m",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    tagline: "The world forever changes.",
    trending: true,
    topRated: true
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    duration: "2h 32m",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    tagline: "Welcome to a world without rules.",
    trending: false,
    topRated: true
  },
  {
    id: 4,
    title: "Blade Runner 2049",
    year: 2017,
    genre: "Sci-Fi",
    rating: 8.0,
    duration: "2h 44m",
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Sylvia Hoeks"],
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    synopsis: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    tagline: "There's still a page left.",
    trending: true,
    topRated: false
  },
  {
    id: 5,
    title: "Inception",
    year: 2010,
    genre: "Action",
    rating: 8.8,
    duration: "2h 28m",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    tagline: "Your mind is the scene of the crime.",
    trending: true,
    topRated: true
  },
  {
    id: 6,
    title: "Dune: Part Two",
    year: 2024,
    genre: "Sci-Fi",
    rating: 8.6,
    duration: "2h 46m",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem"],
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
    synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    tagline: "Long live the fighters.",
    trending: true,
    topRated: true
  },
  {
    id: 7,
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    genre: "Animation",
    rating: 8.7,
    duration: "2h 20m",
    director: "Joaquim Dos Santos",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
    synopsis: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    tagline: "It's how you wear the mask that matters.",
    trending: true,
    topRated: false
  },
  {
    id: 8,
    title: "Knives Out",
    year: 2019,
    genre: "Mystery",
    rating: 7.9,
    duration: "2h 10m",
    director: "Rian Johnson",
    cast: ["Daniel Craig", "Chris Evans", "Ana de Armas", "Jamie Lee Curtis"],
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    synopsis: "A detective investigates the death of a patriarch of an eccentric, combative family.",
    tagline: "Everyone has a motive. No one has an alibi.",
    trending: false,
    topRated: false
  }
];

const GENRES = ["All", "Sci-Fi", "Action", "Drama", "Animation", "Mystery"];

export const CineVaultDemo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [activeTab, setActiveTab] = useState('trending'); // 'trending', 'topRated', 'watchlist'
  const [watchlist, setWatchlist] = useState([1, 6]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  const toggleWatchlist = (id, e) => {
    if (e) e.stopPropagation();
    setWatchlist(prev => 
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    );
  };

  const filteredMovies = useMemo(() => {
    return SAMPLE_MOVIES.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            movie.cast.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;

      if (activeTab === 'watchlist') {
        return watchlist.includes(movie.id) && matchesSearch && matchesGenre;
      }
      if (activeTab === 'topRated') {
        return movie.topRated && matchesSearch && matchesGenre;
      }
      // default trending
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre, activeTab, watchlist]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <DemoAppHeader
        appName="CineVault"
        appTagline="Movie & Entertainment Discovery Platform"
        githubUrl="https://github.com/Amolippar/cinevault"
        detailsSlug="cinevault"
      />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Hero Banner with Featured Movie */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl p-6 sm:p-10 flex flex-col justify-end min-h-[300px] sm:min-h-[380px]">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Spotlight Feature</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Interstellar
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-2">
              Mankind was born on Earth. It was never meant to die here. When Earth faces ecological collapse, a brave crew embarks on an interstellar expedition through a wormhole.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedMovie(SAMPLE_MOVIES[0]);
                  setIsPlayingTrailer(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Trailer</span>
              </button>
              <button
                onClick={() => setSelectedMovie(SAMPLE_MOVIES[0])}
                className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-sm transition"
              >
                More Details
              </button>
            </div>
          </div>
        </div>

        {/* Search, Filter & Tabs Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          {/* Tab Selection */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition inline-flex items-center gap-1.5 ${
                activeTab === 'trending' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setActiveTab('topRated')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition inline-flex items-center gap-1.5 ${
                activeTab === 'topRated' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Top Rated</span>
            </button>
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition inline-flex items-center gap-1.5 ${
                activeTab === 'watchlist' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Watchlist ({watchlist.length})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, directors, cast..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
            />
          </div>

          {/* Genre Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {GENRES.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedGenre === genre
                    ? 'bg-slate-100 text-slate-900 font-bold'
                    : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Movie Grid */}
        {filteredMovies.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30">
            <Film className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300">No movies found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your genre filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map(movie => {
              const inWatchlist = watchlist.includes(movie.id);
              return (
                <motion.div
                  key={movie.id}
                  layout
                  onClick={() => setSelectedMovie(movie)}
                  className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-rose-500/50 transition-all duration-300 shadow-lg cursor-pointer flex flex-col"
                >
                  {/* Poster Image */}
                  <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    {/* Top rating badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1 text-amber-400 text-xs font-black">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{movie.rating.toFixed(1)}</span>
                    </div>

                    {/* Watchlist Quick Button */}
                    <button
                      onClick={(e) => toggleWatchlist(movie.id, e)}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition ${
                        inWatchlist 
                          ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' 
                          : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/80'
                      }`}
                      title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
                    >
                      <Bookmark className={`w-4 h-4 ${inWatchlist ? 'fill-current' : ''}`} />
                    </button>

                    {/* Play trailer overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/30">
                      <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>{movie.year}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">{movie.genre}</span>
                      </div>
                      <h3 className="font-bold text-base text-white group-hover:text-rose-400 transition line-clamp-1">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {movie.synopsis}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{movie.duration}</span>
                      </div>
                      <span className="text-slate-300 font-medium">Dir: {movie.director.split(' ').pop()}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Movie Details Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedMovie(null);
                  setIsPlayingTrailer(false);
                }}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black/80 backdrop-blur-md transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Banner or Simulated Trailer */}
              <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                {isPlayingTrailer ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 p-6 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-400 flex items-center justify-center animate-pulse">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                    <span className="text-lg font-bold text-white">Streaming Trailer Preview: {selectedMovie.title}</span>
                    <p className="text-xs text-slate-400 max-w-md">
                      Simulated 4K stream endpoint from CineVault entertainment CDN with Dolby Atmos telemetry.
                    </p>
                    <button
                      onClick={() => setIsPlayingTrailer(false)}
                      className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                    >
                      Back to Overview
                    </button>
                  </div>
                ) : (
                  <>
                    <img 
                      src={selectedMovie.backdrop} 
                      alt={selectedMovie.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    <button
                      onClick={() => setIsPlayingTrailer(true)}
                      className="absolute z-10 px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl flex items-center gap-2 group transition"
                    >
                      <Play className="w-4 h-4 fill-current group-hover:scale-110 transition" />
                      <span>Play Official Trailer</span>
                    </button>
                  </>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-2xl font-black text-white">{selectedMovie.title}</h2>
                    <p className="text-rose-400 text-xs font-medium italic mt-0.5">{selectedMovie.tagline}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleWatchlist(selectedMovie.id, e)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                        watchlist.includes(selectedMovie.id)
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                      <span>{watchlist.includes(selectedMovie.id) ? 'In Watchlist' : 'Add to Watchlist'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 py-2 border-y border-slate-800">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-current" /> {selectedMovie.rating} / 10
                  </span>
                  <span>Year: {selectedMovie.year}</span>
                  <span>Duration: {selectedMovie.duration}</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200">{selectedMovie.genre}</span>
                  <span>Director: {selectedMovie.director}</span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Synopsis</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedMovie.synopsis}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Cast</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovie.cast.map(actor => (
                      <span key={actor} className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200">
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
