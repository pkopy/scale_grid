import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


export default function AlertDialog() {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <br></br>
                            No access to mass readout and other functions due to lack of license for ‘RDA data access module’.    
                        <br></br>
                        <br></br>
                            To activate the license contact RADWAG sales department and open SETUP | Misc. | Extension modules.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="primary" >
                        OK
                    </Button>
                </DialogActions>

            </Dialog>
            
        </div>
    );
}
