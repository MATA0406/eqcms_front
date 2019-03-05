import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Home, Equipment, Posts } from '../pages';


class MainRouter extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Switch>
                    <Route path="/equipment" component={Equipment}/>
                    <Route path="/about" component={Equipment}/>
                </Switch>
                <Route path="/posts" component={Posts}/>
            </div>
        );
    }
}

export default MainRouter;