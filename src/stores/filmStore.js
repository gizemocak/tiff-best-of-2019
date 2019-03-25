import { observable, decorate } from "mobx";

class FilmStore {
  films = [];
  selectedFilm = {};
}
decorate(FilmStore, {
  films: observable,
  selectedFilm: observable
});

const filmStore = new FilmStore();
export default filmStore;
