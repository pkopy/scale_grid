import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import load from '../img/search.gif'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Fab from '@material-ui/core/Fab';
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
    imgs: {
        transition: '2s',
        padding: 10,
        // display: 'none'
        "&:hover": {
            cursor: 'pointer'

        }
    }
}))


export default function Buttons(props) {
    const [buttons, setButtons] = React.useState([[]])
    const [socket, setSocket] = React.useState()
    const [start, setStart] = React.useState()
    const [imgs, setImgs] = React.useState(true)
    const [open, setOpen] = React.useState(false)
    const [index, setIndex] = React.useState(0)
    const classes = useStyles();


    const runSocket = () => {
        console.log('start')
        const socket = new WebSocket('ws://10.10.3.45:4101')
        socket.onopen = () => {
            // console.log('connect')
            setStart(true)

            console.log('Socket is opened')
        }
        socket.onclose = () => {
            console.log('Socket is closed')
        }
        socket.onerror = (err) => {
            console.log(err)
        }
        setSocket(socket)
    }

    React.useEffect(() => {
        runSocket()
    }, [])
    React.useEffect(() => {
        sendCom()
            .then(data => setImgs(false))
    }, [start])

    React.useEffect(() => {
        xxx()

    }, [imgs])


    const sendCom = () => {
        console.log('send')
        return new Promise((res, rej) => {


            if (start && socket.readyState === 1) {
                socket.send(JSON.stringify({ COMMAND: 'GET_ACTIONS' }))
                socket.onmessage = (e) => {
                    let data = e.data;
                    const response = JSON.parse(data);
                    console.log(response)
                    let arr = []
                    let arr1 = []
                    for (let i = 0; i < response.RECORD.length; i++) {

                        if (arr1.length > 18) {
                            arr1.push(response.RECORD[i])

                            arr.push(arr1)
                            arr1 = []
                        } else {

                            arr1.push(response.RECORD[i])
                        }
                    }
                    if (arr1.length > 0) {
                        arr.push(arr1)
                        arr1 = []
                    }
                    console.log(response.RECORD)
                    console.log(arr)
                    // setButtons([])
                    setButtons(arr)

                    res('ok')


                    // setMax(response.Max * 1)
                    // setValue(response.NetAct.Value)
                    // setUnit(response.NetAct.Unit)
                    // setValueCal(response.NetCal.Value)
                    // setIsStab(response.isStab)
                    // setIsTare(response.isTare)
                    // setIsZero(response.isZero)
                    // setPrecision(response.NetAct.Precision)
                }

            }
        })
    }

    const plus = () => {
        let inx = index
        inx++
        setIndex(inx)
        xxx(inx)
    }

    const img = (value) => {
        // let response = ''
        return new Promise((res, rej) => {
            if (start && socket.readyState === 1) {
                socket.send(JSON.stringify({ COMMAND: "GET_IMAGE_ACTION", PARAM: value }))
                socket.onmessage = (e) => {
                    let data = e.data;
                    const response = JSON.parse(data);
                    // console.log(response)
                    res(response.DATA)
                }
                socket.onerror = (err) => {
                    res('')
                }
            }

        })
    }

    async function xxx(index) {
        if (!index) {
            index = 0
        }
        const helpArr = buttons[index].slice()
        const x = []
        for (let elem of helpArr) {
            await img(elem.Value).then(data => {
                elem.img = data
                x.push(elem)
            })
        }
        setButtons([x])
        console.log(x)


    }

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={true} fullWidth={true} maxWidth='xl' >
            <div style={{ textAlign: "right", paddingRight: 20 }}>
                <IconButton style={{ width: 50 }} onClick={() => props.setOpenButtons(false)}>
                    <HighlightOffIcon />
                </IconButton>

            </div>

            <div className={classes.container}>
                {buttons[index].map((elem) =>
                    <Tooltip title={elem.Name} key={elem.Name}>
                        <IconButton style={{ padding: 5 }}  onClick={() => {props.add(elem); props.setOpenButtons(false)}}>
                            <div className={classes.button} >
                                <p style={{fontSize:'12px'}}>{elem.Name}</p>
                                {!elem.img && <img className={classes.imgs} width={30} src={load}></img>}
                                {elem.img && <img className={classes.imgs} src={`data:image/png;base64, ${elem.img}`}></img>}
                            </div>
                        </IconButton>
                    </Tooltip>
                )}
            </div>
            {/* <div className={classes.container}>
                <button onClick={plus}>LEfty</button>
                <button>Exit</button>
                <button>Reeee</button>

            </div> */}
        </Dialog>
        // {/* <button onClick={()=>xxx()}>ADDD</button> */}
    )
}