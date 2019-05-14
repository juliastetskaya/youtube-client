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
        q: '',
      },
    };
    this.clipIds = [];
  }

  // https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=nq4aU9gmZQk,REu2BcnlD34,qbPTdW7KgOg&part=snippet,statistics

  start() {
    let globalTimeout = null;
    // const view = new AppView();
    AppView.render('What do you want to find?');

    const input = document.getElementById('search-box');
    input.addEventListener('input', (event) => {
      AppView.clearClips();
      if (globalTimeout !== null) {
        clearTimeout(globalTimeout);
      }
      globalTimeout = setTimeout(async () => {
        globalTimeout = null;
        const request = event.target.value.trim();
        if (request.length !== 0) {
          this.state.request.q = request;

          const model = new AppModel(this.state);
          const data = await model.getClipData();
          data.clipData.forEach(clip => this.clipIds.push(clip.id.videoId));

          AppView.renderClips(data.clipData);
        }
      }, 1000);
    });
  }
}
