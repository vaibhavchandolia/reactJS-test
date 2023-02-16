import React, { useState, useEffect } from "react";
import axios from 'axios'
import '../app.css';
import MovieDetail from "./movieDetail";



function Landing() {
  const [topMovie, settopMovie] = useState([""])
  const ROOT_URL = "https://api.tvmaze.com/search/shows?q=all";


  const getPopularMoviesUrl = () => `${ROOT_URL}`;
  const t = encodeURI("game of")
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageUrl, setCurrentPageUrl] = useState(getPopularMoviesUrl())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCurrentPageUrl(getPopularMoviesUrl(currentPage));
  }, [currentPage]);

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      console.log(res.data)
      settopMovie(res.data)
    })

    return () => cancel()
  }, [currentPageUrl])

  if (loading) return "loading..."

  return (
    <>
      {/* <topMovieList topMovie ={topMovie}/> */}
      <div className="grid">
        
        {topMovie && topMovie.map((movie,i) => {
          return <div  key={i} className="card">
            <img src={`${ movie.show.image?.medium ?? "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"}`}  />
            <div className="head"><h3 className="title">{movie.show.name}</h3></div>
            <a className="link" href={`/movieDetail?id=${movie.show.id}`}>View Details</a>
          </div>
        })}
        
      </div>    
    </>
  );
}

export default Landing;
