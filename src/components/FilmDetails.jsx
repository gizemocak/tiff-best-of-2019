import React from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import { genres } from "../constants/constants";

const FilmDetails = inject("filmStore")(
  observer(
    class FilmDetails extends React.Component {
      componentDidMount() {
        console.log("selected film", toJS(this.props.filmStore.selectedFilm));
      }

      getGenres = genreIds => {
        if (!genreIds) return null;

        return genreIds.map(genreId => {
          const genre = genres.find(g => g.id === genreId);
          return !genre ? null : (
            <div key={genreId}>
              <ul>{genre.name}</ul>
            </div>
          );
        });
      };

      render() {
        return (
          <div>
            <h1>Film Details</h1>
            <p>{this.props.filmStore.selectedFilm.original_title}</p>
            <p>{this.props.filmStore.selectedFilm.overview}</p>
            {this.getGenres(this.props.filmStore.selectedFilm.genre_ids)}
          </div>
        );
      }
    }
  )
);

export default FilmDetails;
