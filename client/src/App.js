import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import ItemModal from './components/itemModal';
import ShoppingList from './components/ShoppingList';
import {Container} from 'reactstrap';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/authActions';
import './App.css';

class App extends Component {
  componentDidMount () {
    store.dispatch (loadUser ());
  }
  render () {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
