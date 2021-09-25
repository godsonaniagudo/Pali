import logo from './logo.svg';
import './App.css';
import Container from './container';
import {createStore} from "redux"
import {Provider} from "react-redux"
import allReducers from './Redux/reducers';

function App() {
  const store = createStore(allReducers)

  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

export default App;
