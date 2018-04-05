import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';
import { Input } from 'antd';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { Button } from 'antd';
import { Alert } from 'antd';
import 'antd/dist/antd.css';


class App extends Component {


    login = () => {
        let data = {
            username:this.state.username,
            password:this.state.password
        };
        if(!data.username) return alert('用户名不能为空');
        if(!data.password) return alert('密码不能为空');

        fetch('http://www.foo.com/api/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(data) {
            console.log('request succeeded with JSON response', data)
        })
        .catch(function(error) {
            console.log('request failed', error)
        })
    }

    constructor(props){
        super(props);
        this.state = { // 初始化state
            username: '',
            password: ''
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    stateChange = (e) => {
        const target = e.target;
        this.setState({
            [target.id]: target.value
        })
    }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to 君不知</h1>
            <div className="App-login" onChange={this.stateChange}>
                <Input id="username" placeholder="user" value={this.state.username}/>
                <Input id="password" placeholder="passsword" value={this.state.password}/>
                <Button type="primary" onClick={this.login}>Sign In</Button>
            </div>

        </header>

      </div>
    );
  }
}

export default App;
