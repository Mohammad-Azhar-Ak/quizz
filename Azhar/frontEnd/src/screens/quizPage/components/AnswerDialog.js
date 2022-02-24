import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AnswerDialog = ({ open, handleClose, submitResponse }) => {

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{backgroundColor:"#ffd7db"}}
      >
        <DialogTitle sx={{color:"#801313", alignContent:"center"}}>{"-----Final Score-----"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <h3>Right Answers :{submitResponse.rightCount}</h3>
            <h3>Wrong Answers :{submitResponse.wrongCount} </h3>
            <h3>Scores  :{submitResponse.totalScore} / {submitResponse.totalMarks}  </h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{bacgroundColor:"#801313"}}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AnswerDialog
