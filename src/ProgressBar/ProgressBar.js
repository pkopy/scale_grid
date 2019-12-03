import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import stableIcon from '../img/stable_black.svg';
import zeroIcon from '../img/zero.svg'
import taraIcon from '../img/tara_black.svg'
import one from '../img/one.svg'
import zero2 from '../img/zero2.svg'
import three from '../img/three.svg'
import seven from '../img/seven.svg'
import two from '../img/two.svg'
import four from '../img/four.svg'
import five from '../img/five.svg'
import six from '../img/six.svg'
import eight from '../img/eight.svg'
import nine from '../img/nine.svg'
import minus from '../img/minus.svg'
import dot from '../img/dot.svg'

const theme = createMuiTheme({
    palette: {
        primary: { main: "#000" },
    },
});

const useStyles = makeStyles({
    root: {
        // flexGrow: 1,
        width: '98%',
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        // height:'100%',
        alignItems: 'center',
        flexDirection: 'column'
    },
    value: {
        flexGrow: 8,
        position: 'relative',
        fontSize: '65%',
        // width: '95%',
        // bottom: '80%',
        color: '#000',
        textAlign: 'right',
        // fontFamily:'Audiowide'
    },
    imgContainer: {
        display: 'flex',
        marginBottom: theme.spacing(1),
        height: 70

    },
    icons: {
        paddingTop: 4
    }
});

export default function LinearDeterminate(props) {
    const classes = useStyles();

    const [completed, setCompleted] = React.useState(0);

    const [Max, setMax] = React.useState(0)
    const [Value, setValue] = React.useState(0)
    const [ValueCal, setValueCal] = React.useState(0)
    const [Unit, setUnit] = React.useState('')
    const [isStab, setIsStab] = React.useState()
    const [isTare, setIsTare] = React.useState()
    const [isZero, setIsZero] = React.useState()
    const [precision, setPrecision] = React.useState()

    // const runSocket = () => {
    //     const socket = new WebSocket('ws://10.10.3.45:4101')
    //     socket.onopen = () => {
    //         // console.log('connect')
    //         setStart(true)
    //     }
    //     socket.onclose = () => {
    //         console.log('Socket is closed')
    //     }
    //     socket.onerror = (err) => {
    //         console.log(err)
    //     }
    //     setSocket(socket)
    // }

    const tare = () => {
        if (props.start && props.socket.readyState === 1) {
            props.socket.send(JSON.stringify({ COMMAND: 'TARE' }))
            // socket.onmessage((e) => console.log(e.data))
        }
    }

    const zero = () => {
        if (props.start && props.socket.readyState === 1) {
            props.socket.send(JSON.stringify({ COMMAND: 'ZERO' }))
        }
    }

    // React.useEffect(() => {
    //     runSocket()
    // }, [])

    React.useEffect(() => {

        function sendToSocket() {
            // console.log(props.socket)
            if (props.socket.readyState === 1) {
                props.socket.send(JSON.stringify({ COMMAND: 'GET_MASS' }))
                props.socket.onmessage = (e) => {
                    let data = e.data;
                    const response = JSON.parse(data);
                    // console.log(response)
                    if (response.NetAct && response.NetCal) {

                        setMax(response.Max * 1)
                        setValue(response.NetAct.Value)
                        setUnit(response.NetAct.Unit)
                        setValueCal(response.NetCal.Value)
                        setIsStab(response.isStab)
                        setIsTare(response.isTare)
                        setIsZero(response.isZero)
                        setPrecision(response.NetAct.Precision)
                    }
                }

            }
        }

        const timer = setInterval(sendToSocket, 250);
        return () => {
            clearInterval(timer);
        };
    }, [])

    React.useEffect(() => {

        function progress() {
            setCompleted(oldCompleted => {
                if (oldCompleted === 100) {
                    return 0;
                }

                const diff = Math.random() * 10;
                return Math.min(oldCompleted + diff, 100);
            });
        }
        progress()
        // const timer = setInterval(progress, 250);
        // return () => {
        //     clearInterval(timer);
        // };
    }, [Value]);

    const _digits = (value) => {

        const x = (value.toString()).split('')
        console.log(x)
        let result = []
        for (let digit of x) {
            switch (digit) {
                case '0':
                    result.push(zero2)
                    break
                case '1':
                    result.push(one)
                    break
                case '2':
                    result.push(two)
                    break
                case '3':
                    result.push(three)
                    break
                case '4':
                    result.push(four)
                    break
                case '5':
                    result.push(five)
                    break
                case '6':
                    result.push(six)
                    break
                case '7':
                    result.push(seven)
                    break
                case '8':
                    result.push(eight)
                    break
                case '9':
                    result.push(nine)
                    break
                case '-':
                    result.push(minus)
                    break
                case '.':
                    result.push(dot)
                    break
                default:
                    result.push(minus)
                    break
            }
        }
        console.log(props.width)
        // let xc = (props.width === 4) ? '50px' : '80px' 
        let xc;
        if (props.width === 6) {
            xc = '80px'
        } else if (props.width === 4) {
            xc = '50px'
        } else {
            xc = '20px'
        }
        return (
            <span>
                {result.map(elem =>
                    
                    <img src={elem} style={{ width:xc }}></img>
                )}
            </span>
        )
    }

    return (
        <div className={classes.root}>
            {/* <div className={classes.value}>{Number.parseFloat(Value).toFixed(precision)} {Unit !=="NoUnit"&&<span>{Unit}</span>}</div> */}
            <div style={{ display: 'flex', width: '95%' }}>
                <div style={{ width: 40, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <div className={classes.icons}>{isStab && <img src={stableIcon} width={35}></img>}</div>
                    <div className={classes.icons}>{isZero && <img src={zeroIcon} width={35}></img>}</div>
                    <div className={classes.icons}>{isTare && <img src={taraIcon} width={35}></img>}</div>
                </div>
                <div className={classes.value} > {_digits(Number.parseFloat(Value).toFixed(precision))}{Unit !== "NoUnit" && <span style={{ fontSize: '25px' }}>{Unit}</span>}</div>

            </div>
            <ThemeProvider theme={theme}>
                <LinearProgress color="primary" variant="determinate" value={ValueCal > 0 ? (100 / (Max / ValueCal)) : 0} style={{ height: `25px`, width: '100%' }} />
            </ThemeProvider>
            {/* {Number.parseFloat(Value).toFixed(precision)} */}
            {/* <img src={zero2} style={{ width: '10%' }}></img><img src={zero2} style={{ width: '10%' }}></img><img src={zero2} style={{ width: '10%' }}></img>  */}
        </div>
    );
}