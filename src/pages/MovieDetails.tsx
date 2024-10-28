import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getMovieDetails } from '../services/api';
import MovieInfo from '../components/MovieInfo'; // Component to show movie details
import UserActions from '../components/UserActions'; // Component for user actions
import Navbar from '../components/Navbar';

const PageContainer = styled.div`
  display: flex;
  padding: 2rem;
`;

const DetailsContainer = styled.div`
  flex: 2;
  padding-right: 2rem;
`;

const ActionsContainer = styled.div`
  flex: 1;
  padding-left: 2rem;
  border-left: 1px solid #e0e0e0; // Optional: to visually separate sections
`;

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movie details.</div>;
  if (!movie) return <div>No movie found.</div>;

  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  return (
    <>
    <Navbar username={user.name}/>
    <div style={{backgroundColor: '#F0F8FF', boxShadow: 'inset 8px 10px 46px -18px rgba(0,0,0,0.75)'}}>
    <PageContainer>      
      <DetailsContainer>
        <MovieInfo movie={movie} /> {/* Movie details component */}
      </DetailsContainer>
      <ActionsContainer>
        <UserActions movieId={movie.imdbID} title={movie.Title} image={movie.Poster} /> {/* User actions component */}
      </ActionsContainer>
    </PageContainer>
    </div>
    </>
  );
};

export default MovieDetailsPage;
