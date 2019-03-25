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

      render() {
        console.log(
          "this.props",
          this.props.match.params.id.replace(/_/g, " ")
        );
        return (
          <div>
            <h1>Film Detail Page</h1>
            <p>{this.props.filmStore.selectedFilm.original_title}</p>
            <p>{this.props.filmStore.selectedFilm.overview}</p>
          </div>
        );
      }
    }
  )
);

export default FilmDetails;
