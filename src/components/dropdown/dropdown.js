import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { connect } from 'react-redux';
import { clearSelectedKeys } from '../../redux/actions/menus';

class DropDown extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this);
        this.props.clearSelectedKeys();
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
                    <Link to="/">退出</Link>
                </Menu.Item>
            </Menu>
        );
        return <Dropdown overlay={menu}>
            <Link onClick={this.handleClick} className='name' to="/profile">{this.props.name}</Link>
        </Dropdown>
    }
}

export default connect(state => ({ name: state.userStatus.user.name }), dispatch => ({ clearSelectedKeys: () => dispatch(clearSelectedKeys()) }))(DropDown);