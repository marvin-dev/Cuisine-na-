import React, { useState, useEffect } from "react";
import { useStyles } from "./styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import No_data from "../img/no_data.svg";
import axios from "axios";
import Navbar from "./common-components/navbar/navbar";
import SearchLoader from "./common-components/loader/searchLoader";
import PropTypes from "prop-types";
import SearchRecipe from "./searchRecipe";

function SearchPage(props) {
  const { history } = props;
  const classes = useStyles();
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [user, setUser] = useState({});
  const [search, setInput] = useState(
    props.match.params.recipe_name ? props.match.params.recipe_name : ""
  );
  const [store, setStore] = useState(
    props.match.params.recipe_name ? props.match.params.recipe_name : ""
  );

  useEffect(() => {
    axios.get(`/api/recipe/`).then(res => {
      const recipeLists = res.data;
      const result = recipeLists.filter(recp =>
        recp.recipe_name
          .toString()
          .toLowerCase()
          .includes(store.toLowerCase())
      );
      setSearchResult(result);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1200);

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
  }, [store, history]);

  const handleInput = e => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setStore("");
    }
  };

  const loadmore = () => {
    setLimit(limit + 8);
  };

  const submitSearch = () => {
    setStore(search);
    history.push(`/search-recipe/${search}`);
  };

  const keyPressed = e => {
    if (e.key === "Enter") {
      submitSearch();
    }
  };

  return (
    <React.Fragment>
      {/* Loader */}
      {/* End Loader */}
      <Container maxWidth="lg" className={classes.body}>
        {/* Navbar */}
        <div className={classes.navbarContainer}>
          <Navbar />
        </div>
        {/* End Navbar */}
        <Grid container>
          <Grid item xs={12} sm={4} md={3} className={classes.mainTopSearch}>
            <div className={classes.seachField}>
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                onChange={handleInput}
                value={search}
                onKeyPress={keyPressed}
                placeholder="Search for recipes..."
                inputProps={{ "aria-label": "search recipes" }}
              />
            </div>
          </Grid>
        </Grid>

        <SearchLoader loading={loading} />

        <Grid container className={classes.recipes} spacing={4}>
          {(searchResult.length !== 0 || search === null) && !loading
            ? searchResult
                .slice(0, limit)
                .map(item => (
                  <SearchRecipe key={item.pk} item={item} user={user} />
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
                      <p style={{ fontFamily: "Ubuntu", paddingTop: 10 }}>
                        Recipe not found...
                      </p>
                    </div>
                  </Grid>
                </Grid>
              )}
        </Grid>

        {!loading && limit < searchResult.length && (
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
      </Container>
    </React.Fragment>
  );
}

export default SearchPage;

SearchPage.propTypes = {
  history: PropTypes.object
};
