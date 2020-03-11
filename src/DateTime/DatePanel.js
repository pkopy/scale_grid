import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {
    Calendar, useStaticState
} from '@material-ui/pickers';


import checkIcon from "../img/Check_green.svg";
import cancelIcon from "../img/cancel-button.png";
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles(theme => ({
    time:{
        width:50,
        height:50,
        border:'1px solid rgb(0,0,0,0.2)',
        borderRadius:'5px',
        margin:10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:'2em'

    },
    arrows: {
        margin:5
    },
    colon: {
        top: 65,
        position: 'relative',
        fontSize: '2em',
        height: 10
    }

}));

export default function DatePanel(props) {
    const [value, handleDateChange] = useState(new Date());
    const [date, setDate] = useState('');
    const [time, setTime] = useState({
        year:0,
        month:0,
        day:0,
        hours:'00',
        minutes:'00',
        seconds:'00'

    });
    const [showTime, setShowTime] = useState(false)
    // const [minutes, setMinutes] = useState('')
    const classes = useStyles();
    const buttonTap = (param) => {
        if (props.socketTap && props.socketTap.readyState === 1) {
            const data = Date.parse(`${time.year} ${time.month} ${time.day} ${time.hours}:${time.minutes}:${time.seconds}`)
            const newDate = data/1000;
            props.socketTap.send(JSON.stringify({COMMAND: 'SET_PARAM', DATA: newDate, PARAM: param, "KEY": props.datePanel.RECORD.GUID}))
        }
    };
    useEffect(() => {

        const date = props.datePanel.RECORD ? new Date(props.datePanel.RECORD.Value * 1000):new Date(value)

        if (props.datePanel.PARAM === 'SHOW_TIME') {
            setShowTime(true);
            setDate(addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds()))
            setTime({...time, year:date.getFullYear(), month:date.getMonth()+1, day: date.getDate(), hours: addZero(date.getHours()), minutes: addZero(date.getMinutes()), seconds: addZero(date.getSeconds()) });
        } else {
            // }
            setDate(date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate()))
            setTime({...time, year:date.getFullYear(), month:date.getMonth()+1, day: date.getDate(), hours: addZero(date.getHours()), minutes: addZero(date.getMinutes()), seconds: addZero(date.getSeconds()) });
            setShowTime(false);
        }
    }, [props.datePanel]);

    useEffect(() => {

    },[value]);
    const test =(e) => {
        handleDateChange(e);
        const date = e;
        setDate(date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate()))
    };
    const addZero = (number) => {

        return number < 10 ? `0${number}` : number

    };

    const changeTime = (increase, maxNumber, element) => {
        let newValue = time[element];
        if (increase) {
            newValue++;
            const x = newValue > maxNumber ? addZero(0) : addZero(newValue);
            setTime({...time, [element]:x});
        } else {
            newValue--;
            const x = newValue < 0 ? addZero(maxNumber) : addZero(newValue);
            setTime({...time, [element]:x})
        }
    }
    // you can past mostly all available props, like minDate, maxDate, autoOk and so on
    const {pickerProps, wrapperProps} = useStaticState({
        value,
        onChange: test,
    });
    return (
        <div style={{
            width: 1024,
            background: '#80808070',
            position: 'absolute',
            top: 0,
            zIndex: 100,
            height: 610
        }}>


            <div style={{

                width: 300,
                background: '#fff',
                marginLeft: 'auto',
                marginRight: 'auto',
                top: 100,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '7px',
                boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)'
            }}>
                <div style={{
                    height: 50,
                    background: "#3f51b5",
                    color: '#fff',
                    borderRadius: '7px 7px 0 0',
                    fontSize: '2em',

                }}>
                    <div style={{
                        transform: 'translate(0, 20%)'
                    }}>

                        {date}
                    </div>
                </div>

                {!showTime&&<Calendar {...pickerProps}/>}


                {showTime&&<div style={{
                    display: "flex",
                    justifyContent: "center",
                    margin:5
                }}>
                    <div>

                        <IconButton onMouseDown={() => changeTime(true, 23, 'hours')}>
                            <ArrowDropUpIcon/>
                        </IconButton>
                        <div className={classes.time}>
                            <div>{time.hours}</div>
                        </div>
                        <IconButton onMouseDown={() => changeTime(false, 23, 'hours')}>
                            <ArrowDropDownIcon/>
                        </IconButton>
                    </div>
                   <div className={classes.colon}>:</div>
                    <div>

                        <IconButton onMouseDown={() => changeTime(true, 59, 'minutes')}>
                            <ArrowDropUpIcon/>
                        </IconButton>
                        <div className={classes.time}>
                            <div>{time.minutes}</div>
                        </div>
                        <IconButton onMouseDown={() => changeTime(false, 59, 'minutes')}>
                            <ArrowDropDownIcon/>
                        </IconButton>
                    </div>
                    <div className={classes.colon}>:</div>
                    <div>

                        <IconButton onMouseDown={() => changeTime(true, 59, 'seconds')}>
                            <ArrowDropUpIcon/>
                        </IconButton>
                        <div className={classes.time}>
                            <div>{time.seconds}</div>
                        </div>
                        <IconButton onMouseDown={() => changeTime(false, 59, 'seconds')}>
                            <ArrowDropDownIcon/>
                        </IconButton>
                    </div>
                </div>}
                <div style={{
                    height: 50,
                    // background: "#3f51b5",
                    display: "flex",
                    color: '#fff',
                    borderRadius: '0 0 7px 7px',
                    fontSize: '2em',
                    justifyContent: "center"
                }}>
                    <div style={{
                        width:60,
                        height:40,
                        borderRadius: 5,
                        marginRight:10
                        // boxSizing: 'border-box',
                        // padding: 5,
                    }}>


                        <div className={'okCancelButton'}
                             onMouseDown={(e) => {
                                 // e.stopPropagation()

                                 e.target.classList.add('okCancelButtonActive');
                                 e.target.parentNode.classList.add('okCancelButtonActive');
                                 setTimeout(() => {

                                     // buttonTap('OK')
                                 }, 200)
                                 // e.target.classList.remove('okCancelButtonActive')
                             }}
                             onMouseUp={(e) => {
                                 e.target.classList.remove('okCancelButtonActive');
                                 e.target.parentNode.classList.remove('okCancelButtonActive');
                                 buttonTap("OK");
                             }}
                        >
                            <img src={checkIcon} width={25} alt={'ok-button'}/>
                        </div>
                    </div>
                    <div style={{
                        width:60,
                        height:40,
                        borderRadius: 5,
                        // boxSizing: 'border-box',
                        // padding: 5,
                    }}>


                        <div className={'okCancelButton'}
                             onMouseDown={(e) => {
                                 e.target.classList.add('okCancelButtonActive');
                                 e.target.parentNode.classList.add('okCancelButtonActive');
                                 // buttonTap('CANCEL')
                             }}
                             onMouseUp={(e) => {
                                 e.target.classList.remove('okCancelButtonActive');
                                 e.target.parentNode.classList.remove('okCancelButtonActive');
                                 buttonTap('CANCEL')
                             }}
                        >
                            <img src={cancelIcon} width={25} alt={"cancel-button"}/>
                        </div>
                    </div>

                </div>

            </div>

            {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
            {/*    <DatePicker*/}
            {/*        format="dd/MM/yyyy"*/}
            {/*        value={selectedDate}*/}
            {/*        onChange={handleDateChange}*/}
            {/*    />*/}
            {/*    </MuiPickersUtilsProvider >*/}
        </div>
    )
}
