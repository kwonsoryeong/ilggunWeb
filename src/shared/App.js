import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Signin, Businesslist, Posts, Workmanage, Workermanage, Pay, Message } from '../pages';


class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Signin}/>
                <Route exact path="/Workmanage/:id/:bang" component={Workmanage}/>
                <Route path="/Workermanage" component={Workermanage}/>
                <Route exact path="/Workermanage/:id/:bang" component={Workermanage}/>

                <Switch>
                    <Route exact path="/Businesslist/:id" component={Businesslist}/>
                    <Route path="/Businesslist" component={Businesslist}/>
                </Switch>
                <Route path="/posts" component={Posts}/>
                <Route path="/Pay" component={Pay}/>
                <Route path="/Message" component={Message}/>
            </div>
        );
    }
}

export default App;