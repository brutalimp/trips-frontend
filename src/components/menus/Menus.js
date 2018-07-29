import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { setSelectedKeys } from '../../redux/actions/menus';
import { history } from '../../history';
import './menus.css';

class Menus extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.style = {
            backgroundColor: "#202329",
            color: 'white',
            height: "100%"
        }
    }

    componentWillMount() {
        const path = history.location.pathname.slice(1);
        const menus = ['location', 'trips', 'addTrip'];
        menus.map((menu) => {
            if (menu == path)
                this.props.setSelectedKeys(menu);
        })

    }

    handleClick({ item, key }) {
        this.props.setSelectedKeys(key);
        history.push(key);
    }

    render() {
        return <div className='menu'>
            <Menu style={this.style}
                selectedKeys={this.props.selectedKeys}
                onClick={this.handleClick}
                mode="horizontal" >
                <Menu.Item key="location">
                    <Icon type="environment-o" />Location
                </Menu.Item>
                <Menu.Item key="trips">
                    <Icon type="global" />Trips
                </Menu.Item>
                <Menu.Item key="addTrip">
                    <Icon type="plus-circle-o" />Now
                </Menu.Item>
            </Menu>
        </div>
    }

}

export default connect(state => ({ selectedKeys: state.menus.selectedKeys }), (dispatch) => ({ setSelectedKeys: (key) => dispatch(setSelectedKeys(key)) }))(Menus);
