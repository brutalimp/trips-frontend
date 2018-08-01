import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../history';
import { Form, Input, Button, message } from 'antd';
import HomeIcon from '../../components/homeIcon/HomeIcon';
import { fieldServerError } from '../../utils';
import fetch from '../../fetchclient';
import '../login/login.css';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    const result = Object.keys(fieldsError).some(field => fieldsError[field]);
    console.log('haserror', result);
    return result
}

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                fetch.post('Register', values).then((res) => {
                    message.success('注册成功,请登录.');
                    history.push('login');
                }, (err) => {
                    if (err.response) {
                        this.setState({
                            error: err.response.data
                        })
                    } else {
                        message.error('未知错误,注册失败.');
                    }
                })
            }
        });
    }

    handleRenewForm = () => {
        this.setState({
            error: null
        })
    }

    handleConfirmInput = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password') && form.isFieldTouched('password')) {
            callback('两次密码不匹配!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty && form.isFieldTouched('confirm')) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    render() {
        const { getFieldDecorator, isFieldTouched, getFieldError, getFieldsError } = this.props.form;
        let userNameError = isFieldTouched('name') && getFieldError('name');
        if (!userNameError) {
            userNameError = fieldServerError(this.state.error, 30002);
        }
        return (
            <div className='login_container'>
                <div className='HomeIcon'><HomeIcon /></div>
                <Form className='form' layout="horizontal" onSubmit={this.handleSubmit} onChange={this.handleRenewForm} >
                    <FormItem
                        validateStatus={userNameError ? 'error' : ''}
                        help={userNameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入密码!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请确认您的密码!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onInput={this.handleConfirmInput} placeholder="确认密码" />
                        )}
                    </FormItem>

                    <FormItem >
                        <Button disabled={!this.state.confirmDirty || hasErrors(getFieldsError()) || this.state.error} className='login-form-button' type="primary" htmlType="submit">注册</Button>
                        或者 <Link to='/login'>登陆</Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export const WrappedRegistrationForm = Form.create()(RegistrationForm);
