import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import loader from '../img/six.svg'

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
                props.add({Name: 'MENU',type:'menu'}, 'menu')
            }}>Menu</MenuItem>
            <MenuItem onClick={() => {
                handleClose();
                props.add({Name: 'Demo text', img1: {loader}, type:'text'}, 'text')
            }}>Text</MenuItem>
        </Menu>
    )
}
