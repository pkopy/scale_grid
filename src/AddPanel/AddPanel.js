import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import loader from '../img/six.svg'
import {IconButton} from '@material-ui/core';
import helpers from '../Helpers/helpers.js'


const useStyles = makeStyles(theme => ({
    listPanel: {
        width: 1024,
        height: 530,
        border: '1px solid rgb(0,0,0,0.2)',
        position: 'absolute',
        zIndex: 100,
        backgroundColor: '#f0f8ff', //bf
        transition: '1s',

        // left:-1100
    }
}));


export default function AddPanel(props) {


    const handleClose = () => {
        props.setOpenMenu(false)
    };

    const openAddButton = () => {
        handleClose();
        props.setOpenButtons(true)
    };

    return (
        <Menu
            id="simple-menu"
            anchorEl={props.anchorEl}
            keepMounted
            open={props.openMenu}
            onClose={handleClose}
        >
            <MenuItem onClick={openAddButton}>Button</MenuItem>
            <MenuItem disabled={props.disabledAddMenuButton} onClick={() => {
                handleClose();
                props.add({Name: 'MENU'}, 'menu')
            }}>Menu</MenuItem>
            <MenuItem onClick={() => {
                handleClose();
                props.add({Name: 'Demo text', img1: {loader}}, 'text')
            }}>Text</MenuItem>
        </Menu>
    )
}
