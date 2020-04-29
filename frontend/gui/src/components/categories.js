import React from "react";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

export default function Categories() {
  const classes = useStyles();

  return (
    <div className={classes.catStyle}>
      <Typography variant="h6" className={classes.catFont} gutterBottom>
        <Link to="#" className={classes.catLink}>
          Appetizers
        </Link>
      </Typography>
      <Typography variant="h6" className={classes.catFont} gutterBottom>
        <Link to="#" className={classes.catLink}>
          Snacks
        </Link>
      </Typography>
      <Typography variant="h6" className={classes.catFont} gutterBottom>
        <Link to="#" className={classes.catLink}>
          Main Dishes
        </Link>
      </Typography>
      <Typography variant="h6" className={classes.catFont} gutterBottom>
        <Link to="#" className={classes.catLink}>
          Desserts
        </Link>
      </Typography>
      <Typography variant="h6" className={classes.catFont} gutterBottom>
        <Link to="#" className={classes.catLink}>
          Breakfast
        </Link>
      </Typography>
      <Typography variant="h6" className={classes.catFont} gutterBottom>
        <Link to="#" className={classes.catLink}>
          Lunch
        </Link>
      </Typography>
      <Typography variant="h6" className={classes.catFont} gutterBottom>
        <Link to="#" className={classes.catLink}>
          Dinner
        </Link>
      </Typography>
      <Typography variant="h6" className={classes.catFont} gutterBottom>
        <Link to="#" className={classes.catLink}>
          Smoothies
        </Link>
      </Typography>
    </div>
  );
}
