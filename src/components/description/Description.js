import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';

import { changeDescription } from '../../redux/actions/addTrip';

const TextArea = Input.TextArea;

export class Description extends React.Component {
    constructor(props) {
        super(props);
    }

    handleInput = (event) => {
        this.props.changeDescription(event.target.value);
    }

    render() {
        return <div>
            <TextArea onInput={this.handleInput} placeholder="这一刻的想法..." autosize={{ minRows: 2, maxRows: 3 }} />
        </div>
    }
}

export default connect(() => ({}), dispatch => ({ changeDescription: description => dispatch(changeDescription(description)) }))(Description);