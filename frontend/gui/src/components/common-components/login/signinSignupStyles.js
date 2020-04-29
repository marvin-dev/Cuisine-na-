import { makeStyles } from "@material-ui/core";
import Background from "../../../img/login-bg.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "173px 55px 55px 55px"
  },
  wrapper: {
    backgroundColor: "#f7f7f7",
    padding: "40px",
    "@media (max-width: 1024px)": {
      padding: "0px !important"
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(4)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  progress: {
    position: "fixed",
    width: "100%"
  }
}));

export { useStyles };
