export const SET_RECIPES = 'SET_RECIPES';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';

export type SetRecipes = {
  type: typeof SET_RECIPES;
  payload: any;
};

export type SetIngredients = {
  type: typeof SET_INGREDIENTS;
  payload: any;
};

export type Action = SetRecipes | SetIngredients;
