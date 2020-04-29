import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  menu: {
    cursor: "pointer"
  },
  sideDrawer: {
    height: "100%",
    width: "60%",
    maxWidth: "300px",
    background: "#fff",
    position: "fixed",
    top: 0,
    left: 0,
    boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.5)",
    zIndex: 1000
  },
  links: {
    textDecoration: "none",
    color: "#4a4a4a",
    fontSize: "16px",
    "&:hover": {
      color: "#eb4a36",
      transition: "0.1s ease-in-out"
    }
  },
  menuFont: {
    margin: "30px 0",
    fontSize: "15px",
    color: "#4a4a4a",
    textTransform: "none",
    transition: "0.1s ease-in-out",
    transitionProperty: "color, background-color",
    listStyleType: "none",
    "@media (max-width: 425px)": {
      fontSize: "13px",
      marginLeft: "13px"
    }
  },
  signupBtn: {
    backgroundColor: "#eb4a36",
    color: "#fff",
    border: "1px solid transparent",
    textTransform: "none",
    fontSize: "15px",
    fontWeight: 400,
    width: 150
  },
  fabStyle: {
    width: "128px",
    height: "38px",
    "&:hover": {
      backgroundColor: "#e03823"
    }
  }
});

export { useStyles };
