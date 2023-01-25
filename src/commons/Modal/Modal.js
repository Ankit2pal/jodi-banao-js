import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ModelStyles from './Modal.module.scss';

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'relative',
            right: 0,
            top: 0,
            color: '#fff'
          }}>
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  );
};

const Modal = ({ title, handleClose, open = false, children, buttons, fullWidth, maxWidth }) => {
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby={`${title}-dialog-title`}
        open={open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          sx={{
            display: 'flex',
            padding: { xs: '15px 42px 15px 50px', sm: '15px 50px 15px 58px' },
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#fff',
            marginBottom: '25px'
          }}
          className={ModelStyles['dialog-title']}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent className={ModelStyles['dialog-content-root']}>{children}</DialogContent>
        <DialogActions className={ModelStyles['dialog-actions-root']}>
          {buttons &&
            buttons.map((item) => (
              <Button
                sx={{
                  color: '#fff',
                  minWidth: '100px',
                  backgroundColor: '#f14046',
                  '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                    backgroundColor: '#f14046'
                  }
                }}
                autoFocus
                onClick={handleClose}
                id={item.id}
                key={item.id}
                disabled={item.isDisabled}
                className={item.className ? item.className : 'btn-default'}>
                {item.label}
              </Button>
            ))}
        </DialogActions>
      </Dialog>
    </>
  );
};

Modal.propTypes = {
  details: PropTypes.shape({
    popupHeading: PropTypes.string,
    PopUpText: PropTypes.string
  }),
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  children: PropTypes.element.isRequired,
  buttons: PropTypes.array,
  title: PropTypes.string,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
};

// PropTypes.shape({
//     id: PropTypes.string,
//     label: PropTypes.string,
//     handler: PropTypes.func,
//     isDisabled: PropTypes.bool,
//     className: PropTypes.string
// })

Modal.defaultProps = {
  fullWidth: true,
  maxWidth: 'sm',
  buttons: []
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
