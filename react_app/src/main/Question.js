import {Component} from "react";
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import baseUrl from "../common/baseUrl";
import CommentEditor from "../common/CommentEditor";
import { Badge } from 'antd';


const styles = theme => ({
    card: {
        backgroundColor:"#484B52",
        maxWidth:"800px",
        margin:"0 auto 32px auto",
        fontColor:"#FFFFFF",

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});


class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false ,
            comment_list:[],
            comment_num:0
        };
    }

    componentDidMount() {
        this.getCommentList();
    }

    getCommentList =()=> {
        let data = 'article_id='+this.props.article_id;

        fetch(baseUrl+'/article_comment', {
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
                    comment_list:json.comment_list,
                    comment_num:json.comment_list.length,
                }
            )
        },(error)=>{
            console.log(error);
        })
    };

    onSendData = () =>{
        this.getCommentList();
    }

    handleExpandClick = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    };

    gotoChat = () => {
        let userId = this.props.user;
        this.props.baseHistory.push({pathname:'/chat',state:{he:userId,me:this.props.me}})
        // this.props.baseHistory.push('/chat?user='+userId)
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <IconButton onClick={this.gotoChat}>
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                匿
                            </Avatar>
                        </IconButton>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon style={{color:"#7F8186",position:'relative',top:-10}}/>
                        </IconButton>
                    }
                    title={this.props.title}
                    subheader={this.props.date+" "+this.props.time}
                />
                {this.props.media &&
                    <CardMedia
                        className={classes.media}
                        image={this.props.media}
                        title="Contemplative Reptile"
                    />
                }

                <CardContent>
                    <Typography component="div">
                        <div
                            style={{color:"#C3C4C5"}}
                            dangerouslySetInnerHTML={{__html:this.props.text}}/>
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon style={{color:"#7F8186",position:'relative',top:-10}}/>
                    </IconButton>

                    <IconButton aria-label="Show more"
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}>
                        <div style={{position:'relative',left:60,top:-30}}>
                            <Badge count={this.state.comment_num}/>
                        </div>
                        {this.state.comment_num === 0
                        ?
                        <ExpandMoreIcon style={{color:"#7F8186",position:'relative',top:-10}}/>
                            : <ExpandMoreIcon style={{color:"#7F8186",position:'relative',top:-10,left:-10}}/>

                        }

                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <CommentEditor
                            article_id={this.props.article_id}
                            onSendData={this.onSendData}
                        />
                        <br/>
                        { this.state.comment_list
                        &&
                        this.state.comment_list.map((v)=>
                            <div>
                                <p style={{color:"#7F8186",margin:4}}>
                                    {v.comment}
                                </p>
                                <hr />
                            </div>

                        )
                        }
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

Question.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Question);