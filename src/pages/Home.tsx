import React from 'react';

import Navbar from '../components/Navbar';
import MovieDB from '../components/MovieDB';
import BackButton from '../components/BackButton';



const Home: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  return (
    
      <div>
        <Navbar username={user.name} />
        <BackButton />
        <MovieDB />
      </div>
    
  );
};

export default Home;