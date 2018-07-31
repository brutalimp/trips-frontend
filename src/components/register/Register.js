import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../history';
import { Form, Input, Button } from 'antd';
import HomeIcon from '../../components/homeIcon/HomeIcon';
import fetch from '../../fetchclient';
import '../login/login.css';

const FormItem = Form.Item;

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
                    history.push('/login');
                }, (err) => {
                    console.log(err);
                })
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className='login_container'>
                <div className='HomeIcon'><HomeIcon /></div>
                <Form className='form' layout="horizontal" onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入用户名',
                            }],
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
                                required: true, message: '请确认密码!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} placeholder="确认密码" />
                        )}
                    </FormItem>

                    <FormItem>
                        <Button className='login-form-button' type="primary" htmlType="submit">注册</Button>
                        或者 <Link to='/login'>登陆!</Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export const WrappedRegistrationForm = Form.create()(RegistrationForm);
