import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {IconButton} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import ForwardIcon from '@material-ui/icons/Forward';
import helpers from '../Helpers/helpers.js'

const useStyles = makeStyles(theme => ({
    menuPanel: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        color: '#fff',
        // overflowY: 'auto'
    },
    menuHeader: {
        top: 0,
        height: 35,
        width: '100%',
        backgroundColor: '#3f51b5',
        boxShadow: '0 3px 5px 0 #cecece',
        color:'#fff'
    },
    arrows: {
        padding: 0
    }

}));

export default function EnumPanel(props) {
    const {RECORD} = props.enumPanel;
    const classes = useStyles();

    console.log(RECORD)
    return (
        <Dialog open={true} fullWidth={true} maxWidth='xl'>

            <div className={classes.menuHeader}>
                <div style={{
                    transform: 'translate(0, 50%)', paddingLeft:15
                }}><b>{RECORD && RECORD.Name}</b></div>
            </div>
            <div style={{
                display: 'flex',
                flexWrap:"wrap",
                padding:10
            }}>


            {RECORD && RECORD.EnumValues.map((elem, i) =>

                <div key={i}
                     style={{
                         background: '#fff',
                         // position: 'relative',
                         textAlign: "center",
                         display: 'flex',
                         flexWrap:"wrap",
                         margin: 5,
                         flexDirection: "column",
                         padding: 5,
                         width: 150,
                         height: 150,
                         border: '1px solid rgb(0,0,0,0.2)'
                     }}
                >
                    <div style={{}}>

                        <img src={`data:image/png;base64, ${RECORD.Images[i]}`} alt={'img'}/>
                    </div>
                    <div>
                        {elem}
                    </div>
                </div>
            )}
            </div>
        </Dialog>
    )
}