import {useStore} from './useStore';

export const useSelectors = () => {
  const state = useStore();

  const getRecipes = () => {
    const { recipes } = state;
    return recipes;
  };

  const getIngredients = () => {
    const { ingredients } = state;
    return ingredients;
  };

  return {
    getRecipes,
    getIngredients
  }
};
