import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { connect } from 'react-redux';
import { clearSelectedKeys } from '../../redux/actions/menus';
import {  history } from '../../history';
import { logOut } from '../../redux/actions/login';

class DropDown extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleClick() {
        console.log(this);
        this.props.clearSelectedKeys();
    }

    handleLogOut = () => {
       localStorage.removeItem('token');
       this.props.logOut();
       history.push('');
    }

    render() {
        const menu = (
            <Menu onClick={this.handleClick}>
                <Menu.Item>
                    <Link to="/profile">个人中心</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <Link to="/account">账号管理</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <Link onClick={this.handleLogOut} to="/">退出</Link>
                </Menu.Item>
            </Menu>
        );
        return <Dropdown overlay={menu}>
            <span className='name' >{this.props.name}</span>
        </Dropdown>
    }
}

export default connect(state => ({
    name: state.userStatus.user.name
}), dispatch => ({
    clearSelectedKeys: () => dispatch(clearSelectedKeys()),
    logOut: () => dispatch(logOut())
}))(DropDown);