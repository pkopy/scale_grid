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
        props.hamburger ? setLeft(0) : setLeft(-1100)
    }, [props.hamburger]);
    const classes = useStyles();
    return (
        <div>
            <div className={classes.listPanel} style={{ left: left, display: 'flex', flexWrap: 'wrap',justifyContent: 'center' }}>
                {props.menuButtons.map((elem, i) =>
                    <div key={i} style={{ margin: 5, padding:5, width: 150, height: 150, border: '1px solid rgb(0,0,0,0.2)' }}>{elem.Name}
                        <img src={loader} width='25px' alt={'menu img'}/>
                    </div>
                )}
            </div>
        </div>
    )
}