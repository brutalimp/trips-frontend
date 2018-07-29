import React, { Component } from 'react';
import { Map } from 'react-amap';
import './location.css'
export class Location extends Component {

    render() {
        const key = '92dd08807095095bf3e11784a5585971';
        return <div>
            <div className='App-content'>Location</div>
            <div id="container" className='map-container'>
                <Map amapkey={key}></Map>
            </div>
        </div>
    }
}
