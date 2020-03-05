import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


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
                props.add({Name: 'TEXT', type:'text', activeTab: 0}, 'text')
            }}>Text</MenuItem>
            <MenuItem onClick={() => {
                handleClose();
                props.add({Name: 'GRAPH', type:'graph', activeTab: 0}, 'graph')
            }}>Graph</MenuItem>

        </Menu>
    )
}
