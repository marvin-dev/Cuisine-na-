import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  progress: {
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: "1000 !important",
    height: 4
  }
}));

function LinearLoader(props) {
  const { loading } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      {loading && (
        <div className={classes.progress}>
          <LinearProgress color="secondary" />
        </div>
      )}
    </React.Fragment>
  );
}

export default LinearLoader;
