import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

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
    const [okButton, setOkButton] = useState(false);
    const [cancelButton, setCancelButton] = useState(false);
    const {RECORD} = props.dialogPanel;
    const classes = useStyles();

    useEffect(() => {
        if (RECORD) {
            switch (RECORD.Data) {
                case 'Ok':
                    setOkButton(true);
                    setCancelButton(false);
                    break;
                case 'OkCancel':
                    setOkButton(true);
                    setCancelButton(true);
                    break;
                case 'Cancel':
                    setOkButton(false);
                    setCancelButton(true);
                    break;
                default:
                    setOkButton(false);
                    setCancelButton(false);
            }
        }
    }, [props.dialogPanel])

    const tapButton = (typeButton) => {
        if (props.socketTap && props.socketTap.readyState === 1) {
            props.socketTap.send(JSON.stringify({COMMAND: 'SET_PARAM', DATA: typeButton,PARAM: "OK", "KEY": RECORD.GUID}))
        }
    };
    return (
        <Dialog open={true} maxWidth={"sm"} fullWidth={true}>

            <div className={classes.menuHeader}>
                <div style={{
                    transform: 'translate(0, 50%)', paddingLeft: 15
                }}><b>{RECORD && RECORD.Name}</b></div>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>


                <div style={{
                    minHeight: 120,
                    // display: 'flex',
                    // flexWrap: "wrap",
                    padding: 10,
                    textAlign:"center"
                }}>
                    {RECORD&&RECORD.Value.split('\r\n').map((elem, i) =>

                        (elem !== ' ') ? <p key={i} style={{margin: 0}}>{elem}</p>: <br key={i} />

                    )}

                </div>

                <div style={{textAlign:"end", margin:"0 20px 20px 0"}}>

                    {okButton&&<Button onMouseDown={() => tapButton("Ok")} style={{margin:10}} variant="contained" color="primary">OK</Button>}
                    {cancelButton&& <Button onMouseDown={() => tapButton("CANCEL")} style={{margin:10}} variant="contained" color="secondary">CANCEL</Button>}
                </div>
            </div>
        </Dialog>
    )
}