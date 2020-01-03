import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import load from '../img/search.gif'
import Dialog from '@material-ui/core/Dialog';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import ForwardIcon from '@material-ui/icons/Forward';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '95%',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        minHeight: 470,
        padding: 20,
        paddingTop: 0

    },

    button: {
        width: 142,
        height: 142,
        border: '1px solid rgb(0,0,0,0.2)',
        // margin: 1
    },
    smallButton: {
        width: 100,
        height: 100,
        border: '1px solid rgb(0,0,0,0.2)',
        // margin: 1
    },

    imgs: {
        transition: '2s',
        padding: 10,
        // display: 'none'
        "&:hover": {
            cursor: 'pointer'

        }
    }
}));


export default function Buttons(props) {
    const [buttons, setButtons] = React.useState([[]]);
    const [socket, setSocket] = React.useState();
    const [start, setStart] = React.useState();
    const [imgs, setImgs] = React.useState(true);
    const [index, setIndex] = React.useState(0);
    const classes = useStyles();


    const runSocket = () => {

        const socket = new WebSocket(`ws://10.10.2.232:4101`);

        socket.onopen = () => {
            setStart(true);

            console.log('Socket is opened');
        };

        socket.onclose = () => {
            console.log('Socket is closed');
        };

        socket.onerror = (err) => {
            console.log(err);
        };

        setSocket(socket);
    };

    React.useEffect(() => {
        // runSocket();
        if (props.socketAct.readyState === 1) {
            setStart(true);
        }
    }, []);
    React.useEffect(() => {
        console.log('+++++', index)
        getAllImgs(index)
    }, [index])

    React.useEffect(() => {
        console.log(props)
        sendCom()
            .then(data => setImgs(false));
    }, [start]);

    React.useEffect(() => {
        getAllImgs();

    }, [imgs]);


    const sendCom = () => {
        return new Promise((res, rej) => {

            if (start && props.socketAct.readyState === 1) {
                props.socketAct.send(JSON.stringify({ COMMAND: 'GET_ACTIONS' }));
                props.socketAct.onmessage = (e) => {
                    let data = e.data;
                    console.log(data)
                    const response = JSON.parse(data);
                    let arr = [];
                    let arr1 = [];
                    if (response.RECORD && response.COMMAND === 'GET_ACTIONS') {
                        console.log(response.RECORD.length)
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
                    console.log(buttons)

                    res('ok');
                }

            }
        })
    };

    const getImg = (value) => {
        return new Promise((res, rej) => {
            if (start && props.socketAct.readyState === 1) {
                props.socketAct.send(JSON.stringify({ COMMAND: "GET_IMAGE_ACTION", PARAM: value }))
                props.socketAct.onmessage = (e) => {
                    let data = e.data;
                    const response = JSON.parse(data);
                    res(response.DATA);
                }
                props.socketAct.onerror = (err) => {
                    res('');
                }
            }

        })
    };

    async function getAllImgs(index) {
        if (!index) {
            index = 0;
        } else if (index < 0) {
            setIndex(0)
            return
        } else if (index > buttons.length - 1) {
            // console.log(index, buttons.length)
            setIndex(buttons.length - 1)
            return
        }
        console.log(buttons)
        const helpArr = buttons[index] ? buttons[index].slice() : [];
        // console.log(helpArr)
        const arr = [];
        for (let elem of helpArr) {
            await getImg(elem.Value).then(data => {
                elem.img = data;
                arr.push(elem);
            })
        }
        const newButtons = [...buttons];
        newButtons.splice(index, 1, arr)
        setButtons(newButtons);
    };

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={true} fullWidth={true} maxWidth='xl' style={{height:650}}>

            <div style={{ textAlign: "right", paddingRight: 20, display: 'flex', alignItems: 'stretch' }}>
                <div style={{flexGrow:1}}>
                    <IconButton  onClick={() => setIndex(index - 1)} disabled={index === 0}>
                        <ForwardIcon style={{ fontSize: '2.5em', transform: 'rotate(180deg)' }} />
                    </IconButton>
                    <IconButton  onClick={() => setIndex(index + 1)} disabled={index === buttons.length - 1}>
                        <ForwardIcon style={{ fontSize: '2.5em' }} />
                    </IconButton>

                </div>
                <div style={{flexGrow:9}}>
                    <IconButton onClick={() => props.setOpenButtons(false)}>
                        <HighlightOffIcon
                            style={{ fontSize: '2.5em' }}

                        />
                    </IconButton>

                </div>

            </div>

            <div className={classes.container}>

                {buttons[index] && buttons[index].map((elem) =>
                    <Tooltip title={elem.Name} key={elem.Name}>
                        <IconButton style={{ padding: 5 }} onClick={() => { props.add(elem); props.setOpenButtons(false) }}>
                            <div className={window.innerWidth > 800 ? classes.button : classes.smallButton} >
                                <p style={{ fontSize: window.innerWidth > 800 ? '12px' : '8px' }}>{elem.Name}</p>
                                {!elem.img && <img className={classes.imgs} width={30} src={load}></img>}
                                {elem.img && <img className={classes.imgs} src={`data:image/png;base64, ${elem.img}`}></img>}
                            </div>
                        </IconButton>
                    </Tooltip>
                )}

            </div>

        </Dialog>

    )
}