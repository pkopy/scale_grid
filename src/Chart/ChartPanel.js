import React from 'react';
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from '@material-ui/core/styles';
import Chart from "./Chart";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));
export default function ServicePanel(props) {
    const classes = useStyles();
    const {RECORD,} = props.chartPanel;
    return (
        <>

            {props.openChartPanel&&<div style={{
                width: window.innerWidth < 800? 640:1026, height: window.innerWidth < 800? 470:612,
                transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                background: "#00000021",
                position: "absolute", top: 0, zIndex: 100
            }}>
                <div style={{
                    width: window.innerWidth < 800? 520:900, position: "relative", top: 80, marginLeft: "auto",
                    marginRight: "auto", textAlign: "left", background: '#00000012',
                    boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)'

                }}>
                    <div style={{
                        // top: 0,
                        height: 40,
                        width: '100%',
                        position: "relative",
                        backgroundColor: '#3f51b5',
                        borderRadius: '7px 7px 0 0',
                        color: '#fff',
                        top: 4
                    }}>
                        <div style={{
                            transform: 'translate(0, 50%)', paddingLeft: 15
                        }}><b>{RECORD&&RECORD.Name}</b></div>
                    </div>
                    <div
                        style={{
                            height: window.innerWidth < 800? 320:450,
                            background: '#fff',
                            position: "relative",
                            // top:15,
                            borderRadius: '0 0 7px 7px'
                        }}
                    >
                        <div style={{textAlign:"center", position:"relative",top:40}}>

                            <Chart
                                graph={props.chartPanel}
                                width={window.innerWidth < 800? 500:840}
                                height={window.innerWidth < 800? 230:330}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<CheckIcon>send</CheckIcon>}
                                onMouseDown={() => props.socketTap.send(JSON.stringify({COMMAND: 'SET_PARAM', PARAM: 'CANCEL',  KEY: RECORD.GUID}))}
                            >OK</Button>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}