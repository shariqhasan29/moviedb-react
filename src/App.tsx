import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { router } from './routes/index';
import { WatchlistProvider } from './contexts/WatchlistContext';

const queryClient = new QueryClient();
function App() {

  
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WatchlistProvider>
      <RouterProvider router={router} />
      </WatchlistProvider>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
