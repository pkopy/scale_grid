import React, {useState, useEffect} from 'react';


export default function DateTime(props) {
    const [operator, setOperator] = useState('')

    useEffect(() => {
        if(props.mass && props.mass.RECORD) {
            setOperator(props.mass.RECORD.Operator)
        }
    }, [props.mass]);
    return(
        <div style={{fontWeight:"bold", fontSize:"1em", marginRight:10}}>{operator}</div>
    )
}