import React, {useMemo} from 'react';
import {BarbotContext} from '../hocks/barbot-context/barbot-context';
import {SET_INGREDIENTS, SET_RECIPES} from '../hocks/barbot-context/actions';
import {RecipesAPI, recipesApi} from '../services/recipes';
import {Dialog} from '@capacitor/dialog';
import {BarbotAPI, barbotApi} from '../services/barbot';

export const useActions = () => {
  const {dispatch} = React.useContext(BarbotContext);
  const recipes: RecipesAPI = useMemo(() => recipesApi(), []);
  const barbot: BarbotAPI = useMemo(() => barbotApi(), []);

  const getRecipes = async (): Promise<Recipe[]> => {
    const res = await recipes.getRecipes();

    dispatch({
      type: SET_RECIPES,
      payload: res
    });

    return res;
  };

  const getIngredients = async (): Promise<Ingredient[]> => {
    const res = await recipes.getIngredients();

    dispatch({
      type: SET_INGREDIENTS,
      payload: res
    });

    return res;
  }

  const serve = async (recipe: Recipe) => {
    const { value } = await Dialog.confirm({
      title: `Confirm your choice`,
      message: `Please confirm your choice: ${recipe.name}`,
      okButtonTitle: 'Confirm',
      cancelButtonTitle: 'Cancel'
    });

    if (!value) return;

    // generate a command from the recipe
    const command = '';

    // serve a cocktail
    await barbot.send(command);
  }

  return {
    getRecipes,
    getIngredients,
    serve
  }

};
