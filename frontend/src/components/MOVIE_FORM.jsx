import React, { useState } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import axios from "axios";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useAlert } from "react-alert";

import "./MOVIE_FORM.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));
function MOVIE_FORM() {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState("");
  const [language, setLanguage] = useState("");
  const [release, setRelease] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [trailer, setTrailer] = useState("");
  const [progress, setProgress] = useState(0);
  const alert = useAlert();
  let releaseYears = [];
  const classes = useStyles();

  // create list of years
  function years() {
    let currentYear = new Date().getFullYear();
    //Loop and add the Year values to DropDownList.
    for (var i = 1950; i <= currentYear; i++) {
      releaseYears.push(i);
    }
  }

  years();

  // handle create movie request
  async function createMovie() {
    setLoading(true);
    let formdata = new FormData();
    formdata.append("name", movie);
    formdata.append("language", language);
    formdata.append("release", release);
    formdata.append("thumbnail", thumbnail);
    formdata.append("trailer", trailer);

    try {
      let options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percentage = Math.floor((loaded * 100) / total);
          console.log(percentage);
          if (percentage < 100) {
            setProgress(percentage);
          }
        },
      };
      const response = await axios.post(
        "/api/v1/movie/add",
        formdata,
        options,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      if (response) {
        setProgress(100);
        setTimeout(() => {
          setProgress(0);
        }, 1000);
        setLoading(false);
      }

      alert.show(response.data.message, {
        type: "success",
      });
    } catch (error) {
      setLoading(false);
      alert.show(error.message, {
        type: "error",
      });
    }
  }

  return (
    <div className="from_container">
      <Container>
        <Row>
          <Col lg={6}>
            <Form.Label>Movie Name</Form.Label>
            <Form.Control
              type="text"
              value={movie}
              onChange={(e) => {
                setMovie(e.target.value);
              }}
              placeholder="Name Of Movie"
            />
          </Col>

          <Col lg={6}>
            <Form.Label>Language</Form.Label>
            <Form.Control
              type="text"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
              placeholder="Language Of Movie"
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <select
              className="movie_select"
              data-dropdown-auto="true"
              onClick={(e) => {
                setRelease(e.target.value);
              }}
            >
              {releaseYears.map((year) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col lg={6}>
            <Form.Label>Upload Thumbnail</Form.Label>
            <br />
            {progress > 0 ? (
              <LinearProgress variant="determinate" value={progress} />
            ) : (
              <>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => {
                    setThumbnail(e.target.files[0]);
                  }}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </>
            )}
          </Col>
          <Col lg={6}>
            <Form.Label>Upload Trailer</Form.Label>
            <br />
            {progress > 0 ? (
              <LinearProgress variant="determinate" value={progress} />
            ) : (
              <>
                <input
                  accept="video/mp4,video/x-m4v,video/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => {
                    setTrailer(e.target.files[0]);
                  }}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
              </>
            )}
          </Col>
        </Row>
        <Button
          className="mt-4"
          style={{
            backgroundColor: "rgb(219, 2, 2)",
            border: "none",
            color: "white",
          }}
          onClick={createMovie}
        >
          {loading ? "Loading..." : "Create Movie"}
        </Button>{" "}
      </Container>
    </div>
  );
}

export default MOVIE_FORM;
