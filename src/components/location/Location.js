import React, { Component } from 'react';
import { Input } from 'antd';
import { Map } from 'react-amap';
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
        const key = '92dd08807095095bf3e11784a5585971';
        return <div>
            <div className='search'>
                <Search
                    placeholder="input location"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }} />
            </div>
            <div id="container" className='map-container'>
                <Map events={this.amapEvents} amapkey={key}></Map>
            </div>
        </div>
    }
}
