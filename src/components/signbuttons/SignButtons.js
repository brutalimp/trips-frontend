import React, { Component } from 'react';
import { Button } from 'antd'
import { history } from '../../history';
import './signbutton.css';

export class SignButtons extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleRegClick = this.handleRegClick.bind(this);
    }
    handleClick() {
        history.push('/login');
    }

    handleRegClick() {
        history.push('/register');
    }

    render() {
        return <div className='figure'>
            <Button  className='sign-in' onClick={() => { this.handleClick() }}>登陆</Button>
            <Button type="primary" onClick={() => { this.handleRegClick() }}>注册</Button>
        </div>
    }
}