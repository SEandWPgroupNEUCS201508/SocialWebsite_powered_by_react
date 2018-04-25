import {Component} from "react";
import { withStyles } from 'material-ui/styles';
import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import DraftsIcon from '@material-ui/icons/Drafts';
import ChannelSymbol from "../common/ChannelSymbol";

const styles = theme => ({
    root: {
        height:"100%",
        background:"#2F3136",
        color:"#DCDDDE"
    },
});


class ChannelList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <List component="nav">

                    {this.props.jsonData.map((content) =>
                        <ListItem button>
                            <ChannelSymbol/>
                            CHANNEL
                        </ListItem>
                    )}

                </List>
            </div>
        )
    }
}

export default withStyles(styles)(ChannelList);