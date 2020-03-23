import {Line} from 'react-chartjs-2';
import React from "react";


export default function Mychart(props) {
    const [dataValues, setDataValues] = React.useState([]);
    const [maxValues, setMaxValues] = React.useState([]);
    const [minValues, setMinValues] = React.useState([]);
    const [avgValues, setAvgValues] = React.useState([]);
    const [tMinus,setTMinus] = React.useState([]);
    const [t2Minus,setT2Minus] = React.useState([]);
    const [product,setProduct] = React.useState([]);
    const [tPlus,setTPlus] = React.useState([]);
    const [t2Plus,setT2Plus] = React.useState([]);
    const [labels, setLabels] = React.useState([]);
    const [showChart, setShowChart] = React.useState({
        max:true,
        min:true,
        tMinus:true,
        t2Minus:true,
        product:true,
        tPlus:true,
        t2Plus:true,
        average: true,
        measurement:true
    })
    const data = {
        labels: labels,

        datasets: [
            {
                label: 'max',
                data: maxValues,
                // showLine:showChart.max,
                // this dataset is drawn below
                borderColor: 'rgba(255,0,0,1)',
                order: 3,
                type: 'line',
                fill: false,
                borderWidth: 0,
                pointBorderWidth: 0,
                pointRadius: 0,
                lineTension: 0.1,
            },
            {
                label: 'TMinus',
                data: tMinus,
                // showLine:showChart.tMinus,

                // this dataset is drawn below
                borderColor: 'rgba(213,0,255,1)',
                order: 3,
                type: 'line',
                fill: false,
                borderWidth: 1,
                pointBorderWidth: 0,
                pointRadius: 0,
                lineTension: 0.1,
            },
            {
                label: 'T2Minus',
                data: t2Minus,
                // showLine:showChart.t2Minus,

                // this dataset is drawn below
                borderColor: 'rgba(0,216,255,1)',
                order: 3,
                type: 'line',
                fill: false,
                borderWidth: 1,
                pointBorderWidth: 0,
                pointRadius: 1,
                lineTension: 0.1,
            },
            {
                label: 'Product',
                data: product,
                // showLine:showChart.product,

                // this dataset is drawn below
                borderColor: 'rgba(255,0,124,1)',
                order: 3,
                type: 'line',
                fill: false,
                borderWidth: 1,
                pointBorderWidth: 0,
                pointRadius: 1,
                lineTension: 0.1,
            },
            {
                label: 'TPlus',
                data: tPlus,
                // this dataset is drawn below
                // showLine:showChart.tPlus,

                borderColor: 'rgba(255,201,0,1)',
                order: 3,
                type: 'line',
                fill: false,
                borderWidth: 1,
                pointBorderWidth: 0,
                pointRadius: 1,
                lineTension: 0.1,
            },
            {
                label: 'T2Plus',
                data: t2Plus,
                // showLine:showChart.t2Plus,

                // this dataset is drawn below
                borderColor: 'rgba(0,0,0,1)',
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
                // showLine:showChart.average,

                // this dataset is drawn below
                borderColor: 'rgba(0,0,255,1)',
                order: 4,
                type: 'line',
                fill: false,
                borderWidth: 1,
                pointBorderWidth: 0,
                pointRadius: 0,
                lineTension: 0.1,
            },
            {
                label: 'min',
                data: minValues,
                // showLine:showChart.min,
                // this dataset is drawn below
                borderColor: 'rgba(255,255,0,1)',
                order: 1,
                type: 'line',
                fill: false,
                borderWidth: 1,
                pointBorderWidth: 0,
                pointRadius: 0,
                lineTension: 0.1,
            },
            {
                label: 'measurement',
                fill: false,
                lineTension: 0.1,
                // showLine:showChart.measurement,
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

    const charHandle = (type) => {
        const x = showChart
        x[type] = true
        setShowChart(x)
        console.log(showChart)
    }
    React.useEffect(() => {
        setShowChart({
            max:false,
            min:false,
            tMinus:false,
            t2Minus:false,
            product:false,
            tPlus:false,
            t2Plus:false,
            average: false,
            measurement:false
        })
        let arrLength = 0;
        let labels = [];
        if (props.graph && props.graph.RECORD) {
            for (let graph of props.graph.RECORD.Items) {
                arrLength = graph.NumericValues.length > arrLength ? graph.NumericValues.length : arrLength;
                switch (graph["Type"]) {
                    case 'Measurement':
                        setDataValues(graph.NumericValues);
                        // setShowChart({...showChart, measurement:true})
                        // charHandle('measurement')
                        break;
                    case 'Min':
                        setMinValues(graph.NumericValues);
                        // setShowChart({...showChart, min:true})
                        // charHandle('min')
                        break;
                    case 'Max':
                        setMaxValues(graph.NumericValues);
                        // setShowChart({...showChart, max:true})
                        // charHandle('max')
                        break;
                    case 'Average':
                        setAvgValues(graph.NumericValues)
                        // setShowChart({...showChart, average:true})
                        // charHandle('average')
                        break;
                    case 'TMinus':
                        setTMinus(graph.NumericValues)
                        // setShowChart({...showChart, tMinus:true})
                        // charHandle('tMinus')
                        break;
                    case 'T2Minus':
                        setT2Minus(graph.NumericValues)
                        // setShowChart({...showChart, t2Minus:true})
                        // charHandle('t2Minus')
                        break;
                    case 'Product':
                        setProduct(graph.NumericValues)
                        // setShowChart({...showChart, product:true})
                        // charHandle('product')
                        break;
                    case 'TPlus':
                        setTPlus(graph.NumericValues)
                        // setShowChart({...showChart, tPlus:true})
                        // charHandle('tPlus')
                        break;
                    case 'T2PLus':
                        setT2Plus(graph.NumericValues)
                        // setShowChart({...showChart, t2Plus:true})
                        // charHandle('t2Plus')
                        break;
                    default:
                        // setDataValues(graph.NumericValues);
                        // console.log('xxxx')
                }
            }
            for (let i = 0; i < arrLength; i++) {
                labels[i] = (i +1).toString()
            }
            setLabels(labels)
        }
        // console.log('graph', props.graph)
    }, [props.graph])

    return (
        <div>
            <Line
                data={data}
                width={props.width}
                height={props.height}
                options={{legend: {display: false}, animation: {duration: 0}, scales:{yAxes:[{
                    ticks: {
                        min: product.length > 0 ? product[0]*1.2:undefined,
                        max: product.length > 0 ? product[0]*0.8:undefined,
                    }
                        }]}}}
            />
        </div>
    )

}

