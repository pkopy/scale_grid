import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import stableIcon from '../img/stable_black.svg';
import zeroIcon from '../img/zero.svg'
import taraIcon from '../img/tara_black.svg'
import one from '../img/one2.svg'
import zero2 from '../img/zero2.svg'
import three from '../img/three2.svg'
import seven from '../img/seven2.svg'
import two from '../img/two2.svg'
import four from '../img/four2.svg'
import five from '../img/five2.svg'
import six from '../img/six2.svg'
import eight from '../img/eight2.svg'
import nine from '../img/nine2.svg'
import minus from '../img/minus1.svg'
import dot from '../img/dot1.svg'
import TextContainer from "../TextPanel/TextContainer";


const theme = createMuiTheme({
    palette: {
        primary: {main: "#000"},
    },
});

const useStyles = makeStyles({
    root: {
        width: '98%',
        height: '100%',
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        flexDirection: 'column'
    },
    value: {
        flexGrow: 8,
        position: 'absolute',
        // fontSize: '65%',
        // right:20,
        // bottom:40,
        color: '#000',
        textAlign: 'right',
    },
    imgContainer: {
        display: 'flex',
        marginBottom: theme.spacing(1),
        height: 70

    },
    icons: {
        paddingTop: 4,
        pointerEvents: 'none'
    }
});

export default function LinearDeterminate(props) {
    const classes = useStyles();

    const [completed, setCompleted] = useState(0);
    const [Max, setMax] = useState(0);
    const [Value, setValue] = useState();
    const [ValueCal, setValueCal] = useState(0);
    const [Unit, setUnit] = useState('');
    const [isStab, setIsStab] = useState();
    const [isTare, setIsTare] = useState();
    const [isZero, setIsZero] = useState();
    const [precision, setPrecision] = useState();
    const [platform, setPlatform] = useState(0);
    const [platfomsArray, setPlatformsArray] = useState([]);

    useEffect(() => {

        function sendToSocket() {
            if (props.socketMass.readyState === 1) {
                props.socketMass.send(JSON.stringify({COMMAND: 'GET_MOD_INFO'}));
                props.socketMass.onmessage = (e) => {
                    let data = e.data;
                    const response = JSON.parse(data);
                    // console.log(response)
                    let Mass = [];
                    // console.log(equalsArray(oldLabels,labels))
                    if (response.RECORD) {
                        Mass = response.RECORD.Mass;
                        setPlatformsArray(Mass);
                        TextContainer.setTextLabels(response.RECORD.var_labels);
                        TextContainer.setDate(response.RECORD.Date);
                        TextContainer.setOperator(response.RECORD.Operator);
                        // console.log(TextContainer)
                    }

                    if (Mass.length > 0 && Mass[platform].NetAct && Mass[platform].NetCal) {
                        props.setLicense(true);
                        setMax(Mass[platform].Max * 1);
                        setValue(Mass[platform].NetAct.Value);
                        // setValue('-8,88888');
                        setUnit(Mass[platform].NetAct.Unit);
                        setValueCal(Mass[platform].NetCal.Value);
                        setIsStab(Mass[platform].isStab);
                        setIsTare(Mass[platform].isTare);
                        setIsZero(Mass[platform].isZero);
                        setPrecision(Mass[platform].NetAct.Precision);
                    } else if (response.STS_DETAILS === 'The license for this module has not been activated') {
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
            // props.setTextLabels(labels)
        }

        const timer = setInterval(sendToSocket, 250);
        return () => {
            clearInterval(timer);
        };

    }, [platform]);

    // const equalsArray = (arr1, arr2) => {
    //     // console.log(arr1, arr2)
    //     if (arr1.length !== arr2.length) return false
    //     for (let i = 0; i < arr1.length; i++) {
    //         if (arr1[i] !== arr2[i]) return false
    //     }
    //     return true
    // }
    // useEffect(() => {
    //
    //     setInterval(() =>{
    //         props.setTextLabels(labels)
    //     }, 1000)
    // },[labels])
    // useEffect(() => {
    //     if (props.socketMass.readyState === 1) {
    //         props.socketMass.send(JSON.stringify({COMMAND: 'GET_MOD_INFO'}));
    //         props.socketMass.onmessage = (e) => {
    //             let data = e.data;
    //             const response = JSON.parse(data);
    //             console.log(response)
    //
    //
    //             if (response.RECORD) {
    //
    //
    //
    //             }
    //         }
    //     }
    // },[])

    const choosePlatform = () => {
        let length = platfomsArray.length;
        let newPlatform = platform;
        newPlatform++;
        if (newPlatform < length) {
            setPlatform(newPlatform)
        } else {
            setPlatform(0)
        }

    };

    useEffect(() => {

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
        let result = [];
        for (let digit of digits) {
            switch (digit) {
                case '0':
                    result.push(zero2);
                    break;
                case '1':
                    result.push(one);
                    break;
                case '2':
                    result.push(two);
                    break;
                case '3':
                    result.push(three);
                    break;
                case '4':
                    result.push(four);
                    break;
                case '5':
                    result.push(five);
                    break;
                case '6':
                    result.push(six);
                    break;
                case '7':
                    result.push(seven);
                    break;
                case '8':
                    result.push(eight);
                    break;
                case '9':
                    result.push(nine);
                    break;
                case '-':
                    result.push(minus);
                    break;
                case '.':
                    result.push(dot);
                    break;
                default:
                    result.push(minus);
                    break;
            }
        }

        let digitWidth;
        let unitFontWidth;
        let unitBottom;
        let imgWidth;
        let rightPos;
        let bottomPos;
        let progressHeight;
        let platformDimension;
        let platformStyle = {};
        if (props.screen.width > 800) {
            if (props.width === 6) {
                digitWidth = 90;
                unitFontWidth = 90;
                unitBottom = -120;
                imgWidth = 120;
                rightPos = 20;
                bottomPos = 150;
                progressHeight = 60;
                platformDimension = 80;
                platformStyle.top = -7;
                platformStyle.left = 18;
                platformStyle.fontSize = '2em'
            } else if (props.width === 4) {
                digitWidth = 60;
                unitFontWidth = 50;
                unitBottom = -100;
                imgWidth = 80;
                rightPos = 20;
                bottomPos = 100;
                progressHeight = 40;
                platformDimension = 50;
                platformStyle.top = -8;
                platformStyle.left = 9;
                platformStyle.fontSize = '1.4em'
            } else {
                digitWidth = 40;
                unitFontWidth = 30;
                unitBottom = -70;
                imgWidth = 60;
                rightPos = 20;
                bottomPos = 40;
                progressHeight = 25;
                platformDimension = 40;
                platformStyle.top = -3;
                platformStyle.left = 9;
                platformStyle.fontSize = '1em'
            }

        } else {
            if (props.width === 6) {
                digitWidth = 55;
                unitFontWidth = 75;
                unitBottom = 65;
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
            <div style={{width: '100%', height: '100%'}}>
                {props.visible &&<div onClick={choosePlatform} style={{
                    width: platformDimension,
                    height: platformDimension,
                    background: '#19327d',
                    position: 'absolute',
                    borderRadius:5,
                    right: 5,
                    top: 5,
                    color: '#fff',
                    fontSize: '2.5em',
                    textAlign: 'center'
                }}>
                    <div
                    style={{
                        position:"absolute",
                        top: platformStyle.top,
                        left: platformStyle.left,
                        fontSize:platformStyle.fontSize
                    }}
                    >{platform}</div>
                </div>}
                {props.visible && <div style={{display: 'flex', width: '100%'}}>

                    <div style={{width: 50, display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                        <div className={classes.icons}>{isStab &&
                        <img src={stableIcon} width={`${imgWidth}%`} alt='stab'/>}</div>
                        <div className={classes.icons}>{isZero &&
                        <img src={zeroIcon} width={`${imgWidth}%`} alt='zero'/>}</div>
                        <div className={classes.icons}>{isTare &&
                        <img src={taraIcon} width={`${imgWidth}%`} alt='tare'/>}</div>
                    </div>


                </div>}
                {props.visible &&<div className={classes.value} style={{right: rightPos, bottom: bottomPos}}>


                    <div style={{display: "flex"}}>
                        {props.visible && result.map((elem, i) =>
                            <div key={i}><img src={elem} style={{width: digitWidth, pointerEvents: 'none', margin: 1}}
                                              alt='digit'/></div>
                        )}

                        {/*{!props.visible && Unit !== "NoUnit" && <span style={{ fontSize: unitFontWidth, position: 'relative', bottom: unitBottom, display: 'inline-block', paddingLeft: '15px', transform: 'scaleY(3)' }}>{Unit}</span>}*/}
                        {<div style={{
                            fontSize: unitFontWidth,
                            position: 'relative',
                            bottom: unitBottom,
                            paddingLeft: '15px'
                        }}>g</div>}
                    </div>
                </div>}
                {props.visible &&<ThemeProvider theme={theme}>
                    {props.visible && <LinearProgress color="primary" variant="determinate"
                                                      value={ValueCal > 0 ? (100 / (Max / ValueCal)) : 0} style={{
                        height: progressHeight,
                        width: '98%',
                        marginBottom: '5px',
                        position: "absolute",
                        bottom: 5
                    }}/>}
                </ThemeProvider>}

            </div>

        )
    }

    return (
        <div className={classes.root}>
            {_digits(Number.parseFloat(Value).toFixed(precision))}
        </div>
    );
}