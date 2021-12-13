import React from 'react';
import {initialState, reducer, State} from './reducer';
import {Action} from './actions';
import { noop } from 'lodash';

type ContextProps = {
  store: State;
  dispatch: React.Dispatch<Action>;
};

const initialContextState: ContextProps = {
  store: initialState,
  dispatch: noop,
};

type Props = {
  children: React.ReactElement;
};

export const BarbotContext = React.createContext<ContextProps>(
  initialContextState,
);

export const BarbotContextProvider = React.memo((props: Props) => {
  const [store, dispatch] = React.useReducer(reducer, initialState);

  const contextValue: ContextProps = {
    store,
    dispatch,
  };

  return (
    <BarbotContext.Provider value={contextValue}>
      {props.children}
    </BarbotContext.Provider>
  );
});
