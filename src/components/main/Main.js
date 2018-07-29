import React, { Component } from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import Header from '../../components/header/Header';
import { Content } from '../content/Content';
import { Home } from '../home/Home'
import { Location } from '../location/Location';
import { Trip } from '../trip/Trip';
import { AddTrip } from '../addTrip/AddTrip';
import { Profile } from '../profile/Profile';
import { Account } from '../account/Account';
import { Foot } from '../foot/Foot';

export class Main extends Component {
    render() {
        return <div>
            <Header></Header>
            <Content>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/location' component={Location} />
                    <Route path='/trips' component={Trip} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/account' component={Account} />
                    <Route path='/addTrip' component={AddTrip} />
                </Switch>
            </Content>
            <Foot />
        </div>
    }
}