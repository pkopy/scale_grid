import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {IconButton} from '@material-ui/core';

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
        color: '#fff'
    },
    arrows: {
        padding: 0
    }

}));

export default function DialogPanel(props) {

    const classes = useStyles();
    // const closeEnum = () => {
    //     if (props.socketTap && props.socketTap.readyState === 1) {
    //         // console.log('tarara')
    //         props.socketTap.send(JSON.stringify({COMMAND: 'SET_PARAM', PARAM: "CANCEL", KEY: RECORD.GUID}))
    //     }
    // };
    //
    // const enumTap = (elem) => {
    //     if (props.socketTap && props.socketTap.readyState === 1) {
    //         // console.log('tappppppppp')
    //         props.socketTap.send(JSON.stringify({COMMAND: 'SET_PARAM', DATA: elem, PARAM: "OK", "KEY": RECORD.GUID}))
    //     }
    // }
    // console.log(RECORD);
    return (
        <Dialog open={true} maxWidth={"sm"} fullWidth={true}>

            <div className={classes.menuHeader}>
                <div style={{
                    transform: 'translate(0, 50%)', paddingLeft: 15
                }}><b>TEST</b></div>
            </div>
            <div style={{display: "flex"}}>


                <div style={{
                    height:200,
                    display: 'flex',
                    flexWrap: "wrap",
                    padding: 10
                }}>


                </div>
                <div style={{position: "absolute", right: 0}}>
                    <IconButton >
                        <HighlightOffIcon
                            style={{fontSize: '2.5em'}}

                        />
                    </IconButton>

                </div>
            </div>
        </Dialog>
    )
}