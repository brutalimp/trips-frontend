import React, { Component } from 'react';
import { Button } from 'antd'
import { history } from '../../history';

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
            <Button  className='name' onClick={() => { this.handleClick() }}>Sign in</Button>
            <Button type="primary" onClick={() => { this.handleRegClick() }}>Sign up</Button>
        </div>
    }
}