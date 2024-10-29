import React from 'react';
import styled from 'styled-components';
import { Movie } from '../types/type';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-4px);
    cursor: pointer;
  }
`;

const PosterContainer = styled.div`
  position: relative;
  padding-top: 150%;
`;

const Poster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Year = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

interface MovieCardProps {
  movie: Movie;
  onClick: (imdbID: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.imdbID}`); 
  };

  return (
    <Card onClick={handleClick}>
      <PosterContainer>
        <Poster
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'}
          alt={movie.Title}
        />
      </PosterContainer>
      <Content>
        <Title>{movie.Title}</Title>
        <Year>{movie.Year}</Year>
      </Content>
    </Card>
  );
};

export default MovieCard;