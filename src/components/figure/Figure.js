import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import Dropdown from '../dropdown/dropdown';
import './figure.css';

class Figure extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className='figure'>
            {/* <span className='name'>{this.props.user.name}</span> */}
            <Dropdown />
            <Avatar size="large" icon="user" />
        </div>
    }
}

export default connect(state => ({ user: state.userStatus.user }))(Figure);