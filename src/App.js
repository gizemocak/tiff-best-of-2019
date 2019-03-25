import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import FilmDetails from "./components/FilmDetails";
import OtherFilms from "./components/OtherFilms";
import { observer, inject } from "mobx-react";
import filmStore from "./stores/filmStore";

const App = inject("filmStore")(
  observer(
    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          films: []
        };
      }

      async componentDidMount() {
        let page = 1;
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=88a86e84c2c20de897f40900678ec1e9&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=${page}&primary_release_year=2019`
        );
        const json = await response.json();
        this.handleFetch();
        console.log(filmStore);
        console.log("sotre", this.props);
      }

      handleFetch = () => {
        for (let i = 1; i < 40 /*  i< json.total_pages*/; i++) {
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=88a86e84c2c20de897f40900678ec1e9&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=${i}&primary_release_year=2019`
          )
            .then(response => response.json())
            .then(response => {
              const filteredMovies = response.results.filter(
                film => film.popularity > 10
              );
              this.props.filmStore.films = [
                ...this.props.filmStore.films,
                ...filteredMovies
              ];
            })
            .catch(error => console.log("error in the second fetch", error));
        }
      };

      render() {
        return (
          <div className="App">
            <Switch>
              <Route exact path="/" render={props => <Home {...props} />} />
              <Route
                path="/film-details/:id"
                render={props => (
                  <FilmDetails {...props} films={filmStore.films} />
                )}
              />
              <Route path="/other-films" component={OtherFilms} />
            </Switch>
          </div>
        );
      }
    }
  )
);

export default App;
