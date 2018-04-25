import {Component} from "react";
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Editor, EditorState} from 'draft-js';

const styles = theme => ({
    card: {
        height:"48px",
        margin:0,
        padding:0,
    },
});


class QuestionEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = (editorState) => this.setState({editorState})
    }


    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>

                <CardContent>

                    <Editor editorState={this.state.editorState} onChange={this.onChange} />

                </CardContent>

            </Card>
        );
    }
}

QuestionEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionEditor);