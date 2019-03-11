import React, { Component } from 'react';
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import Customer from './CustomerManager/Customer'
import Customers from './CustomerManager/Customers'

const client = new ApolloClient({
  uri:"https://api-euwest.graphcms.com/v1/cjpvdmzu915tn01eugewiluu8/master"
})


class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Link to="/">
              <header className="App-header">
                <p>
                  Customer Manager
                </p>
              </header>
            </Link>
            <Switch>
              <Route exact path="/" component={Customers}/>
              <Route path="/customermanager/:id" component={Customer} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
