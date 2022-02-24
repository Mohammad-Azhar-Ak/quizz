import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import CustomButton from "../../../shared/components/Button";

const CustomCard = ({ handleClick, index, title , buttonLabel}) => {
  return (
        <Card>
          <CardActionArea>
            <Grid container
             spacing={0}
             direction="row"
             alignItems="center"
             justifyContent="left"
             margin={3}
            >
              <Typography gutterBottom variant="h5" component="div">
                <Grid item lg={2} textAlign="left" >{index + 1}  </Grid>
              </Typography>
              <Grid item lg={8} md={6} xs={12} textAlign="center">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item lg={2} xs={4}>
                <CustomButton
                  label={buttonLabel}
                  handleClick={handleClick} />
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
  );
};

export default CustomCard;