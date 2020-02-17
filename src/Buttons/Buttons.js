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
    const [start, setStart] = React.useState(false);
    const [imgs, setImgs] = React.useState(true);

    //paging all buttons - index shows a number of an current page
    const [index, setIndex] = React.useState(0);
    const classes = useStyles();
    const [noimage] = React.useState('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rKvtVCAxxId2SDuHHB+tAGIC8UhwSrKccHpQzs5y7Fj6k5ody7s5xljk4rX03TfvSSN6r8p+ntQA/SrDaGkmT5uVwcEdq16KKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArFv9KwHmjfpyQx7AfStqigDjWBVsHqKu2mpSWqhAqlc88c/zrcubKG5BLIC+DgkkVjXOkzxsSihl7Bcn+lAGpbanFcHaFcN3yBj+dXQcgH1rkHhkj+/G6/VSKWOaSI5RsH6UAdfRXMJql2uB53H+6P8ACphrE/eRv++RQB0NFc8dYn7SN/3yKhfVLt8gzcf7o/woA6YnaCT2qjc6rFbnbsct24GP51z0k0kpy7ZP0pUhlk+5G7fRSaALF3qMl0NrKoXPGBz/ADqqil2Cjqa0LbSJnYGQKF7hsg/yrZtrOG2AKJhsDJyTQBn2GlBQk0j89QFPYj6VsUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAEEtnBOMSJn8TVSTRrdvufJ+Z/rWlRQBivoXOVn/DZ/9eojorj/AJaN/wB+/wD69b9FAGANFc/8tGH/AGz/APr1MmhDOWn49Nn/ANetmigDOj0a3X743/mP61bitIYBiNMfiamooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z/+ESVmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MmQ1M2VhN2QtZWE5OS0xMWU0LTliMzctYTNiYjdkZWQ3NTA5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg2Nzk3ZTA3LTBlMTEtNDVkNC04ZjI2LTM2YzMwYzc4ODNlNSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmY4MTE5YjVkLThjOTItYzY0Ni04NDk2LTAyMjI5YjE4YTU1MyIgR0lNUDpBUEk9IjIuMCIgR0lNUDpQbGF0Zm9ybT0iTGludXgiIEdJTVA6VGltZVN0YW1wPSIxNTgxMDAwMjU5Mzg3NTUyIiBHSU1QOlZlcnNpb249IjIuMTAuOCIgZGM6Rm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6TGVnYWN5SVBUQ0RpZ2VzdD0iMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEiIHhtcDpDcmVhdGVEYXRlPSIyMDE1LTA0LTI0VDE3OjQ3OjAxKzAyOjAwIiB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxNS0wNC0yNFQxNzo1NzowMSswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTUtMDQtMjRUMTc6NTc6MDErMDI6MDAiPiA8aXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+IDxyZGY6QmFnLz4gPC9pcHRjRXh0OkxvY2F0aW9uQ3JlYXRlZD4gPGlwdGNFeHQ6TG9jYXRpb25TaG93bj4gPHJkZjpCYWcvPiA8L2lwdGNFeHQ6TG9jYXRpb25TaG93bj4gPGlwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PiA8cmRmOkJhZy8+IDwvaXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+IDxpcHRjRXh0OlJlZ2lzdHJ5SWQ+IDxyZGY6QmFnLz4gPC9pcHRjRXh0OlJlZ2lzdHJ5SWQ+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZjgxMTliNWQtOGM5Mi1jNjQ2LTg0OTYtMDIyMjliMThhNTUzIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoV2luZG93cykiIHN0RXZ0OndoZW49IjIwMTUtMDQtMjRUMTc6NDc6MDErMDI6MDAiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBpbWFnZS9wbmcgdG8gaW1hZ2UvanBlZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0OmNoYW5nZWQ9Ii8iIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6M2MwMzU3OGYtN2Y2MC1lMzQzLWIzNjktNzBkMjZkNjNkMTEyIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoV2luZG93cykiIHN0RXZ0OndoZW49IjIwMTUtMDQtMjRUMTc6NTU6MDgrMDI6MDAiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDpjaGFuZ2VkPSIvIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmY3MjNlMWVhLTY5YzAtNzc0Ni1hYjllLTFiNTc1NjdhZTM2OCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiBzdEV2dDp3aGVuPSIyMDE1LTA0LTI0VDE3OjU3OjAxKzAyOjAwIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6Y2hhbmdlZD0iLyIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozNWIwNDVmZS1hNjgxLTQ2YWUtYTI5MC1kNDUxYTM3NjViZWYiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIiBzdEV2dDp3aGVuPSIrMDE6MDAiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwbHVzOkltYWdlU3VwcGxpZXI+IDxyZGY6U2VxLz4gPC9wbHVzOkltYWdlU3VwcGxpZXI+IDxwbHVzOkltYWdlQ3JlYXRvcj4gPHJkZjpTZXEvPiA8L3BsdXM6SW1hZ2VDcmVhdG9yPiA8cGx1czpDb3B5cmlnaHRPd25lcj4gPHJkZjpTZXEvPiA8L3BsdXM6Q29weXJpZ2h0T3duZXI+IDxwbHVzOkxpY2Vuc29yPiA8cmRmOlNlcS8+IDwvcGx1czpMaWNlbnNvcj4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/tAEhQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAALBwBWgADGyVHHAI3AAgyMDIwMDIwNhwCAAAC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')


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
                    // console.log(data);
                    const response = JSON.parse(data);
                    let arr = [];
                    let arr1 = [];
                    if (response.RECORD && response.COMMAND === 'GET_ACTIONS') {
                        // console.log(response.RECORD.length);
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
                    // console.log(buttons);

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
        // console.log(buttons);
        const helpArr = buttons[index] ? buttons[index].slice() : [];
        // console.log(helpArr)
        const arr = [];
        for (let elem of helpArr) {
            // await getImg(elem.Value).then(data => {
            //     elem.img = data;
            //     arr.push(elem);
            // })
            for (let i = 0; i < 8; i++) {
                await helpers.getImg(start, props.socketAct, "GET_IMAGE_ACTION", elem.Value)
                    .then(data => {
                        // console.log(data)
                        if (data !== undefined) {
                            i = 8;
                            elem.img = data.DATA;
                            arr.push(elem)
                        }else if (i === 7) {
                            elem.img = noimage;
                            arr.push(elem);
                        }

                    })
                    .catch((err) => {
                        console.log(err)
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
                    <IconButton onMouseDown={() => setIndex(index - 1)} disabled={index === 0}>
                        <ForwardIcon style={{fontSize: '2.5em', transform: 'rotate(180deg)'}}/>
                    </IconButton>
                    <IconButton onMouseDown={() => setIndex(index + 1)} disabled={index === buttons.length - 1}>
                        <ForwardIcon style={{fontSize: '2.5em'}}/>
                    </IconButton>

                </div>
                <div style={{flexGrow: 9}}>
                    <IconButton onMouseDown={() => props.setOpenButtons(false)}>
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
                                {!elem.img && <img className={classes.imgs} width={30} src={load} alt={'loader'}/>}
                                {elem.img &&
                                <img className={classes.imgs} width={window.innerWidth < 800 ? 25 : undefined}
                                     src={`data:image/png;base64, ${elem.img}`} alt={'img'}/>}
                            </div>
                        </IconButton>
                    </Tooltip>
                )}

            </div>

        </Dialog>

    )
}