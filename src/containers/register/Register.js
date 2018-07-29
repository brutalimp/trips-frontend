import React from 'react';
import { Link } from 'react-router-dom';
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
                console.log('Received values of form: ', values);
                fetch.post('Register', values).then((res) => {
                    console.log(res);
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
                                required: true, message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input placeholder="User name" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} placeholder="Confirm password" />
                        )}
                    </FormItem>

                    <FormItem>
                        <Button className='login-form-button' type="primary" htmlType="submit">Register</Button>
                        Or <Link to='/login'>log in now!</Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export const WrappedRegistrationForm = Form.create()(RegistrationForm);
