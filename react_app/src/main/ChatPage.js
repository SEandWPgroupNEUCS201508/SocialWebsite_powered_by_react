import React, { Component } from 'react';
import { Layout, Menu, Icon ,Row, Col,Input,Button,Divider} from 'antd';
import {withStyles} from "@material-ui/core/styles/index";
import Card from '@material-ui/core/Card';
import ChannelSymbol from "../common/ChannelSymbol";
import {Link} from 'react-router-dom';
import wsUrl from '../common/baseUrl'


const { Header, Content, Footer, Sider } = Layout;


const styles = theme => ({

    mainPageQuestion:{
        margin:0,
        padding:0,
        width:"100%",
        background:"#36393E"
    },
    mainPageContent:{
        overFlow:"hidden",
        background:"#36393E"
    },
    mainPageContentHeader:{
        background:"#36393E",
        color:"#FFF",
        height:56,
        margin:0
    },
    mainPageRoot: {
        height:"100%",
        width:"100%",
        margin:0,
        padding:0,
    },
    mainPageScrollBar:{

    },
    channelHeader:{
        display:"flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent:"left",
        alignItems:"center",
    }

});


function ListItem(props){
    return <li><h3 style={{color:props.color}}>{props.user+'    '+props.time}</h3><h3 style={{color:"black"}}>{props.value}</h3>
    </li>
}


function NumberList(props) {
    const numbers = props.numbers;
    return (
        <div>
            {numbers.map((number) =>
                <ListItem
                    user={number.user}
                    value={number.content}
                    time={number.time}
                    color={number.color}
                />
            )}
        </div>
    );
}

let numbers = [];

class ChatPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            height:0,
            number: numbers
        }
    }

    componentDidMount() {

        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);

        this.websocket = new WebSocket("ws://xfangfang.cn/chat");

        this.websocket.onclose =()=> {
            numbers.push({user:'WebSocket连接关闭',content:'',time:new Date().toLocaleTimeString(),color:"red"});
            this.setState(
                {number:numbers}
            );
            var div = document.getElementById("con");
            div.scrollTop = div.scrollHeight;}

        this.websocket.onopen =()=> {
            numbers.push({user:'WebSocket连接打开',content:'',time:new Date().toLocaleTimeString(),color:"green"});
            this.setState(
                {number:numbers}
            );
            var div = document.getElementById("con");
            div.scrollTop = div.scrollHeight;}
        this.websocket.onmessage =(message)=>{
            let str = JSON.parse(message.data);
            console.log(str.message);
            numbers.push({user:'user2',content:str.message,time:new Date().toLocaleTimeString(),color:"purple"});
            this.setState(
                {number:numbers}
            );
            var div = document.getElementById("con");
            div.scrollTop = div.scrollHeight;
        }

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize = () => {
        let h = document.body.clientHeight ;
        this.setState({
            height:h,
        });
    }

    sendup =()=>
    {
        numbers.push({user:'user1',content:this.state.value,time:new Date().toLocaleTimeString(),color:"blue"});
        this.setState(
            {   number:numbers,
                value:""
            }
        );
        var div = document.getElementById("con");
        div.scrollTop = div.scrollHeight;
        this.websocket.send(JSON.stringify({
            source:this.props.location.state.me,
            destination:this.props.location.state.he,
            message:this.state.value}));
    };
    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Layout className={classes.mainPageRoot} >
                <Row type={"flex"}>
                    <Col style={{flexGrow : 2}} >
                        <Layout className={classes.mainPageContent} >
                            <Header  theme="light" style={{margin:0,padding:0,background:"#36393E"}}>
                                <Card className={classes.mainPageContentHeader} >
                                    <div className={classes.channelHeader}>
                                        <div>
                                            <ChannelSymbol />
                                        </div>
                                        <p style={{minWidth:200 ,position:'relative',top:-6}}>
                                            CHAT
                                        </p>
                                    </div>
                                </Card>
                            </Header>
                            <Layout className={classes.mainPageQuestion}
                                    style={{height:this.state.height - 64 -16,
                                        overflowY:"hidden",}} >
                                <Content style={{padding:"32px 0 0 0"}}>
                                    <Layout id={"top"} style={{height:"100%",width:"100%",overflow:'fixed',position:'fixed'}}>
                                        <Layout>
                                            <Content id={"con"}
                                                     style={{ margin: '3% 11%', padding: 24, background: '#fff', minHeight: 280,overflow:'scroll',height:'70%',width:'78%' ,position:'fixed'}}
                                            >
                                                <NumberList numbers={this.state.number} />
                                            </Content>
                                            <div id={"ddd"} style={{margin: '3% 10%',minHeight: 280,height:"200",top:'80%',height:'10%',width:'80%' ,position:'fixed'}}>
                                                <Input
                                                    value={this.state.value}
                                                    onChange={(e) => this.handleChange(e)}
                                                    onPressEnter={this.sendup}
                                                    style={{ height:50 ,margin: '24px 16px', padding: 24, background: '#fff',width: "80%"}}
                                                    placeholder="Basic usage"
                                                />
                                                <Button
                                                    onClick={this.sendup}
                                                    style={{width:"15%",height:50}} type="primary">Send up</Button>
                                            </div>
                                        </Layout>
                                    </Layout>
                                </Content>
                            </Layout>
                            <div style={{margin:8,padding:0,backgroundColor:"#484B52"}}>

                            </div>
                        </Layout>
                    </Col>
                </Row>


            </Layout>
        );
    }
}




export default withStyles(styles)(ChatPage);