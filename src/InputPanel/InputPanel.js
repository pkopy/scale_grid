import React, {useState, useEffect} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './InputPanel.scss';
import checkIcon from '../img/Check_green.svg';
import cancelIcon from '../img/cancel-button.png';

export default function InputPanel(props) {
    const [text, setText] = React.useState('');
    const [data, setData] = useState('');
    const [width, setWidth] = React.useState(800);

    const keyboard = React.useRef();
    const inputField = document.querySelector('input')
    const {RECORD} = props.inputPanel;
    const onChange = (input) => {
        // let newImput = parseFloat(input);
        // let caret = keyboard.current.caretPosition
        //
        // console.log(caret)
        console.log(props.layoutName)
        if (props.layout === 'double' || props.layout === 'number') {
            keyboard.current.setInput(input);
            setText(input);
            setData(input);
        }
        if (props.inputPanel.RECORD.Password) {
            setText(input);
            setData(input);
            keyboard.current.setInput(input);
        } else {
            setText(input);
            setData(input);
            keyboard.current.setInput(input);
        }
    };


    const onKeyPress = (button) => {
        if (button === '{OK}') {
            setText('');
            keyboard.current.destroy();
            props.setOPenKeyboard(false);
        }

    };

    const buttonTap = (param) => {
        if (props.socketTap && props.socketTap.readyState === 1) {
            props.socketTap.send(JSON.stringify({COMMAND: 'SET_PARAM', DATA: data, PARAM: param, "KEY": RECORD.GUID}))

                setText('');
                keyboard.current.clearInput();

        }
    };
    const onChangeInput = (event) => {
        let input = event.target.value.toString()
        if (!props.inputPanel.RECORD.Password && props.layout === 'double'&& !isNaN(event.target.value) && input.length >= 0) {
            setText(input);
            setData(input);
            keyboard.current.setInput(input);
        }
        // if (props.layout === 'default' && props.inputPanel.RECORD.Password) {
        //     setText(input);
        //     setData(input);
        //     keyboard.current.setInput(input);
        //
        // }
        else if(props.layout !== 'double'){
            setText(input);
            setData(input);
            keyboard.current.setInput(input);
            // setText(.current.setInput(input);
        }
        // console.log(input)


    };
    useEffect(() => {


        if (props.inputPanel.RECORD) {
            console.log(props.inputPanel.RECORD.Value)
            const inputInit = props.inputPanel.RECORD.Value.toString();
            setText(inputInit);
            setData(inputInit);
            keyboard.current.setInput(inputInit);


        }
        console.log(keyboard)

    }, [props.inputPanel]);

    const test = () => {
        keyboard.current.utilities.updateCaretPos(4, keyboard.current)
        // keyboard.current.setInput(props.inputPanel.RECORD.Value)
        inputField.focus()
    };

    return (
        <>

            {props.openKeyboard &&
            <div style={{
                width: 1026, height: 612,
                // opacity: opacity,
                transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                background: "#00000021",
                // background:"rebeccapurple",
                position: "absolute", top: 0, zIndex: 100
            }}>


                <div style={{
                    width: width, position: "relative", top: 130, marginLeft: "auto",
                    marginRight: "auto", textAlign: "left", background: '#00000012',
                    boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)'

                }}>
                    <div style={{
                        // top: 0,
                        height: 35,
                        width: '100%',
                        position: "relative",
                        backgroundColor: '#3f51b5',
                        // boxShadow: '0 3px 5px 0 #cecece',
                        // border: '7px solid #3f51b5',
                        borderRadius: '7px 7px 0 0',
                        color: '#fff',
                        top: 4
                    }}>
                        <div onClick={test} style={{
                            transform: 'translate(0, 50%)', paddingLeft: 15
                        }}><b>{RECORD && RECORD.Name}</b></div>
                    </div>
                    <div style={{
                        height: 60,
                        border: '7px solid #e5e5e5',
                        position: "relative",
                        top: 3,

                        background: '#fff',
                        paddingLeft: 10

                    }}>
                        <input
                            // ref={inputField}
                            style={{
                                width: '95%',
                                marginRight: "auto",
                                marginLeft: "auto",
                                height: 55,
                                outline: "none",
                                border: "none",
                                fontSize: '2.5em'
                            }}
                            type={props.keyboardType}
                            value={text}
                            checked={true}
                            autoFocus={true}
                            autoComplete={'off'}
                            onChange={(e) => onChangeInput(e)}
                        />
                    </div>
                    <div style={{
                        height: 25,
                        border: '7px solid #e5e5e5',
                        position: "relative",
                        top: 3,
                        // borderRadius: '7px 7px 0 0',
                        background: '#e5e5e5',
                        paddingLeft: 10

                    }}>
                        <div style={{
                            position: "relative",
                            top: -10,
                            width: 120,
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "flex"
                        }}>
                            <div className={'okCancelButton'}
                                 onMouseDown={(e) => {
                                     // e.stopPropagation()
                                     e.target.classList.add('okCancelButtonActive');
                                     setTimeout(() => {

                                         buttonTap('OK')
                                     }, 200)
                                     // e.target.classList.remove('okCancelButtonActive')
                                 }}
                                 onMouseUp={(e) => e.target.classList.remove('okCancelButtonActive')}
                            >
                                <img src={checkIcon} width={25} alt={'ok-button'}/>
                            </div>
                            <div className={'okCancelButton'}
                                 onMouseDown={(e) => {
                                     e.target.classList.add('okCancelButtonActive');
                                     buttonTap('CANCEL')
                                 }}
                                 onMouseUp={(e) => e.target.classList.remove('okCancelButtonActive')}
                            >
                                <img src={cancelIcon} width={25} alt={"cancel-button"}/>
                            </div>
                        </div>
                    </div>
                    <Keyboard

                        // beforeFirstRender={() => keyboard.current.setInput(props.inputPanel.RECORD.Value)}
                        onChange={onChange}
                        // onRender={test}
                        syncInstanceInputs={true}
                        onKeyReleased={() => inputField.focus()}
                        theme={"hg-theme-default test"}
                        onKeyPress={onKeyPress}
                        inputPanel={props.inputPanel}
                        layoutName={props.layout}
                        physicalKeyboardHighlight={true}
                        debug={true}
                        keyboardRef={r => (keyboard.current = r)}
                        buttonTheme={[
                            {
                                class: props.layout,
                                buttons: "- . 0 {bksp}"
                            }
                        ]}
                        layout={{
                            'default': [
                                '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                                '{tab} q w e r t y u i o p [ ] \\',
                                '{lock} a s d f g h j k l ; \' {enter}',
                                '{shift} z x c v b n m , . / {shift}',
                                '{num} @ {space} {OK} CANCEL'
                            ],
                            'big': [
                                '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                                '{tab} Q W E R T Y U I O P { } |',
                                '{lock} A S D F G H J K L : " {enter}',
                                '{shift} Z X C V B N M < > ? {shift}',
                                '.com @ {space}'
                            ],
                            'number': [
                                '1 2 3',
                                '4 5 6',
                                '7 8 9',
                                '- 0 {bksp}'
                            ],
                            'double': [
                                '1 2 3 ',
                                '4 5 6',
                                '7 8 9',
                                '. - 0',
                                '{bksp}'
                            ]
                        }}

                    />
                </div>
            </div>}
        </>
    )
}