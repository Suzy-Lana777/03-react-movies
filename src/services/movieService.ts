import axios from 'axios';
import type { Movie } from '../types/movie';

interface SearchMoviesHttp {
  results: Movie[];
}

export const fetchMovies = async (topic: string): Promise<Movie[]> => {
  const myKey = import.meta.env.VITE_API_KEY;

  const response = await axios.get<SearchMoviesHttp>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: { query: topic },
      headers: { Authorization: `Bearer ${myKey}` },
    },
  );
  return response.data.results;
};
