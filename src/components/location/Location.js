import React, { Component } from 'react';
import { Input } from 'antd';
import { Map } from 'react-amap';
import { config } from '../../config';
import './location.css'

const Search = Input.Search;

export class Location extends Component {

    constructor() {
        super();
        this.amapEvents = {
            created: (mapInstance) => {
                this.mapInstance = mapInstance;
            }
        }
    }

    render() {
        return <div className='location'>
            <div className='search'>
                <Search
                    placeholder="input location"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }} />
            </div>
            <div id="container" className='map-container'>
                <Map events={this.amapEvents} amapkey={config.AMapKey}></Map>
            </div>
        </div>
    }
}
