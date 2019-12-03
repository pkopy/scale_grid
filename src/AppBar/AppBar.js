import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RefreshIcon from '@material-ui/icons/Refresh';
import Buttons from '../Buttons/Buttons'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


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
    fetch(`http://127.0.0.1:9000/close`)
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

export default function ButtonAppBar(props) {
    const classes = useStyles();
    const [openButtons, setOpenButtons] = React.useState(false)
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
                    <Typography variant="h6" className={classes.title}>
                        SMART DISPLAY
          </Typography>
                    {!props.blocked && <IconButton color="inherit" onClick={() => props.getLayout()}>
                        <RefreshIcon />
                    </IconButton>}
                    {!props.blocked && <IconButton color="inherit" onClick={() => setOpenButtons(!openButtons)}>
                        <AddCircleOutlineIcon />
                    </IconButton>}
                    {!props.blocked && <IconButton color="inherit" onClick={props.block}>
                        <LockOpenOutlinedIcon />
                    </IconButton>}
                    {props.blocked && <IconButton color="inherit" onClick={close}>
                        <HighlightOffIcon />
                    </IconButton>}
                    {props.blocked && <IconButton color="inherit" onClick={props.block}>
                        <LockIcon />
                       
                    </IconButton>}
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
            {openButtons && <Buttons 
                setOpenButtons={setOpenButtons}
                add={props.add}
            />}
        </div>
    );
}
