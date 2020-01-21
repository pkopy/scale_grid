import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import load from '../img/search.gif'
import Dialog from '@material-ui/core/Dialog';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {IconButton} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import ForwardIcon from '@material-ui/icons/Forward';
import helpers from '../Helpers/helpers.js'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        // width: '95%',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        // minHeight: 450,
        padding: 20,
        paddingTop: 0

    },

    button1: {
        width: 140,
        height: 140,
        border: '1px solid rgb(0,0,0,0.2)',
        // margin: 1
    },
    smallButton: {
        width: 70,
        height: 70,
        border: '1px solid rgb(0,0,0,0.2)',
        // margin: 1
        imgWidth: 30
    },

    imgs: {
        transition: '2s',
        // padding: 10,
        // display: 'none'
        // objectFit: 'contain',
        // width: '100%',
        // height:'100%',
        "&:hover": {
            cursor: 'pointer'

        }
    }
}));


export default function Buttons(props) {
    const [buttons, setButtons] = React.useState([[]]);
    const [socket, setSocket] = React.useState();
    const [start, setStart] = React.useState(false);
    const [imgs, setImgs] = React.useState(true);
    const [index, setIndex] = React.useState(0);
    const classes = useStyles();


    React.useEffect(() => {
        // runSocket();
        if (props.socketAct.readyState === 1) {
            setStart(true);
        }
    }, []);
    React.useEffect(() => {
        // console.log('+++++', index);
        getAllImgs(index)
    }, [index]);

    React.useEffect(() => {
        // console.log(props);
        sendCom()
            .then(data => setImgs(false));
    }, [start]);

    React.useEffect(() => {
        getAllImgs();

    }, [imgs]);


    const sendCom = () => {
        return new Promise((res, rej) => {

            if (start && props.socketAct.readyState === 1) {
                props.socketAct.send(JSON.stringify({COMMAND: 'GET_ACTIONS'}));
                props.socketAct.onmessage = (e) => {
                    let data = e.data;
                    console.log(data);
                    const response = JSON.parse(data);
                    let arr = [];
                    let arr1 = [];
                    if (response.RECORD && response.COMMAND === 'GET_ACTIONS') {
                        console.log(response.RECORD.length);
                        for (let i = 0; i < response.RECORD.length; i++) {

                            if (arr1.length > 16) {
                                arr1.push(response.RECORD[i]);
                                arr.push(arr1);
                                arr1 = [];
                            } else {
                                arr1.push(response.RECORD[i]);
                            }
                        }
                    }
                    if (arr1.length > 0) {
                        arr.push(arr1);
                        arr1 = [];
                    }

                    setButtons(arr);
                    console.log(buttons);

                    res('ok');
                }

            }
        })
    };


    async function getAllImgs(index) {
        if (!index) {
            index = 0;
        } else if (index < 0) {
            setIndex(0);
            return
        } else if (index > buttons.length - 1) {
            // console.log(index, buttons.length)
            setIndex(buttons.length - 1);
            return
        }
        console.log(buttons);
        const helpArr = buttons[index] ? buttons[index].slice() : [];
        // console.log(helpArr)
        const arr = [];
        for (let elem of helpArr) {
            // await getImg(elem.Value).then(data => {
            //     elem.img = data;
            //     arr.push(elem);
            // })
            for (let i = 0; i < 3; i++) {
                await helpers.getImg(start, props.socketAct, "GET_IMAGE_ACTION", elem.Value)
                    .then(data => {
                        if (data !== undefined) {
                            i = 3;
                            elem.img = data;
                            arr.push(elem)
                        }

                    })
            }

        }
        const newButtons = [...buttons];
        newButtons.splice(index, 1, arr);
        setButtons(newButtons);
    }

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={true} fullWidth={true} maxWidth='xl'
                style={{marginTop: '-10px'}}>

            <div style={{textAlign: "right", paddingRight: 20, display: 'flex', alignItems: 'stretch'}}>
                <div style={{flexGrow: 1}}>
                    <IconButton onClick={() => setIndex(index - 1)} disabled={index === 0}>
                        <ForwardIcon style={{fontSize: '2.5em', transform: 'rotate(180deg)'}}/>
                    </IconButton>
                    <IconButton onClick={() => setIndex(index + 1)} disabled={index === buttons.length - 1}>
                        <ForwardIcon style={{fontSize: '2.5em'}}/>
                    </IconButton>

                </div>
                <div style={{flexGrow: 9}}>
                    <IconButton onClick={() => props.setOpenButtons(false)}>
                        <HighlightOffIcon
                            style={{fontSize: '2.5em'}}

                        />
                    </IconButton>

                </div>

            </div>

            <div className={classes.container}>

                {buttons[index] && buttons[index].map((elem) =>
                    <Tooltip title={elem.Name} key={elem.Name}>
                        <IconButton style={{padding: 5}} onMouseDown={() => {
                            props.add(elem, 'button');
                            props.setOpenButtons(false)
                        }}>
                            <div className={window.innerWidth > 800 ? classes.button1 : classes.smallButton}>
                                <p style={{fontSize: window.innerWidth > 800 ? '12px' : '8px'}}>{elem.Name}</p>
                                {!elem.img && <img className={classes.imgs} width={30} src={load}></img>}
                                {elem.img &&
                                <img className={classes.imgs} width={window.innerWidth < 800 ? 25 : undefined}
                                     src={`data:image/png;base64, ${elem.img}`}/>}
                            </div>
                        </IconButton>
                    </Tooltip>
                )}

            </div>

        </Dialog>

    )
}