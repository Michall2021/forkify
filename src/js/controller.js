import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import { MODAL_CLOSE_SECONDS } from './config.js';

// pollyfiling in general
import 'core-js/stable';
// pollyfiling async/await
import 'regenerator-runtime/runtime';
import addRecipeView from './view/addRecipeView.js';

import searchView from './view/searchView.js';

import resultsView from './view/resultsView.js';
import bookmarksView from './view/bookmarksView.js';
import paginationView from './view/paginationView.js';



// https://forkify-api.herokuapp.com/v2

console.log('TEST');

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    
    // loading recipe
    await model.loadRecipe(id);
   
    // rendering recipe
    //  get rid of previous markup
    recipeView.render(model.state.recipe);
    // controlServings();
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    console.error(`${err} ✹ ✹ ✹ ✹ `);
    // alert(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    console.log(resultsView);
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    
    resultsView.render(model.getSearchResultsPage());
    console.log(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};
const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
  console.log(goToPage);
};
const controlServings = function (newServings) {
  // update the recipe servings in the state
  model.updateServings(newServings);
  // update the view

  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  // console.log(model.state.recipe.bookmarked);
  //1 add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

 

  //2 update recipe view
  recipeView.update(model.state.recipe);
  // 3 render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();
    // console.log(newRecipe);
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //render recipe
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    // change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SECONDS * 1000);
  } catch (err) {
    console.error('±±±±', '!!!!!', err);
    addRecipeView.renderError(err.message);
  }
};
const newFeature = function () {
  console.log('welcome to the app');
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);

  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();

  // controlServings();
};
init();
