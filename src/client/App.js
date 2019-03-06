import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Home, Equipment, EmployeeList } from '../pages';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/equipment" component={Equipment} />
          <Route path="/employeeList" component={EmployeeList} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
