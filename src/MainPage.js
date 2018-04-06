import React, { Component } from 'react';
import 'antd/dist/antd.css';





class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            content:[{'text':'1'}]
        }
    }
    getShuoShuo =()=> {
        fetch('http://127.0.0.1:8080/api/shuoshuo', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((data) => {
            if (data.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + data.status);
                return;
            }
            let dj = data.json();
            dj.then((json)=>{
                this.setState({
                    content:json.content
                });
            })
        })
        .catch(function(error) {
            console.log('request failed', error)
        })
    };

    componentDidMount() {
        this.getShuoShuo();
    }


    render() {
        return (
            <div className="App">

                <header className="App-header">
                    <h1 className="App-title">Welcome to 君不知</h1>
                    <TextList jsonData={this.state.content}/>
                </header>

            </div>
        );
    }
}

class TextList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <ul>{this.props.jsonData.map((content) =>
                    <li>
                        <ShuoShuo text={content.text} />
                    </li>
                )}</ul>
            </div>
        )
    }
}

class ShuoShuo extends Component{
    render(){
        return(
            <div>
                <p>{this.props.text}</p>
            </div>
        )
    }
}


export default MainPage;