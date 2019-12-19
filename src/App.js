import React from 'react';
import './App.scss';
import AppBar from './AppBar/AppBar'
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'
import ProgressBar from './ProgressBar/ProgressBar'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from './Alert/Alert'



function App() {
    // console.log('xxxxxxxxxxxxxxx', data.data)
    const [layout, setLayout] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [blocked, setBlocked] = React.useState(false);
    const [busyFields, setBusyFields] = React.useState(new Array(18).fill(0));
    const [socket, setSocket] = React.useState();
    const [start, setStart] = React.useState(false);
    const [visible, setVisible] = React.useState(true);
    const [license, setLicense] = React.useState(true);
    const [openInfoLicence, setOpenLicenseInfo] = React.useState(false);


    const block = () => {
        const helpArr = [];
        // if (!blocked) {
        //     getLayout()
        // }
        for (let elem of layout) {
            if (!blocked) {
                elem.static = true;
            } else {
                elem.static = false;
            }
            helpArr.push(elem);
        }
        if (!blocked) {
            saveLayout(helpArr);
        }

        setTimeout(() => {
            setBlocked(!blocked);
            setLayout(helpArr);
        }, 300)
    }



    const runSocket = () => {
        const socket = new WebSocket(`ws://${window.location.hostname}:4101`);

        socket.onopen = () => {

            setStart(true);
        }
        socket.onclose = () => {

        }
        socket.onerror = (err) => {
            console.log(err);
        }
        setSocket(socket);
    }

    const addItem = (elem) => {
        findBusyFields();
        setLoader(true);

        let arr = layout.slice();
        let allBusyFields = 0;

        busyFields.map(el => allBusyFields += el);
        if (allBusyFields < 18) {
            for (let i = 0; i < busyFields.length; i++) {
                if (busyFields[i] === 0 && allBusyFields < 18) {
                    if (i > 11) {
                        arr.push({ i: Date() + layout.length, w: 1, h: 2, x: (i - 12), y: 4, maxH: 6, minH: 2, maxW: 6, minW: 1, elem });
                    } else if (i > 5) {
                        arr.push({ i: Date() + layout.length, w: 1, h: 2, x: (i - 6), y: 2, maxH: 6, minH: 2, maxW: 6, minW: 1, elem });
                    } else {
                        arr.push({ i: Date() + layout.length, w: 1, h: 2, x: i, y: 0, maxH: 6, minH: 2, maxW: 6, minW: 1, elem });
                    }

                    break;
                }
            }

        } else {
            alert('Not enough space');
        }
        setLayout(arr);
        setLoader(false);
    }

    const add = (elem) => {

        findBusyFields();
        setLoader(true);
        setTimeout(() => {
            addItem(elem);
        }, 300)
    }

    const send = (elem) => {
        if (start && socket.readyState === 1 && elem.elem && blocked) {
            socket.send(JSON.stringify({ COMMAND: 'EXECUTE_ACTION', PARAM: elem.elem.Value }));
        }
    }

    const deleteItem = (e, item) => {
        setLoader(true);
        const newLayout = layout.slice();
        e.stopPropagation();
        for (let i = 0; i < newLayout.length; i++) {
            if (newLayout[i].i === item.i) {
                newLayout.splice(i, 1);
                break;
            }
        }
        setLayout([]);
        setTimeout(() => {
            setLayout(newLayout);
            setLoader(false);
        }, 300)
    }

    const editAfterDragg = (e) => {

        const oldArray = layout.slice()
        if (e && e.length > 0) {
            const helpArr = [];

            for (let i = 0; i < e.length; i++) {
                if ((e[i].y + e[i].h) > 6) {
                    e[i].y = 6 - e[i].h;
                }
                if (e[i].h >= 6 && e[i].obj === 'mass' && e.length <= 1) {
                    e[i].h = 6;
                    e[i].w = 6;
                } else if (e[i].h >= 6 && e[i].obj === 'mass' && e.length > 1) {
                    e[i].h = 2;
                    e[i].w = 3;
                }

                if (e[i].h === 4 && e[i].w < 4 && e[i].obj === 'mass') {
                    e[i].h = 4;
                    e[i].w = 4;
                }
                if (e[i].h === 2 && e[i].w < 2 && e[i].obj === 'mass') {

                    e[i].w = 3;
                }
                if (e[i].h > 6) {
                    e[i].h = 6;
                    e[i].y = 0;
                }
                if (e[i].y % 2 !== 0) {
                    e[i].y--;
                }
                if (e[i].h % 2 !== 0) {
                    e[i].h--;
                }
                if (e[i].h < e[i].minH) {
                    e[i].h = e[i].minH;
                }

                e[i].elem = oldArray[i].elem;
                e[i].obj = oldArray[i].obj;
                helpArr.push(e[i]);

            }

            findBusyFields();

            setTimeout(() => {
                setLayout(helpArr);
            }, 50)
        }


    }



    const getLayout = () => {
        setLoader(true)
        fetch(`http://${window.location.hostname}:8400/layout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(data => data.json())
            .then(data => {

                // for (let elem of data) {
                //     if (!blocked) {
                //         elem.static = true;
                //     } else {
                //         elem.static = false;
                //     }

                // }

                setLayout(data);
                setBlocked(true);
                setLoader(false);
            })
            .catch(err => console.log(err))
    };

    const saveLayout = (layout) => {

        fetch(`http://${window.location.hostname}:8400/layout`, {
            method: 'POST',
            body: JSON.stringify(layout)

        });

    };

    const findBusyFields = () => {
        let x = new Array(18).fill(0)
        for (let elem of layout) {
            for (let k = elem.y / 2; k < (elem.y + elem.h) / 2; k++) {
                for (let j = elem.x; j < elem.x + elem.w; j++) {
                    let fieldPos = j + (k * 6)
                    x[fieldPos] = 1
                }
                setBusyFields(x)
            }
        }
    }



    const _mass = (elem) => {
        return (

            <ProgressBar
                socket={socket}
                start={start}
                width={elem.h}
                visible={visible}
                setLicense={setLicense}
            />
        )
    }

    React.useEffect(() => {
        getLayout();
        runSocket();
    }, []);

    React.useEffect(() => {
        info();
    }, [license]);

    const info = () => {
        if (window.location.hostname !== '127.0.0.1') {
            if (!license) {
                setOpenLicenseInfo(false);
            } else {
                setOpenLicenseInfo(true);
            }
        } else {
            setOpenLicenseInfo(true);
        }
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
            {!openInfoLicence && <Alert />}

            <AppBar
                block={block}
                blocked={blocked}
                add={add}
                getLayout={getLayout}
                saveLayout={saveLayout}

                license={license}
            />

            <GridLayout
                className="layout"
                isResizable={true}
                compactType={null}
                onLayoutChange={e => editAfterDragg(e)}
                onResizeStart={() => setVisible(false)}
                onResizeStop={() => setVisible(true)}
                layout={layout}
                cols={6} width={1000} rowHeight={75}
                preventCollision={true}
            >
                {layout.map(elem =>
                    <div className="xx" onClick={() => send(elem)} style={{
                        border: "1px solid rgb(0, 0, 0, 0.4)",
                        display: 'flex',
                        alignItems: 'center',

                    }} 
                    id={elem.i} key={elem.i}>

                        {visible && elem.elem && <div style={{ height: 100, position: "relative", marginRight: "auto", marginLeft: "auto", width: "100%", marginTop: '-50px' }}>
                            <p>{elem.elem.Name}</p>

                            <img src={`data:image/png;base64, ${elem.elem.img} `} alt='img'></img>

                        </div>}

                        <div style={{ position: 'absolute', bottom: '1%', left: '1%' }}>

                            {!blocked && elem.obj !== 'mass' &&
                                <div>
                                    <IconButton onClick={(e) => deleteItem(e, elem)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </div>
                            }
                        </div>

                        {elem.obj === 'mass' && _mass(elem)}
                    </div>
                )}

            </GridLayout>

        </div>
    );
}

export default App;
