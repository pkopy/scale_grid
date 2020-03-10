import React, {useState, useEffect} from 'react';



export default function DateTime(props) {
    const [date, setDate] = useState('')
    // useEffect(() => {
    //     const start = () => {
    //         setDate(props.mass.RECORD.Date);
    //         // console.log(textLabels)
    //     };
    //
    //     const timer = setInterval(start, 1000);
    //     return () => {
    //         clearInterval(timer)
    //     }
    // }, []);
    useEffect(() => {
        if(props.mass && props.mass.RECORD) {

            setDate(props.mass.RECORD.Date)
        }
    }, [props.mass]);
    return(
        <div style={{fontWeight:"bold", fontSize:"1em", marginRight:10, top:15, position:'relative'}}>{date}</div>
    )
}