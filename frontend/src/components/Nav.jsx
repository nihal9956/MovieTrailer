import React from "react";
import "./Nav.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Container fluid className="p-0">
        <div className="navbar">
          <Link className="brand" to="/">
            Movie <span>Magic</span>
          </Link>
          <div className="nav_links mr-5">
            <Link to="/">Create Movie</Link>
            <Link className="ml-5" to="/movies">
              Movie List
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Nav;
