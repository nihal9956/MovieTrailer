import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { useParams } from "react-router-dom";

function Trailer() {
  const { id } = useParams();
  const [trailer, setTrailer] = useState();
  console.log(id);
  useEffect(() => {
    async function getMovieTrailer() {
      const movie = await axios.get(`/api/v1/movie/${id}`);

      setTrailer(movie.data.movie.trailer);
    }
    getMovieTrailer();
  });
  console.log(trailer);
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <ReactPlayer
        controls="true"
        width="100vw"
        height="100vh"
        volume="1"
        url={`/uploads/${trailer}`}
      />
    </div>
  );
}

export default Trailer;
