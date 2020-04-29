import { makeStyles, useTheme } from "@material-ui/core";
import head from "../img/header.jpg";
import coverphoto from "../img/profile-header.jpg";

const useStyles = makeStyles(theme => ({
  // HOME STYLES
  dropdown: {
    display: "none",
    "@media (max-width:425px)": {
      display: "block"
    }
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    marginTop: 104,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 0, 2),
    "@media (max-width: 425px)": {
      width: "100%"
    }
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    maxWidth: 300,
    position: "relative",
    marginBottom: "13px",
    "@media (max-width: 425px)": {
      maxWidth: "100%"
    }
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  navbarContainer: {
    position: "absolute",
    top: 0,
    maxWidth: "1200px",
    zIndex: 1,
    width: "100%"
  },
  body: {
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
    height: "100%",
    margin: "0 auto",
    marginBottom: 90,
    "@media (max-width: 425px)": {
      width: "100%"
    }
  },
  header: {
    backgroundImage: `url(${head})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "20px",
    height: "430px",
    width: "100%",
    "@media (max-width: 425px)": {
      width: "100%"
    }
  },
  headerItem: {
    position: "relative",
    padding: "70px"
  },
  headerText: {
    position: "absolute",
    color: "#fff",
    fontSize: "54px",
    fontWeight: "bolder",
    width: "350px",
    "@media (max-width: 425px)": {
      width: "255px",
      fontSize: "38px",
      fontWeight: "bolder",
      marginLeft: "-39px"
    }
  },
  headerSubText: {
    position: "absolute",
    color: "#fff",
    marginTop: "207px",
    fontSize: "17px",
    fontWeight: "lighter",
    width: "450px",
    "@media (max-width: 425px)": {
      width: "225px",
      fontSize: "16px",
      marginLeft: "-39px",
      fontWeight: "300px",
      marginTop: "180px"
    }
  },
  sideNav: {
    height: "500px",
    width: "100%",
    position: "sticky",
    top: "190px",
    "@media (max-width: 425px)": {
      width: "100%",
      height: "auto",
      zIndex: 100,
      background: "white",
      top: "80px",
      padding: "20px 0px"
    }
  },
  sidenavHeader: {
    height: "50px",
    display: "flex",
    justifyContent: "center",
    padding: "23px",
    "@media (max-width: 425px)": {
      height: "30px",
      padding: "15px"
    }
  },
  sideNavTitle: {
    fontWeight: "bold",
    fontSize: "24px",
    color: "#292929",
    "@media (max-width: 425px)": {
      fontSize: "24px"
    }
  },
  mainRight: {
    display: "flex",
    flexDirection: "column"
  },
  mainTop: {
    height: "100px",
    width: "100%"
    // marginTop: "104px"
  },
  mainTopSearch: {
    height: "100px",
    width: "100%",
    marginTop: "104px"
  },
  recipes: {
    marginTop: "40px"
  },
  input: {
    width: "595px",
    "@media (max-width: 425px)": {
      fontSize: "14px",
      width: "266px",
      marginLeft: "0px"
    }
  },
  recipeTitle: {
    fontSize: "16px",
    marginTop: "15px",
    fontFamily: "Ubuntu"
  },
  recipeLink: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  noData: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 60
  },
  noDataImg: {
    width: "245px"
  },
  progress: {
    zIndex: "1000 !important",
    position: "fixed",
    width: "100%",
    top: 0
  },
  floatingNav: {
    width: "calc(100vh - 100px)",
    borderRadius: "2px",
    boxShadow: "0px 1px 10px #999"
  },
  // END HOME STYLES

  //   RECIPE DETAILS STYLES
  recipeImgContainer: {
    width: "auto",
    height: "390px"
  },
  recipeImg: {
    width: "490px",
    height: "390px",
    borderRadius: "8px",
    objectFit: "cover",
    objectPosition: "50% 50%",
    "@media (max-width: 425px)": {
      width: "343px !important",
      marginTop: "-12px"
    },
    "@media (max-width: 768px)": {
      width: "340px !important"
    },
    "@media (max-width: 1024px)": {
      width: "430px"
    }
  },
  recipeDetails: {
    marginTop: "50px",
    "@media (max-width: 768px)": {
      marginTop: "10px !important"
    },
    "@media (max-width: 1024px)": {
      marginTop: "20px"
    }
  },

  recipeTitle2: {
    fontSize: "40px",
    fontWeight: "400px",
    "@media (max-width: 425px)": {
      fontSize: "32px"
      // marginTop: '-24px'
    },
    "@media (max-width: 768px)": {
      fontSize: "30px"
    }
  },
  recipeDescription: {
    fontSize: "16px",
    fontWeight: "300",
    lineHeight: "inherit",
    wordBreak: "break-word"
  },
  recipeAuthor: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "300",
    marginTop: 15
  },
  authorName: {
    marginLeft: 6,
    fontSize: "14px",
    fontWeight: "300",
    color: "#eb4a36",
    cursor: "pointer",
    textDecoration: "none",
    textTransform: "capitalize",
    "&:hover": {
      color: "#ff1c00",
      fontWeight: "400"
    }
  },
  recipeInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 35
  },
  icons: {
    fontSize: "38px",
    color: "#676767"
  },
  boldFont: {
    fontWeight: 400
  },
  recipeProcedure: {
    fontWeight: 400,
    marginLeft: 30,
    "@media (max-width: 425px)": {
      marginTop: "-32px",
      marginLeft: 0
    }
  },

  // Procedure and Ingredients style
  recipeIngPro: {
    height: "auto",
    marginTop: 50,
    marginBottom: "50px"
  },
  procedureStepTitle: {
    marginLeft: 30,
    marginTop: 18,
    fontSize: "19px",
    fontWeight: 400,
    color: "#eb4a36",
    textTransform: "uppercase",
    "@media (max-width: 425px)": {
      marginLeft: 10
    }
  },
  recipeIngredients: {
    fontWeight: 400,
    marginLeft: 30,
    marginBottom: 24,
    "@media (max-width: 425px)": {
      marginTop: 40,
      marginLeft: 0
    }
  },
  procedureStep: {
    fontSize: "17px",
    fontWeight: "300",
    margin: "0px 50px",
    wordBreak: "break-word",
    "@media (max-width: 425px)": {
      margin: "10px 15px",
      fontSize: "15px"
    }
  },
  ingredients: {
    fontSize: "17px",
    fontWeight: "300",
    margin: "10px 50px",
    wordBreak: "break-word",
    "@media (max-width: 425px)": {
      margin: "10px 15px",
      fontSize: "15px"
    }
  },

  authorRating: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  reviewContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: "35px 0"
  },
  red: {
    backgroundColor: "#eb4a36",
    marginRight: 10
  },
  reviews: {
    fontSize: "15px",
    fontWeight: "300",
    lineHeight: "inherit",
    marginTop: 50,
    wordBreak: "break-word"
  },
  dateReview: {
    fontSize: "12px",
    fontWeight: "300",
    fontStyle: "italic"
  },
  rateDate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "7px"
  },
  // scrollToTop style
  scroll: {
    backgroundColor: "#eb4a36",
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    "&:hover": {
      backgroundColor: "#ef311a"
    },
    "@media (max-width: 425px)": {
      width: 50,
      height: 50
    }
  },
  resIcon: {
    "@media (max-width: 425px)": {
      fontSize: 30
    }
  },
  //   END RECIPE DETAILS STYLES

  //   SEARCH PAGE STYLES
  seachField: {
    backgroundColor: "#f9f5f4",
    width: "660px",
    margin: "19px",
    "@media (max-width: 425px)": {
      width: "348px",
      height: "70px",
      marginLeft: "-6px",
      display: "flex"
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    borderRadius: "12px"
  },
  //   END SEARCH PAGE STYLES

  //   ADD RECIPE STYLES
  recipeImgContainerAdd: {
    width: "auto",
    height: "390px",
    "@media (max-width: 425px)": {
      marginTop: "25px"
    }
  },
  recipeImgAdd: {
    width: "490px",
    height: "390px",
    borderRadius: "8px",
    objectFit: "cover",
    objectPosition: "50% 50%",
    border: "1px solid lightgray",
    margin: "10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#e0dedd",
      transition: "2s ease-out"
    },
    "@media (max-width: 425px)": {
      width: "343px !important",
      marginTop: "-12px",
      margin: 0
    },
    "@media (max-width: 768px)": {
      width: "340px !important"
    },
    "@media (max-width: 1024px)": {
      width: "430px"
    }
  },
  recipeIngredientsAdd: {
    fontWeight: 400,
    marginLeft: 30,
    "@media (max-width: 425px)": {
      marginTop: 40,
      marginLeft: 0
    }
  },
  fontstyle1: {
    fontSize: "16px",
    fontWeight: "300",
    lineHeight: "inherit"
  },
  recipeIngProAdd: {
    height: "auto",
    marginTop: 35,
    marginBottom: 70
  },
  uploadPhoto: {
    opacity: 0,
    position: "absolute",
    zIndex: "-1"
  },
  infoText: {
    fontStyle: "italic",
    fontSize: "14px",
    color: "#eb4a36",
    marginLeft: "21px"
  },
  //   END ADD RECIPE STYLES

  //   RATING STYLES
  rating: {
    display: "flex",
    justifyContent: "space-between"
  },
  signinFont: {
    textDecoration: "none",
    fontSize: "17px",
    color: "#eb4a36",
    fontStyle: "italic"
  },
  text: {
    fontSize: "27px",
    marginBottom: 17,
    lineHeight: "25px",
    "@media (max-width: 425px)": {
      fontSize: "24px"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    "@media (max-width: 425px)": {
      marginBottom: "45px"
    }
  },
  //   END RATING STYLES

  //   RECIPE CATEGORY STYLES
  menuFont: {
    marginLeft: "30px",
    fontSize: "15px",
    color: "#4a4a4a",
    textTransform: "none",
    transition: "0.1s ease-in-out",
    transitionProperty: "color, background-color",
    listStyleType: "none"
  },
  links: {
    textDecoration: "none",
    color: "#4a4a4a",
    transition: "0.1s ease-in-out"
  },
  linksactive: {
    textDecoration: "none",
    color: "#eb4a36",
    transition: "0.1s ease-in-out"
  },
  catStyle: {
    width: "100%",
    margin: "0px 45px",
    "@media (max-width: 425px)": {
      width: "100%",
      color: "blue",
      margin: "0px 20px",
      display: "none"
    }
  },
  catFont: {
    fontFamily: "Ubuntu",
    fontSize: "19px",
    color: "#252525"
  },
  catLink: {
    textDecoration: "none",
    color: "#252525",
    "&:hover": {
      color: "#e03823"
    }
  },
  //  END RECIPE CATEGORY STYLES

  // PROFILE STYLE
  profileHeader: {
    backgroundImage: `url(${coverphoto})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "20px",
    marginTop: 115,
    height: "235px",
    width: "100%",
    position: "relative"
  },
  profileAvatar: {
    backgroundColor: "#eb4a36",
    marginRight: 10,
    top: "-57px",
    marginLeft: "55px",
    width: "100px",
    height: "100px",
    border: "3px solid #fff",
    position: "absolute",
    fontSize: "36px",
    fontWeight: 400,
    "@media (max-width: 425px)": {
      marginLeft: 0,
      width: "70px",
      height: "70px",
      top: "-40px",
      fontSize: 28
    }
  },
  headerCont: {
    display: "flex",
    padding: "10px 24px",
    position: "relative",
    flexWrap: "wrap"
  },
  headerName: {
    marginLeft: "175px",
    "@media (max-width: 425px)": {
      marginLeft: "77px"
    }
  },
  name: {
    color: "#263238",
    fontSize: "20px",
    fontFamily: "Roboto",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.06px",
    textTransform: "capitalize",
    "@media (max-width: 425px)": {
      fontSize: "17px"
    }
  },
  experience: {
    color: "#546e7a",
    fontSize: "11px",
    fontFamily: "Helvetica",
    fontWeight: 500,
    lineHeight: "13px",
    letterSpacing: "0.33px",
    textTransform: "uppercase"
  },
  tabsCont: {
    marginLeft: 100,
    marginBottom: 55,
    "@media (max-width: 425px)": {
      marginLeft: 0
    }
  },
  tabName: {
    "@media (max-width: 425px)": {
      fontSize: 11
    }
  },
  cardRecipe: {
    maxWidth: 345,
    minHeight: 269
  },
  cardRecipeImg: {
    height: 140
  },
  recipeCont: {
    // marginTop: 55,
    "@media (max-width: 425px)": {
      padding: 0,
      margin: 0,
      marginTop: 15
    }
  },
  reviewStyle: {
    width: "300px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "inline-block",
    textOverflow: "ellipsis",
    fontSize: "14px",
    textAlign: "left",
    "@media(max-width: 937px)": {
      width: "245px"
    }
  },
  sidePadding: {
    padding: 0
  },
  editbtn: {
    margin: "15px 12px",
    backgroundColor: "#eb4a36",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#f3341c"
    }
  },
  recipeEditLink: {
    textDecoration: "none"
  },
  loadMore: {
    cursor: " pointer",
    fontSize: "15px",
    color: "black",
    marginBottom: 60,
    letterSpacing: "inherit",
    "&:hover": {
      color: "#eb4a36"
    }
  },
  ratingReviews: {
    fontWeight: 400,
    marginTop: 30
  },
  noreviews: {
    fontStyle: "italic",
    margin: "17px 45px"
  },
  // END PROFILE STYLE
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between"
  },
  // SKELETON LOADER STYLE
  time: {
    width: 90
  },
  ratingloader: {
    width: "100%"
  },
  processloader: {
    width: "75%"
  },
  spacer: {
    height: 18
  },
  homeRecipename: {
    marginTop: -20,
    marginLeft: -30
  },
  homeContent: {
    marginTop: -20
  },
  recipeIngProLoad: {
    marginTop: "80px"
  },
  bodyloader: {
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
    height: "100%",
    margin: "0 auto",
    marginBottom: 90,
    "@media (max-width: 425px)": {
      width: "100%"
    }
  },
  authorRatingLod: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30
  },
  // FAVORITE STYLES
  favorite: {
    fontSize: 28,
    color: "#fff",
    cursor: "pointer",
    "&:hover": {
      color: "red"
    }
  },
  savedFavorite: {
    fontSize: 28,
    color: "red",
    cursor: "pointer"
  },
  favoriteWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    // zIndex: 1,
    margin: 10
  }
}));

export { useStyles, useTheme };
