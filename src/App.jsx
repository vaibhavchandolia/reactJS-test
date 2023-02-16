import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import MovieDetail from "./Components/movieDetail";


function App() {
  return (
    // <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/movieDetail" element={<MovieDetail/>}/>
          <Route path="/" element={<Landing/>}/>
        </Routes>
      </Router>
    // </Provider>
  );
}

export default App;