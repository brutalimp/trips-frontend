import React from 'react';
import './content.css';

export class Content extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
        return <div className='App-content'>{this.props.children}</div>
    }
}