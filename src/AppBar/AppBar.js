import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RefreshIcon from '@material-ui/icons/Refresh';
import Buttons from '../Buttons/Buttons'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import AddPanel from "../AddPanel/AddPanel";
import DateTime from "../DateTime/DateTime";
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'left'
    },
}));

const close = () => {
    fetch(`http://127.0.0.1:8400/close`)
        .then(data => {
        })
        .catch(err => console.log(err))
};


export default function ButtonAppBar(props) {
    const classes = useStyles();
    const [openButtons, setOpenButtons] = React.useState(false);
    const [title, setTitle] = React.useState('SMART DISPLAY');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openMenu, setOpenMenu] = React.useState(false);
    const clickHamburger = () => {
        if (!props.hamburger) {
            if (!props.blocked) props.block();
            props.showMenu();
            // if(props.menu)
            // setTitle(props.menu.Name);
            props.setHamburger(true);
            // console.log(props.menu)
        } else {
            props.close();

            // setTitle('SMART DISPLAY');
        }
    };

    const handleOpen = () => {
        setOpenMenu(!openMenu);

        const layout = props.layout;
        for (let item of layout) {
            if (item.elem && item.elem.Name === 'MENU') {
                props.setDisabledAddMenuButton(true);
                break;
            } else {
                props.setDisabledAddMenuButton(false);
            }
        }
    };

    React.useEffect(() => {


        setTitle(props.menu.Name || 'SMART DISPLAY')

    }, [props.menu]);
    return (
        <div className={classes.root}>

            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" onClick={clickHamburger}>
                        {!props.hamburger && <MenuIcon/>}
                        {props.hamburger && <ClearIcon/>}
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.menu.Name ? title.toUpperCase() : 'SMART DISPLAY'}
                    </Typography>

                    <DateTime
                        date={'2020-02-05'}
                    />
                    <IconButton color="inherit" onClick={() => props.getLayout()}>
                        <RefreshIcon/>
                    </IconButton>
                    {!props.blocked && <IconButton color="inherit" onClick={(e) => {handleOpen(); setAnchorEl(e.currentTarget); console.log(e.currentTarget)}}>
                        <AddCircleOutlineIcon/>
                    </IconButton>}

                    {!props.blocked && <IconButton color="inherit" onClick={props.block}>
                        <LockOpenOutlinedIcon/>
                    </IconButton>}

                    {props.blocked && window.location.hostname === '127.0.0.1' &&
                    <IconButton color="inherit" onClick={close}>
                        <HighlightOffIcon/>
                    </IconButton>}

                    {props.blocked && <IconButton color="inherit" onClick={props.block}>
                        <LockIcon/>
                    </IconButton>}

                </Toolbar>

            </AppBar>

            {openButtons && <Buttons
                setOpenButtons={setOpenButtons}
                // setOpenButtons={false}
                add={props.add}
                socketAct={props.socketAct}
            />}

            {openMenu && <AddPanel
                setOpenButtons={setOpenButtons}
                setOpenMenu={setOpenMenu}
                openMenu={openMenu}
                anchorEl={anchorEl}
                add={props.add}
                disabledAddMenuButton={props.disabledAddMenuButton}
                setAnchorEl={setAnchorEl}
            />}

        </div>
    );
}
