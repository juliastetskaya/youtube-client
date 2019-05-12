// import SearchModel from '../models/SearchModel';
import SearchView from '../views/SearchView';

export default class Search {
  constructor() {
    this.status = 'What do you want to find?';
  }

  start() {
    const view = new SearchView(this.status);
    view.render();
  }
}
