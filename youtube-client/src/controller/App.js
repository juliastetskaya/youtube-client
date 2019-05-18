import AppModel from '../model/AppModel';
import AppView from '../view/AppView';
import Slider from './Slider';

export default class App {
  constructor() {
    this.state = {
      urlApi: 'https://www.googleapis.com/youtube/v3/',
      keyApi: 'AIzaSyCNBZn-uMH2qjYYSAood2XlZMt1rkSqHcA',
      // keyApi: 'AIzaSyAJItgTzyySoAN3jOCmypKB3QnxP4tAt9w',
      request: '',
    };
  }

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
          this.state.request = userRequest;

          const model = new AppModel(this.state);
          const data = await model.getData();

          AppView.renderClips(data);

          const slider = new Slider();
          slider.addHandler('getExtraClips', async () => {
            const dataExtra = await model.getData();
            AppView.renderClips(dataExtra);
          });

          slider.start();
        }
      }, 1000);
    });
  }
}
