// src / components / App.tsx
// src/components/App.tsx
import { useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (searchTopic: string) => {
    const results = await fetchMovies(searchTopic);
    setMovies(results);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
    </>
  );
}
