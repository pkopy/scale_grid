import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
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
        width: '98%',
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        flexDirection: 'column'
    },
    value: {
        flexGrow: 8,
        position: 'relative',
        fontSize: '65%',

        color: '#000',
        textAlign: 'right',
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
    const [Max, setMax] = React.useState(0);
    const [Value, setValue] = React.useState();
    const [ValueCal, setValueCal] = React.useState(0);
    const [Unit, setUnit] = React.useState('');
    const [isStab, setIsStab] = React.useState();
    const [isTare, setIsTare] = React.useState();
    const [isZero, setIsZero] = React.useState();
    const [precision, setPrecision] = React.useState();


    React.useEffect(() => {

        function sendToSocket() {
            if (props.socketMass.readyState === 1) {
                props.socketMass.send(JSON.stringify({ COMMAND: 'GET_MASS' }));
                props.socketMass.onmessage = (e) => {
                    let data = e.data;
                    const response = JSON.parse(data);
                    // console.log(response)
                    if (response.NetAct && response.NetCal) {
                        props.setLicense(true);
                        setMax(response.Max * 1);
                        setValue(response.NetAct.Value);
                        setUnit(response.NetAct.Unit);
                        setValueCal(response.NetCal.Value);
                        setIsStab(response.isStab);
                        setIsTare(response.isTare);
                        setIsZero(response.isZero);
                        setPrecision(response.NetAct.Precision);
                    } else if(response.STS_DETAILS === 'The license for this module has not been activated'){
                        setValue('-----');
                        setUnit('');
                        setIsStab(false);
                        setIsTare(false);
                        setIsZero(false);
                        props.setLicense(false);
                    }
                }

            } else {
                setValue('-----');
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

        progress();

    }, [Value]);

    const _digits = (value) => {
        value = isNaN(value) ? '-----' : value;
        const digits = (value.toString()).split('');
        let result = []
        for (let digit of digits) {
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

        let digitWidth;
        let unitFontWidth;
        let unitBottom;
        let imgWidth;
        if (props.screen.width > 800) {
            if (props.width === 6) {
                digitWidth = 70;
                unitFontWidth = 90;
                unitBottom = 160;
                imgWidth = 80;
            } else if (props.width === 4) {
                digitWidth = 50;
                unitFontWidth = 50;
                unitBottom = 120;
                imgWidth = 50;
            } else {
                digitWidth = 20;
                unitFontWidth = 20;
                unitBottom = 50;
                imgWidth = 35;
            }

        }else {
            if (props.width === 6) {
                digitWidth = 55;
                unitFontWidth = 75;
                unitBottom = 130;
                imgWidth = 65;
            } else if (props.width === 4) {
                digitWidth = 35;
                unitFontWidth = 35;
                unitBottom = 115;
                imgWidth = 40;
            } else {
                digitWidth = 13;
                unitFontWidth = 13;
                unitBottom = 45;
                imgWidth = 30;
            }
        }

        return (
            <div style={{width:'100%'}}>
                
                {props.visible && <div style={{ display: 'flex', width: '100%' }}>

                    <div style={{ width: 100, display: 'flex', flexDirection: 'column', textAlign: 'left', marginTop: '10px' }}>
                        <div className={classes.icons}>{isStab && <img src={stableIcon} width={`${imgWidth}%`} alt='stab'></img>}</div>
                        <div className={classes.icons}>{isZero && <img src={zeroIcon} width={`${imgWidth}%`} alt='zero'></img>}</div>
                        <div className={classes.icons}>{isTare && <img src={taraIcon} width={`${imgWidth}%`} alt='tare'></img>}</div>
                    </div>
                    
                    <div className={classes.value} >

                        <div>
                            {props.visible && result.map((elem, i) =>
                                <img src={elem} style={{ width: digitWidth }} key={i} alt='digit'></img>
                            )}

                            {props.visible && Unit !== "NoUnit" && <span style={{ fontSize: unitFontWidth, position: 'relative', bottom: unitBottom, display: 'inline-block', paddingLeft: '15px', transform: 'scaleY(3)' }}>{Unit}</span>}
                        </div>
                    </div>

                </div>}
                <ThemeProvider theme={theme}>
                    {props.visible && <LinearProgress color="primary" variant="determinate" value={ValueCal > 0 ? (100 / (Max / ValueCal)) : 0} style={{ height: `25px`, width: '100%', marginBottom: '5px' }} />}
                </ThemeProvider>

            </div>

        )
    }

    return (
        <div className={classes.root}>
            {_digits(Number.parseFloat(Value).toFixed(precision))}
        </div>
    );
}