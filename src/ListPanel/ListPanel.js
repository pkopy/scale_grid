import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import loader from '../img/search.gif';
import checkGreen from '../img/Check_green.svg';
import checkGray from '../img/Check_gray.svg'
const useStyles = makeStyles(theme => ({
    listPanel: {
        width: 1024,
        height: 400,
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
//TODO split the number of items in the menu, when items go out the screen
export default function ListPanel(props) {
    const [left, setLeft] = React.useState(-1100);
    // console.log(props)
    // if (props.hamburger) {
    //     setLeft(0)
    // } else {
    //     setLeft(-1100)
    // }
    const ref = React.useRef();
    React.useEffect(() => {
        props.hamburger ? setLeft(0) : setLeft(-1100);
        console.log('xxxxx', props)
        if (ref) ref.current.scrollTop = 0
    }, [props.hamburger]);

    React.useEffect(() => {
        console.log('menu:', props.menuButtons)
    }, [props.menuButtons])

    const classes = useStyles();
    const str = (node) => {
        // node.stopPropagation()
        // node.scrollTop = 0
        console.log(node.scrollTop)
        let x = 0;
        const timer = setInterval(() => {

            x++;
            node.scrollTop += x;
            console.log(x)
            if (x >= 130) {

                x = 0;
                clearInterval(timer)
            }
        }, 15);


    }

    return (
        <div>

            <div className={classes.listPanel}
                 style={{left: left, display: 'flex'}}>
                <div id='container' ref={ref} onClick={(e) => {
                    console.log(ref);
                    str(ref.current, e)
                }} style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: props.menu.isBig ? 'auto auto auto auto auto' : '50% 50%',
                    gridAutoRows: 'min-content',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    overflowY: 'hidden',
                }}>


                    {props.menu.isBig && props.menuButtons.map((elem, i) =>
                        <div key={i} style={{
                            background: '#fff',
                            margin: 5,
                            padding: 5,
                            width: 150,
                            height: 150,
                            border: '1px solid rgb(0,0,0,0.2)'
                        }} onClick={(e) => e.stopPropagation()}
                             onMouseDown={(e) => {
                                 e.stopPropagation();
                                 props.tapParam(elem.GUID)
                             }}>{elem.Name}
                            {/*<img src={loader} width='25px' alt={'menu img'}/>*/}
                            {!elem.img && <img className={classes.imgs} width={30} src={loader} alt={'loader'}/>}
                            {elem.img && <img className={classes.imgs} width={window.innerWidth < 800 ? 25 : 75}
                                              style={{pointerEvents: 'none'}} src={`data:image/png;base64, ${elem.img}`}
                                              alt={'img'}/>}
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
                    {!props.menu.isBig && props.menuButtons.map((elem, i) =>
                        <div key={i} style={{
                            background: '#fff',
                            // position: 'relative',
                            display: 'flex',
                            margin: 5,
                            padding: 5,
                            // width: '46%',
                            height: 60,
                            border: '1px solid rgb(0,0,0,0.2)'
                        }}
                             onClick={(e) => e.stopPropagation()}
                             onMouseDown={(e) => {
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
                            <div style={{width: '100%', display:'flex'}}>
                                <div style={{width:'50%', textAlign:'left', paddingLeft:10}}>
                                    <p>{elem.Name}</p>

                                </div>
                                <div style={{width:'50%', textAlign:'right', paddingRight:10}}>

                                    {elem.Type === 'EditEnumSwitch'? <div>
                                            {elem.Value === "True"?<img src={checkGreen} alt={'check icon'} width={40} style={{paddingTop:10}}/>:<img src={checkGray} alt={'check icon'} width={40} style={{paddingTop:10}}/>}
                                    </div>:<p>{elem.Value}</p>}
                                </div>
                            </div>
                        </div>
                    )}
                    {/*</div>*/}
                </div>
                <div>
                    dddd
                </div>
            </div>
        </div>
    )
}