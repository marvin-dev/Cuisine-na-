import React, { useState } from "react";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  CardActionArea,
  CardMedia,
  Typography,
  Tooltip,
  Snackbar
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FavoriteIcon from "@material-ui/icons/Favorite";

function SearchRecipe(props) {
  const classes = useStyles();
  const { item, user } = props;
  const [favorite, setFavorite] = useState(item.favorites);
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
        url: `/api/recipe/${item.pk}`,
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
      <Grid item xs={12} sm={4} md={3} key={item.pk}>
        <div className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={item.recipe_img_display}
            />
            <Link
              to={{
                pathname: `/recipe-details/${item.pk}`,
                state: {
                  item
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
            {item.recipe_name}
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

export default SearchRecipe;
