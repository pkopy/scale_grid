import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import loader from '../img/search.gif'
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
    }
}));

export default function ListPanel(props) {
    const [left, setLeft] = React.useState(-1100);
    // console.log(props)
    // if (props.hamburger) {
    //     setLeft(0)
    // } else {
    //     setLeft(-1100)
    // }



    React.useEffect(() => {
        props.hamburger ? setLeft(0) : setLeft(-1100);
        console.log(props.menu)
    }, [props.hamburger]);

    const classes = useStyles();

    return (
        <div>
            <div className={classes.listPanel} style={{ left: left, display: 'flex', flexWrap: 'wrap',justifyContent: 'center' }}>
                {props.menu.isBig&&props.menuButtons.map((elem, i) =>
                    <div key={i} style={{background:'#fff', margin: 5, padding:5, width: 150, height: 150, border: '1px solid rgb(0,0,0,0.2)' }} onMouseDown={() => props.tapParam(elem.GUID)} >{elem.Name}
                        {/*<img src={loader} width='25px' alt={'menu img'}/>*/}
                        {!elem.img && <img className={classes.imgs} width={30} src={loader} alt={'loader'}/>}
                        {elem.img && <img className={classes.imgs} width= {window.innerWidth < 800 ? 25:75} style={{ pointerEvents: 'none' }} src={`data:image/png;base64, ${elem.img}`} alt={'img'}/>}
                    </div>
                )}
            </div>
            <div style={{width:1024,position:'absolute', zIndex:100,  padding: 20, display: 'flex', flexWrap:'wrap'}}>
                {!props.menu.isBig&&props.menuButtons.map((elem, i) =>
                    <div key={i} style={{background:'#fff', position: 'relative', margin: 5, padding:5, width: '46%', height: 60, border: '1px solid rgb(0,0,0,0.2)' }} >{elem.Name}
                        {/*<img src={loader} width='25px' alt={'menu img'}/>*/}
                        {!elem.img && <img width={30} src={loader} alt={'loader'}/>}
                        {elem.img && <img width= {window.innerWidth < 800 ? 25:undefined} style={{ pointerEvents: 'none', position: 'absolute', left:0, paddingLeft: 15 }} src={`data:image/png;base64, ${elem.img}`} alt={'img'}/>}
                    </div>
                )}
            </div>
        </div>
    )
}