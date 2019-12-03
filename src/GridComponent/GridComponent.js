import React from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'
import RGL, { WidthProvider } from "react-grid-layout";
export default (props) => {
    const [layout, setLayout] = React.useState(props.layout)

    const [x ,setX] = React.useState(0)
    

    const addItem = (i,w,h) => {
        let arr = layout.slice()
        arr.push({i: i + layout.length, w, h,x:0,y:0})
        setLayout(arr)
        console.log(layout)
    }

    const editAfterDragg = (e) => {
        console.log(e)
        if (e.length > 0) {
            const helpArr = []

            for (let elem of e) {
                // if (elem.y > 4) {
                //     elem.y = 4
                // }
                helpArr.push(elem)
            }
            // setLayout([])
            setTimeout(()=>{
    
                setLayout(helpArr)
            }, 100)
        }
        // setLayout(helpArr)
        // const uu = document.querySelectorAll('.xx')
        // for (let elem of uu) {
        //     elem.remove()
        // }
        
    }

    

    React.useEffect(() => {
        editAfterDragg([])
    },[])
    return (

        <div>
            <GridLayout style={{border:'1px solid #000'}}className="layout"  isResizable={true} compactType={null} onLayoutChange={e => editAfterDragg(e)}   layout={layout}   cols={6} width={1024} rowHeight={80}>
                {layout.map(elem=> 
                    <div className="xx"style={{ border: "1px solid #000" }}  key={elem.i}>{elem.i} X={elem.x} Y={elem.y} W={elem.w} H={elem.h}</div>
                )}
                {/* <div style={{ border: "1px solid #000" }} key="a">a</div>
                <div style={{ border: "1px solid #000" }} key="b">b</div>
                <div style={{ border: "1px solid #f00" }} key="c">c</div> */}
            </GridLayout>
            <button onClick={props.edit}>EDIT</button>
            <button onClick={() => addItem('oo',1,2)}>ADD</button>
        </div>
    )
}