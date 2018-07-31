import React from 'react';
import { Icon } from 'antd';
import './loading.css';

export class Loading extends React.Component {
    render() {
        return <div className='loading'>
            <Icon type="loading" /> <span>Loading...</span>
        </div>
    }
}