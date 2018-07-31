import React from 'react';
import './servererror.css';

export class ServerError extends React.Component {
    render() {
        return <div className='server-error'>
            <div>Oops! 出现未知错误,请稍后再试...</div>
        </div>
    }
}