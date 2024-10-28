import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import MovieDetailsPage from '../pages/MovieDetails';
import WatchlistPage from '../pages/Watchlist';

import { ProtectedRoute } from './ProtectedRoute.tsx';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background:'url(https://images2.alphacoders.com/691/691515.jpg)' }}><Login /></div>
  },
  {
    path: '/home',
    element: <ProtectedRoute><Home /></ProtectedRoute>
  },
  {
    path: '/movies/:id', // Dynamic route for movie details
    element: <ProtectedRoute><MovieDetailsPage /></ProtectedRoute>, // Render the MovieDetailsPage component
  },
  {
    path: '/watchlist',
    element: <ProtectedRoute><WatchlistPage /></ProtectedRoute>, // Add WatchlistPage here
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />
  }
]);

