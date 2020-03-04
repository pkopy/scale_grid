import CanvasJSReact from './canvasjs.react';
import React from "react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart(props) {
    const options = {
        title: {
            text: "Basic Column Chart in React"
        },
        data: [{
            type: "rangeArea",
            xValueFormatString: "Range",
            yValueFormatString: "#0.##",
            toolTipContent: " <span style=\"color:#6D78AD\">{x}</span><br><b>Min:</b> {y[0]}<br><b>Max:</b> {y[1]}",
            dataPoints: [
                { x: 1, y:[37, 55] },
                { x: 2, y:[37, 57] },
                { x: 3, y:[43, 63] },
                { x: 4, y:[46, 68] },
                { x: 5, y:[55, 75] },
                { x: 6, y:[63, 84] },
                { x: 7, y:[66, 90] },
                { x: 8, y:[64, 86] },
                { x: 9, y:[61, 81] },
                { x: 10, y:[54, 73] },
                { x: 11, y:[46, 64] },
                { x: 12, y:[39, 59] }
            ]
        },{
            type: "line",
            toolTipContent: "Measure {x}: {y}",
            dataPoints: [
                { x: 1, y: 64 },
                { x: 2, y: 61 },
                { x: 3, y: 64 },
                { x: 4, y: 62 },
                { x: 5, y: 64 },
                { x: 6, y: 60 },
                { x: 7, y: 58 },
                { x: 8, y: 59 },
                { x: 9, y: 53 },
                { x: 10, y: 54 },
                { x: 11, y: 61 },
                { x: 12, y: 60 },
                { x: 13, y: 55 },
                { x: 14, y: 60 },
                { x: 15, y: 56 },
                { x: 16, y: 60 },
                { x: 17, y: 59.5 },
                { x: 18, y: 63 },
                { x: 19, y: 58 },
                { x: 20, y: 54 },
                { x: 21, y: 59 },
                { x: 22, y: 64 },
                { x: 23, y: 59 }
            ]
        },{
            type: "line",
            color:'blue',
            toolTipContent: "Measure {x}: {y}",
            dataPoints: [
                { x: 1, y: 34 },
                { x: 2, y: 41 },
                { x: 3, y: 64 },
                { x: 4, y: 62 },
                { x: 5, y: 64 },
                { x: 6, y: 60 },
                { x: 7, y: 58 },
                { x: 8, y: 59 },
                { x: 9, y: 53 },
                { x: 10, y: 34 },
                { x: 11, y: 61 },
                { x: 12, y: 60 },
                { x: 13, y: 45 },
                { x: 14, y: 60 },
                { x: 15, y: 56 },
                { x: 16, y: 60 },
                { x: 17, y: 59.5 },
                { x: 18, y: 63 },
                { x: 19, y: 58 },
                { x: 20, y: 54 },
                { x: 21, y: 59 },
                { x: 22, y: 64 },
                { x: 23, y: 59 }
            ]
        }]
    }
    return(
        <div style={{width:'50%', height:300}}>
            <CanvasJSChart options = {options}
                /* onRef = {ref => this.chart = ref} */
            />
        </div>
    )
}