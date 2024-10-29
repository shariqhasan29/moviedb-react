import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';


export interface Movie {
  id: string;
  title: string;
  image: string;
  review: string;
  isLiked: boolean;
  userId: string;
}

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Omit<Movie, 'userId'>) => void;
  removeFromWatchlist: (movieId: string) => void;
  updateMovieReview: (movieId: string, review: string) => void;
  toggleLike: (movieId: string) => void;
  userWatchlist: Movie[];
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const { currentUser } = useAuth();
  const [userWatchlist, setUserWatchlist] = useState<Movie[]>([]);

  
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  
  useEffect(() => {
    if (currentUser) {
      const filtered = watchlist.filter(movie => movie.userId === currentUser.email);
      setUserWatchlist(filtered);
    } else {
      setUserWatchlist([]);
    }
  }, [watchlist, currentUser]);

  
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie: Omit<Movie, 'userId'>) => {
    if (!currentUser) return;

    setWatchlist(prev => {
      const exists = prev.some(m => m.id === movie.id && m.userId === currentUser.email);
      if (exists) return prev;

      const newMovie = {
        ...movie,
        userId: currentUser.email,
        review: '',
        isLiked: false
      };
      return [...prev, newMovie];
    });
  };

  const removeFromWatchlist = (movieId: string) => {
    if (!currentUser) return;

    setWatchlist(prev => 
      prev.filter(movie => !(movie.id === movieId && movie.userId === currentUser.email))
    );
  };

  const updateMovieReview = (movieId: string, review: string) => {
    if (!currentUser) return;

    setWatchlist(prev => prev.map(movie => {
      if (movie.id === movieId && movie.userId === currentUser.email) {
        return { ...movie, review };
      }
      return movie;
    }));
  };

  const toggleLike = (movieId: string) => {
    if (!currentUser) return;

    setWatchlist(prev => prev.map(movie => {
      if (movie.id === movieId && movie.userId === currentUser.email) {
        return { ...movie, isLiked: !movie.isLiked };
      }
      return movie;
    }));
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      userWatchlist,
      addToWatchlist,
      removeFromWatchlist,
      updateMovieReview,
      toggleLike
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};