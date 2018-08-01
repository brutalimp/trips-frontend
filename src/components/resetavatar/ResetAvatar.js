import React from 'react';
import { Upload, Icon, message, Avatar } from 'antd';
import './resetavatar.css';
import { timingSafeEqual } from 'crypto';

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('只能上传jpeg格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片不要超过2M!');
    }
    return isJPG && isLt2M;
}

export class ResetAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const loading = (
            <div>
                <Icon type='loading' />
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return <div className='resetAvatar'>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}>
                <Avatar size="large" icon="user" src={imageUrl} />
                {this.state.loading? loading : ''}
            </Upload>
        </div>
    }
}
