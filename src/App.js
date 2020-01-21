import React from 'react';
import './App.scss';
import AppBar from './AppBar/AppBar'
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'
import ProgressBar from './ProgressBar/ProgressBar'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {IconButton} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from './Alert/Alert'
import ListPanel from './ListPanel/ListPanel'
import helpers from "./Helpers/helpers";


function App() {
    const [layout, setLayout] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [blocked, setBlocked] = React.useState(false);
    const [busyFields, setBusyFields] = React.useState(new Array(72).fill(0));
    const [socketMass, setSocketMass] = React.useState({});
    const [socketAct, setSocketAct] = React.useState({});
    const [start, setStart] = React.useState(false);
    const [visible, setVisible] = React.useState(true);
    const [license, setLicense] = React.useState(true);
    const [openInfoLicence, setOpenLicenseInfo] = React.useState(false);
    const [screen, setScreen] = React.useState({});
    const [hamburger, setHamburger] = React.useState(false);
    const [menuButtons, setMenuButtons] = React.useState([]);
    const [menu, setMenu] = React.useState({});
    const [oldLayout, setOldLayout] = React.useState(layout);
    const [timer, setTimer] = React.useState(0);
    const [nextClick, setNextClick] = React.useState(true);

    const host = process.env.NODE_ENV !== 'production' ? '10.10.3.60' : window.location.hostname;

    const block = () => {
        const helpArr = [];
        // if (!blocked) {
        //     getLayout()
        // }
        for (let elem of layout) {
            elem.static = !blocked;
            helpArr.push(elem);
        }
        if (!blocked) {
            saveLayout(helpArr);
        }

        setTimeout(() => {
            setBlocked(!blocked);
            setLayout(helpArr);
        }, 300)
    };


    const runSocket = () => {
        // const socket = new WebSocket(`ws://${window.location.hostname}:4101`);
        const socketMass = new WebSocket(`ws://${host}:4101`);
        const socketAct = new WebSocket(`ws://${host}:4101`);
        socketMass.onopen = () => {
            setStart(true);
        };
        socketMass.onclose = () => {
        };
        socketMass.onerror = (err) => {
            console.log(err);
        };
        setSocketMass(socketMass);

        socketAct.onopen = () => {
            setStart(true);
            setSocketAct(socketAct);
            const sendM = () => {
                socketAct.send(JSON.stringify({"COMMAND": "REGISTER_LISTENER", "PARAM": "MENU"}));
            };
            sendM();
            setTimer(setInterval(sendM, 5000))
        };
    };


    // const timerX = setInterval(sendM, 5000);
    socketAct.onmessage = (e) => {
        let data = e.data;
        const response = JSON.parse(data);
        console.log(response);
        // if (response.RECORD) {
        //
        //     setMenu(response.RECORD);
        //
        // }
        if (response.COMMAND === 'REGISTER_LISTENER' && response.PARAM === 'MENU') {
            clearInterval(timer)

        }
        if (response.COMMAND === 'EDIT_MESSAGE' && response.PARAM === 'SHOW') {
            showMenu();
            // setMenu(response.RECORD);
            // console.log('open');
            setHamburger(true);
            getAllImgs(socketAct, response.RECORD.Items, response.RECORD.GUID)
                .then(data => {

                    setMenuButtons(data);
                    // console.log(menuButtons)
                    setMenu(response.RECORD);

                })


        }
        if (response.COMMAND === 'EDIT_MESSAGE' && response.PARAM === 'CLOSE') {
            // console.log('close');
            setHamburger(false);
            setMenu({Name: 'SMART DISPLAY', isBig: true})
        }
    };
    socketAct.onclose = () => {

    };
    const add = (elem, type) => {
        const objectType = {};
        switch (type) {
            case 'button':
                objectType.w = 2;
                objectType.h = 2;
                break;
            case 'menu':
                objectType.w = 4;
                objectType.h = 3;
                break;
            default:
                objectType.w = 1;
                objectType.h = 1;
                break;
        }

        findBusyFields();
        setLoader(true);
        setTimeout(() => {
            addItem(elem, objectType);
        }, 300)
    };

    socketAct.onerror = (err) => {
        console.log(err);
    };
    React.useEffect(() => {
        console.log('hhhhhhhhhhh', menu)
        if (menu.Items) {
            // getAllImgs(socketAct, menu.Items, menu.GUID)
            //     .then(data => {
            //
            //         setMenuButtons(data);
            //         // console.log(menuButtons)
            //         // setMenu(response.RECORD);
            //
            //     })

        }


    }, [menu]);

    async function getAllImgs(socket, menuButtons, menuId) {
        const arr = [];
        for (let elem of menuButtons) {
            // console.log('guid', menuId);
            // console.log('guidXXxxx', menu);
            if (!elem.img) {
                // console.log(elem)
                for (let i = 0; i < 3; i++) {
                    await helpers.getImg(true, socket, "GET_IMAGE_MENU", elem.GUID)
                        .then(data => {
                            if (data !== undefined) {
                                i = 3;
                                elem.img = data;
                                // console.log(elem);
                                arr.push(elem)
                            }
                        }).catch(err => console.log(err))
                }
            }

        }
        return arr
    }

    //Click on the menu item
    const tapParam = (param) => {
        if (nextClick) {
            if (start && socketAct.readyState === 1) {
                socketAct.send(JSON.stringify({COMMAND: 'TAP_PARAM', PARAM: param}))
            }
            setNextClick(false)
        }

        setTimeout(() => {
            setNextClick(true)
        }, 1000)
    };

    const addItem = (elem, type) => {
        findBusyFields();
        setLoader(true);

        let arr = layout.slice();
        let allBusyFields = 0;


        busyFields.map(el => allBusyFields += el);
        if (allBusyFields < 72 ) {
            for (let i = 0; i < busyFields.length; i++) {
                // console.log('QWERTY',helpers.findFreeSpace(busyFields, i, type));
                if (busyFields[i] === 0 && allBusyFields < 72 && helpers.findFreeSpace(busyFields, i, type) ) {
                    if (i > 59) {
                        arr.push({
                            i: Date() + layout.length,
                            w: type.w,
                            h: type.h,
                            x: (i - 60),
                            y: 5,
                            maxH: 6,
                            minH: 1,
                            maxW: 6,
                            minW: 1,
                            elem
                        });
                    } else if (i > 47) {
                        arr.push({
                            i: Date() + layout.length,
                            w: type.w,
                            h: type.h,
                            x: (i - 48),
                            y: 4,
                            maxH: 6,
                            minH: 1,
                            maxW: 6,
                            minW: 1,
                            elem
                        });

                    } else if (i > 35) {
                        arr.push({
                            i: Date() + layout.length,
                            w: type.w,
                            h: type.h,
                            x: (i - 36),
                            y: 3,
                            maxH: 6,
                            minH: 1,
                            maxW: 6,
                            minW: 1,
                            elem
                        });

                    } else if (i > 23) {
                        arr.push({
                            i: Date() + layout.length,
                            w: type.w,
                            h: type.h,
                            x: (i - 24),
                            y: 2,
                            maxH: 6,
                            minH: 1,
                            maxW: 6,
                            minW: 1,
                            elem
                        });
                    } else if (i > 11) {
                        arr.push({
                            i: Date() + layout.length,
                            w: type.w,
                            h: type.h,
                            x: (i - 12),
                            y: 1,
                            maxH: 6,
                            minH: 1,
                            maxW: 6,
                            minW: 1,
                            elem
                        });
                    } else {
                        arr.push({
                            i: Date() + layout.length,
                            w: type.w,
                            h: type.h,
                            x: i,
                            y: 0,
                            maxH: 6,
                            minH: 1,
                            maxW: 6,
                            minW: 1,
                            elem
                        });
                    }

                    break;
                }
            }

        }
        setLayout(arr);
        setLoader(false);
    };

    const send = (elem) => {
        // console.log('click action');
        if (start && socketAct.readyState === 1 && elem.elem && blocked) {
            socketAct.send(JSON.stringify({COMMAND: 'EXECUTE_ACTION', PARAM: elem.elem.Value}));
        }
    };

    const close = () => {

        if (start && socketAct.readyState === 1) {
            // console.log('click close');
            socketAct.send(JSON.stringify({COMMAND: 'EXECUTE_MENU_ACTION', PARAM: "BACK"}));
        }
    };

    const showMenu = () => {
        if (start && socketAct.readyState === 1) {
            socketAct.send(JSON.stringify({COMMAND: 'EXECUTE_ACTION', PARAM: "actSetup"}))
        }
    };

    const sendMenuListener = () => {
        // console.log('send register', socketAct);
        if (start && socketAct.readyState === 1) {
            socketAct.send(JSON.stringify({
                "COMMAND": "REGISTER_LISTENER", "PARAM": "MENU"
            }));
        }
    };

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
    };

    const editAfterDrag = (e) => {
        // console.log(busyFields.reduce((a, b) => a + b))
        // const busyF = busyFields.reduce((a, b) => a + b)
        // let ddd = findBusyFields().reduce((a, b) => a + b)
        // console.log('busy', busyF)
        // console.log('uuuuu',ddd)
        const oldArray = [...layout];
        if (e && e.length > 0) {
            const helpArr = [];

            for (let i = 0; i < e.length; i++) {
                if ((e[i].y + e[i].h) > 6) {
                    //prevents to go out from a screen in vertical
                    // e[i].y = 6 - e[i].h;
                    e[i].h = oldArray[i].h;
                    e[i].y = oldArray[i].y;
                    e[i].x = oldArray[i].x
                }
                if (e[i].h >= 6 && e[i].obj === 'mass' && e.length <= 1) {
                    e[i].h = 6;
                    e[i].w = 12
                } else if (e[i].h >= 6 && e[i].obj === 'mass' && e.length > 1) {
                    e[i].h = 2;
                    e[i].w = 3
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
                // if (e[i].y % 2 !== 0) {
                //     e[i].y--;
                // }
                // if (e[i].h % 2 !== 0) {
                //     e[i].h--;
                // }
                if (e[i].h < e[i].minH) {
                    e[i].h = e[i].minH;
                }
                // console.log(busyF ,ddd, oldArray)


                e[i].elem = oldArray[i].elem;
                e[i].obj = oldArray[i].obj;
                helpArr.push(e[i]);

            }

            findBusyFields();
            // console.log('help', helpArr)
            // if (busyF !== ddd ) {
            //     getLayout()

            //     // setBlocked(false)
            // } else {

            setTimeout(() => {
                setLayout(helpArr);
            }, 50)
            // }
        }
    };

    // React.useEffect(() => {
    //     console.log(layout)
    // }, [layout])


    const getLayout = (isBadLayout = true) => {
        setLoader(true);
        fetch(`http://localhost:8400/layout`, {
            // fetch(`http://${host}:8400/layout`, {
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
                if (isBadLayout) setBlocked(true);
                setLoader(false);
            })
            .catch(err => console.log(err))
    };

    const saveLayout = (layout) => {
        fetch(`http://localhost:8400/layout`, {
            // fetch(`http://${host}:8400/layout`, {
            method: 'POST',
            body: JSON.stringify(layout)

        });

    };

    // const collision = () => {
    //     let oldBusyFields = busyFields.reduce((a, b) => a + b);
    //     let newBusyFields = findBusyFields().reduce((a, b) => a + b);
    //
    //     // console.log(layout, oldLayout)
    //     if (oldBusyFields !== newBusyFields) {
    //         setLayout(oldLayout)
    //     }
    // };

    const findBusyFields = () => {
        let x = new Array(72).fill(0);
        // console.log(layout)
        for (let elem of layout) {
            for (let k = elem.y; k < (elem.y + elem.h); k++) {
                for (let j = elem.x; j < elem.x + elem.w; j++) {
                    let fieldPos = j + (k * 12);
                    x[fieldPos] = 1
                }
                setBusyFields(x)
            }
        }
        // console.log(x)
        return x
    };


    const _mass = (elem) => {
        return (

            <ProgressBar
                screen={screen}
                socketMass={socketMass}
                start={start}
                width={elem.h}
                visible={visible}
                setLicense={setLicense}
            />
        )
    };

    const _listPanel = () => {
        return (

            <div>TESTOWANIE</div>
        )
    };

    React.useEffect(() => {

        getLayout();
        runSocket();
        if (window.innerWidth > 1000) {
            //1024x600
            setScreen({
                width: 1024,
                rowHeight: 77,

            })
        } else if (window.innerWidth < 900) {
            //640x480
            setScreen({
                width: 640,
                rowHeight: 50,
                imgWidth: 30
            })
        }
        console.log(window.innerWidth)
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
                <div style={{
                    zIndex: 100,
                    position: 'fixed',
                    width: '100%',
                    height: '100vh',
                    backgroundColor: 'gray',
                    opacity: .5,
                    left: 0,
                    top: 0
                }}>

                </div>
                <CircularProgress style={{
                    left: '50%',
                    top: '50%',
                    color: '#fff',
                    zIndex: 101,
                    position: 'absolute',
                    marginLeft: 'auto',
                    marginRigh: 'auto'
                }}/>

            </div>

            }
            {!openInfoLicence && <Alert/>}

            <AppBar

                block={block}
                blocked={blocked}
                add={add}
                getLayout={getLayout}
                saveLayout={saveLayout}
                setHamburger={setHamburger}
                hamburger={hamburger}
                license={license}
                sendMenuListener={sendMenuListener}
                showMenu={showMenu}
                close={close}
                socketAct={socketAct}
                menu={menu}
            />
            <ListPanel
                setHamburger={setHamburger}
                hamburger={hamburger}
                socketAct={socketAct}
                menuButtons={menuButtons}
                menu={menu}
                tapParam={tapParam}
            />

            <GridLayout
                className="layout"
                isResizable={true}
                compactType={null}
                onLayoutChange={e => editAfterDrag(e)}
                onResizeStart={() => setVisible(false)}
                onResizeStop={() => setVisible(true)}
                onDragStart={() => setOldLayout(layout)}
                // onDragStop={(e) => collision()}
                layout={layout}
                cols={12} width={screen.width} rowHeight={screen.rowHeight}
                preventCollision={true}

                // style={{border:"1px solid rgb(0, 0, 0, 0.4)"}}
            >
                {layout.map(elem =>
                    <div className="xx" onClick={() => send(elem)} style={{
                        border: "1px solid rgb(0, 0, 0, 0.4)",
                        display: 'flex',
                        alignItems: 'center',
                    }}
                         id={elem.i} key={elem.i}>

                        {visible && elem.elem &&
                        <div style={{height: '100%', position: "relative", marginRight: "auto", marginLeft: "auto"}}>
                            {elem.w > 1 && elem.h > 1 && <p>{elem.elem.Name}</p>}

                            <img src={`data:image/png;base64, ${elem.elem.img} `} draggable={false}
                                 onMouseDown={() => false} style={{pointerEvents: 'none', width: screen.imgWidth}}
                                 alt='img'/>

                        </div>}

                        <div style={{position: 'absolute', bottom: '1%', left: '1%'}}>

                            {!blocked && elem.obj !== 'mass' && (elem.h > 1 || elem.w > 1) &&
                            <div>
                                <IconButton onClick={(e) => deleteItem(e, elem)}>
                                    <DeleteOutlineIcon/>
                                </IconButton>
                            </div>
                            }
                        </div>
                        {elem.obj === 'list_panel' && _listPanel()}
                        {elem.obj === 'mass' && _mass(elem)}
                    </div>
                )}

            </GridLayout>


        </div>
    );
}

export default App;
