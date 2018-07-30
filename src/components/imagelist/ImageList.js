import React from 'react';
import { Upload, Icon, message, Modal } from 'antd';
import { connect } from 'react-redux';
import { openImagePreview, closeImagePreview, changeFileList, imageLoadStart, imageLoadEnd } from '../../redux/actions/addTrip';
import './imagelist.css'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


function checkImage(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
        return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class ImageList extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        // this.customRequest = this.customRequest.bind(this);
    }

    handleCancel() {
        this.props.closeImagePreview();
    }

    handlePreview(file) {
        this.props.openImagePreview(file.url || file.thumbUrl);
    }

    handleChange(info) {
        const file = info.file;
        if (checkImage(file)) {
            const fileList = info.fileList;
            this.props.changeFileList(fileList);
        }
    }

    beforeUpload = () => {
        return false;
    }

    render() {
        return <div className='imageList' >
            <Upload
                name="image"
                listType="picture-card"
                fileList={this.props.fileList}
                onPreview={this.handlePreview}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}>
                {this.props.fileList.length >= 9 ? null : <div><Icon type='plus' />
                </div>}
            </Upload>
            <Modal visible={this.props.previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={this.props.previewImage} />
            </Modal>
        </div>
    }

}

export default connect(state => ({
    previewImage: state.addTrip.previewImage,
    previewVisible: state.addTrip.previewVisible,
    fileList: state.addTrip.fileList,
    loading: state.addTrip.loading
}), dispatch => ({
    openImagePreview: previewImage => dispatch(openImagePreview(previewImage)),
    closeImagePreview: () => dispatch(closeImagePreview()),
    changeFileList: fileList => dispatch(changeFileList(fileList)),
    imageLoadStart: () => dispatch(imageLoadStart()),
    imageLoadEnd: () => dispatch(imageLoadEnd())
}))(ImageList)