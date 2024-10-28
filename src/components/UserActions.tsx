import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../contexts/WatchlistContext';
import { styled } from '@mui/material/styles';
import { Button, TextField, Paper, Snackbar, Alert } from '@mui/material';

const ActionsContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StyledButton = styled(Button)({
  width: '100%',
});

type UserActionsProps = {
  movieId: string;
  title: string;
  image: string;
};

const UserActions: React.FC<UserActionsProps> = ({ movieId, title, image }) => {
  const { addToWatchlist, watchlist } = useWatchlist();
  const [isLiked, setIsLiked] = useState(false);
  const [review, setReview] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');
  const navigate = useNavigate();

  const handleAddToWatchlist = () => {
    // Check if movie already exists in watchlist
    const isMovieInWatchlist = watchlist.some(movie => movie.id === movieId);

    if (isMovieInWatchlist) {
      setSnackbarMessage('This movie is already in your watchlist!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const movie = {
      id: movieId,
      title,
      image,
      review,
      isLiked
    };
    addToWatchlist(movie);
    setSnackbarMessage('Movie successfully added to watchlist!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleLike = () => {
    setIsLiked(prev => !prev);
    // If movie is in watchlist, update its like status
    const movie = watchlist.find(m => m.id === movieId);
    if (movie) {
      addToWatchlist({
        ...movie,
        isLiked: !isLiked
      });
    }
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = (event: React.FormEvent) => {
    event.preventDefault();
    const movie = watchlist.find(m => m.id === movieId);
    
    if (movie) {
      // Update existing movie
      addToWatchlist({
        ...movie,
        review,
        isLiked
      });
      setSnackbarMessage('Review updated successfully!');
    } else {
      // Add new movie with review
      const newMovie = {
        id: movieId,
        title,
        image,
        review,
        isLiked
      };
      addToWatchlist(newMovie);
      setSnackbarMessage('Movie added to watchlist with review!');
    }
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    setReview('');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Check if movie is in watchlist and set initial states
  React.useEffect(() => {
    const movie = watchlist.find(m => m.id === movieId);
    if (movie) {
      setIsLiked(movie.isLiked);
      setReview(movie.review);
    }
  }, [movieId, watchlist]);

  return (
    <ActionsContainer sx={{ mt: 2, borderRadius: 4 }}>
      <StyledButton 
        variant="contained" 
        color="primary" 
        onClick={handleAddToWatchlist}
      >
        Add to Watchlist
      </StyledButton>
      
      <StyledButton 
        variant="contained" 
        color={isLiked ? "success" : "primary"} 
        onClick={handleLike}
      >
        {isLiked ? 'Unlike' : 'Like'}
      </StyledButton>

      <form onSubmit={handleSubmitReview} style={{ width: '100%' }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={review}
          onChange={handleReviewChange}
          placeholder="Write your review here..."
          variant="outlined"
          margin="normal"
        />
        <StyledButton 
          type="submit" 
          variant="contained" 
          color="primary"
        >
          Submit Review
        </StyledButton>
      </form>

      <StyledButton 
        variant="outlined" 
        onClick={() => navigate('/watchlist')}
      >
        Go to Watch List
      </StyledButton>
      
      <StyledButton 
        variant="outlined" 
        onClick={() => navigate('/home')}
      >
        Home
      </StyledButton>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ActionsContainer>
  );
};

export default UserActions;