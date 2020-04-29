import React from "react";
import { useStyles } from "../../styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

function RecipeDetailsLoader(props) {
  const classes = useStyles();
  const { loading } = props;

  return (
    <React.Fragment>
      {loading && (
        <Container maxWidth="lg" className={classes.bodyloader}>
          {/* Navbar */}
          <div className={classes.navbarContainer}></div>
          {/* End Navbar */}
          {/* Main Content */}
          <div>
            <Grid container style={{ marginTop: "125px" }}>
              <Grid item xs={12} sm={6}>
                <Skeleton
                  variant="rect"
                  className={classes.recipeImg}
                  height={390}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.recipeDetails}>
                  <Skeleton className={classes.recipeTitle2} width="45%" />
                  <Skeleton
                    className={classes.recipeDescription}
                    height={130}
                  />
                </div>
                <div className={classes.recipeInfo}>
                  <div
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Skeleton className={classes.time} height={80} />
                  </div>
                  <div
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Skeleton className={classes.time} height={80} />
                  </div>
                  <div
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Skeleton className={classes.time} height={80} />
                  </div>
                </div>
                <div className={classes.authorRatingLod}>
                  <Skeleton width={160} height={25} />
                  <Skeleton width={110} height={25} />
                </div>
              </Grid>
            </Grid>

            <Grid container className={classes.recipeIngProLoad}>
              <Grid item xs={12} sm={7}>
                <div style={{ marginLeft: 30 }}>
                  <Skeleton
                    width="40%"
                    height={35}
                    style={{ marginBottom: 30 }}
                  />
                  <Skeleton width="15%" />
                  <Skeleton className={classes.processloader} height={25} />
                  <div className={classes.spacer} />
                  <Skeleton width="10%" />
                  <Skeleton width="50%" />
                  <div className={classes.spacer} />
                  <Skeleton width="10%" />
                  <Skeleton className={classes.processloader} />
                  <div className={classes.spacer} />
                  <Skeleton width="10%" />
                  <Skeleton width="40%" />
                  <div className={classes.spacer} />
                  <Skeleton width="10%" />
                  <Skeleton className={classes.processloader} />
                  <div className={classes.spacer} />
                  <Skeleton width="10%" />
                  <Skeleton width="50%" />
                  <div className={classes.spacer} />
                  <Skeleton width="10%" />
                  <Skeleton width="50%" />
                </div>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Skeleton
                  width="50%"
                  height={35}
                  style={{ marginBottom: 30 }}
                />
                <Skeleton className={classes.processloader} height={25} />
                <div className={classes.spacer} />
                <Skeleton className={classes.processloader} />
                <div className={classes.spacer} />
                <Skeleton width="50%" />
                <div className={classes.spacer} />
                <Skeleton className={classes.processloader} />
                <div className={classes.spacer} />
                <Skeleton width="60%" />
              </Grid>
            </Grid>
          </div>
        </Container>
      )}
    </React.Fragment>
  );
}

export default RecipeDetailsLoader;
