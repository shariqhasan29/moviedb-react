import React from 'react';

import Navbar from '../components/Navbar';
import MovieDB from '../components/MovieDB';



const Home: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  return (
    
      <div style={{backgroundColor: '#F0F8FF', boxShadow: 'inset 8px 10px 46px -18px rgba(0,0,0,0.75)'}}>
        <Navbar username={user.name} />
        <MovieDB />
      </div>
    
  );
};

export default Home;