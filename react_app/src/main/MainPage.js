import React, { Component } from 'react';
import QuestionList from "./QuestionList";
import { Layout, Menu, Icon ,Row, Col} from 'antd';
import Logo from "../common/Logo";
import QuestionEditor from "../common/Editor";
import {withStyles} from "@material-ui/core/styles/index";
import ChannelList from "./ChannelList";
import Card from '@material-ui/core/Card';
import ChannelSymbol from "../common/ChannelSymbol";
import {Link} from 'react-router-dom';
import baseUrl from '../common/baseUrl'


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

class MainPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            content:[],
            height:0,
            channels:[{id:"welcome",name:"欢迎"},{id:"study",name:"学习"},
                {id:"soul",name:"情感"},{id:"computer",name:"计算机"},
                {id:"chat",name:"闲聊"},{id:"art",name:"艺术"},
                {id:"test",name:"测试"},],
            currentChannel:{id:"soul",name:"情感"},
            user_id:0,
            username:"",
            email:""
        }
    }



    getUserInfo = () =>{
        fetch(baseUrl+'/user_profile', {
            method: "POST",
            credentials: 'include',
        })
        .then((response) =>{
            if(response.status !== 200 && response.status !== 302){
                alert("用户暂未登录")
                this.props.history.push('/ulogin');
                return null;
            }
            return response.json();
        },(error)=>{
            console.log(error);
        })
        .then((json)=>{
            this.setState({
                user_id: json.user_id,
                username: json.username,
                email:json.email
            })
        },(error)=>{
            console.log(error);
            alert("用户暂未登录")
            this.props.history.push('/ulogin');
        })
    }

    getQuestionList =(forum)=> {
        let last_id = 2147483647;
        let limit_num = 100;
        let data = 'forum='+forum+'&last_id='+last_id+'&limit_num='+limit_num;

        fetch(baseUrl+'/forum', {
            method: "POST",
            credentials: 'include',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data}).
        then((response) =>{
                if(response.status !== 200 && response.status !== 302){
                    return null;
                }
                return response.json()
            },(error)=>{
                console.log(error);
            }).
        then((json)=>{
                console.log(json);
                this.setState({
                        content:json
                    }
                )
            },(error)=>{
                console.log(error);
            })
    };

    componentDidMount() {
        this.getUserInfo();
        this.getQuestionList(this.state.currentChannel.id);
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
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

    onCurrentChannelChange = (channel) =>{
        this.setState({
            currentChannel:channel
        },()=>{
            this.getQuestionList(channel.id);
        })
    }


    onSendData = () =>{
        this.getQuestionList(this.state.currentChannel.id);
    }


    render() {
        const { classes } = this.props;
        return (
            <Layout className={classes.mainPageRoot} >
                <Row type={"flex"}>
                    <Col style={{width:300}} >
                        <div style={{height:this.state.height,overflow:"auto",background:"#2F3136"}}>
                            <ChannelList
                                onCurrentChannelChange={this.onCurrentChannelChange}
                                choice={this.state.currentChannel}
                                jsonData={this.state.channels}/>
                        </div>
                    </Col>
                    <Col style={{flexGrow : 2}} >
                        <Layout className={classes.mainPageContent} >
                            <Header  theme="light" style={{margin:0,padding:0,background:"#36393E"}}>
                                <Card className={classes.mainPageContentHeader} >
                                    <div className={classes.channelHeader}>
                                        <div>
                                            <ChannelSymbol />
                                        </div>
                                        <p style={{minWidth:200 ,position:'relative',top:-6}}>
                                            {this.state.currentChannel.name}
                                        </p>
                                    </div>
                                </Card>
                            </Header>
                            <Layout className={classes.mainPageQuestion}
                                    style={{height:this.state.height- 48 - 64 -16,
                                        overflowY:"scroll",}} >
                                <Content style={{padding:"32px 0 0 0"}}>
                                    <QuestionList
                                        jsonData={this.state.content}
                                        user={this.state.user_id}
                                        baseHistory={this.props.history}/>
                                </Content>
                            </Layout>
                            <div style={{margin:8,padding:0,backgroundColor:"#484B52"}}>
                                <QuestionEditor
                                    onSendData={this.onSendData}
                                    channel={this.state.currentChannel}
                                    username={this.state.username}
                                    user_id={this.state.user_id}
                                />
                            </div>
                        </Layout>
                    </Col>
                </Row>


            </Layout>
        );
    }
}




export default withStyles(styles)(MainPage);