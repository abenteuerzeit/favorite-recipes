import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {
//   addFavoriteRecipe,
//   removeFavoriteRecipe,
// } from "../favoriteRecipes/favoriteRecipesSlice";
import { selectSearchTerm } from "../search/searchSlice";

import allRecipesData from '../../mocks/recipes.json';

export const loadData = () => {
  return {
    type: 'allRecipes/loadData',
    payload: allRecipesData
  }
}

export const loadRecipes = createAsyncThunk(
  "allRecipes/getAllRecipes",
  async () => {
    const data = fetch("api/recipes?limit=10");
    const json = await data.json();
    return json;
  }
);

const sliceOptions = {
  name: "allRecipes",
  initialState: {
    recipes: [],
    isLoading: false,
    hasError: false
  },
  reducers: {},
  extraReducers: {
    [loadRecipes.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadRecipes.fulfilled]: (state, action) => {
      state.recipes = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
}

export const allRecipesSlice = createSlice(sliceOptions);

// const initialState = [];
// const allRecipesReducer = (allRecipes = initialState, action) => {
//   switch (action.type) {
//     case 'allRecipes/loadData':
//       return action.payload;
//     case 'favoriteRecipes/addRecipe':
//       return allRecipes.filter(recipe => recipe.id !== action.payload.id);
//     case 'favoriteRecipes/removeRecipe':
//       return [...allRecipes, action.payload]
//     default:
//       return allRecipes;
//   }
// }


export const selectAllRecipes = (state) => state.allRecipes.recipes;

export const selectFilteredAllRecipes = (state) => {
  const allRecipes = selectAllRecipes(state);
  const searchTerm = selectSearchTerm(state);

  return allRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default allRecipesSlice.reducer;
