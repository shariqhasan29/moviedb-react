import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovieDetails } from "../services/api";
import MovieInfo from "../components/MovieInfo";
import UserActions from "../components/UserActions";
import Navbar from "../components/Navbar";

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

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  if (error)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Error loading movie details.
      </div>
    );
  if (!movie)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        No movie found.
      </div>
    );

  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  return (
    <>
      <Navbar username={user.name} />

      <PageContainer>
        <DetailsContainer>
          <MovieInfo movie={movie} />
        </DetailsContainer>
        <ActionsContainer>
          <UserActions
            movieId={movie.imdbID}
            title={movie.Title}
            image={movie.Poster}
          />
        </ActionsContainer>
      </PageContainer>
    </>
  );
};

export default MovieDetailsPage;
