import React, {useState, useEffect} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));
export default function ServicePanel(props) {
    const classes = useStyles();

    const {RECORD,} = props.servicePanel;
    const [inTab, setInTab] = useState([]);
    const [outTab, setOutTab] = useState([]);
    useEffect(() => {
        console.log('change');
        if (RECORD) {

            setOutTab(RECORD.outTab);
            setInTab(RECORD.inTab);
        }
    }, [props.servicePanel])

    const handleChange = index => event => {
        const newValue = [...outTab];
        newValue[index] = event.target.checked
        setOutTab(newValue);
        if (props.socketTap && props.socketTap.readyState === 1) {
            console.log('tarara', newValue)
            props.socketTap.send(JSON.stringify({COMMAND: 'SET_PARAM', PARAM: 'OK', DATA: JSON.stringify(newValue), KEY: RECORD.GUID}))
        }
    };
    return (
        <>

            {props.openServicePanel && <div style={{
                width: 1026, height: 612,
                // opacity: opacity,
                transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                background: "#00000021",
                // background:"rebeccapurple",
                position: "absolute", top: 0, zIndex: 100
            }}>
                <div style={{
                    width: 800, position: "relative", top: 100, marginLeft: "auto",
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
                        }}><b>{RECORD && RECORD.Name}</b></div>
                    </div>
                    <div
                        style={{
                            height: 350,
                            background: '#fff',
                            position: "relative",
                            // top:15,
                            borderRadius: '0 0 7px 7px'
                        }}
                    >
                        <div style={{padding:10, textAlign:"center",fontSize:20}}>
                            <b>{RECORD && RECORD.labelIn}</b>
                        </div>
                        <div style={{textAlign: "center"}}>

                            {RECORD && inTab.map((elem, i) =>
                                <FormControlLabel
                                    key={i}
                                    style={{margin: 5}}
                                    control={<Checkbox color={"primary"} checked={elem}/>} label={i + 1}
                                    labelPlacement="top"/>
                            )}
                        </div>
                        <div style={{padding:10, textAlign:"center",fontSize:20}}>
                            <b>{RECORD && RECORD.labelOut}</b>
                        </div>
                        <div style={{textAlign: "center"}}>
                            {RECORD && outTab.map((elem, i) =>
                                // <input type={'checkbox'} checked={elem}/>
                                <FormControlLabel
                                    key={i *10}style={{margin: 5}} onChange={handleChange(i)}
                                                  control={<Checkbox color={"primary"} checked={elem}/>} label={i + 1}
                                                  labelPlacement="top"/>
                            )}
                        </div>
                        <div style={{textAlign:"center", position:"relative",top:40}}>


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