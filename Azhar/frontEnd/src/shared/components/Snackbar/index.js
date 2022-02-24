import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

const CustomPositionedSnackbar=({anchorOrigin, open, onClose, message})=> {
 
  return (
    <div>
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={open}
        onClose={onClose}
        message={message}
      />
    </div>
  );
}

export default CustomPositionedSnackbar
