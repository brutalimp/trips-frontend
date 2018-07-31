import React from 'react';
import { Icon } from 'antd';
import './address.css';

export class Address extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='address'>
            <Icon type="environment-o" /><span className={this.props.link? 'link': ''}>{this.props.address}</span>
        </div>
    }
}