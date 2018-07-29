import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { clearSelectedKeys } from '../../redux/actions/menus';
import './homeicon.css';

class HomeIcon extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.clearSelectedKeys();
    }
    render() {
        return <div className='icon'>
            <Link onClick={this.handleClick} to='/'>
                <Icon type="home" style={{ fontSize: 48, color: '#08c' }} />
            </Link>
        </div>
    }
}

export default connect(() => ({}), dispatch => ({ clearSelectedKeys: () => dispatch(clearSelectedKeys()) }))(HomeIcon);