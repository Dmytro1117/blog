import 'normalize.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <BrowserRouter basename="/blog">
      <App />
    </BrowserRouter>
  </Provider>,
);
