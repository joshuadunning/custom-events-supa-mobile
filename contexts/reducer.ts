import { StateContext } from './store';
import { User } from '@supabase/supabase-js';

export enum ActionType {
  SET_USER = 'SET_USER'
}

export type Action = { type: ActionType.SET_USER; payload: User | null };

export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return { ...state, user: action.payload };
    default:
      throw new Error('Not among actions');
  }
};
