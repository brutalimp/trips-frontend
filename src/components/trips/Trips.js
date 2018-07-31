import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGetTrips, getTripsSucceed, getTripsFailed } from '../../redux/actions/trips';
import fetch from '../../fetchclient';
import { Map } from 'react-amap';
import { Loading } from '../loading/Loading';
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
            const key = '92dd08807095095bf3e11784a5585971';
            return <div className='trips'>
                <div id="container" className='map-container'>
                    <Map amapkey={key}></Map>
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
}), dispatch => ({
    startGetTrips: () => dispatch(startGetTrips()),
    getTripsSucceed: (triplist) => dispatch(getTripsSucceed(triplist)),
    getTripsFailed: () => dispatch(getTripsFailed())
}))(Trips);
