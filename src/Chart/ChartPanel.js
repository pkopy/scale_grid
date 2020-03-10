import React, {useState, useEffect} from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";

export default function ServicePanel(props) {
    return (
        <>

            {<div style={{
                width: 1026, height: 612,
                transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                background: "#00000021",
                position: "absolute", top: 0, zIndex: 100
            }}>
                <div style={{
                    width: 900, position: "relative", top: 80, marginLeft: "auto",
                    marginRight: "auto", textAlign: "left", background: '#00000012',
                    boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)'

                }}>
                    <div style={{
                        // top: 0,
                        height: 40,
                        width: '100%',
                        position: "relative",
                        backgroundColor: '#3f51b5',
                        borderRadius: '7px 7px 0 0',
                        color: '#fff',
                        top: 4
                    }}>
                        <div style={{
                            transform: 'translate(0, 50%)', paddingLeft: 15
                        }}><b>CHART</b></div>
                    </div>
                    <div
                        style={{
                            height: 450,
                            background: '#fff',
                            position: "relative",
                            // top:15,
                            borderRadius: '0 0 7px 7px'
                        }}
                    >

                    </div>
                </div>
            </div>}
        </>
    )
}