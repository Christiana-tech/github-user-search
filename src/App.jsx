import React from 'react';
import Search from './components/Search';
import { fetchUserData } from './services/githubService';

function App() {
  return (
    <div>
      <h1>GitHub User Search</h1>
      <Search fetchUserData={fetchUserData} />
    
    </div>
  );
}

export default App;
