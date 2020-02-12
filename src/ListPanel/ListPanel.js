import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import loader from '../img/search.gif';
import checkGreen from '../img/Check_green.svg';
import checkGray from '../img/Check_gray.svg'
import ForwardIcon from '@material-ui/icons/Forward';
import {IconButton} from '@material-ui/core';
import helpers from "../Helpers/helpers";

const useStyles = makeStyles(theme => ({
    listPanel: {
        width: 1024,
        height: 530,
        border: '1px solid rgb(0,0,0,0.2)',
        position: 'absolute',
        zIndex: 100,
        backgroundColor: '#f0f8ff', //bf
        transition: '1s',
        // left:-1100
        overflowY: 'hidden',
        overflowX: 'hidden'
    }
}));
//TODO hide and show a scrollBar arrows
export default function ListPanel(props) {
    const [left, setLeft] = React.useState(-1100);
    const [visibleScroll, setVisibleScroll] = React.useState(false);
    const [scrollTop, setScrollTop] = useState(0)
    // console.log(props)
    // if (props.hamburger) {
    //     setLeft(0)
    // } else {
    //     setLeft(-1100)
    // }
    const refMenu = React.useRef();
    // const refContainer = React.useRef()
    React.useEffect(() => {
        props.hamburger ? setLeft(0) : setLeft(-1100);
        // console.log('xxxxx', props)
        if (refMenu) refMenu.current.scrollTop = 0

    }, [props.hamburger]);
    useEffect(() => {
        if (refMenu.current.scrollHeight > refMenu.current.clientHeight) {
            setVisibleScroll(true)
        }
        // console.log(refMenu);
    });
    React.useEffect(() => {
        setScrollTop(0)
        setVisibleScroll(false);
        if ((props.menuButtons.length > 15 && props.menu.isBig) ||(props.menuButtons.length > 12 && !props.menu.isBig)) setVisibleScroll(true)

    }, [props.menuButtons]);

    useEffect(() => {
        // console.log(scrollTop)
    }, [scrollTop])

    const classes = useStyles();


    return (
        <div>

            <div className={classes.listPanel}
                 style={{left: left, display: 'flex'}}>
                <div id='container' ref={refMenu}
                     style={{
                         width: '90%',
                         display: 'grid',
                         gridTemplateColumns: props.menu.isBig ? 'auto auto auto auto auto' : '50% 50%',
                         gridAutoRows: 'min-content',
                         // flexWrap: 'wrap',
                         // justifyContent: 'center',
                         marginLeft: 80,
                         overflowY: 'hidden',
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
                                 console.log('TAPPPPPP')
                                 // e.stopPropagation();
                                 props.tapParam(elem.GUID)
                             }}>
                            {/*<img src={loader} width='25px' alt={'menu img'}/>*/}
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
                            <div style={{top:-10, position:"relative"}}>{elem.Name}</div>

                        </div>
                    )}

                    {/*<div style={{*/}
                    {/*    width: 1024,*/}
                    {/*    position: 'absolute',*/}
                    {/*    zIndex: 100,*/}
                    {/*    padding: 20,*/}
                    {/*    display: 'flex',*/}
                    {/*    flexWrap: 'wrap',*/}
                    {/*    overflowY: 'hidden',*/}
                    {/*    overflowX: 'hidden',*/}
                    {/*    marginLeft: '20px',*/}
                    {/*    left:0*/}
                    {/*}}>*/}
                    {!props.menu.isBig && props.menuButtons && props.menuButtons.map((elem, i) =>
                        <div key={i} style={{
                            background: '#fff',
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
                                 console.log('TAPPPPPP')
                                 e.stopPropagation();
                                 props.tapParam(elem.GUID);

                                 {/*<img src={loader} width='25px' alt={'menu img'}/>*/
                                 }

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
                    {/*</div>*/}
                </div>
                <div style={{width: 80}}>
                    {visibleScroll && <IconButton
                        disabled={scrollTop === 0}
                        onClick={(e) => {
                            // console.log(ref);

                            helpers.scroll(refMenu.current, 500,true)
                            // setScrollTop('')
                            setTimeout(() => {
                                // console.log(refMenu.current.scrollTop)
                                setScrollTop(refMenu.current.scrollTop)
                            }, 50);


                            if (refMenu.current.scrollTop === 0) setScrollTop(0)

                        }}>
                        <ForwardIcon style={{fontSize: '2.5em', transform: 'rotate(-90deg)'}}/>
                    </IconButton>}
                    {visibleScroll && <IconButton
                        onClick={() => {
                            helpers.scroll(refMenu.current, 500)
                            // setScrollTop('')
                            setTimeout(() => {
                                // console.log(refMenu.current.scrollTop)
                                setScrollTop(refMenu.current.scrollTop)
                            }, 50);
                    }}
                        disabled={scrollTop + refMenu.current.clientHeight >= refMenu.current.scrollHeight }

                    >
                        <ForwardIcon style={{fontSize: '2.5em', transform: 'rotate(90deg)'}}/>
                    </IconButton>}
                </div>
            </div>
        </div>
    )
}