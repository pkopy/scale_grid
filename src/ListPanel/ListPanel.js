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
    listPanel: {
        width: 1024,
        height: 530,
        border: '1px solid rgb(0,0,0,0.2)',
        position: 'relative',
        zIndex: 100,
        backgroundColor: '#f0f8ff', //bf
        transition: '0.5s',
        // left:-1100
        overflowY: 'hidden',
        overflowX: 'hidden'
    },
    xxx:{

            position: 'absolute',
            width: 30,

    }
}));
//TODO hide and show a scrollBar arrows
export default function ListPanel(props) {
    const [left, setLeft] = useState(-1100);
    const [visibleScroll, setVisibleScroll] = useState(false);
    const [scrollTop, setScrollTop] = useState(0)
    // console.log(props)
    // if (props.hamburger) {
    //     setLeft(0)
    // } else {
    //     setLeft(-1100)
    // }
    const refMenu = React.useRef();
    const butt = React.useRef();
    // const refContainer = React.useRef()
    // useEffect(() => {
    //     (window.innerWidth < 1040) ? setLeft(0):setLeft(-1100)
    // }, [])
    useEffect(() => {
        // if (window.innerWidth < 1040) {
        //     // setLeft(0);
        //     setTransition('0')
        //     props.hamburger ? props.setOpenListPanel(true):props.setOpenListPanel(false)
        // } else {

            props.hamburger ? setLeft(0) : setLeft(-1100);
            if (refMenu) refMenu.current.scrollTop = 0
        // }


    }, [props.hamburger]);

    useEffect(() => {
        if (refMenu.current.scrollHeight > refMenu.current.clientHeight) {
            setVisibleScroll(true)
        }
    });
    React.useEffect(() => {
        setScrollTop(0)
        setVisibleScroll(false);
        if ((props.menuButtons.length > 15 && props.menu.isBig) || (props.menuButtons.length > 12 && !props.menu.isBig)) setVisibleScroll(true)

    }, [props.menuButtons]);

    const classes = useStyles();


    return (
        <div>

            <div className={classes.listPanel}
                 style={{left: left, display: 'flex'}}>
                <div id='container' ref={refMenu}
                     style={{
                         width: '92%',
                         display: 'grid',
                         gridTemplateColumns: props.menu.isBig ? 'auto auto auto auto auto' : '50% 50%',
                         gridAutoRows: 'min-content',
                         // flexWrap: 'wrap',
                         // justifyContent: 'center',
                         marginLeft: 75,
                         overflowY: 'hidden',
                         overflowX: 'hidden'
                     }}>


                    {props.menu.isBig && props.menuButtons && props.menuButtons.map((elem, i) =>
                        <div key={i} style={{
                            background: '#fff',
                            margin: 5,
                            padding: 5,
                            width: 153,
                            height: 153,
                            border: '1px solid rgb(0,0,0,0.2)'
                        }} onClick={(e) => e.stopPropagation()}
                             onMouseDown={(e) => {
                                 props.tapParam(elem.GUID, props.menu.GUID)
                             }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                height: 120
                            }}>

                                <div>
                                    {!elem.img &&
                                    <img className={classes.imgs} width={30} src={loader} alt={'loader'}/>}
                                    {elem.img &&
                                    <img className={classes.imgs} width={window.innerWidth < 800 ? 25 : 100}
                                         style={{pointerEvents: 'none'}} src={`data:image/png;base64, ${elem.img}`}
                                         alt={'img'}/>}
                                </div>

                            </div>
                            <div style={{top: -10, position: "relative"}}>{elem.Name}</div>

                        </div>
                    )}

                    {!props.menu.isBig && props.menuButtons && props.menuButtons.map((elem, i) =>
                        <div key={i} style={{
                            background: elem.isSelected ? '#cce7ff' : '#fff',
                            // position: 'relative',
                            display: 'flex',
                            margin: 5,
                            padding: 5,
                            // width: '46%',
                            height: 66,
                            border: '1px solid rgb(0,0,0,0.2)'
                        }}
                             onClick={(e) => e.stopPropagation()}
                             onMouseDown={(e) => {
                                 e.stopPropagation();
                                 console.log(elem)
                                 props.tapParam(elem.GUID, props.menu.GUID);
                             }}>
                            <div style={{textAlign: 'left'}}>
                                {!elem.img && <img width={30} src={loader} alt={'loader'}/>}
                                {elem.img && <img width={window.innerWidth < 800 ? 25 : 57} style={{
                                    pointerEvents: 'none',
                                    // position: 'absolute',
                                    // left: 0,
                                    // paddingLeft: 15
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
                    )}

                </div>
                <div style={{width: 80}}>
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
                    <div style={{position:"relative", left:2}}>
                        {!props.menu.isBig && props.menu.Buttons && props.menu.Buttons.map((elem, i) => {

                                const indexOfFirst = (elem.ImageSVG).indexOf('<svg')
                                const indexLast = (elem.ImageSVG).indexOf('svg>');


                                const imag = elem.ImageSVG.slice(indexOfFirst + 4, indexLast +4)
                                const newImag = '<svg class="xxx" ' + imag;
                                // console.log(imag)
                                return (

                                    <IconButton style={{width:60, height:60}} key={i}
                                        onMouseDown={()=>{console.log(elem.PARAM);props.pushButton(elem.PARAM, props.menu.GUID)}}
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