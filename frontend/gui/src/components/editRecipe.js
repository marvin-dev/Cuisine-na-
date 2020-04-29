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
import upload from "../img/load.png";
import LinearLoader from "./common-components/loader/linearLoader";
import axios from "axios";

function EditRecipe(props) {
  const classes = useStyles();
  const { pk } = props.match.params;

  const { history } = props;
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [ownrecipes, setOwnrecipes] = useState([""]);
  const [editRecp, setEditRecp] = useState([]);
  const [preview, setPreview] = useState({
    recipe_img_display: null,
    imagePreviewUrl: upload
  });
  const [alert, setAlert] = useState({
    open: false,
    status: null,
    text: null
  });

  const handleChange = e => {
    setOwnrecipes({
      ...ownrecipes,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = e => {
    setOwnrecipes(editRecp);
    setPreview({
      recipe_img_display: null,
      imagePreviewUrl: editRecp.recipe_img_display
    });
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

  const photoUpload = e => {
    e.preventDefault();
    const reader = new FileReader();
    const image = e.target.files[0];
    reader.onloadend = () => {
      setPreview({
        recipe_img_display: image,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(image);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/account/current_user/`,
      headers: {
        authorization: `JWT ${localStorage.getItem("token")}`
      }
    }).catch(() => {
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
    setLoading(true);
    axios({
      method: "GET",
      url: `/api/recipe/${pk}`,
      headers: {
        "content-type": "application/json"
      }
    }).then(edit => {
      const ownrecipes = edit.data;
      setTimeout(() => {
        setOwnrecipes(ownrecipes);
        setPreview({
          recipe_img_display: null,
          imagePreviewUrl: ownrecipes.recipe_img_display
        });
        setLoading(false);
      }, 2000);
      setEditRecp(ownrecipes);
    });
  }, [history, pk]);

  const editRecipe = e => {
    setLoading(true);

    e.preventDefault();
    let formData = new FormData();
    if (ownrecipes.recipe_img_display !== preview.imagePreviewUrl) {
      formData.append("recipe_img_display", preview.recipe_img_display);
    }
    formData.append("recipe_name", ownrecipes.recipe_name);
    formData.append("recipe_desc", ownrecipes.recipe_desc);
    formData.append("recipe_category", parseInt(ownrecipes.recipe_category));
    formData.append("prep_time", ownrecipes.prep_time);
    formData.append("cooking_time", ownrecipes.cooking_time);
    formData.append("serving", parseInt(ownrecipes.serving));
    formData.append("ingredients", ownrecipes.ingredients);
    formData.append("process", ownrecipes.process);

    axios({
      method: "PATCH",
      url: `/api/recipe/${pk}`,
      data: formData,
      headers: {
        authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(edit => {
        const ownrecipes = edit.data;
        setTimeout(() => {
          setOwnrecipes(ownrecipes);
          setEditRecp(ownrecipes);
          setPreview({
            recipe_img_display: null,
            imagePreviewUrl: ownrecipes.recipe_img_display
          });
          setLoading(false);
          setAlert({
            open: true,
            status: "success",
            text: "Edited successfully"
          });
        }, 2000);
      })
      .catch(err => {
        console.log(err.response);
        setTimeout(() => {
          setLoading(false);
          setAlert({
            open: true,
            status: "error",
            text: "Error editing recipe"
          });
        }, 2000);
      });
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
        <form onSubmit={editRecipe}>
          <Grid container style={{ marginTop: "104px" }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" className={classes.infoText}>
                Click the image to upload new photo..
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
                required={!ownrecipes.recipe_img_display && null}
                type="file"
                name="recipe_img_display"
                id="upload-photo"
                className={classes.uploadPhoto}
                onChange={photoUpload}
                disabled={loading}
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
                  value={ownrecipes.recipe_name}
                  disabled={loading}
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
                  value={ownrecipes.recipe_desc}
                  disabled={loading}
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
                  value={ownrecipes.recipe_category}
                  style={{ marginTop: 10 }}
                  disabled={loading}
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
                    onChange={handleChange}
                    value={ownrecipes.prep_time}
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
                    value={ownrecipes.cooking_time}
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
                    onChange={handleChange}
                    required
                    variant="outlined"
                    disabled={loading}
                    value={ownrecipes.serving}
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
                disabled={loading}
                rows={15}
                required
                value={ownrecipes.process}
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
                disabled={loading}
                rows={15}
                required
                value={ownrecipes.ingredients}
              />
            </Grid>
            <Button
              variant="contained"
              type="submit"
              className={classes.editbtn}
              disabled={
                (editRecp === ownrecipes &&
                  ownrecipes.recipe_img_display === preview.imagePreviewUrl) ||
                loading
                  ? true
                  : false
              }
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              className={classes.editbtn}
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </Button>
          </Grid>
        </form>
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
export default EditRecipe;

EditRecipe.propTypes = {
  history: PropTypes.object
};
