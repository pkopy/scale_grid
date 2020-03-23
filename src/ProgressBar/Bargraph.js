import React, {useEffect, useState} from 'react';

export default function Bargraph(props) {
    return (
        <div
            style={{width: '100%', height: props.height, background: '#cecece', border: '1px inset'}}

        >
            <div
                style={{
                    transition: 'width 1s',
                    width: props.value < 100 ? `${props.value}%` : '100%',
                    background: props.color,
                    height: props.height,
                }}
            >
            </div>
            {props.max > 0 && <div style={{
                borderLeft: props.min > 0 ? '1px solid' : 'none',
                borderRight: '1px solid',
                width: `${props.max - props.min}%`,
                height: props.height,
                left: `${props.min}%`,
                position: "absolute",
                top: 0
            }}/>}
            {props.tMax > 0 && <div style={{
                borderLeft: props.tMin > 0 ? '1px solid' : 'none',
                borderRight: '1px solid',
                width: `${props.tMax - props.tMin}%`,
                height: props.height,
                left: `${props.tMin}%`,
                position: "absolute",
                top: 0
            }}/>}
            {props.target > 0 && <div style={{
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '10px solid #000',
                width: 0,
                height: 0,
                left: `calc(${props.target}% - 2px)`,
                position: "absolute",
                top: 0
            }}/>}

        </div>
    )
}