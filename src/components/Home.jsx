import React from "react";
import { observer, inject } from "mobx-react";
import "./Home.css";

const Home = inject("filmStore")(
  observer(
    class Home extends React.Component {
      goToDetailts = id => {
        let movie = id.replace(/ /g, "_");
        this.props.history.push(`/film-details/${movie}`);
      };

      componentDidMount() {
        console.log("home props", this.props);
      }

      render() {
        return (
          <div>
            <h1>Tiff</h1>
            <div>Movies Released in 2019</div>
            <ol>
              {this.props.filmStore.films.length > 0 &&
                this.props.filmStore.films.map(film => {
                  let id = film.original_title;
                  return (
                    <div key={id}>
                      <li
                        onClick={() => {
                          this.goToDetailts(id);
                          this.props.filmStore.selectedFilm = film;
                        }}
                      >
                        {id}
                      </li>
                    </div>
                  );
                })}
            </ol>
          </div>
        );
      }
    }
  )
);

export default Home;
