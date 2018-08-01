import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import HomeIcon from '../../components/homeIcon/HomeIcon';
import { fieldServerError } from '../../utils';
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

    handleRenewForm = () => {
       this.props.renewFrom();
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
        let userNameError = isFieldTouched('name') && getFieldError('name');
        if (!userNameError) {
            userNameError = fieldServerError(this.props.error,30003);
        }
        let passwordError = isFieldTouched('password') && getFieldError('password');
        if (!passwordError) {
            passwordError = fieldServerError(this.props.error,30004);
        }
        return (<div className='login_container'>
            <div className='HomeIcon'><HomeIcon /></div>
            <Form className='form' layout="horizontal" onSubmit={this.handleSubmit} onChange={this.handleRenewForm}>
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        disabled={hasErrors(getFieldsError()) || this.props.error}>
                        登陆
                    </Button>
                    或者<Link to='/register'>注册!</Link>
                </FormItem>
            </Form>
        </div>)
    }


}

export const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
