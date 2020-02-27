import React, {useState, useEffect} from 'react';


export default function DateTime(props) {
    const [operator, setOperator] = useState('')
    // useEffect(() => {
    //     const start = () => {
    //         setOperator(TextContainer.operator);
    //         // console.log(textLabels)
    //     };
    //
    //     const timer = setInterval(start, 2000);
    //     return () => {
    //         clearInterval(timer)
    //     }
    // }, []);
    useEffect(() => {
        if(props.mass && props.mass.RECORD) {
            // console.log(props.mass.RECORD)
            setOperator(props.mass.RECORD.Operator)
        }
    }, [props.mass]);
    return(
        <div style={{fontWeight:"bold", fontSize:"1em", marginRight:10}}>{operator}</div>
    )
}