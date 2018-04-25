import React, { Component } from 'react';
import QuestionList from "./QuestionList";
import { Layout, Menu, Icon ,Row, Col} from 'antd';
import Logo from "../common/Logo";
import QuestionEditor from "../common/Editor";
import {withStyles} from "material-ui/styles/index";
import ChannelList from "./ChannelList";
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import ChannelSymbol from "../common/ChannelSymbol";
const { Header, Content, Footer, Sider } = Layout;

const styles = theme => ({

    mainPageQuestion:{
        margin:0,
        padding:"32px 0 0 0",
        width:"100%",
        overflow:"auto",
        background:"#36393E"
    },
    mainPageContent:{
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

});



class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            content:[],
            height:0
        }
    }


    getQuestionList =()=> {
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
        this.getQuestionList();
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize = () => {
        let h = window.innerHeight ;
        this.setState({
            height:h,
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Layout className={classes.mainPageRoot} >
                <Row >
                    <Col span={6} >
                        <div style={{height:this.state.height}}>
                            <ChannelList jsonData={this.state.content}/>
                        </div>
                    </Col>
                    <Col span={18}>
                        <Layout className={classes.mainPageContent} >
                            <Header  theme="light" style={{margin:0,padding:0,background:"#36393E"}}>
                                <Card className={classes.mainPageContentHeader} >
                                    <ChannelSymbol/>
                                    <CardContent>
                                        CHANNEL
                                    </CardContent>

                                </Card>
                            </Header>
                            <Layout className={classes.mainPageQuestion} style={{height:this.state.height- 48 - 64 -16}} >
                                <Content >
                                    <QuestionList jsonData={this.state.content}/>
                                </Content>
                            </Layout>
                            <Footer style={{margin:8,padding:0}}>
                                <QuestionEditor/>
                            </Footer>
                        </Layout>
                    </Col>
                </Row>


            </Layout>
        );
    }
}




export default withStyles(styles)(MainPage);