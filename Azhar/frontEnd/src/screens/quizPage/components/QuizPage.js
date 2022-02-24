import * as React from "react";
import { Grid } from "@mui/material";
import { CustomButton, CustomQuestionCard, CustomProgress} from "../../../shared";
import { AnswerDialog } from "./";
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles(() => ({
  buttonStyle: {
    "&.MuiButtonBase-root": {
      backgroundColor: "#801313",
      marginTop: "20px",
      color: "#ffd7db",
      width: "147%",
      padding: "5px"
    }
  }
}));
const QuizComponent = ({ data, onChangeValue, answers, submitQuiz, submitResponse, handleClose, handleOpen }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container sx={{
        backgroundColor: "#fce9ef",
      }} >
        <Grid container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          backgroundColor="#fce9ef"

        >
          <Grid item sx={12}>
            <h1>Questions</h1>
          </Grid>
        </Grid>
        <Grid container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          margin={1}
          maxWidth={"100%"}>
          {data.length ?
            data.map((item, index) => <Grid item md={4}>
              <CustomQuestionCard
                index={index}
                data={item}
                onChangeValue={onChangeValue}
                answers={answers}
              />  </Grid>)
            : <CustomProgress/>}
        </Grid>
        <Grid container
          alignContent={"center"}
          alignItems="center"
          justifyContent="center"
          spacing={2}
          margin="4px"
        >
          <Grid item  sx={{
            padding: "20px",
          }}>
            <CustomButton
              label="Submit"
              handleClick={submitQuiz}
              type={"submit"}
              className={classes.buttonStyle}
            />
          </Grid>
        </Grid>
      </Grid>
      <AnswerDialog
        open={handleOpen}
        submitResponse={submitResponse}
        handleClose={handleClose}
      />
    </>
  );
};
export default QuizComponent;
