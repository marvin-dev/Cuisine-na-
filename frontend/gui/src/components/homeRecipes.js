import React, { useState } from "react";
import { useStyles } from "./styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Tooltip from "@material-ui/core/Tooltip";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

function HomeRecipes(props) {
  const classes = useStyles();
  const { recipe, user } = props;
  const [favorite, setFavorite] = useState(recipe.favorites);
  const [alert, setAlert] = useState({
    open: false,
    status: null,
    text: null
  });

  const addToFave = e => {
    e.persist();
    if (user) {
      let current = favorite;
      if (current.includes(user.pk)) {
        let index = current.indexOf(user.pk);
        if (index > -1) {
          current.splice(index, 1);
        }
      } else {
        current.push(user.pk);
      }
      axios({
        method: "PATCH",
        url: `/api/recipe/${recipe.pk}`,
        headers: {
          authorization: `JWT ${localStorage.getItem("token")}`,
          "content-type": "application/json"
        },
        data: JSON.stringify({
          favorites: current
        })
      }).then(res => {
        setFavorite([...res.data.favorites]);
        setTimeout(() => {
          if ([...res.data.favorites].includes(user.pk)) {
            let index = [...res.data.favorites].indexOf(user.pk);
            if (index > -1) {
              setAlert({
                open: true,
                status: "success",
                text: "Successfully added to saved recipes"
              });
            }
          } else {
            setAlert({
              open: true,
              status: "warning",
              text: "Successfully removed from saved recipes"
            });
          }
        }, 1000);
      });
    }
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({
      ...alert,
      open: false
    });
  };

  return (
    <React.Fragment>
      <Grid item xs={12} sm={4}>
        <div className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={recipe.recipe_img_display}
            ></CardMedia>
            <Link
              to={{
                pathname: `/recipe-details/${recipe.pk}`,
                state: {
                  recipe
                }
              }}
              className={classes.recipeLink}
            />
          </CardActionArea>
          {localStorage.getItem("token") && (
            <div className={classes.favoriteWrapper} onClick={addToFave}>
              {!favorite.includes(user.pk) ? (
                <Tooltip title="Save this Recipe" placement="top">
                  <FavoriteIcon className={classes.favorite} />
                </Tooltip>
              ) : (
                <Tooltip title="Save this Recipe" placement="top">
                  <FavoriteIcon className={classes.savedFavorite} />
                </Tooltip>
              )}
            </div>
          )}
          <Typography
            variant="subtitle2"
            className={classes.recipeTitle}
            display="block"
            gutterBottom
          >
            {recipe.recipe_name}
          </Typography>
        </div>
      </Grid>
      {/* Snackbar for adding to favorite */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={alert.open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alert.status}>
          {alert.text}
        </Alert>
      </Snackbar>
      {/* End Snackbar for uploading of recipe */}
    </React.Fragment>
  );
}

export default HomeRecipes;
