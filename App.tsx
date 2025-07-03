import "./global.css"
import { Provider } from 'react-redux';
import { store } from './src/store';
import HomeScreen from './src/screens/HomeScreen';

const App = () => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
);

export default App;