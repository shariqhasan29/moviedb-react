import React from "react";
import styled from "styled-components";
import { MovieDetails } from "../types/type";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 4px;
`;

const Info = styled.div`
  h1 {
    margin: 0 0 1rem 0;
    color: #333;
  }

  p {
    margin: 0.5rem 0;
    color: #666;
  }
`;

const Rating = styled.div`
  background: #f0c14b;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: inline-block;
  margin: 1rem 0;
  font-weight: bold;
`;

interface MovieDetailsModalProps {
  movie: MovieDetails;
  onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  onClose,
}) => {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <DetailsGrid>
          <Poster src={movie.Poster} alt={movie.Title} />
          <Info>
            <h1>{movie.Title}</h1>
            <p>
              <strong>Released:</strong> {movie.Released}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.Runtime}
            </p>
            <p>
              <strong>Genre:</strong> {movie.Genre}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <Rating>IMDb Rating: {movie.imdbRating}/10</Rating>
            <p>
              <strong>Plot:</strong>
            </p>
            <p>{movie.Plot}</p>
          </Info>
        </DetailsGrid>
      </Modal>
    </Overlay>
  );
};

export default MovieDetailsModal;
