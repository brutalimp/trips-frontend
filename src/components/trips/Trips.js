import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGetTrips, getTripsSucceed, getTripsFailed } from '../../redux/actions/trips';
import fetch from '../../fetchclient';
import { Map } from 'react-amap';
import { history } from '../../history';
import { Loading } from '../loading/Loading';
import { config } from '../../config';
import { ServerError } from '../servererror/ServerError'
import TripList from '../triplist/TripList';
import './trips.css';

export class Trips extends Component {
    constructor(props) {
        super(props);
        this.getTrips();
        this.handleResponse = this.handleResponse.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    getTrips() {
        this.props.startGetTrips();
        if(!this.props.userStatus || !this.props.userStatus.loggedIn) {
            history.push('');
            return;
        }
        fetch.get('trip').then(res => this.handleResponse(res), err => this.handleError())
    }

    handleResponse(res) {
        this.props.getTripsSucceed(res.data);
    }

    handleError(err) {
        this.props.getTripsFailed();
    }

    render() {
        if (this.props.gettingTrips) {
            return <Loading />
        }
        if (this.props.getTripsSucceed) {
            return <div className='trips'>
                <div id="container" className='map-container'>
                    <Map amapkey={config.AMapKey}></Map>
                </div>
                <TripList />
            </div>
        }
        
        return <ServerError />
    }
}

export default connect((state) => ({
    gettingTrips: state.trips.gettingTrips,
    getTripsSucceed: state.trips.getTripsSucceed,
    userStatus : state.userStatus
}), dispatch => ({
    startGetTrips: () => dispatch(startGetTrips()),
    getTripsSucceed: (triplist) => dispatch(getTripsSucceed(triplist)),
    getTripsFailed: () => dispatch(getTripsFailed())
}))(Trips);
