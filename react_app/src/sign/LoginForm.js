import {Form, Icon, Input, Button, Checkbox,Row, Col,notification} from 'antd';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import browerHistory from 'react-router';
import './LoginForm.css';
import Logo from "../common/Logo";
import baseUrl from '../common/baseUrl'




class NormalLoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            height:0
        }
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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let data = 'username='+values.username+'&password='+values.password;
                fetch(baseUrl+'/login', {
                    method: "POST",
                    credentials: 'include',
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: data}
                    ).
                then((response) =>{
                        if(response.status !== 200){
                            return null;
                        }
                        return response.json();

                    },function(error){
                        console.log(error);
                    }).
                then((json)=>{
                        if(json){
                            if(json.success){
                                this.props.history.push('/');
                            }else{
                                //todo 提示登陆错误
                                notification.open({
                                    message: '注意',
                                    description: '登录错误',
                                });
                            }
                        }
                    },function (e) {
                        console.log(e);
                    })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
               <div className={"form-content"} style={{height:this.state.height}}>
                   <div style={{minWidth:300}}>
                       <h1>君不知</h1>
                        <Form onSubmit={this.handleSubmit} className="login-form" >
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </Form.Item>
                            <Form.Item>

                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                Or <Link to="/uregister">register now!</Link>
                            </Form.Item>
                        </Form>
                    </div>
               </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
