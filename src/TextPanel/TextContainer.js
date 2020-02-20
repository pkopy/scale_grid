
const TextContainer = {
    textLabels: [],
    date:'',
    operator:'',
    setTextLabels: (labels) =>{
        TextContainer.textLabels = labels
    },
    setDate: (date) => {
        TextContainer.date = date
    },
    setOperator: (operator) => {
        TextContainer.operator = operator
    }
};


export default TextContainer