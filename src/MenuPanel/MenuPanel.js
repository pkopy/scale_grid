import React, {useState, useEffect} from 'react';
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
    const ref = React.useRef();
    // console.log(props)
    // const scroll = (node, directionUp = false) => {
    //     // node.stopPropagation()
    //     // node.scrollTop = 0
    //     // console.log(node)
    //     let x = 0;
    //     const timer = setInterval(() => {
    //
    //         x++;
    //         directionUp ? node.scrollTop -= x : node.scrollTop += x;
    //         // console.log(x);
    //         if (x >= 20) {
    //             x = 0;
    //             clearInterval(timer)
    //         }
    //     }, 20);
    //
    // }
    const [visibleScroll, setVisibleScroll] = React.useState(true);
    return (

        <div className={classes.menuPanel}>


            <div className={classes.menuHeader}>
                <div style={{
                    transform: 'translate(0, 50%)'
                }}><b>{props.menuCatalogLocal.Name}</b></div>
            </div>
            <div  style={{display: "flex",overflowY: "auto",  height: '100%'}}>
                <div

                    style={{
                        overflowY: "auto",
                        width:'100%',
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
                        {props.menuButtons && props.menuButtons.map((elem, i) =>
                            <div
                                key={i}
                                style={{
                                    background: '#fff',
                                    // position: 'relative',
                                    display: 'flex',
                                    margin: 5,
                                    padding: 5,
                                    // width: '46%',
                                    height: 30,
                                    border: '1px solid rgb(0,0,0,0.2)'
                                }}
                            >
                                <div>
                                    {!elem.img && <img className={classes.imgs} width={30} src={load}/>}
                                    {elem.img && <img width='30px' style={{
                                        pointerEvents: 'none',
                                        // position: 'absolute',
                                        // left: 0,
                                        // paddingLeft: 15
                                    }} src={`data:image/png;base64, ${elem.img}`} alt={'img'}/>}
                                </div>
                                <div style={{color: '#000', position: "relative", top: 5, marginLeft: 10}}>
                                    {elem.Name}
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
                        )}
                    </div>
                </div>
                <div style={{width:'20%'}}>
                    {visibleScroll && <IconButton className={classes.arrows}
                        onClick={(e) => {
                            // console.log(ref);
                            helpers.scroll(ref.current, true)
                        }}>
                        <ForwardIcon style={{fontSize: '2em', transform: 'rotate(-90deg)'}}/>
                    </IconButton>}
                    {visibleScroll && <IconButton className={classes.arrows} onClick={() => {
                        // console.log(ref);
                        helpers.scroll(ref.current)
                    }}>
                        <ForwardIcon style={{fontSize: '2em', transform: 'rotate(90deg)'}}/>
                    </IconButton>}
                </div>
            </div>
        </div>

    )
}