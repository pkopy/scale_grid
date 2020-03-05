import {Doughnut, Line} from 'react-chartjs-2';
import React from "react";


export default function Mychart(props) {
    const [dataValues, setDataValues] = React.useState([]);
    const [maxValues, setMaxValues] = React.useState([]);
    const [minValues, setMinValues] = React.useState([]);
    const [avgValues, setAvgValues] = React.useState([])
    const [labels, setLabels] = React.useState([])
    const data = {
        labels: labels,

        datasets: [
            {
                label: 'max',
                data: maxValues,
                // this dataset is drawn below
                borderColor: 'rgba(255,0,0,1)',
                order: 3,
                type: 'line',
                fill: false,
                borderWidth: 1,
                pointBorderWidth: 0,
                pointRadius: 1,
                lineTension: 0.1,
            },
            {
                label: 'average',
                data: avgValues,
                // this dataset is drawn below
                borderColor: 'rgba(0,0,255,1)',
                order: 4,
                type: 'line',
                fill: false,
                borderWidth: 1,
                pointBorderWidth: 0,
                pointRadius: 1,
                lineTension: 0.1,
            },
            {
                label: 'min',
                data: minValues,
                // this dataset is drawn below
                borderColor: 'rgba(255,255,0,1)',
                order: 1,
                type: 'line',
                fill: false,
                borderWidth: 1,
                pointBorderWidth: 0,
                pointRadius: 1,
                lineTension: 0.1,
            },
            {
                label: 'measurement',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 5,
                data: dataValues,
                order: 2
            }
        ]
    };
    React.useEffect(() => {
        console.log(props.graph)
        let arrLength = 0;
        let labels = [];
        if (props.graph && props.graph.RECORD) {
            for (let graph of props.graph.RECORD.Items) {
                arrLength = graph.NumericValues.length > arrLength ? graph.NumericValues.length : arrLength;
                console.log(arrLength)
                switch (graph["Type"]) {
                    case 'Measurement':
                        setDataValues(graph.NumericValues);
                        break;
                    case 'Min':
                        setMinValues(graph.NumericValues);
                        break;
                    case 'Max':
                        setMaxValues(graph.NumericValues);
                        break;
                    case 'Average':
                        setAvgValues(graph.NumericValues)
                        break;
                    default:
                        console.log('xxxx')
                }
            }
            for (let i = 0; i < arrLength; i++) {
                labels[i] = i.toString()
            }
            console.log(labels);
            setLabels(labels)
        }
    }, [props.graph])

    return (
        <div>
            <Line
                data={data}
                width={500}
                height={250}
                options={{legend: {display: false}, animation: {duration: 0}}}
            />
        </div>
    )

}

