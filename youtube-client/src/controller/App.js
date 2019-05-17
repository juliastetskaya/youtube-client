import AppModel from '../model/AppModel';
import AppView from '../view/AppView';
import Slider from '../view/Slider';
import Pagination from '../view/PaginationView';
import config from './config';


export default class App {
  constructor() {
    this.firstRequest = {
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

    this.secondRequest = {
      urlApi: config.urlApi,
      typeRequest: 'videos',
      request: {
        key: config.keyApi,
        id: [],
        part: 'snippet,statistics',
      },
    };
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
        const userRequest = event.target.value.trim();
        if (userRequest.length !== 0) {
          this.firstRequest.request.q = userRequest;

          const model = new AppModel(this.firstRequest);
          const dataFirstRequest = await model.getResponseData();
          // console.log(dataFirstRequest.nextPageToken);
          const { clipIds } = dataFirstRequest;

          this.secondRequest.request.id = clipIds.join(',');
          const clipData = await model.getClipData(this.secondRequest);

          const data = clipData.map((clip, index) => ({ ...clip, id: clipIds[index] }));

          AppView.renderClips(data);
          Slider.start();
          Pagination.render();
        }
      }, 1000);
    });
  }
}
