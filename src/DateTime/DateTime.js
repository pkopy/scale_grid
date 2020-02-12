import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextContainer from "../TextPanel/TextContainer";

const useStyles = makeStyles(theme => ({

}));

export default function DateTime(props) {
    const [date,setDate] = useState('')
    useEffect(() => {
        const start = () => {
            setDate(TextContainer.textLabels);
            // console.log(textLabels)
        };

        const timer = setInterval(start, 1000);
        return () => {
            clearInterval(timer)
        }
    }, []);
    return(
        <div style={{fontWeight:"bold", fontSize:"1em", marginRight:10}}>{TextContainer.date}</div>
    )
}