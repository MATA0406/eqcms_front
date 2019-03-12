import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Home, Equipment, EmployeeList, Login } from 'pages';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/equipment" component={Equipment} />
          <Route exact path="/employeeList" component={EmployeeList} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
