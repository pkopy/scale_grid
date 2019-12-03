import React from 'react';
import './App.scss';
import AppBar from './AppBar/AppBar'
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'
import ProgressBar from './ProgressBar/ProgressBar'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Buttons from './Buttons/Buttons'
import EditIcon from '@material-ui/icons/Edit';
import { send } from 'q';

function App() {
    // console.log('xxxxxxxxxxxxxxx', data.data)
    const [layout, setLayout] = React.useState([])
    const [loader, setLoader] = React.useState(false)
    const [blocked, setBlocked] = React.useState(true)
    const [busyFields, setBusyFields] = React.useState(new Array(18).fill(0))
    const [socket, setSocket] = React.useState()
    const [start, setStart] = React.useState(false)

    const block = () => {
        const helpArr = []
        setLayout([])
        for (let elem of layout) {
            elem.static = !elem.static
            // elem.isDraggable=false
            console.log(elem)
            helpArr.push(elem)
        }
        setTimeout(() => {
            setBlocked(!blocked)
            setLayout(helpArr)
        }, 100)
    }

    const runSocket = () => {
        const socket = new WebSocket('ws://10.10.3.45:4101')
        socket.onopen = () => {
            console.log('connect')
            setStart(true)
        }
        socket.onclose = () => {
            console.log('Socket is closed')
        }
        socket.onerror = (err) => {
            console.log(err)
        }
        setSocket(socket)
    }

    const addItem = (elem) => {
        findBusyFields()
        setLoader(true)
        let arr = layout.slice()
        let allBusyFields = 0
        busyFields.map(el => allBusyFields += el)
        if (allBusyFields < 18) {
            for (let i = 0; i < busyFields.length; i++) {
                if (busyFields[i] === 0 && allBusyFields < 18) {
                    if (i > 11) {
                        arr.push({ i: Date() + layout.length, w: 1, h: 2, x: (i - 12), y: 4, maxH: 6, minH: 2, maxW: 6, minW: 1, elem })

                    } else if (i > 5) {
                        arr.push({ i: Date() + layout.length, w: 1, h: 2, x: (i - 6), y: 2, maxH: 6, minH: 2, maxW: 6, minW: 1, elem })
                    } else {
                        arr.push({ i: Date() + layout.length, w: 1, h: 2, x: i, y: 0, maxH: 6, minH: 2, maxW: 6, minW: 1,elem })
                    }

                    break
                }
            }

        } else {
            alert('nie da rady')
        }
        setLayout(arr)
        console.log(arr)
        setLoader(false)
    }

    const add = (elem) => {

        findBusyFields()
        setLoader(true)
        setTimeout(() => {
            addItem(elem)
        }, 300)
    }

    const send = (elem) => {
        if (start && socket.readyState === 1 && elem.elem) {
            console.log(elem.elem.Value)
            socket.send(JSON.stringify({ COMMAND: 'EXECUTE_ACTION', PARAM: elem.elem.Value }))
        }
    }

    const deleteItem = (e,item) => {
        setLoader(true)
        const newLayout = layout.slice()
        e.stopPropagation()
        console.log(newLayout)
        for (let i = 0; i < newLayout.length; i++) {
            if (newLayout[i].i === item.i) {
                newLayout.splice(i, 1)
                break
            }
        }
        setLayout([])
        setTimeout(() => {
            setLayout(newLayout)
            setLoader(false)
        },300)
    }

    const editAfterDragg = (e) => {
        // console.log('e: ', e)
        
        // console.log('busy: ', busyFields)
        // console.log('layout ', layout.slice())
        const oldArray = layout.slice()
        if (e && e.length > 0) {
            const helpArr = []

            for (let i = 0; i < e.length; i++) {
                if ((e[i].y + e[i].h) > 6) {
                    e[i].y = 6 - e[i].h
                }
                if (e[i].h > 6) {
                    e[i].h = 6
                    e[i].y = 0
                }
                if (e[i].y % 2 !== 0) {
                    e[i].y--
                }
                if (e[i].h % 2 !== 0) {
                    e[i].h--
                }
                if (e[i].h < e[i].minH) {
                    e[i].h = e[i].minH
                }


                // console.log(i)
                e[i].elem = oldArray[i].elem
                e[i].obj = oldArray[i].obj
                helpArr.push(e[i])

            }

            findBusyFields()

            setTimeout(() => {

                setLayout(helpArr)
                console.log(helpArr)
            }, 50)
        } 


    }

    React.useEffect(() => {
        getLayout()
        runSocket()
    }, [])

    const getLayout = () => {
        setLoader(true)
        fetch(`http://${window.location.hostname}:9000/getlayout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(data => data.json())
            .then(data => {
                setLayout(data)
                setBlocked(true)
                setLoader(false)
            })
    }

    const findBusyFields = () => {
        let x = new Array(18).fill(0)
        for (let elem of layout) {
            for (let k = elem.y / 2; k < (elem.y + elem.h) / 2; k++) {
                for (let j = elem.x; j < elem.x + elem.w; j++) {
                    // console.log('k ', k)
                    let fieldPos = j + (k * 6)

                    x[fieldPos] = 1

                    // console.log("x ", x)
                }
                setBusyFields(x)
            }
        }
    }

    const _button = () => {
        return (
            <div>
                <button>XXXXXXXX</button>
            </div>
        )
    }

    const _mass = (elem) => {
        console.log('elem: ',elem)
        return (
            <ProgressBar 
                socket={socket}
                start={start}
                width={elem.h}
            />
        )
    }

    return (
        <div className="App">
            {loader &&
                <div>
                    <div style={{ zIndex: 100, position: 'fixed', width: '100%', height: '100vh', backgroundColor: 'gray', opacity: .5, left: 0, top: 0 }}>

                    </div>
                    <CircularProgress style={{ left: '50%', top: '50%', color: '#fff', zIndex: 101, position: 'absolute', marginLeft: 'auto', marginRigh: 'auto' }} />

                </div>



            }
            <AppBar
                block={block}
                blocked={blocked}
                add={add}
                getLayout={getLayout}
            />
            <GridLayout
                style={{
                    // border: '1px solid #000',

                }}
                className="layout"
                isResizable={true}
                compactType={null}
                onLayoutChange={e => editAfterDragg(e)}
                layout={layout}
                cols={6} width={1000} rowHeight={75}
                preventCollision={true}
            >
                {layout.map(elem =>
                    <div className="xx" onClick={() => send(elem)} style={{
                        border: "1px solid rgb(0, 0, 0, 0.4)",
                        display: 'flex',
                        alignItems: 'center',
                        
                    }} id={elem.i} key={elem.i}>
                            {elem.elem&&<div  style={{height:100, position:"relative", marginRight:"auto", marginLeft:"auto", width:"100%", marginTop: '-50px'}}>
                            <p>{elem.elem.Name}</p>
                           
                                <img   src={`data:image/png;base64, ${elem.elem.img}`}></img>
                            
                            </div>}
                            {/* {elem.i} X={elem.x} Y={elem.y} W={elem.w} H={elem.h} */}
                        <div style={{ position: 'absolute', top: '1%', right: '1%' }}>
                                
                            {!blocked &&
                                <div>
                                    {/* <IconButton>
                                        <EditIcon/>
                                    </IconButton> */}
                                    <IconButton onClick={(e)=>deleteItem(e,elem)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </div>
                            }
                        </div>
                        {elem.obj === 'but' && _button()}
                        {elem.obj === 'mass' && _mass(elem)}
                    </div>
                    //{elem.i} X={elem.x} Y={elem.y} W={elem.w} H={elem.h}
                )}
                {/* <div style={{ border: "1px solid #000" }} key="a">a</div>

                <div style={{ border: "1px solid #000" }} key="b">b</div>
                <div style={{ border: "1px solid #f00" }} key="c">c</div> */}
            </GridLayout>
                {/* <Buttons/> */}

        </div>
    );
}

export default App;
