import React from "react";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

function HomeLoader(props) {
  const { loadingRcp } = props;

  return (
    <React.Fragment>
      {loadingRcp && (
        <Grid container spacing={3} style={{ marginTop: 40 }}>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rect" height={130} />
            <Skeleton style={{ marginTop: 15, width: 160 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rect" height={130} />
            <Skeleton style={{ marginTop: 15, width: 160 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rect" height={130} />
            <Skeleton style={{ marginTop: 15, width: 160 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rect" height={130} />
            <Skeleton style={{ marginTop: 15, width: 160 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rect" height={130} />
            <Skeleton style={{ marginTop: 15, width: 160 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rect" height={130} />
            <Skeleton style={{ marginTop: 15, width: 160 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rect" height={130} />
            <Skeleton style={{ marginTop: 15, width: 160 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rect" height={130} />
            <Skeleton style={{ marginTop: 15, width: 160 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rect" height={130} />
            <Skeleton style={{ marginTop: 15, width: 160 }} />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
export default HomeLoader;
