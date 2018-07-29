import React from 'react';
import { Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './foot.css';

export class Foot extends React.Component {

    render() {
        return <div className='App-foot'>
            <div>
                <a href='https://google.com'> <Icon type="google" /><span>Google</span></a>
                <a href='https://github.com'><Icon type="github" /><span>Github</span></a>
                <a href='https://google.com'><Icon type="ant-design" /><span>Ant Design</span></a>
            </div>
            <div><a href='mailto:zshuyin0@gmail.com'> <FontAwesomeIcon icon="envelope" /><span>Email Me</span></a> </div>
        </div>
    }
}