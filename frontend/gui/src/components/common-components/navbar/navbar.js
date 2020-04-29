import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./navbarStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import SideDrawer from "../sidedrawer/sideDrawer";

function Navbar() {
  const handle_logout = () => {
    localStorage.removeItem("token");
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Toolbar className={classes.navbar} id="navbar">
        <Grid item xs={12} sm={12} className={classes.toolbarCont}>
          <li className={classes.logoFont}>
            <Link to="/home" className={classes.logoFont}>
              Cuisine-na
            </Link>
          </li>
          <li className={classes.menuFont}>
            <Link to="/home" className={classes.links}>
              Home
            </Link>
          </li>
          <li className={classes.menuFont}>
            <Link to="/search-recipe" className={classes.links}>
              All Recipes
            </Link>
          </li>
          {localStorage.getItem("token") && (
            <li className={classes.menuFont}>
              <Link to="/add-recipe" className={classes.links}>
                Add recipe
              </Link>
            </li>
          )}
          {localStorage.getItem("token") && (
            <li className={classes.menuFont}>
              <Link to="/my-profile" className={classes.links}>
                My profile
              </Link>
            </li>
          )}
          <div className={classes.navRight}>
            {localStorage.getItem("token") ? (
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Fab
                  variant="extended"
                  aria-label="add"
                  onClick={handle_logout}
                  className={classes.signupBtn}
                  classes={{
                    root: classes.fabStyle
                  }}
                >
                  Logout
                </Fab>
              </Link>
            ) : (
              <React.Fragment>
                <Link
                  to="/signin"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <Typography className={classes.menuFont} variant="h6">
                    Sign In
                  </Typography>
                </Link>

                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Fab
                    variant="extended"
                    aria-label="add"
                    className={classes.signupBtn}
                    classes={{
                      root: classes.fabStyle
                    }}
                  >
                    Signup
                  </Fab>
                </Link>
              </React.Fragment>
            )}
          </div>
          <li className={classes.drawer}>
            <SideDrawer
              className={classes.menu}
              handle_logout={handle_logout}
            />
          </li>
        </Grid>
      </Toolbar>
    </React.Fragment>
  );
}

export default Navbar;
