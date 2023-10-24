import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

DialogConfirm.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  open: PropTypes.bool,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogConfirm(props) {
  const [open, setOpen] = React.useState(props.open);
  useEffect(() => {
    setOpen(props.open); // Synchronize the open state with the prop
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    props.onOk();
    handleClose();
  };

  const handleCancel = () => {
    props.onCancel();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.cancelText && (
          <Button onClick={handleCancel} variant="outlined">
            {props.cancelText}
          </Button>
        )}
        {props.okText && (
          <Button onClick={handleOk} variant="outlined" color="color1">
            {props.okText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DialogConfirm;
