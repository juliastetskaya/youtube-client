import AppModel from '../model/AppModel';
import AppView from '../view/AppView';
import Slider from './Slider';

export default class App {
  constructor() {
    this.state = {
      urlApi: 'https://www.googleapis.com/youtube/v3/',
      // keyApi: 'AIzaSyCNBZn-uMH2qjYYSAood2XlZMt1rkSqHcA',
      // keyApi: 'AIzaSyAJItgTzyySoAN3jOCmypKB3QnxP4tAt9w',
      // keyApi: 'AIzaSyADcQR-taqJA3LHlG0ta4beH0-U5vswwUg',
      keyApi: 'AIzaSyCdyv1WLM0b88EYHawgWRGyZs32jgytr-0',
      request: '',
    };
  }

  async start() {
    let globalTimeout = null;
    // const view = new AppView();
    AppView.render('What do you want to find?');
    const model = new AppModel(this.state);
    const slider = new Slider();

    const input = document.getElementById('search-box');
    input.addEventListener('input', (event) => {
      if (globalTimeout !== null) {
        clearTimeout(globalTimeout);
      }
      globalTimeout = setTimeout(async () => {
        globalTimeout = null;
        const userRequest = event.target.value.trim();

        if (userRequest.length !== 0) {
          AppView.clearClips();
          Slider.clear();
          this.state.request = userRequest;
          const data = await model.getData();

          AppView.renderClips(data);

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
