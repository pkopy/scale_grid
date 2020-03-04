import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    textPanel: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: 5,
        width: '100%',
        overflow:'hidden'

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
    },
    tabContainer: {
        padding: '0 0 20px'
    }
}));

export default function TextPanel(props) {
    const classes = useStyles();
    const [activeIndex, setActiveIndex] = useState(props.elem.elem.activeTab);
    const [textLabels, setTextLabels] = useState('');

    const activeTab = `${classes.tabs} ${classes.activeTab}`;
    const tab = classes.tabs;

    // console.log(TextContainer.textLabels)
    // useEffect(() => {
    //     const start = () => {
    //         setTextLabels(TextContainer.textLabels);
    //         // console.log(textLabels)
    //     }
    //
    //     const timer = setInterval(start, 2000)
    //     return () => {
    //         clearInterval(timer)
    //     }
    // }, [])

    useEffect(() => {
        if(props.mass && props.mass.RECORD) {
            // console.log(props.mass.RECORD.var_labels)
            setTextLabels(props.mass.RECORD.var_labels)
            // console.log('fsddsfsdfds',props.mass.RECORD.var_Labels)
        }
    }, [props.mass]);

    // console.log(props.textLabels.length > 0 ? props.textLabels[1].split('\n') : undefined)
    const changeActiveTab = (index) => {
        setActiveIndex(index);
        props.setTabInTextPanel(props.elem, index);
        // console.log(props.elem);
    };
    return (

        <div style={{width: '100%', height: '100%', backgroundColor: "#ececec", overflow:'hidden'}}>
            {props.children}
            <div className={classes.textPanel}>
                <div className={classes.tabContainer} onClick={() => changeActiveTab(0)}>
                    <div className={activeIndex === 0 ? activeTab : tab}/>
                </div>
                <div className={classes.tabContainer} onClick={() => changeActiveTab(1)}>
                    <div className={activeIndex === 1 ? activeTab : tab}/>
                </div>
                <div className={classes.tabContainer} onClick={() => changeActiveTab(2)}>
                    <div className={activeIndex === 2 ? activeTab : tab}/>
                </div>

            </div>
            <div style={{width: '100%', height: '80%', overflowY: 'hidden', marginTop: 40}}>
                <div style={{textAlign: 'left', marginLeft: 15}}>
                    {textLabels&&textLabels.length > 0 && textLabels[activeIndex].split('\n').map((elem, i) =>
                        <p key={i} style={{margin: 1}}>{elem}</p>
                    )}
                </div>
            </div>
        </div>

    )
}