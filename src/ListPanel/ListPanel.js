import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import loader from '../img/search.gif';
import checkGreen from '../img/Check_green.svg';
import checkGray from '../img/Check_gray.svg'
import ForwardIcon from '@material-ui/icons/Forward';
import {IconButton} from '@material-ui/core';
import helpers from "../Helpers/helpers";
import Parser from 'html-react-parser';
import './ListPanel.scss'

const useStyles = makeStyles(theme => ({
    listPanel1: {
        width: 1024,
        height: 530,
        border: '1px solid rgb(0,0,0,0.2)',
        position: 'relative',
        zIndex: 100,
        backgroundColor: '#f0f8ff',
        // transition: '0.5s',
        overflowY: 'hidden',
        overflowX: 'hidden'
    },
    listPanel: {
        width: window.innerWidth < 800 ? 650 : 1024,
        height: window.innerWidth < 800 ? 400 : 530,
        border: '1px solid rgb(0,0,0,0.2)',
        position: 'relative',
        zIndex: 100,
        backgroundColor: '#f0f8ff',
        // transition: '0.5s',
        overflowY: 'hidden',
        overflowX: 'hidden'
    },
    xxx: {

        position: 'absolute',
        width: 30,

    }
}));
export default function ListPanel(props) {
    const [left, setLeft] = useState(-1100);
    const [visibleScroll, setVisibleScroll] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const refMenu = React.useRef();

    useEffect(() => {
        props.hamburger ? setLeft(0) : setLeft(-1100);
        if (refMenu) refMenu.current.scrollTop = 0
    }, [props.hamburger]);

    useEffect(() => {
        if (refMenu.current.scrollHeight > refMenu.current.clientHeight) {
            setVisibleScroll(true)
        }
    });
    React.useEffect(() => {
        setScrollTop(0);
        setVisibleScroll(false);
        if ((props.menuButtons.length > 15 && props.menu.ItemSize === 'Big') || (props.menuButtons.length > 12 && props.menu.ItemSize === 'Small')) setVisibleScroll(true)

    }, [props.menuButtons]);

    const classes = useStyles();
    const changeBorder = (elem) => {
        const arr = [];
        // console.log(elem)
        for (let el of props.menuButtons) {
            // console.log(el)
            if (elem.GUID === el.GUID) {
                el.borderColor = 2;
                arr.push(el)
                // break
            } else {
                el.borderColor = 0;
                arr.push(el)
            }
        }

        props.setMenuButtons(arr)
    };

    return (
        <div>

            <div className={classes.listPanel}
                 style={{left: left, display: 'flex'}}>
                <div id='container' ref={refMenu}
                     style={{
                         width: '92%',
                         display: 'grid',
                         gridTemplateColumns: props.menu.ItemSize === 'Big' ? 'auto auto auto auto auto' : '50% 50%',
                         gridAutoRows: 'min-content',
                         marginLeft: 75,
                         overflowY: 'hidden',
                         overflowX: 'hidden'
                     }}>


                    {props.menu.ItemSize === 'Big' && props.menuButtons && props.menuButtons.map((elem, i) => {
                            if (!elem.borderColor) elem.borderColor = 0;
                            return (
                                <div key={i} style={{
                                    background: '#fff',
                                    margin: 5,
                                    padding: 5,
                                    width: window.innerWidth < 800 ? 80 : 153,
                                    height: window.innerWidth < 800 ? 80 : 153,
                                    border: `1px solid rgb(0,0,0,0.2)`,
                                    boxShadow: `inset 0 0 0 ${elem.borderColor}px`
                                }} onClick={(e) => e.stopPropagation()}
                                     onMouseDown={(e) => {
                                         props.tapParam(elem.GUID, props.menu.GUID)
                                         if (props.nextClick) {

                                             changeBorder(elem)
                                         }
                                     }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        height: window.innerWidth < 800 ? 50 : 120
                                    }}>

                                        <div>
                                            {!elem.img &&
                                            <img className={classes.imgs} width={30} src={loader} alt={'loader'}/>}
                                            {elem.img &&
                                            <img className={classes.imgs} width={window.innerWidth < 800 ? 50 : 100}
                                                 style={{pointerEvents: 'none'}} src={`data:image/png;base64, ${elem.img}`}
                                                 alt={'img'}/>}
                                        </div>

                                    </div>
                                    <div style={{top: window.innerWidth < 800 ? 0 : -10, position: "relative", fontSize:window.innerWidth < 800 ? '10px' : undefined}}>{elem.Name}</div>

                                </div>
                            )
                        }
                    )}

                    {props.menu.ItemSize === 'Small' && props.menuButtons && props.menuButtons.map((elem, i) => {
                            if (!elem.borderColor) elem.borderColor = 0;
                            return (
                                <div key={i} style={{
                                    background: elem.isSelected ? '#cce7ff' : '#fff',
                                    display: 'flex',
                                    margin: 5,
                                    padding: 5,
                                    height: window.innerWidth < 800 ? 45 : 66,
                                    fontSize: window.innerWidth < 800 ? '10px' : undefined,
                                    border: `1px solid rgb(0,0,0,0.2)`,
                                    boxShadow: `inset 0 0 0 ${elem.borderColor}px`
                                }}
                                    // onClick={(e) => e.stopPropagation()}
                                     onMouseDown={(e) => {
                                         e.stopPropagation();
                                         props.tapParam(elem.GUID, props.menu.GUID);
                                         if (props.nextClick) {

                                             changeBorder(elem)
                                         }
                                     }}>
                                    <div style={{textAlign: 'left'}}>
                                        {!elem.img && <img width={30} src={loader} alt={'loader'}/>}
                                        {elem.img && <img width={window.innerWidth < 800 ? 30 : 57} style={{
                                            pointerEvents: 'none',
                                        }} src={`data:image/png;base64, ${elem.img}`} alt={'img'}/>}
                                    </div>
                                    <div style={{width: '100%', display: 'flex'}}>
                                        <div style={{width: '50%', textAlign: 'left', paddingLeft: 10}}>
                                            <p>{elem.Name}</p>

                                        </div>
                                        <div style={{width: '50%', textAlign: 'right', paddingRight: 10}}>

                                            {elem.Type === 'EditEnumSwitch' ? <div>
                                                {elem.Value === "True" ? <img src={checkGreen} alt={'check icon'} width={40}
                                                                              style={{paddingTop: 10}}/> :
                                                    <img src={checkGray} alt={'check icon'} width={40}
                                                         style={{paddingTop: 10}}/>}
                                            </div> : <p>{elem.Value}</p>}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )}

                </div>
                <div style={{width: 78}}>
                    {visibleScroll && <IconButton
                        disabled={scrollTop === 0}
                        onClick={(e) => {
                            helpers.scroll(refMenu.current, 500, true);
                            setTimeout(() => {
                                setScrollTop(refMenu.current.scrollTop);
                            }, 50);
                            if (refMenu.current.scrollTop === 0) setScrollTop(0);

                        }}>
                        <ForwardIcon style={{fontSize: '2.5em', transform: 'rotate(-90deg)'}}/>
                    </IconButton>}
                    <div style={{position: "relative", left: 2}}>
                        {props.menu.ItemSize === 'Small' && props.menu.Buttons && props.menu.Buttons.map((elem, i) => {

                                const indexOfFirst = (elem.ImageSVG).indexOf('<svg');
                                const indexLast = (elem.ImageSVG).indexOf('svg>');


                                const imag = elem.ImageSVG.slice(indexOfFirst + 4, indexLast + 4);
                                const newImag = '<svg class="xxx" ' + imag;
                                return (

                                    <IconButton style={{width: 60, height: 60}} key={i}
                                                onMouseDown={() => {
                                                    props.pushButton(elem.PARAM, props.menu.GUID)
                                                }}
                                    >
                                        {Parser(newImag)}
                                    </IconButton>
                                )
                            }
                        )}

                    </div>
                    {visibleScroll && <IconButton
                        onClick={() => {
                            helpers.scroll(refMenu.current, 500);
                            setTimeout(() => {
                                setScrollTop(refMenu.current.scrollTop)
                            }, 50);
                        }}
                        disabled={scrollTop + refMenu.current.clientHeight >= refMenu.current.scrollHeight}

                    >
                        <ForwardIcon style={{fontSize: '2.5em', transform: 'rotate(90deg)'}}/>
                    </IconButton>}
                </div>
            </div>
        </div>
    )
}