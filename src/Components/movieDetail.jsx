import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Form from './Form';

export default function MovieDetail() {
  const ROOT_URL = "https://api.tvmaze.com/shows";

  const [id, movieId] = useState();
  const [currentPageUrl, setCurrentPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [movieDetail, setMovieDetail] = useState();
  const getMovieDetailUrl = (id) => `${ROOT_URL}/${id}`;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    movieId(query.get("id"));

  }, []);

  useEffect(() => {
    setCurrentPageUrl(getMovieDetailUrl(id))
  }, [id])

  useEffect(() => {
    if (!currentPageUrl) return;
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      console.log(res.data)
      setMovieDetail(res.data)
    })


    return () => cancel()
  }, [currentPageUrl])

  const toggleModal = () => {
    const trigger = document.querySelector("#modal-trigger");
    const modal = document.querySelector("#modal");
    const close = document.querySelector(".close");

    trigger.addEventListener("click", () => {
      modal.style.display = "block";
    });

    close.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  if (loading) return "loading..."

  return (
    <>

      {movieDetail &&
        <div className='movieDetail'>
          <div className='image'>
            <img src={`${movieDetail.image?.original}`} width="300rem" height="400em" alt="" />
          </div>
          <div className="body">
          <div className="title1">{movieDetail.name}</div>
          <div className="releaseDate">{movieDetail.premiered}</div>
          <div className="overview" dangerouslySetInnerHTML={{ __html: movieDetail.summary }}>
          </div>

          </div>
        </div>
      }

<div class="text-center">
      <button id="modal-trigger" className="b1" onClick={toggleModal}>Book Now</button>
      </div>

      <div id="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <Form />
        </div>
      </div>

    </>
  );


}
