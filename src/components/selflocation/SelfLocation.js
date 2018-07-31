import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { Map, Marker } from 'react-amap';
import { Address } from '../address/Address';
import { askForLocation, askForLocationSucceed, askForLocationFailed } from '../../redux/actions/addTrip';
import './selflocation.css';

class SelfLocaton extends React.Component {
    constructor(props) {
        super(props);
        this.setPosition = this.setPosition.bind(this);
        this.positionError = this.positionError.bind(this);
        this.handleMapInstance = this.handleMapInstance.bind(this);
        this.checkLocation();
        this.amapEvents = {
            created: this.handleMapInstance
        }
    }

    handleMapInstance(mapInstance) {
        this.mapInstance = mapInstance;
        window.AMap.plugin('AMap.Geocoder', () => {
            this.geocoder = new window.AMap.Geocoder({
                city: "010"//城市，默认：“全国”
            });
        })
    }

    checkLocation() {
        if ("geolocation" in navigator) {
            this.props.askForLocation();
            navigator.geolocation.getCurrentPosition(positon => this.setPosition(positon),err=> this.positionError());
        } else {
            this.props.askForLocationFailed();
        }
    }

    setPosition(position) {
        const pos = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        }
        this.getFormattedAddress(pos);

    }

    getFormattedAddress(position) {
        if (this.geocoder) {
            this.geocoder.getAddress([position.longitude, position.latitude], (status, result) => {
                let formattedAddress;
                if (status == 'complete') {
                    if (result.regeocode) {
                        formattedAddress = result.regeocode.formattedAddress;
                    }
                }
                this.props.askForLocationSucceed({ position, formattedAddress});
            })
        } else {
            this.props.askForLocationSucceed({ position });
        }
    }

    positionError(err) {
        this.props.askForLocationFailed();
    }

    render() {
        const key = '92dd08807095095bf3e11784a5585971';
        let span;
        if (this.props.askingForLocation) {
            span = '正在查询地址';
        } else if (this.props.locationAvailable) {
            span = this.props.formattedAddress;
        } else {
            span = '地理位置不可用';
        }
        return <div>
            <div id="container" className='map-container'>
                <Map amapkey={key} events={this.amapEvents} center={this.props.position? this.props.position: ''} zoom='15'>
                     {this.props.position ? <Marker position={this.props.position} />: ''} 
                </Map>
            </div>
            <Address address={span} />
        </div>
    }
}

export default connect(state => (
    {
        position: state.addTrip.position,
        askingForLocation: state.addTrip.askingForLocation,
        locationAvailable: state.addTrip.locationAvailable,
        formattedAddress: state.addTrip.formattedAddress
    }), dispatch => ({
        askForLocation: () => dispatch(askForLocation()),
        askForLocationSucceed: (position) => dispatch(askForLocationSucceed(position)),
        askForLocationFailed: () => dispatch(askForLocationFailed())
    })
)(SelfLocaton)