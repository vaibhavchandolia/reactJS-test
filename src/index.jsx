import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MovieDetail from './Components/movieDetail';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <MovieDetail/> */}
  </React.StrictMode>
);

