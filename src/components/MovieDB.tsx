import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import SearchBar from './Searchbar';
import MovieGrid from './MoviesGrid';
import MovieDetailsModal from './MovieDetail';
import { searchMovies, getMovieDetails, getInitialMovies } from '../services/api';


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const Error = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc3545;
`;

const MovieDB: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const { data: searchResults, isLoading: searchLoading, error: searchError } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => searchQuery ? searchMovies(searchQuery) : getInitialMovies(),
    select: (data) => data.Search || [],
  });

  const { data: selectedMovie } = useQuery({
    queryKey: ['movie', selectedMovieId],
    queryFn: () => getMovieDetails(selectedMovieId!),
    enabled: !!selectedMovieId,
  });

  const handleMovieClick = (imdbID: string) => {
    setSelectedMovieId(imdbID);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  if (searchError) {
    return <Error>Error loading movies. Please try again later.</Error>;
  }

  return (
    <Container>
      <Title>Movie Database</Title>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
      <SearchBar 
        value={searchQuery} 
        onChange={(value) => setSearchQuery(value)} 
        
      />

      </div>
      
      {searchLoading ? (
        <Loading>Loading movies...</Loading>
      ) : (
        <MovieGrid 
          movies={searchResults || []} 
          onMovieClick={handleMovieClick}
        />
      )}
      {selectedMovie && (
        <MovieDetailsModal 
          movie={selectedMovie} 
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default MovieDB;