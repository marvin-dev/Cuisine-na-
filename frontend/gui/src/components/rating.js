import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import modalphoto from "../img/modal_login.jpg";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const labels = {
  1: "Couldn't eat it",
  2: "Didn't like it",
  3: "It was OK",
  4: "I like it",
  5: "I love it"
};

export default function AlertDialogSlide(props) {
  const { recipeId, userState, reviews } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(-1);
  const [user, setUser] = useState([]);
  const [feedback, setFeedback] = useState({
    rating: null,
    review: "",
    counter: 0,
    btninActive: true
  });

  useEffect(() => {
    if (userState) {
      setUser(userState);
    }
  }, [userState]);

  const handleChange = e => {
    if (e.target.name === "rating") {
      setFeedback({
        ...feedback,
        rating: parseInt(e.target.value),
        btninActive: parseInt(e.target.value) ? false : true
      });
    } else {
      if (e.target.value.length <= 500) {
        setFeedback({
          ...feedback,
          review: e.target.value,
          counter: e.target.value.length
        });
      }
    }
  };

  const addReview = e => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `/api/rating_review/`,
      data: JSON.stringify({
        rating: feedback.rating,
        review: feedback.review,
        recipe: recipeId,
        commentor: user.pk
      }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        const fdback = res.data;
        fdback["name"] = userState.name;
        reviews(fdback);
        setFeedback({
          rating: null,
          review: "",
          counter: 0,
          btninActive: true
        });
        setOpen(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        style={{ backgroundColor: "#eb4a36", color: "#fff" }}
        disableElevation
        onClick={handleClickOpen}
      >
        Rate and review
      </Button>
      {localStorage.getItem("token") ? (
        <Dialog
          fullWidth
          fullScreen={window.innerWidth < "425" ? true : false}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Rate and Review"}
          </DialogTitle>
          <form onSubmit={addReview}>
            <DialogContent>
              <div className={classes.rating}>
                <Typography variant="subtitle2" gutterBottom>
                  Your rating
                </Typography>
                {feedback.rating !== null && (
                  <Typography
                    ml={2}
                    style={{
                      // color: "#eb4a36",
                      fontStyle: "italic",
                      fontWeight: "500"
                    }}
                  >
                    {labels[hover !== -1 ? hover : feedback.rating]}
                  </Typography>
                )}
              </div>
              <Rating
                style={{ marginBottom: 20 }}
                name="rating"
                id="rating"
                value={feedback.rating}
                onChange={handleChange}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />

              <Typography variant="subtitle2" gutterBottom>
                Your review <i>(optional)</i>
              </Typography>

              <TextField
                placeholder="Did you make any changes, and will you make it again?"
                multiline
                rows="4"
                name="review"
                id="review"
                variant="outlined"
                onChange={handleChange}
                fullWidth={true}
                value={feedback.review}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={feedback.btninActive}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      ) : (
        <Dialog
          fullWidth
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <Grid container className={classes.modal}>
            <Grid item xs={12} sm={6}>
              <img
                src={modalphoto}
                alt="bg_picture"
                style={{ width: "310px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DialogContent>
                <Typography variant="subtitle2" className={classes.text}>
                  Please Login to continue
                </Typography>
                <Link to="/signin" className={classes.signinFont}>
                  Go to Signin
                </Link>
              </DialogContent>
            </Grid>
          </Grid>
        </Dialog>
      )}
    </React.Fragment>
  );
}
