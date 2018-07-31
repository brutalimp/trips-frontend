import React from 'react';
import { connect } from 'react-redux';
import { loadImageSucceed } from '../../redux/actions/trips';
import { Address } from '../address/Address';
import { Icon } from 'antd';
import fetch from '../../fetchclient';
import './trip.css';

class Trip extends React.Component {

    constructor(props) {
        super(props);
        // this.images = this.props.trip.images;
        // this.imagesStatus = {};
        // this.position = this.props.trip.position;
        // this.description = this.props.trip.description;
        // this.timestamp = this.props.trip.timestamp;
        // this.likeCount = this.props.trip.likeCount;
        // this.likeIds = this.props.trip.likeIds;

        this.props.trip.images.map((image) => {
            fetch.get('image/' + image).then((res) => this.handleImgResponse(res), err => this.handleImgErr(err))
        })
    }

    handleImgResponse(res) {
        // const fileReader = new FileReader();
        // fileReader.readAsDataURL(new Blob([res.data], {type:'image/jpeg'}));
        // // const url = URL.createObjectURL(res.data);
        // fileReader.onloadend = (ev) => {
        //     this.handleReader(ev, res);
        // }
        var responseTextLen = res.data.length;
        var binary = ''
        for (var j = 0; j < responseTextLen; j+=1) {
            binary += String.fromCharCode(res.data.charCodeAt(j) & 0xff)
        }  
        let b64Response = btoa(binary);
        let result = 'data:image/jpeg;base64,' + b64Response;
        this.handleReader(result, res)
    }

    handleReader(result, res) {
        const url = res.config.url.split('/')
        const image = url[url.length - 1];
        // this.imagesStatus[image].loaded = true;
        // this.imagesStatus[image].src = ev.target.result;
        
        this.props.loadImageSucceed(this.props.index, image, result)
    }

    handleImgErr(err) {
        console.log(err);
    }

    render() {
        console.log('trip', this.props.trip);
        const listItems = this.props.trip.images.map((image, index) =>
            this.props.trip.imagesStatus[image].loaded ? <div key={image} className='img'><img key={image} src={'http://localhost:8092/image/'+image} /></div> :
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
    loadImageSucceed:  (index, image, url) => dispatch(loadImageSucceed(index, image, url))
}))(Trip);