import React, { Component } from 'react';
import QuestionList from "./QuestionList";
import { Layout, Menu, Icon } from 'antd';
import Logo from "../common/Logo";
import {withStyles} from "material-ui/styles/index";
const { Header, Content, Footer, Sider } = Layout;

const styles = theme => ({
    header: {
        background: "#fff",
        padding: 0,
    },
    question_list:{

    },
    mainPageContent:{

    },
    mainPageRoot: {
        flexGrow: 1,
    }
    ,
});



class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            content:[]
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
    }
    componentWillUnmount() {

    }


    render() {
        const { classes } = this.props;
        return (
            <Layout className={classes.mainPageRoot} >
                <Header  className={classes.header}>
                    <Logo text={"不知"} fontSize={17} speed={"1.5"}/>
                </Header>

                <Layout className={classes.mainPageContent} >
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span className="nav-text">nav 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="video-camera" />
                                <span className="nav-text">nav 2</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload" />
                                <span className="nav-text">nav 3</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="user" />
                                <span className="nav-text">nav 4</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ margin: '24px 16px 16px 16px' }}>
                        <div className={classes.question_list} style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <QuestionList jsonData={this.state.content}/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}




export default withStyles(styles)(MainPage);