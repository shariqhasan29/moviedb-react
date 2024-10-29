export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  email?: string;

}
export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
}

export interface Review {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface UserInteraction {
  isLiked: boolean;
  isInWatchlist: boolean;
  userRating?: number;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

 export interface User {
  name: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

