import  { createContext, useContext, useState, ReactNode } from 'react';

type Movie = {
  id: string;
  title: string;
  image: string;
  review: string;
  isLiked: boolean;
};

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: string) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist(prev => {
      const existingMovieIndex = prev.findIndex(item => item.id === movie.id);
      
      if (existingMovieIndex !== -1) {
        // Update existing movie
        const updatedWatchlist = [...prev];
        updatedWatchlist[existingMovieIndex] = {
          ...prev[existingMovieIndex],
          ...movie
        };
        return updatedWatchlist;
      } else {
        // Add new movie
        return [...prev, movie];
      }
    });
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== id));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}