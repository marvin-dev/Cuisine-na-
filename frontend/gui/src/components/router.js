import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import home from "./home";
import recipe from "./recipeDetails";
import signin from "./common-components/login/signin";
import signup from "./common-components/login/signup";
import search from "./searchPage";
import addrecipe from "./addRecipe";
import profile from "./myProfile";
import edit from "./editRecipe";
import userprofile from "./userProfile";
const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <Route exact path="/home" component={home} />
      <Route exact path="/recipe-details/:pk" component={recipe} />
      <Route exact path="/signin" component={signin} />
      <Route exact path="/signup" component={signup} />
      <Route exact path="/search-recipe" component={search} />
      <Route exact path="/search-recipe/:recipe_name" component={search} />
      <Route exact path="/add-recipe" component={addrecipe} />
      <Route exact path="/my-profile" component={profile} />
      <Route exact path="/profile/:pk" component={userprofile} />
      <Route exact path="/recipe-details/:pk/edit/" component={edit} />
    </Router>
  );
}

export default App;
