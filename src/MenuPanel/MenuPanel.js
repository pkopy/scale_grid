import React, {useState, useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import load from "../img/search.gif";
import checkGreen from "../img/Check_green.svg";
import checkGray from "../img/Check_gray.svg";
import {IconButton} from "@material-ui/core";
import ForwardIcon from "@material-ui/icons/Forward";
import helpers from "../Helpers/helpers";

const useStyles = makeStyles(theme => ({
    menuPanel: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        color: '#fff',
        // overflowY: 'auto'
    },
    menuHeader: {
        top: 0,
        height: 35,
        width: '100%',
        backgroundColor: '#3f51b5',
        boxShadow: '0 3px 5px 0 #cecece',

    },
    arrows: {
        padding: 0
    }

}));

export default function MenuPanel(props) {
    const classes = useStyles();
    const ref = useRef();
    const [visibleArrows, setVisibleArrows] = useState(false);
    const [scrollTop, setScrollTop] = useState(0)

    useEffect(() => {
        if (ref.current.scrollHeight > ref.current.clientHeight) {
            setVisibleArrows(true);
        }
    });
    const changeBorder = (elem) => {
        const arr = []
        // console.log(elem)
        for (let el of props.menuButtonsCatalogLocal) {
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

        props.setMenuButtonsCatalogLocal(arr)
    }

    return (

        <div className={classes.menuPanel}>
            <div className={classes.menuHeader}>
                <div style={{
                    transform: 'translate(0, 50%)'
                }}><b>{props.menuCatalogLocal.Name}</b></div>
            </div>
            <div style={{display: "flex", overflowY: "auto", height: '100%'}}>
                <div
                    style={{
                        overflowY: "auto",
                        width: '100%',
                        height: '100%'
                    }}>
                    <div
                        ref={ref}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "auto",
                            gridAutoRows: "min-content",
                            overflowY: "hidden",
                            height: '100%',
                            // width: '80%'
                        }}>
                        {props.menuButtonsCatalogLocal && props.menuButtonsCatalogLocal.map((elem, i) => {
                            if (!elem.borderColor) elem.borderColor = 0;
                            return (
                                    <div
                                        key={i}
                                        style={{
                                            background: elem.isSelected?'#f0f8ff':'#fff',
                                            // position: 'relative',
                                            boxShadow: `inset 0 0 0 ${elem.borderColor}px #000`,
                                            display: 'flex',
                                            margin: 5,
                                            padding: 5,
                                            // width: '46%',
                                            height: 30,
                                            border: '1px solid rgb(0,0,0,0.2)'
                                        }}
                                        onMouseDown={(e) => {
                                            e.stopPropagation();
                                            props.tapParam(elem.GUID, props.menuCatalogLocal.GUID);
                                            changeBorder(elem)
                                        }}
                                    >
                                        <div>
                                            {!elem.img && <img width={30} src={load} alt={'loader'}/>}
                                            {elem.img && <img width='30px' style={{
                                                pointerEvents: 'none',
                                                // position: 'absolute',
                                                // left: 0,
                                                // paddingLeft: 15
                                            }} src={`data:image/png;base64, ${elem.img}`} alt={'img'}/>}
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            width: '100%',
                                            alignItems: "stretch",
                                            textAlign: 'left'
                                        }}>
                                            <div
                                                style={{
                                                    color: '#000',
                                                    position: "relative",
                                                    top: 5,
                                                    marginLeft: 10,
                                                    fontSize: 12,
                                                    flexGrow: 1
                                                }}>
                                                {elem.Name}
                                            </div>
                                            <div style={{width: '50%', textAlign: 'right', marginRight: 20, flexGrow: 2}}>

                                                {elem.Type === 'EditEnumSwitch' ? <div>
                                                    {elem.Value === "True" ?
                                                        <img src={checkGreen} alt={'check icon'} width={20}
                                                             style={{paddingTop: 10}}/> :
                                                        <img src={checkGray} alt={'check icon'} width={20}
                                                             style={{paddingTop: 10}}/>}
                                                </div> : <div style={{
                                                    color: '#000',
                                                    fontSize: 12,
                                                    top: 5,
                                                    position: "relative"
                                                }}>{elem.Value}</div>}
                                            </div>
                                        </div>
                                    </div>)
                            }
                        )}
                    </div>
                </div>
                {visibleArrows && <div style={{width: '20%'}}>
                    <IconButton className={classes.arrows}
                                disabled={!scrollTop}
                                onClick={(e) => {
                                    setTimeout(() => {

                                        setScrollTop(ref.current.scrollTop)
                                    }, 50);
                                    helpers.scroll(ref.current, 50, true);
                                    if (ref.current.scrollTop === 0) setScrollTop(0);
                                }}>
                        <ForwardIcon style={{fontSize: '2em', transform: 'rotate(-90deg)'}}/>
                    </IconButton>
                    <IconButton className={classes.arrows}
                                disabled={scrollTop + ref.current.clientHeight >= ref.current.scrollHeight}
                                onClick={() => {
                                    setTimeout(() => {

                                        setScrollTop(ref.current.scrollTop);
                                    }, 50);
                                    helpers.scroll(ref.current, 50);
                                }}>
                        <ForwardIcon style={{fontSize: '2em', transform: 'rotate(90deg)'}}/>
                    </IconButton>
                </div>}
            </div>
        </div>

    )
}