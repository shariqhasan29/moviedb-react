import axios from 'axios';
import { SearchResponse, MovieDetails } from '../types/type';

const API_KEY = 'caf3f450';
const BASE_URL = 'https://www.omdbapi.com';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const searchMovies = async (query: string): Promise<SearchResponse> => {
  const { data } = await api.get('', {
    params: {
      apikey: API_KEY,
      s: query,
      type: 'movie',
    },
  });
  return data;
};

export const getMovieDetails = async (imdbId: string): Promise<MovieDetails> => {
  const { data } = await api.get('', {
    params: {
      apikey: API_KEY,
      i: imdbId,
    },
  });
  return data;
};

// Default search to show initial movies
export const getInitialMovies = () => searchMovies('iron');