import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  navbar: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    height: "85px",
    width: "100vw",
    maxWidth: "1200px",
    backgroundColor: "#fff",
    position: "fixed",
    fontSize: "0.75rem",
    fontGamily: "Montserrat, san-serif",
    textDecoration: "none",
    marginLeft: "-24px",
    "@media (max-width: 425px)": {
      height: "80px",
      marginLeft: "-15px"
    }
  },
  logoFont: {
    fontSize: "25px",
    marginRight: "35px",
    fontFamily: "Leckerli One, cursive",
    color: "#eb4a36",
    fontWeight: 400,
    listStyleType: "none",
    textDecoration: "none",
    marginLeft: "10px",
    "@media (max-width: 425px)": {
      fontSize: "18px",
      color: "#eb4a36",
      fontWeight: "bolder",
      marginLeft: "10px"
    }
  },
  links: {
    textDecoration: "none",
    color: "#4a4a4a",
    "&:hover": {
      color: "#eb4a36",
      transition: "0.1s ease-in-out"
    },
    "@media (max-width: 699px)": {
      display: "none"
    }
  },
  linksactive: {
    textDecoration: "none",
    transition: "0.1s ease-in-out",
    color: "#eb4a36"
  },
  fabStyle: {
    width: "128px",
    height: "38px",
    "&:hover": {
      backgroundColor: "#e03823"
    }
  },
  signupBtn: {
    marginLeft: 30,
    backgroundColor: "#eb4a36",
    color: "#fff",
    border: "1px solid transparent",
    textTransform: "none",
    fontSize: "15px",
    fontWeight: 400
  },
  menuFont: {
    marginLeft: "30px",
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
  navRight: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "@media (max-width: 699px)": {
      display: "none"
    }
  },
  drawer: {
    marginLeft: 18,
    marginRight: -10,
    listStyleType: "none",
    "@media (min-width: 699px)": {
      display: "none"
    }
  },
  menu: {
    "@media (min-width: 769px)": {
      display: "none"
    }
  },
  toolbarCont: {
    marginLeft: "-18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }
}));

export { useStyles };
