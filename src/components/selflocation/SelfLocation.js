import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { Map, Marker } from 'react-amap';
import { askForLocation, askForLocationSucceed, askForLocationFailed, setFormattedAddress } from '../../redux/actions/selflocation';
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
            navigator.geolocation.getCurrentPosition(positon => this.setPosition(positon), this.positionError);
        } else {
            this.prop.askForLocationFailed();
        }
    }

    setPosition(position) {
        const pos = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        }
        this.props.askForLocationSucceed(pos);
        this.getFormattedAddress(pos);

    }

    getFormattedAddress(pos) {
        if (this.geocoder) {
            this.geocoder.getAddress([pos.longitude, pos.latitude], (status, result) => {
                console.log('address:', result, status);
                if (status == 'complete') {
                    if (result.regeocode) {
                        this.props.setFormattedAddress(result.regeocode.formattedAddress);
                    }
                }
            })
        }
    }

    positionError(err) {
        this.prop.askForLocationFailed();
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
                <Map amapkey={key} events={this.amapEvents} center={this.props.position} zoom='15'>
                    <Marker position={this.props.position} />
                </Map>
            </div>
            <div className='address'>
                <Icon type="environment-o" /><span>{span}</span>
            </div>
        </div>
    }
}

export default connect(state => (
    {
        position: state.selfLocation.position,
        askingForLocation: state.selfLocation.askingForLocation,
        locationAvailable: state.selfLocation.locationAvailable,
        formattedAddress: state.selfLocation.formattedAddress
    }), dispatch => ({
        askForLocation: () => dispatch(askForLocation()),
        askForLocationSucceed: (position) => dispatch(askForLocationSucceed(position)),
        askForLocationFailed: () => dispatch(askForLocationFailed()),
        setFormattedAddress: (address) => dispatch(setFormattedAddress(address))
    })
)(SelfLocaton)