import React from 'react';
import { connect } from 'react-redux';
import { loadImageSucceed } from '../../redux/actions/trips';
import { Address } from '../address/Address';
import { Icon } from 'antd';
import { config } from '../../config';
import fetch from '../../fetchclient';
import './trip.css';

class Trip extends React.Component {

    constructor(props) {
        super(props);
        this.props.trip.images.map((image) => {
            fetch.get('image/' + image).then((res) => this.handleImgResponse(res), err => this.handleImgErr(err))
        })
    }

    handleImgResponse(res) {
        // TO DO: How to handle image response? 
        var responseTextLen = res.data.length;
        var binary = ''
        for (var j = 0; j < responseTextLen; j += 1) {
            binary += String.fromCharCode(res.data.charCodeAt(j) & 0xff)
        }
        let b64Response = btoa(binary);
        let result = 'data:image/jpeg;base64,' + b64Response;
        this.handleReader(result, res)
    }

    handleReader(result, res) {
        const url = res.config.url.split('/')
        const image = url[url.length - 1];
        this.props.loadImageSucceed(this.props.index, image, result)
    }

    handleImgErr(err) {
        console.log(err);
    }

    render() {
        console.log('trip', this.props.trip);
        const listItems = this.props.trip.images.map((image) =>
            this.props.trip.imagesStatus[image].loaded ? <div key={image} className='img'><img key={image} src={config.url + 'image/' + image} /></div> :
                <div key={image} className='img'> <Icon type="loading" /> </div>
        );
        return <div className='trip' >
            {this.description ? <div className='description'>
                <span>{this.description}</span>
            </div> : ''}
            <div className='images'>
                {listItems}
            </div>
            <div>
                {this.props.trip.likeCount > 0 ? <Icon type="heart" /> : <Icon type="heart-o" />} {this.likeCount > 0 ? this.likeCount : ''}
            </div>
            <Address address={this.props.trip.position && this.props.trip.position.address ? this.props.trip.position.address : '未知地点'} link={true} />
        </div>
    }
}

export default connect(state => ({
}), dispatch => ({
    loadImageSucceed: (index, image, url) => dispatch(loadImageSucceed(index, image, url))
}))(Trip);