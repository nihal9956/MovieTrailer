import "./App.css";
import Nav from "./components/Nav";
import MOVIE_FORM from "./components/MOVIE_FORM";
import Movie from "./components/Movie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Trailer from "./components/Trailer";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={MOVIE_FORM} />
          <Route path="/movies" component={Movie} />
          <Route exact path="/trailer/:id" component={Trailer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
