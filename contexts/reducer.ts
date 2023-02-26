import { StateContext } from './store';
import { User } from '@supabase/supabase-js';
import { Database } from '~/types/schema.ts';
import { generateUUID } from '~/helpers/index.ts';

export enum ActionType {
  SET_USER = 'SET_USER',
  SET_PROFILE = 'SET_PROFILE',
  ADD_SNACK = 'ADD_SNACK'
}

export type Action =
  | { type: ActionType.SET_USER; payload: User | null }
  | {
      type: ActionType.SET_PROFILE;
      payload: Database.public.tables.profiles.Row | null;
    }
  | {
      type: ActionType.ADD_SNACK;
      payload: { text: string; type: 'INFO' | 'ERROR', timeout?: number } | null;
    }
  | {
      type: ActionType.REMOVE_SNACK;
      payload: string;
    };

export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return { ...state, user: action.payload };
    case ActionType.SET_PROFILE:
      return { ...state, profile: action.payload };
    case ActionType.ADD_SNACK:
      const snack = action.payload;
      snack.id = generateUUID();
      return { ...state, snacks: [...state.snacks, snack] };
    case ActionType.REMOVE_SNACK:
      return {
        ...state,
        snacks: state.snacks.filter((snack) => snack.id !== action.payload)
      };
    default:
      throw new Error('Not among actions');
  }
};
