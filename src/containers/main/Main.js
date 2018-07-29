import React, { Component } from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import Header from '../../components/header/Header';
import { Home } from '../home/Home'
import { Location } from '../location/Location';
import { Trip } from '../trip/Trip';

export class Main extends Component {
    render() {
        return <div>
            <Header></Header>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/location' component={Location} />
                <Route path='/trip' component={Trip} />
            </Switch>
        </div>
    }
}