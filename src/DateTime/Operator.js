import React, {useState, useEffect} from 'react';
import TextContainer from "../TextPanel/TextContainer";

export default function DateTime(props) {
    const [operator, setOperator] = useState('')
    useEffect(() => {
        const start = () => {
            setOperator(TextContainer.operator);
            // console.log(textLabels)
        };

        const timer = setInterval(start, 2000);
        return () => {
            clearInterval(timer)
        }
    }, []);
    return(
        <div style={{fontWeight:"bold", fontSize:"1em", marginRight:10}}>{operator}</div>
    )
}