import {BarbotContext} from '../hocks/barbot-context/barbot-context';
import React from 'react';

export const useStore = () => {
  const { store } = React.useContext(BarbotContext);
  return store;
};
