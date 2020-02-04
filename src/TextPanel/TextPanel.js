import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textPanel: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: 5,
        width: '100%'

    },
    tabs: {
        width: 50,
        height: 10,
        border: '1px solid rgb(0,0,0,0.2)',
        margin: '0 10px',
        '&:hover': {
            backgroundColor: 'gray'
        }
    },
    activeTab: {
        backgroundColor: 'gray'
    }
}));

export default function TextPanel(props) {
    const classes = useStyles();
    const [activeIndex, setActiveIndex] = useState(0);
    const activeTab = `${classes.tabs} ${classes.activeTab}`;
    const tab = classes.tabs;
    console.log(props.textLabels.length > 0 ? props.textLabels[1].split('\n') : undefined)
    const changeActiveTab = (index) => {
        // const allTabs = document.querySelectorAll
        setActiveIndex(index)
        console.log(index)
    };
    return (
        <div style={{width: '100%', height: '100%'}}>
            <div className={classes.textPanel}>
                <div style={{padding: '0 0 20px'}} onClick={() => changeActiveTab(0)}>

                    <div className={activeIndex === 0 ? activeTab : tab} index={0}></div>
                </div>
                <div className={activeIndex === 1 ? activeTab : tab} index={1} onClick={() => changeActiveTab(1)}></div>
                <div className={activeIndex === 2 ? activeTab : tab} index={2} onClick={() => changeActiveTab(2)}></div>
            </div>
            <div style={{width: '100%', height: '80%', overflowY: 'auto', marginTop: 20}}>
                <div>

                    {props.textLabels.length > 0 && props.textLabels[activeIndex].split('\n').map((elem, i) =>
                        <p key={i} style={{margin: 0}}>{elem}</p>
                    )}
                </div>
            </div>
        </div>

    )
}