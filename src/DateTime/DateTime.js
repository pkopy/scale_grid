import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textPanel: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: 5,
        width: '100%'

    },
    tabs: {
        width: 50,
        height: 10,
        border: '1px solid rgb(0,0,0,0.2)',
        margin: '0 10px',
        '&:hover': {
            backgroundColor: 'gray'
        }
    },
    activeTab: {
        backgroundColor: 'gray'
    },
    tabContainer: {
        padding: '0 0 20px'
    }
}));

export default function DateTime(props) {
    return(
        <div style={{fontWeight:"bold", fontSize:"2vw"}}>{props.date}</div>
    )
}