import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import load from '../img/search.gif'
import Dialog from '@material-ui/core/Dialog';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '95%',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',

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

        const socket = new WebSocket(`ws://${window.location.hostname}:4101`);

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
        runSocket();
    }, []);

    React.useEffect(() => {
        sendCom()
            .then(data => setImgs(false));
    }, [start]);

    React.useEffect(() => {
        getAllImgs();

    }, [imgs]);


    const sendCom = () => {
        return new Promise((res, rej) => {

            if (start && socket.readyState === 1) {
                socket.send(JSON.stringify({ COMMAND: 'GET_ACTIONS' }));
                socket.onmessage = (e) => {
                    let data = e.data;
                    const response = JSON.parse(data);
                    let arr = [];
                    let arr1 = [];
                    if (response.RECORD) {
                        for (let i = 0; i < response.RECORD.length; i++) {
    
                            if (arr1.length > 18) {
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

                    res('ok');
                }

            }
        })
    };

    const getImg = (value) => {
        return new Promise((res, rej) => {
            if (start && socket.readyState === 1) {
                socket.send(JSON.stringify({ COMMAND: "GET_IMAGE_ACTION", PARAM: value }))
                socket.onmessage = (e) => {
                    let data = e.data;
                    const response = JSON.parse(data);
                    res(response.DATA);
                }
                socket.onerror = (err) => {
                    res('');
                }
            }

        })
    };

    async function getAllImgs(index) {
        if (!index) {
            index = 0;
        }
        const helpArr = buttons[index] ? buttons[index].slice() : [];
        const arr = [];
        for (let elem of helpArr) {
            await getImg(elem.Value).then(data => {
                elem.img = data;
                arr.push(elem);
            })
        }
        setButtons([arr]);
    };

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={true} fullWidth={true} maxWidth='xl' >

            <div style={{ textAlign: "right", paddingRight: 20 }}>

                <IconButton style={{ width: 50 }} onClick={() => props.setOpenButtons(false)}>
                    <HighlightOffIcon />
                </IconButton>

            </div>

            <div className={classes.container}>

                {buttons[index]&&buttons[index].map((elem) =>
                    <Tooltip title={elem.Name} key={elem.Name}>
                        <IconButton style={{ padding: 5 }}  onClick={() => {props.add(elem); props.setOpenButtons(false)}}>
                            <div className={window.innerWidth > 800?classes.button:classes.smallButton} >
                                <p style={{fontSize:window.innerWidth > 800?'12px':'8px'}}>{elem.Name}</p>
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