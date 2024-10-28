import React from 'react';
import styled from 'styled-components';
import { MovieDetails } from '../types/type';

const InfoContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const Details = styled.p`
  margin: 0.5rem 0;
  color: #666;
`;

const Rating = styled.div`
  background: #f0c14b;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: inline-block;
  margin: 1rem 0;
  font-weight: bold;
`;

const Poster = styled.img`
  width: 230px;
  height: 280px;
  border-radius: 4px;
`;

interface MovieInfoProps {
  movie: MovieDetails;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  return (
    
    <InfoContainer>
      <div style={{ backgroundColor: '#F0F8FF', boxShadow: 'inset 8px 10px 46px -18px rgba(0,0,0,0.75)', padding: '20px', borderRadius: '8px'}}>
        <Poster src={movie.Poster} alt={movie.Title} />
      <Title>{movie.Title}</Title>
      <Details><strong>Released:</strong> {movie.Released}</Details>
      <Details><strong>Runtime:</strong> {movie.Runtime}</Details>
      <Details><strong>Genre:</strong> {movie.Genre}</Details>
      <Details><strong>Director:</strong> {movie.Director}</Details>
      <Rating>IMDb Rating: {movie.imdbRating}/10</Rating>
      <Details><strong>Plot:</strong></Details>
      <Details>{movie.Plot}</Details>
      </div>
    </InfoContainer>
   
  );
};

export default MovieInfo;
