import {Component} from "react";
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ChannelSymbol from "../common/ChannelSymbol";
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        height:"100%",
        background:"#2F3136",
        color:"#DCDDDE",
        display:"flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent:"left",
        alignItems:"center",
    },
    listItem:{
        display:"flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent:"left",
        alignItems:"center",
    }
});


class ChannelList extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = channel => () =>{
        this.props.onCurrentChannelChange(channel);
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root} >
                <List >
                    {this.props.jsonData.map((content) =>
                        <div key={content.id} style={{minWidth:290}}>
                            <ListItem button onClick={this.handleChange(content)}>
                                <div className={classes.listItem}>
                                    <ChannelSymbol/>
                                    <p style={{minWidth:200,position:'relative',top:8}}>
                                    {content.name}
                                    </p>
                                </div>
                            </ListItem>
                            < Divider />
                        </div>
                    )}

                </List>
            </div>
        )
    }
}

export default withStyles(styles)(ChannelList);