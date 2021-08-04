import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [paginationCount, setpaginationCount] = useState(0);
  let page = 1;
  const pageVal = useRef(1);
  const limit = 10;
  const pages = [];

  for (let number = 1; number <= Math.ceil(paginationCount); number++) {
    pages.push(number);
  }
  async function getMovies() {
    let list_of_movies = await axios.get(
      `/api/v1/movies?limit=${limit}&page=${page}`
    );
    console.log(list_of_movies);
    setpaginationCount(list_of_movies?.data.totalResults / limit);
    setMovieList(list_of_movies?.data.movies.results);
  }
  function handelPagination(e) {
    page = e.target.value;
    getMovies();
  }
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <Container className="mt-5 pb-5">
        <Row style={{ marginTop: "2rem" }}>
          {movieList.map((movie) => {
            return (
              <Col lg={4} md={6} sm={12} key={movie._id}>
                <div className="movie_card">
                  <Card
                    style={{
                      width: "18rem",
                      cursor: "pointer",
                      marginTop: "2rem",
                    }}
                  >
                    <Link className="card_Link" to={`/trailer/${movie._id}`}>
                      <Card.Img
                        variant="top"
                        src={`/uploads/${movie.thumbnail}`}
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title>{movie.name}</Card.Title>
                      <h5>Release Year : {movie.release}</h5>
                      <h6>Language:{movie.language}</h6>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
        <div style={{ margin: "2rem auto" }} className="pagination_container">
          {pages.map((page) => {
            return (
              <button
                key={page}
                value={page}
                ref={pageVal}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid black",
                  padding: "0.4rem",
                  margin: "0 0.2rem",
                }}
                onClick={(e) => handelPagination(e)}
              >
                {page}
              </button>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Movie;
