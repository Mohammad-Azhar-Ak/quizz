import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import CustomButton from '../Button';

export default function MultiActionAreaCard({ index, title, handleClick }) {
  return (
    <Card sx={{
      maxWidth: 200,
      backgroundColor: "#f8bbd0",
      border: "solid",
      borderColor: "#801313",
      textAlign: "center"
    }}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{
          justifyContent: "center",
          backgroundColor: "#fce9ef",
          borderTop:"solid",
          borderTopColor:"#801313"
        }}>
        <CustomButton
          handleClick={handleClick}
          type="Submit"
          label="Play Quiz" />
      </CardActions>
    </Card>
  );
}
