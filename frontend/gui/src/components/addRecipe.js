import React, { useState, useEffect } from "react";
import { useStyles } from "./styles";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Snackbar
} from "@material-ui/core";
import ServingIcon from "@material-ui/icons/GroupOutlined";
import PrepIcon from "@material-ui/icons/ScheduleOutlined";
import UpdateIcon from "@material-ui/icons/Update";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import Navbar from "./common-components/navbar/navbar";
import upload from "../img/img_upload1.png";
import LinearLoader from "./common-components/loader/linearLoader";
import axios from "axios";

function AddRecipe(props) {
  const { history } = props;
  const classes = useStyles();
  const [alert, setAlert] = useState({
    open: false,
    status: null
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [cat, setCat] = useState([]);
  const [preview, setPreview] = useState({
    recipe_img_display: null,
    imagePreviewUrl: upload
  });
  const [recipe, setRecipe] = useState({
    recipe_name: null,
    recipe_desc: null,
    recipe_img_display: null,
    recipe_category: "",
    prep_time: 0,
    cooking_time: 0,
    serving: 0,
    ingredients: null,
    process: {
      text: "",
      counter: 0
    }
  });
  const [validate, setValidate] = useState(false);

  const handleChange = e => {
    if (
      e.target.name === "prep_time" ||
      e.target.name === "cooking_time" ||
      e.target.name === "serving"
    ) {
      if (parseInt(e.target.value) <= 0) {
        return;
      }
    }
    let data = {
      ...recipe,
      [e.target.name]: e.target.value
    };
    setRecipe(data);
    for (var key in data) {
      if (data[key] === null || data[key] === "" || data[key] === 0) {
        setValidate(false);
        break;
      } else {
        setValidate(true);
      }
    }
  };

  const photoUpload = e => {
    e.preventDefault();
    const reader = new FileReader();
    const recipe_img_display = e.target.files[0];
    reader.onloadend = () => {
      setPreview({
        recipe_img_display: recipe_img_display,
        imagePreviewUrl: reader.result
      });
      setRecipe({
        ...recipe,
        recipe_img_display: recipe_img_display
      });
    };
    reader.readAsDataURL(recipe_img_display);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/account/current_user/`,
      headers: {
        authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        const user = response.data;
        setUser(user);
      })
      .catch(() => {
        history.push("/signin");
      });
    axios({
      method: "GET",
      url: `/api/recipe/category/`,
      headers: {
        "content-type": "application/json"
      }
    }).then(cat => {
      const categors = cat.data;
      setRecipe({
        ...recipe,
        recipe_category: categors[0].pk
      });
      setCat(categors);
    });
  }, [history]);

  const addRecipe = e => {
    setLoading(true);
    e.preventDefault();
    let formData = new FormData();
    formData.append("author", user.pk);
    formData.append("recipe_name", recipe.recipe_name);
    formData.append("recipe_desc", recipe.recipe_desc);
    formData.append("recipe_category", parseInt(recipe.recipe_category));
    formData.append("recipe_img_display", preview.recipe_img_display);
    formData.append("prep_time", recipe.prep_time);
    formData.append("cooking_time", recipe.cooking_time);
    formData.append("serving", parseInt(recipe.serving));
    formData.append("ingredients", recipe.ingredients);
    formData.append("process", recipe.process);

    axios({
      method: "POST",
      url: `/api/recipe/`,
      data: formData,
      headers: {
        authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        setRecipe(res.data);
        setTimeout(() => {
          setLoading(false);
          setAlert({
            open: true,
            status: "success"
          });
        }, 2000);
        setTimeout(() => {
          history.push(`/recipe-details/${res.data.pk}`);
        }, 3000);
      })
      .catch(() => {
        setTimeout(() => {
          setLoading(false);
          setAlert({
            open: true,
            status: "failed"
          });
        }, 2000);
      });
  };
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
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
        <form onSubmit={addRecipe}>
          <Grid container style={{ marginTop: "104px" }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" className={classes.infoText}>
                Fill up all the fields..
              </Typography>
              <div className={classes.recipeImgContainerAdd}>
                <label htmlFor="upload-photo" src={upload}>
                  <img
                    alt="recipe_image"
                    htmlFor="recipe_img_display"
                    src={preview.imagePreviewUrl}
                    className={classes.recipeImgAdd}
                  />
                </label>
              </div>
              <input
                required
                type="file"
                name="photo"
                id="upload-photo"
                accept="image/*"
                className={classes.uploadPhoto}
                onChange={photoUpload}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.recipeDetails}>
                <Typography
                  variant="caption"
                  gutterBottom
                  className={classes.fontstyle1}
                >
                  Recipe Title
                </Typography>
                <TextField
                  style={{ marginBottom: 10, marginTop: 10 }}
                  id="recipe_name"
                  name="recipe_name"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  required
                  inputProps={{
                    maxLength: 80
                  }}
                />
                <Typography
                  variant="caption"
                  className={classes.fontstyle1}
                  gutterBottom
                >
                  Description
                </Typography>
                <TextField
                  style={{ marginTop: 10, marginBottom: 10 }}
                  id="recipe_desc"
                  name="recipe_desc"
                  placeholder="Add recipe description"
                  multiline
                  rows="7"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  required
                  inputProps={{
                    maxLength: 1000
                  }}
                />
                <Typography
                  variant="caption"
                  className={classes.fontstyle1}
                  gutterBottom
                >
                  Recipe Category
                </Typography>
                <TextField
                  id="recipe_category"
                  name="recipe_category"
                  select
                  fullWidth
                  onChange={handleChange}
                  required
                  value={recipe.recipe_category}
                  style={{ marginTop: 15 }}
                  InputLabelProps={{ required: false }}
                  SelectProps={{
                    native: true
                  }}
                  //  helperText="Please select your experience"
                  variant="outlined"
                >
                  {cat.map(option => (
                    <option key={option.pk} value={option.pk}>
                      {option.main_category}
                    </option>
                  ))}
                </TextField>
              </div>
              <Grid container className={classes.recipeInfo}>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
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
                    className={`${classes.fontstyle1} ${classes.boldFont}`}
                    gutterBottom
                  >
                    Prep Time
                  </Typography>
                  <TextField
                    type="number"
                    id="prep_time"
                    name="prep_time"
                    variant="outlined"
                    value={recipe.prep_time}
                    onChange={handleChange}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">mins</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
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
                    className={`${classes.fontstyle1} ${classes.boldFont}`}
                    gutterBottom
                  >
                    Cooking Time
                  </Typography>
                  <TextField
                    type="number"
                    id="cooking_time"
                    name="cooking_time"
                    onChange={handleChange}
                    value={recipe.cooking_time}
                    required
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">mins</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
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
                    className={`${classes.fontstyle1} ${classes.boldFont}`}
                    gutterBottom
                  >
                    Servings
                  </Typography>
                  <TextField
                    type="number"
                    id="serving"
                    name="serving"
                    value={recipe.serving}
                    onChange={handleChange}
                    inputProps={{
                      maxLength: 2
                    }}
                    required
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.recipeIngPro}>
            <Grid item xs={12} sm={7}>
              <Typography
                variant="h5"
                gutterBottom
                className={classes.recipeProcedure}
              >
                How to make it
              </Typography>
              <TextField
                id="process"
                name="process"
                placeholder="Put each directions on its own line"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                multiline
                rows={15}
                required
                inputProps={{
                  maxLength: 1500
                }}
                // error
                // helperText="You've reached maximum allowed text!"
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                variant="h5"
                gutterBottom
                className={classes.recipeIngredientsAdd}
              >
                Ingredients
              </Typography>
              <TextField
                id="ingredients"
                name="ingredients"
                placeholder="Put each ingredients on its own line"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                multiline
                rows={15}
                required
                inputProps={{
                  maxLength: 1500
                }}
              />
            </Grid>
            <Button
              variant="contained"
              type="submit"
              className={classes.editbtn}
              disabled={!validate || loading}
            >
              Upload Recipe
            </Button>
          </Grid>
        </form>
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
          {alert.status === "success" ? (
            <Alert onClose={handleClose} severity="success">
              Recipe added successfully!
            </Alert>
          ) : (
            <Alert onClose={handleClose} severity="error">
              Error adding recipe!
            </Alert>
          )}
        </Snackbar>
        {/* End Snackbar for uploading of recipe */}
        {/* End Main Content */}
      </Container>
    </React.Fragment>
  );
}
export default AddRecipe;

AddRecipe.propTypes = {
  history: PropTypes.object
};
