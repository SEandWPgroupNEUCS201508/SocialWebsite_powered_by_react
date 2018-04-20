import {Component} from "react";
import Question from "./Question";
import React from "react";
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    root: {
        height:"100%",
    },
});


class QuestionList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                {this.props.jsonData.map((content) =>
                        <Question className={classes.question} text={content.text} media={content.media}/>
                )}
            </div>
        )
    }
}

export default withStyles(styles)(QuestionList);