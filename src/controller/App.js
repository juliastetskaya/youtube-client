import AppModel from '../model/AppModel';
import AppView from '../view/AppView';
import Slider from './Slider';

export default class App {
  constructor() {
    this.state = {
      urlApi: 'https://www.googleapis.com/youtube/v3/',
      keyApi: 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y',
      request: '',
    };
  }

  async start() {
    let globalTimeout = null;
    AppView.render('What do you want to find?');
    AppView.renderError();
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
          document.querySelector('.error').classList.add('visually-hidden');
          this.state.request = userRequest;
          const data = await model.getData();
          if (data.length === 0) {
            document.querySelector('.error').classList.remove('visually-hidden');
          } else {
            AppView.renderClips(data);

            slider.addHandler('getExtraClips', async () => {
              const dataExtra = await model.getData();
              AppView.renderClips(dataExtra);
            });

            slider.start();
          }
        }
      }, 1000);
    });
  }
}
