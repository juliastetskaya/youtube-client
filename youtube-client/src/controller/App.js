import AppModel from '../model/AppModel';
import AppView from '../view/AppView';
import config from './config';


export default class App {
  constructor() {
    this.state = {
      urlApi: config.urlApi,
      typeRequest: 'search',
      request: {
        key: config.keyApi,
        type: 'video',
        part: 'snippet',
        maxResults: 15,
        q: 'js',
      },
    };
    this.clipIds = [];
  }

  start() {
    // const view = new AppView();
    AppView.renderSearch('What do you want to find?');

    const input = document.getElementById('search-box');
    input.addEventListener('input', (event) => {
      this.state.request.q = event.target.value.trim();

      setTimeout(async () => {
        const model = new AppModel(this.state);
        const data = await model.getClipData();
        data.forEach(clip => this.clipIds.push(clip.id.videoId));

        AppView.render(data);
      }, 500);
    });
  }
}
