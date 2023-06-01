import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Button } from "bootstrap";
const ConfirmationDialog=(props)=>{
    const {open,onClose,onConfirm,title,description}=props;
    return(
        <Dialog 
        open={open}
        onClose={()=>onClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="cancel-popup">
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button type="button" 
                onClick={()=>onClose()}
                >Cancle</Button>
                <Button type="button" 
                onClick={()=>onConfirm()}
                >Ok</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;