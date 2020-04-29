import React, { useState, useEffect } from "react";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Navbar from "./common-components/navbar/navbar";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import No_data from "../img/no_data.svg";
import HomeLoader from "./common-components/loader/homeLoader";
import LinearLoader from "./common-components/loader/linearLoader";
import ListRecipes from "./homeRecipes";

function Home(props) {
  const { history } = props;
  const classes = useStyles();
  const [limit, setLimit] = useState(9);
  const [state, setstate] = useState({ recipes: [] });
  const [filtered, setFiltered] = useState([]);
  const [loadingRcp, setLoadingRcp] = useState(true);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    setLoadingRcp(true);
    axios.get("/api/recipe/").then(res => {
      setTimeout(() => {
        setstate({
          recipes: res.data
        });
        setFiltered(res.data);
        setLoadingRcp(false);
      }, 1200);
    });
    axios({
      method: "GET",
      url: `/api/recipe/category/`,
      headers: {
        "content-type": "application/json"
      }
    }).then(res => {
      const category = res.data;
      setCategory(category);
    });

    if (localStorage.getItem("token")) {
      axios({
        method: "GET",
        url: `/api/account/current_user/`,
        headers: {
          authorization: `JWT ${localStorage.getItem("token")}`
        }
      })
        .then(res => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.clear();
          history.push("/signin");
        });
    }
    setLoading(false);
  }, [history]);

  const filterCat = e => {
    if (!(e.target.name === "select" && !e.target.value)) {
      let value = e.target.name === "select" ? e.target.value : e.target.name;
      setLoading(true);

      let filtered_list = state.recipes.filter(
        x => x.recipe_category === parseInt(value)
      );
      setTimeout(() => {
        if (value === "all") {
          setFiltered(state.recipes);
        } else {
          setFiltered(filtered_list);
        }
        setLoading(false);
      }, 900);
    }
  };

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const keyPressed = e => {
    if (e.key === "Enter") {
      history.push(`/search-recipe/${search}`);
    }
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

        {/* Header*/}
        <Grid container className={classes.heroContent}>
          <div className={classes.header}>
            <Grid item xs={12} sm={3} md={4} className={classes.headerItem}>
              <Typography
                variant="h1"
                component="h2"
                className={classes.headerText}
              >
                Choose from thousands of recipes
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.headerSubText}
              >
                If you love home cooking, discovering new ideas, and sharing
                your inspirations with others then Cookpad is the place for you.
              </Typography>
            </Grid>
          </div>
        </Grid>
        {/* End header */}

        {/* Main content */}

        <Grid container>
          <Grid item xs={12} sm={3} className={classes.sideNav}>
            <div className={classes.sidenavHeader}>
              <Typography variant="h4" className={classes.sideNavTitle}>
                Filter by Category
              </Typography>
            </div>

            <Grid item xs={12}>
              <TextField
                id="category"
                select
                fullWidth
                name="select"
                onChange={filterCat}
                className={classes.dropdown}
                InputLabelProps={{ required: false }}
                SelectProps={{
                  native: true
                }}
                variant="outlined"
              >
                <option value="">Select category</option>
                <option value={"all"}>All Recipes</option>

                {category.map(categors => (
                  <option key={categors.pk} value={categors.pk}>
                    {categors.main_category}
                  </option>
                ))}
              </TextField>
            </Grid>

            <div className={classes.catStyle}>
              <Typography variant="h6" className={classes.catFont} gutterBottom>
                <Link
                  to="#"
                  onClick={() => setFiltered(state.recipes)}
                  className={classes.catLink}
                >
                  All Recipes
                </Link>
              </Typography>
              {category.map(categors => (
                <Typography
                  variant="h6"
                  className={classes.catFont}
                  gutterBottom
                  key={categors.pk}
                >
                  <Link
                    to="#"
                    name={categors.pk}
                    onClick={filterCat}
                    className={classes.catLink}
                  >
                    {categors.main_category}
                  </Link>
                </Typography>
              ))}
            </div>
          </Grid>

          {/* <Grid container */}
          <Grid item xs={12} sm={9} className={classes.mainTop}>
            <div className={classes.seachField}>
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                onKeyPress={keyPressed}
                onChange={handleChange}
                className={classes.input}
                placeholder="Search for recipes..."
                inputProps={{ "aria-label": "search google maps" }}
              />
            </div>
            {/* </Grid> */}
            {/* </Grid> */}

            <HomeLoader loadingRcp={loadingRcp} />
            <Grid container spacing={3} className={classes.recipes}>
              {filtered.length !== 0
                ? filtered
                    .slice(0, limit)
                    .map(recipe => (
                      <ListRecipes
                        key={recipe.pk}
                        recipe={recipe}
                        user={user}
                      />
                    ))
                : loadingRcp === false && (
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justify="center"
                    >
                      <Grid item xs={12} sm={4}>
                        <div className={classes.noData}>
                          <img
                            src={No_data}
                            className={classes.noDataImg}
                            alt="No available recipe"
                          />
                          <p style={{ fontFamily: "Ubuntu", paddingTop: 10 }}>
                            No available recipe...
                          </p>
                        </div>
                      </Grid>
                    </Grid>
                  )}
            </Grid>
            {limit < filtered.length && (
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
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
export default Home;

Home.propTypes = {
  history: PropTypes.object
};
