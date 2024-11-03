import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../contexts/WatchlistContext";
import { useAuth } from "../contexts/AuthContext";
import * as S from "./watchlist.styled";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

const WatchlistPage = () => {
  const { userWatchlist, removeFromWatchlist, updateMovieReview, toggleLike } =
    useWatchlist();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState("");

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleReviewSubmit = (movieId: string) => {
    updateMovieReview(movieId, reviewText);
    setEditingReview(null);
    setReviewText("");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Navbar username={currentUser.name} />
      <BackButton />
      <S.Container>
        <S.Header>
          <S.Title>My Watchlist</S.Title>
        </S.Header>

        {userWatchlist.length === 0 ? (
          <S.EmptyState>
            <S.EmptyText>Your watchlist is empty</S.EmptyText>
            <S.Button onClick={() => navigate("/home")}>Browse Movies</S.Button>
          </S.EmptyState>
        ) : (
          <S.MovieGrid>
            {userWatchlist.map((movie) => (
              <S.MovieCard key={movie.id}>
                <S.MovieImage src={movie.image} alt={movie.title} />
                <S.MovieContent>
                  <S.MovieTitle>{movie.title}</S.MovieTitle>

                  {editingReview === movie.id ? (
                    <S.ReviewForm
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleReviewSubmit(movie.id);
                      }}
                    >
                      <S.ReviewInput
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review..."
                      />
                      <S.Button type="submit">Save</S.Button>
                      <S.Button
                        type="button"
                        onClick={() => setEditingReview(null)}
                        variant="secondary"
                      >
                        Cancel
                      </S.Button>
                    </S.ReviewForm>
                  ) : (
                    <S.ReviewSection>
                      <S.Review>{movie.review || "No review yet"}</S.Review>
                      <S.Button
                        onClick={() => {
                          setEditingReview(movie.id);
                          setReviewText(movie.review);
                        }}
                        variant="secondary"
                      >
                        {movie.review ? "Edit Review" : "Add Review"}
                      </S.Button>
                    </S.ReviewSection>
                  )}

                  <S.Actions>
                    <S.LikeButton
                      onClick={() => toggleLike(movie.id)}
                      isLiked={movie.isLiked}
                    >
                      {movie.isLiked ? "❤️" : "🤍"}
                    </S.LikeButton>
                    <S.Button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Remove this movie from your watchlist?"
                          )
                        ) {
                          removeFromWatchlist(movie.id);
                        }
                      }}
                      variant="danger"
                    >
                      Remove
                    </S.Button>
                  </S.Actions>
                </S.MovieContent>
              </S.MovieCard>
            ))}
          </S.MovieGrid>
        )}
      </S.Container>
    </>
  );
};

export default WatchlistPage;
