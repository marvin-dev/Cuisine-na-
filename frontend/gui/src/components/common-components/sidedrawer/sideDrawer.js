import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./sideDrawerStyles";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import DehazeIcon from "@material-ui/icons/Dehaze";

export default function TemporaryDrawer(props) {
  const { handle_logout } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <ul className={classes.sideDrawerList}>
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
        {localStorage.getItem("token") ? (
          <li className={classes.menuFont}>
            <Link to="signin" style={{ textDecoration: "none" }}>
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
          </li>
        ) : (
          <div>
            <li className={classes.menuFont}>
              <Link to="/signin" className={classes.links}>
                Signin
              </Link>
            </li>
            <li className={classes.menuFont}>
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
            </li>
          </div>
        )}
      </ul>
    </div>
  );

  return (
    <div>
      <DehazeIcon
        onClick={toggleDrawer("right", true)}
        className={classes.menu}
      />
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </div>
  );
}
