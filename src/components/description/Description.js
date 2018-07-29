import React from 'react';
import { Input } from 'antd';

const TextArea = Input.TextArea;

export class Description extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <TextArea placeholder="这一刻的想法..." autosize={{ minRows: 2, maxRows: 3 }} />
        </div>
    }
}