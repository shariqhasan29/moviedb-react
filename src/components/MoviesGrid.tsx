import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { Movie } from "../types/type";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (imdbID: string) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieClick }) => {
  return (
    <Grid>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} onClick={onMovieClick} />
      ))}
    </Grid>
  );
};

export default MovieGrid;
