import { useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (searchQuery: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);

      const results = await fetchMovies(searchQuery);

      if (results.length === 0) {
        toast('No movies found for your request.', {
          duration: 2000,
          position: 'top-center',
        });
      }

      setMovies(results);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
