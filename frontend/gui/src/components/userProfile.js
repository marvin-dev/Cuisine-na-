import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia
} from "@material-ui/core";
import PropTypes from "prop-types";
import No_data from "../img/no_data.svg";
import moment from "moment";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import LinearLoader from "./common-components/loader/linearLoader";
import Navbar from "./common-components/navbar/navbar";

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
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [raview, setRaview] = useState([]);
  const [user, setUser] = useState([]);
  const [ownrecipes, setOwnrecipes] = useState([]);

  useEffect(() => {
    let user = [];
    let recipes = [];
    setLoading(true);
    axios({
      method: "GET",
      url: `/api/account/${props.match.params.pk}`,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        user = response.data;
        setUser(user);
      })
      .catch(err => {
        console.log(err.Response);
      });
    // Own recipes
    axios({
      method: "GET",
      url: `/api/recipe/`,
      headers: {
        "content-type": "application/json"
      }
    }).then(res => {
      recipes = res.data;
      const ownrecipes = res.data.filter(x => x.author === user.pk);
      setTimeout(() => {
        setOwnrecipes(ownrecipes);
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
        setRaview(allReviewed);
      });
    });
  }, [props.match.params.pk]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
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
          <Grid item xs={12} sm={6}>
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
                label="Recipes"
                {...a11yProps(0)}
              />
              {raview.length !== 0 ? (
                <Tab
                  className={classes.tabName}
                  label="Reviews"
                  {...a11yProps(1)}
                />
              ) : (
                <Tab className={classes.tabName} disabled />
              )}
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.recipeCont}>
            <TabPanel value={value} index={0}>
              <Grid container spacing={4}>
                {ownrecipes.length !== 0
                  ? ownrecipes.map(own => (
                      <Grid item xs={12} sm={4} md={4} key={own.pk}>
                        <Card className={classes.cardRecipe}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.cardRecipeImg}
                              image={own.recipe_img_display}
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h6">
                                {own.recipe_name}
                              </Typography>

                              <Typography
                                gutterBottom
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
                              No recipe...
                            </p>
                          </div>
                        </Grid>
                      </Grid>
                    )}
              </Grid>
            </TabPanel>
          </Grid>
          {/* END RECIPES SECTION */}

          {/* REVIEWS SECTION */}
          <Grid item xs={12} sm={12} className={classes.recipeCont}>
            <TabPanel value={value} index={1}>
              <Grid container spacing={4}>
                {raview.map(ownRaview => (
                  <Grid item xs={12} sm={4} md={4} key={ownRaview.pk}>
                    <Card className={classes.cardRecipe}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.cardRecipeImg}
                          image={ownRaview.recipe_img_display}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6">
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
            </TabPanel>
          </Grid>
          {/* END REVIEWS SECTION */}
        </Grid>

        {/* End Main Content */}
      </Container>
    </React.Fragment>
  );
}

export default MyProfile;

MyProfile.propTypes = {
  history: PropTypes.object
};
