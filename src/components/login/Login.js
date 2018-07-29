import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import HomeIcon from '../../components/homeIcon/HomeIcon';
import './login.css';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class HorizontalLoginForm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.startLogIn(values);
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('name') && getFieldError('name');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (<div className='login_container'>
            <div className='HomeIcon'><HomeIcon /></div>
            <Form className='form' layout="horizontal" onSubmit={this.handleSubmit}>
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        disabled={hasErrors(getFieldsError())}>
                        Log in
                    </Button>
                    Or <Link to='/register'>register now!</Link>
                </FormItem> 
            </Form>
        </div>)
    }


}

export const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);

