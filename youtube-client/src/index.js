import App from './controllers/App';
import Search from './controllers/Search';

const app = new App();
app.start();

const search = new Search();
search.start();
