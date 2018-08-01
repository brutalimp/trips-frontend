import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Menu } from 'antd';
import { ResetPassword } from '../resetpassword/ResetPassword';
import { ResetAvatar } from '../resetavatar/ResetAvatar';
import './account.css';

export class Account extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            selectedKeys: ['avatar']
        };
    }

    handleClick(e) {
        this.setState({
            selectedKeys: [e.key]
        })
    }

    render() {
        return <div className='manage'>
            <div className='manage-control'>
                <div className="manage-title">
                    <span>账号管理</span>
                </div>
                <Menu mode="inline" onClick={this.handleClick} selectedKeys={this.state.selectedKeys}>
                    <Menu.Item key="avatar">
                        <span> 设置头像 </span>
                    </Menu.Item>
                    <Menu.Item key="password">
                        <span> 密码重置 </span>
                    </Menu.Item>
                </Menu>
            </div>
            <div className='manage-content'>
                {this.state.selectedKeys == 'avatar' ? <ResetAvatar /> : <ResetPassword />}
            </div>
        </div>
    }
}