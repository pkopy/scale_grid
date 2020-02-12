import React, {useState, useEffect} from 'react';
import TextPanel from "./TextPanel";

const TextContainer = {
    textLabels: [],
    date:'',
    setTextLabels: (labels) =>{
        TextContainer.textLabels = labels
    },
    setDade: (date) => {
        TextContainer.date = date
    }
};
// function TextContainer(props) {
//     const [textLabels, setTextLabels] = useState([]);
//     console.log(props)
//     return(
//         <>
//             <TextPanel
//                 textLabels={props.textLabel}
//             />
//         </>
//     )
// }

export default TextContainer