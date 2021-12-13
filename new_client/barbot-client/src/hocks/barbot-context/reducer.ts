import {Action, SET_INGREDIENTS, SET_RECIPES} from './actions';

export type State = {
  recipes: any;
  ingredients: any;
};

export const initialState: State = {
  recipes: [],
  ingredients: []
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload
      }
    default:
      return state;
  }
};
