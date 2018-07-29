import React from 'react';
import SelfLocaton from '../selflocation/SelfLocation';
import { Description } from '../description/Description';
import { ImageList } from '../imagelist/ImageList';
import './addtrip.css';

export class AddTrip extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='addTrip'>
            <SelfLocaton />
            <Description />
            <ImageList />
        </div>
    }
}