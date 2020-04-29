import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Avatar,
  Tabs,
  Tab,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia
} from "@material-ui/core";
import PropTypes from "prop-types";
import No_data from "../img/no_data.svg";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import LinearLoader from "./common-components/loader/linearLoader";
import Navbar from "./common-components/navbar/navbar";
import DeleteRecipe from "./deleteModal";

function TabPanel(props) {
  const classes = useStyles();

  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.sidePadding}>
          {children}
        </Box>
      )}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

function MyProfile(props) {
  const classes = useStyles();
  const { history } = props;
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [raview, setRaview] = useState([]);
  const [user, setUser] = useState([]);
  const [ownrecipes, setOwnrecipes] = useState([]);
  const [limit, setLimit] = useState(6);
  const [alert, setAlert] = useState({
    open: false,
    status: null,
    text: null
  });
  const [favorite, setFavorite] = useState([]);

  const unsavedRecipe = (favorites, pk) => {
    if (user) {
      let current = favorites;
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
        url: `/api/recipe/${pk}`,
        headers: {
          authorization: `JWT ${localStorage.getItem("token")}`,
          "content-type": "application/json"
        },
        data: JSON.stringify({
          favorites: current
        })
      }).then(res => {
        let recipes = favorite;
        for (let x = 0; x < recipes.length; x++) {
          if (recipes[x].pk === pk) {
            recipes[x].favorites = res.data.favorites;
          }
        }
        setFavorite(recipes.filter(x => x.favorites.includes(user.pk)));
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

  useEffect(() => {
    let user = [];
    let recipes = [];
    setLoading(true);
    axios({
      method: "GET",
      url: `/api/account/current_user/`,
      headers: {
        authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        user = response.data;
        setUser(user);
        axios({
          method: "GET",
          url: `/api/recipe/`,
          headers: {
            "content-type": "application/json"
          }
        }).then(res => {
          recipes = res.data;
          setTimeout(() => {
            setOwnrecipes(res.data.reverse().filter(x => x.author === user.pk));
            setFavorite(
              res.data.reverse().filter(x => x.favorites.includes(user.pk))
            );
            setLoading(false);
          }, 1000);
          axios({
            method: "GET",
            url: `/api/rating_review/`,
            headers: {
              "content-type": "application/json"
            }
          }).then(ress => {
            let allReviewed = [];
            for (let x = 0; x < ress.data.length; x++) {
              if (ress.data[x].commentor === user.pk) {
                for (let y = 0; y < recipes.length; y++) {
                  if (ress.data[x].recipe === recipes[y].pk) {
                    let reviewed = ress.data[x];
                    reviewed.recipe_name = recipes[y].recipe_name;
                    reviewed.recipe_img_display = recipes[y].recipe_img_display;
                    allReviewed.push(reviewed);
                  }
                }
              }
            }
            setRaview(allReviewed.reverse());
          });
        });
      })
      .catch(() => {
        history.push("/signin");
      });
    // Own recipes
  }, [history]);

  const deleteRecipe = id => {
    setLoading(true);
    axios({
      method: "DELETE",
      url: `/api/recipe/${id}`,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          setAlert({
            open: true,
            status: "success",
            text: "Recipe deleted successfully"
          });
          setOwnrecipes(ownrecipes.filter(x => x.pk !== id));
        }, 1000);
      })
      .catch(err => {
        console.log(err.response);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setTimeout(() => {
          setAlert({
            open: true,
            status: "error",
            text: "Error deleting recipe"
          });
        }, 2000);
      });
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const loadmore = () => {
    setLimit(limit + 6);
  };

  return (
    <React.Fragment>
      {/* Loader */}
      <LinearLoader loading={loading} />
      {/* End Loader */}

      <Container maxWidth="lg" className={classes.body}>
        {/* Navbar */}
        <div className={classes.navbarContainer}>
          <Navbar />
        </div>
        {/* End Navbar */}
        {/* Main Content */}
        <Grid container>
          <div className={classes.profileHeader} />
          <Grid item xs={12} sm={6}>
            <div className={classes.headerCont}>
              <Avatar className={classes.profileAvatar}>
                {`${user.name}`.charAt(0).toUpperCase()}
              </Avatar>
              <div className={classes.headerName}>
                <Typography
                  variant="caption"
                  gutterBottom
                  className={classes.experience}
                >
                  {user.experience}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className={classes.name}
                >
                  {`${user.name}`.charAt(0).toUpperCase() +
                    `${user.name}`.slice(1)}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              aria-label="full width tabs example"
              className={classes.tabsCont}
            >
              <Tab
                className={classes.tabName}
                label="My recipes"
                {...a11yProps(0)}
              />
              {raview.length !== 0 ? (
                <Tab
                  className={classes.tabName}
                  label="My reviews"
                  {...a11yProps(1)}
                />
              ) : (
                <Tab className={classes.tabName} disabled />
              )}
              <Tab
                className={classes.tabName}
                label="Saved recipes"
                {...a11yProps(0)}
              />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.recipeCont}>
            <TabPanel value={value} index={0}>
              <Grid container spacing={4}>
                {ownrecipes.length !== 0
                  ? ownrecipes.slice(0, limit).map(own => (
                      <Grid item xs={12} sm={4} md={4} key={own.pk}>
                        <Card className={classes.cardRecipe}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.cardRecipeImg}
                              image={own.recipe_img_display}
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="h6"
                              >
                                {own.recipe_name}
                              </Typography>

                              <Typography
                                variant="caption"
                                className={classes.reviewStyle}
                              >
                                {own.recipe_desc}
                              </Typography>
                            </CardContent>
                            <Link
                              to={{
                                pathname: `/recipe-details/${own.pk}`,
                                state: {
                                  own
                                }
                              }}
                              className={classes.recipeLink}
                            />
                          </CardActionArea>
                          <CardActions>
                            <Link
                              to={{
                                pathname: `/recipe-details/${own.pk}/edit`
                              }}
                              className={classes.recipeEditLink}
                            >
                              <Button size="small" color="secondary">
                                Edit Recipe
                              </Button>
                            </Link>

                            <DeleteRecipe
                              deleteRecipe={deleteRecipe}
                              recipeId={own.pk}
                            />
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  : loading === false && (
                      <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item xs={12} sm={4}>
                          <div className={classes.noData}>
                            <img
                              src={No_data}
                              className={classes.noDataImg}
                              alt="No data"
                            />
                            <p
                              style={{
                                fontFamily: "Ubuntu",
                                paddingTop: 10,
                                color: "#40404e"
                              }}
                            >
                              Looks like you don't have any here...
                            </p>
                            <Link to="/add-recipe" className={classes.links}>
                              Click here to create one
                            </Link>
                          </div>
                        </Grid>
                      </Grid>
                    )}
              </Grid>
              {limit < ownrecipes.length && (
                <div
                  style={{
                    marginTop: 60,
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Typography
                    align="center"
                    variant="caption"
                    className={classes.loadMore}
                    onClick={loadmore}
                  >
                    Load more recipes...
                  </Typography>
                </div>
              )}
            </TabPanel>
          </Grid>
          {/* END RECIPES SECTION */}

          {/* REVIEWS SECTION */}
          <Grid item xs={12} sm={12} className={classes.recipeCont}>
            <TabPanel value={value} index={1}>
              <Grid container spacing={4}>
                {raview.slice(0, limit).map(ownRaview => (
                  <Grid item xs={12} sm={4} md={4} key={ownRaview.pk}>
                    <Card className={classes.cardRecipe}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.cardRecipeImg}
                          image={ownRaview.recipe_img_display}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="h6">
                            {ownRaview.recipe_name}
                          </Typography>

                          <div className={classes.rateDate}>
                            <Rating
                              name="read-only"
                              value={ownRaview.rating}
                              readOnly
                            />
                            <Typography
                              variant="caption"
                              className={classes.dateReview}
                            >
                              {moment(ownRaview.review_date).format(
                                "MMMM D, YYYY"
                              )}
                            </Typography>
                          </div>

                          <Typography
                            variant="caption"
                            className={classes.reviewStyle}
                          >
                            {ownRaview.review}
                          </Typography>
                        </CardContent>
                        <Link
                          to={{
                            pathname: `/recipe-details/${ownRaview.recipe}`,
                            state: {
                              ownRaview
                            }
                          }}
                          className={classes.recipeLink}
                        />
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {limit < raview.length && (
                <div
                  style={{
                    marginTop: 60,
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Typography
                    align="center"
                    variant="caption"
                    className={classes.loadMore}
                    onClick={loadmore}
                  >
                    Load more reviews...
                  </Typography>
                </div>
              )}
            </TabPanel>
          </Grid>
          {/* END REVIEWS SECTION */}

          {/* SAVED RECIPES*/}
          <Grid item xs={12} sm={12} className={classes.recipeCont}>
            <TabPanel value={value} index={2}>
              <Grid container spacing={4}>
                {favorite.length !== 0
                  ? favorite.slice(0, limit).map(fave => (
                      <Grid item xs={12} sm={4} md={4} key={fave.pk}>
                        <Card className={classes.cardRecipe}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.cardRecipeImg}
                              image={fave.recipe_img_display}
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h6">
                                {fave.recipe_name}
                              </Typography>

                              <Typography
                                variant="caption"
                                className={classes.reviewStyle}
                              >
                                {fave.recipe_desc}
                              </Typography>
                            </CardContent>
                            <Link
                              to={{
                                pathname: `/recipe-details/${fave.pk}`
                              }}
                              className={classes.recipeLink}
                            />
                          </CardActionArea>
                          <CardActions>
                            <Button
                              size="small"
                              color="secondary"
                              onClick={() =>
                                unsavedRecipe(fave.favorites, fave.pk)
                              }
                            >
                              Unsave recipe
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  : loading === false && (
                      <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item xs={12} sm={4}>
                          <div className={classes.noData}>
                            <img
                              src={No_data}
                              className={classes.noDataImg}
                              alt="No data"
                            />
                            <p
                              style={{
                                fontFamily: "Ubuntu",
                                paddingTop: 10,
                                color: "#40404e"
                              }}
                            >
                              No saved recipes...
                            </p>
                          </div>
                        </Grid>
                      </Grid>
                    )}
              </Grid>
              {limit < favorite.length && (
                <div
                  style={{
                    marginTop: 60,
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Typography
                    align="center"
                    variant="caption"
                    className={classes.loadMore}
                    onClick={loadmore}
                  >
                    Load more reviews...
                  </Typography>
                </div>
              )}
            </TabPanel>
          </Grid>
          {/* END SAVED RECIPES */}
        </Grid>

        {/* End Main Content */}

        {/* Snackbar for uploading of recipe */}
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
      </Container>
    </React.Fragment>
  );
}

export default MyProfile;

MyProfile.propTypes = {
  history: PropTypes.object
};
