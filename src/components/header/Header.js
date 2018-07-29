import React, { Component } from 'react';
import { connect } from 'react-redux';
import Media from 'react-media';
import HomeIcon from '../homeIcon/HomeIcon';
import Menus from '../menus/Menus';
import Figure from '../../containers/figure/Figure';
import { SignButtons } from '../signbuttons/SignButtons';
import { startLogInByAuth } from '../../redux/actions/login';
import { clearSelectedKeys } from '../../redux/actions/menus';
import './header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.checkLogin();
    }

    checkLogin() {
        if (!this.props.loggedIn && localStorage.getItem('token')) {
            this.props.logInByAuth();
        }
    }

    render() {
        return <header className="App-header">
            <HomeIcon />
            <Media query={{ minWidth: 599 }}>
                 <Menus />
            </Media>
            {this.props.loggedIn ? <Figure /> : <SignButtons />}
        </header>
    }
}

export default connect(state => ({ loggedIn: state.userStatus.loggedIn }),
    (dispatch) => ({
        logInByAuth: () => dispatch(startLogInByAuth())
    }))(Header);
