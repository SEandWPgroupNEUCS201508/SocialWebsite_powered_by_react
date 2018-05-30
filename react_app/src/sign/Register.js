import React from 'react'
import {  Form, Input, Tooltip, Icon, Checkbox, Button ,notification} from 'antd';
import {Link} from 'react-router-dom'
import baseUrl from '../common/baseUrl'

class RegistrationForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            height:0,
            confirmDirty: false,
            autoCompleteResult: [],
            agree: false,
        };
    }
    componentDidMount() {
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize = () => {
        let h = window.innerHeight ;
        this.setState({
            height:h-100,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = 'username=' + values.nickname + '&password=' + values.password + '&email=' + values.email;
                fetch(baseUrl+'/register', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: data
                }).then((response) => {
                    if(response.status !== 200){
                        return ;
                    }
                    let dj = response.json();
                    dj.then((json) => {
                        if (json.success) {
                            this.props.history.push('/ulogin');
                        } else {
                            //todo 提示注册错误
                            notification.open({
                                message: '注意',
                                description: '注册错误！',
                            });
                        }
                    })
                }, function (error) {
                    console.log(error);
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

    onCheckBoxChange = (e) => {
        this.setState({ agree: e.target.checked });
    }


    render() {
        const { getFieldDecorator} = this.props.form;

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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        return (
            <div className={"register-form-content"} style={{
                height:this.state.height,
                display:"flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent:"center",
                alignItems:"center",
            }}>
                <div style={{minWidth:400}}>
                    <h1 style={{position:'relative',left:100 }}>注册</h1>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Password"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Confirm Password"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={(
                            <span>
                  Nickname&nbsp;
                                <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
                        )}
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>


                    <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox onChange={this.onCheckBoxChange }>I have read the <a href="">agreement</a></Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary"
                                htmlType="submit"
                                disabled={!this.state.agree} >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                    Or <Link to="/ulogin">login now!</Link>
                </div>
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;