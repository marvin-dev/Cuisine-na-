import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import { animateScroll as scroll } from "react-scroll";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import UpdateIcon from "@material-ui/icons/Update";
import Tooltip from "@material-ui/core/Tooltip";
import ServingIcon from "@material-ui/icons/GroupOutlined";
import PrepIcon from "@material-ui/icons/ScheduleOutlined";
import Rating from "@material-ui/lab/Rating";
import RatingModal from "./rating";
import Navbar from "./common-components/navbar/navbar";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import axios from "axios";
import Top from "@material-ui/icons/KeyboardArrowUp";
import Fab from "@material-ui/core/Fab";
import Loader from "./common-components/loader/recipeDetailsLoader";
import { Link } from "react-router-dom";

const Recipe = ({ match }) => {
  const classes = useStyles();
  const [recipes, setItem] = useState([]);
  const [creator, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [raview, setRaview] = useState([]);
  const [average, setValue] = React.useState();
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios({
        method: "GET",
        url: `/api/account/current_user/`,
        headers: {
          authorization: `JWT ${localStorage.getItem("token")}`
        }
      }).then(response => {
        setUser(response.data);
      });
    }
    setTimeout(() => {
      fetchItem();
      setLoading(false);
    }, 1500);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fetchItem = () => {
    let reviewer = [];
    axios({
      method: "GET",
      url: `/api/recipe/${match.params.pk}`,
      headers: {
        "content-type": "application/json"
      }
    }).then(res => {
      const recipes = res.data;
      setItem(recipes);
      // for recipe author
      axios({
        method: "GET",
        url: `/api/account/${recipes.author}`,
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => {
          const creator = response.data;
          setAuthor(creator);
        })
        .catch(err => {
          console.log(err.Response);
        });
      // for recipe rating and review
      axios({
        method: "GET",
        url: `/api/rating_review/`,
        headers: {
          "content-type": "application/json"
        }
      }).then(ress => {
        const reviews = ress.data.reverse();

        // average rating
        let overall = reviews.filter(
          x => x.recipe === parseInt(match.params.pk)
        );
        let total = overall.reduce(function(prev, current) {
          return prev + current.rating;
        }, 0);
        let average = total / overall.length;
        setValue(Math.round(average));

        // for commentor
        axios({
          method: "GET",
          url: `/api/account/`,
          headers: {
            "content-type": "application/json"
          }
        })
          .then(com => {
            const accounts = com.data;
            for (let x = 0; x < reviews.length; x++) {
              for (let y = 0; y < accounts.length; y++) {
                if (
                  reviews[x].commentor === accounts[y].pk &&
                  `${reviews[x].recipe}` === match.params.pk
                ) {
                  reviews[x].name = accounts[y].name;
                  reviews[x].userId = accounts[y].pk;
                  reviewer.push(reviews[x]);
                }
              }
            }
            setRaview(reviewer);
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  };

  const reviews = data => {
    let review = raview.reverse();
    review.push(data);
    setRaview([...review.reverse()]);
  };

  const loadmore = () => {
    setLimit(limit + 4);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <React.Fragment>
      {/* Loader */}
      <Loader loading={loading} />
      {/* End Loader */}

      <Container maxWidth="lg" className={classes.body}>
        {/* Navbar */}
        <div className={classes.navbarContainer}>
          <Navbar />
        </div>
        {/* End Navbar */}

        {/* Main Content */}
        {recipes.length !== 0 && (
          <div>
            <Grid container style={{ marginTop: "125px" }}>
              <Grid item xs={12} sm={6}>
                <div className={classes.recipeImgContainer}>
                  <img
                    alt="recipe_image"
                    src={recipes.recipe_img_display}
                    className={classes.recipeImg}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.recipeDetails}>
                  <Typography
                    variant="h3"
                    gutterBottom
                    className={classes.recipeTitle2}
                  >
                    {recipes.recipe_name}
                  </Typography>
                  <Typography
                    variant="caption"
                    className={classes.recipeDescription}
                    gutterBottom
                  >
                    {recipes.recipe_desc}
                  </Typography>
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
                    <PrepIcon className={classes.icons} />
                    <Typography
                      variant="caption"
                      className={`${classes.recipeDescription} ${classes.boldFont}`}
                      gutterBottom
                    >
                      Prep Time
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.recipeDescription}
                      gutterBottom
                    >
                      {Math.floor(recipes.prep_time / 60)
                        ? `${Math.floor(recipes.prep_time / 60)} hr/s `
                        : null}
                      {recipes.prep_time % 60
                        ? `${recipes.prep_time % 60} min/s`
                        : null}
                    </Typography>
                  </div>
                  <div
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <UpdateIcon className={classes.icons} />
                    <Typography
                      variant="caption"
                      className={`${classes.recipeDescription} ${classes.boldFont}`}
                      gutterBottom
                    >
                      Cooking Time
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.recipeDescription}
                      gutterBottom
                    >
                      {Math.floor(recipes.cooking_time / 60)
                        ? `${Math.floor(recipes.cooking_time / 60)} hr/s `
                        : null}
                      {recipes.cooking_time % 60
                        ? `${recipes.cooking_time % 60} min/s`
                        : null}
                    </Typography>
                  </div>
                  <div
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <ServingIcon className={classes.icons} />
                    <Typography
                      variant="caption"
                      className={`${classes.recipeDescription} ${classes.boldFont}`}
                      gutterBottom
                    >
                      Servings
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.recipeDescription}
                      gutterBottom
                    >
                      {recipes.serving}
                    </Typography>
                  </div>
                </div>
                <Divider
                  orientation="horizontal"
                  style={{ marginTop: "14px" }}
                />
                <div className={classes.authorRating}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    className={classes.recipeAuthor}
                  >
                    Created by{" "}
                    <Link
                      to={{ pathname: `/profile/${creator.pk}` }}
                      style={{ textDecoration: "none" }}
                    >
                      <p className={classes.authorName}>{creator.name}</p>
                    </Link>
                  </Typography>
                  <Rating name="read-only" value={parseInt(average)} readOnly />
                </div>
              </Grid>
            </Grid>

            <Grid container className={classes.recipeIngPro}>
              <Grid item xs={12} sm={7}>
                <Typography
                  variant="h5"
                  gutterBottom
                  className={classes.recipeProcedure}
                >
                  How to make it
                </Typography>

                {Object.keys(recipes).map(
                  (key, index) =>
                    key === "process" && (
                      <div key={index}>
                        {recipes.process.split("\n").map((procedures, i) => (
                          <div key={i}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center"
                              }}
                            >
                              <Typography
                                variant="h6"
                                gutterBottom
                                className={classes.procedureStepTitle}
                              >
                                Step {i + 1}
                              </Typography>
                              <Divider orientation="horizontal" />
                            </div>
                            <Typography
                              variant="body1"
                              gutterBottom
                              className={classes.procedureStep}
                            >
                              {procedures}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    )
                )}
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography
                  variant="h5"
                  gutterBottom
                  className={classes.recipeIngredients}
                >
                  Ingredients
                </Typography>

                {Object.keys(recipes).map(
                  (key, index) =>
                    key === "ingredients" && (
                      <div key={key}>
                        {recipes.ingredients.split("\n").map((sahog, i) => {
                          return (
                            <div key={i}>
                              <Typography
                                variant="body1"
                                gutterBottom
                                className={classes.ingredients}
                              >
                                {sahog}
                              </Typography>
                              <Divider
                                orientation="horizontal"
                                style={{ margin: "18px 50px" }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )
                )}
              </Grid>
            </Grid>
            <Divider orientation="horizontal" style={{ marginTop: "20px" }} />
            {creator.pk !== user.pk && (
              <React.Fragment>
                <Grid
                  container
                  spacing={5}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={12} md={6} className={classes.reviewContainer}>
                    <RatingModal
                      recipeId={match.params.pk}
                      userState={user}
                      reviews={reviews}
                    />
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
            <Typography
              variant="h5"
              gutterBottom
              className={classes.ratingReviews}
            >
              Rating and reviews
            </Typography>
          </div>
        )}

        <Grid container spacing={5} style={{ marginTop: 30 }}>
          {!loading && raview.length !== 0 ? (
            raview.slice(0, limit).map(display => (
              <Grid item xs={12} sm={12} md={12} key={display.pk} id="_1">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar className={classes.red}>
                    {`${display.name}`.charAt(0).toUpperCase()}
                  </Avatar>
                  <Link
                    to={{ pathname: `/profile/${display.userId}` }}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {" "}
                    <Tooltip title="View Profile" placement="top">
                      <Typography
                        variant="body1"
                        style={{ textTransform: "capitalize" }}
                      >
                        {display.name}
                      </Typography>
                    </Tooltip>
                  </Link>
                </div>
                <Divider
                  orientation="horizontal"
                  style={{ marginTop: "14px", marginBottom: "10px" }}
                />

                <div className={classes.rateDate}>
                  <Rating
                    name="read-only"
                    value={display.rating}
                    readOnly
                    style={{ fontSize: 19 }}
                  />
                  <Typography variant="caption" className={classes.dateReview}>
                    {moment(display.review_date).format("MMMM D, YYYY")}
                  </Typography>
                </div>

                <Typography
                  variant="caption"
                  gutterBottom
                  className={classes.reviews}
                >
                  {display.review}
                </Typography>
              </Grid>
            ))
          ) : loading === false && raview.length === 0 ? (
            <Typography variant="body1" className={classes.noreviews}>
              No reviews available
            </Typography>
          ) : null}

          {!loading && limit < raview.length && (
            <div
              style={{
                margin: "0 auto",
                marginTop: 60
              }}
            >
              <Typography
                align="center"
                variant="caption"
                className={classes.loadMore}
                onClick={loadmore}
                htmlFor="_1"
              >
                Load more reviews...
              </Typography>
            </div>
          )}
          <Fab
            color="secondary"
            size="large"
            aria-label="add"
            float="right"
            className={classes.scroll}
            onClick={scrollToTop}
          >
            <Top fontSize="large" className={classes.resIcon} />
          </Fab>
        </Grid>
        {/* End Main Content */}
      </Container>
    </React.Fragment>
  );
};

export default Recipe;
