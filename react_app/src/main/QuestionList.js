import {Component} from "react";
import Question from "./Question";
import React from "react";
import { withStyles } from '@material-ui/core/styles';

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
                { this.props.jsonData && this.props.jsonData.article_node_list
                    &&
                        this.props.jsonData.article_node_list.map((content)=>
                            <Question
                            className={classes.question}
                            me={this.props.user}
                            text={content.content}
                            user={content.user_id}
                            title={content.title}
                            key={content.article_id}
                            article_id={content.article_id}
                            date={content.published_date}
                            time={content.published_time}
                            baseHistory={this.props.baseHistory}
                            />
                        )
                }

            </div>

            )

    }
}

export default withStyles(styles)(QuestionList);