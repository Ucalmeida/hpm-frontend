import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './modules/Login';
<<<<<<< HEAD
import Principal from './modules/principal';

//JS
import 'jquery/dist/jquery.min';
=======
import Principal from './modules/Principal';
//CSS
//JS
import 'admin-lte/dist/js/adminlte.min';
>>>>>>> c9dcf3c8e5d28c7b64fa4850cf114a248b9ffae4
import 'overlayscrollbars-react/dist/overlayscrollbars-react';

class App extends Component {
  
  render() {
      return (
          <Router>
              <Route path="/" exact component={Login} />
              <Route path="/principal" exact component={Principal} />
          </Router>
      );
    }
  }

export default App;
