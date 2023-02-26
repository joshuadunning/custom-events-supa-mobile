import React, { useContext, useReducer } from 'react';
import { Action, reducer } from './reducer';
import { User } from '@supabase/supabase-js';
import { Database } from '~/types/schema.ts';

export interface StateContext {
  user: User | null;
  profile: Database.public.tables.profiles.Row | null;
  snacks: Array<{
    id: string;
    text: string;
    type: 'INFO' | 'ERROR';
    timeout?: number;
  }>;
}

export interface Store {
  state: StateContext;
  dispatch: React.Dispatch<Action>;
}

const initialState: StateContext = {
  user: null,
  profile: null,
  snacks: []
};

const defaultState: StateContext = initialState;
const Context = React.createContext<Store>({
  state: defaultState,
  dispatch: () => {}
});

export const useStateContext = () => useContext(Context);

export const StateProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return <Context.Provider value={{ state, dispatch }} children={children} />;
};
