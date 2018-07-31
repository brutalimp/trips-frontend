import React from 'react';
import { connect } from 'react-redux';
import { Button , message } from 'antd';
import { history } from '../../history';
import fetch from '../../fetchclient';
import './publishbutton.css';

class PublishButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        const fm = new FormData();
        let files =[];
        this.props.trip.fileList.map((item)=> {
            fm.append('files', item.originFileObj);
        })
        if(this.props.trip.position) {
            fm.append('longitude', this.props.trip.position.longitude);
            fm.append('latitude', this.props.trip.position.latitude);
            fm.append('address', this.props.trip.formattedAddress);
        }
        if(this.props.trip.description) {
            fm.append('description', this.props.trip.description);
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        fetch.post('trip', fm, config).then((result) => {
            message.success('发表成功!');
            history.push('/trips');
        }, err => {
            message.error('发表失败,请稍后再试!');
        })
    }

    render() {
        return <div className='publish-button'>
            <Button onClick={this.handleClick} disabled={this.props.trip.fileList.length == 0} type="primary">发表</Button>
        </div>
    }
}

export default connect(state => ({ trip: state.addTrip }))(PublishButton);