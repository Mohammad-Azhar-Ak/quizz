import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { CustomRadioButton } from '../../';
import { choice } from "../../constants";

const QuestionCard = ({ index, data, onChangeValue, answers }) => {
    return (
        <Card sx={{
            maxWidth: 600,
            backgroundColor: "#f8bbd0",
            margin: "2px",
            border: "solid",
            borderColor: "#801313",
            borderWidth: "5px",
            maxHeight: 210,
            
        }}>
            <CardActionArea style={{ justifyContent: "left" }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Question-{index + 1}
                    </Typography>
                    <Typography variant="body1" color="text.primary" sx={{maxHeight:48,minHeight:48,overflow:"auto"}} >
                        {data.statement}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{
                justifyContent: "center",
                backgroundColor: "#fce9ef",
                borderTop: "solid",
                borderTopColor: "#801313",
                borderTopWidth:"5px"
            }}>
                <CustomRadioButton
                    options={choice}
                    value={answers[data.id]}
                    handleChange={(value) => onChangeValue(data.id, value)} />
            </CardActions>
        </Card>
    );
}
export default QuestionCard