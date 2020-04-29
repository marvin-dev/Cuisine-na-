import React from "react";
import Container from "@material-ui/core/Container";
import { useStyles } from "../../styles";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

function SearchLoader(props) {
  const classes = useStyles();
  const { loading } = props;

  return (
    <React.Fragment>
      {loading && (
        <Container maxWidth="lg" className={classes.bodyloader}>
          <Grid container className={classes.recipes} spacing={6}>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton variant="rect" width={260} height={130} />
              <Skeleton style={{ marginTop: 15, width: 130 }} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton variant="rect" width={260} height={130} />
              <Skeleton style={{ marginTop: 15, width: 130 }} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton variant="rect" width={260} height={130} />
              <Skeleton style={{ marginTop: 15, width: 130 }} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton variant="rect" width={260} height={130} />
              <Skeleton style={{ marginTop: 15, width: 130 }} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton variant="rect" width={260} height={130} />
              <Skeleton style={{ marginTop: 15, width: 130 }} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton variant="rect" width={260} height={130} />
              <Skeleton style={{ marginTop: 15, width: 130 }} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton variant="rect" width={260} height={130} />
              <Skeleton style={{ marginTop: 15, width: 130 }} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton variant="rect" width={260} height={130} />
              <Skeleton style={{ marginTop: 15, width: 130 }} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton variant="rect" width={260} height={130} />
              <Skeleton style={{ marginTop: 15, width: 130 }} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton variant="rect" width={260} height={130} />
              <Skeleton style={{ marginTop: 15, width: 130 }} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton variant="rect" width={260} height={130} />
              <Skeleton style={{ marginTop: 15, width: 130 }} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton variant="rect" width={260} height={130} />
              <Skeleton style={{ marginTop: 15, width: 130 }} />
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
}

export default SearchLoader;
