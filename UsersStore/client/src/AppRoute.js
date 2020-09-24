import React, { Component } from 'react'
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
import AddUser from './AddUser'
import App from './App';
import Home from './Home';
import User from './User';

class AppRoute extends Component {
    render() {
        return (
            <Router>
                <Switch>
<Route path='/' exact={true} component={Home}/>
<Route path='/users' exact={true} component={App}/>
<Route path='/edit/:id'  component={AddUser}/>
<Route Path='/edit' component={AddUser}/>

</Switch>
            </Router>
        )
    }
}

export default AppRoute
