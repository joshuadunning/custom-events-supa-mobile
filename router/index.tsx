import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Views/Dashboard';
import Event from '../Views/Event';
import ROUTES from './routes';
import Login from '../Views/Auth/Login';
import { supabase } from '~/db/supabase';
import Landing from '~/Views/Auth/Landing';
import Signup from '~/Views/Auth/Signup';
import RequestResetPassword from '~/Views/Auth/RequestResetPassword';
import OTP from '~/Views/Auth/OTP';
import { useStateContext } from '~/contexts/store';
import { ActionType } from '~/contexts/reducer';
import ResetPassword from '~/Views/Auth/ResetPassword';
import { registerForPushNotificationsAsync } from '~/helpers';
import Logger from '~/helpers/Logger.ts';
import EditAccount from '~/Views/Auth/EditAccount/index.tsx';
import { get_profile } from '~/db/index.ts';

const log = new Logger('Navigation.tsx');

export const Navigation = () => {
  const { state, dispatch } = useStateContext();

  // On logout, make sure to clear the user from the state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && data.session.user) {
        dispatch({ type: ActionType.SET_USER, payload: data.session.user });
        updatePushToken(data.session.user.id);
        get_profile(data.session.user.id).then((profile) => {
          dispatch({ type: ActionType.SET_PROFILE, payload: profile });
        });
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_OUT') {
        dispatch({ type: ActionType.SET_USER, payload: null });
        dispatch({ type: ActionType.SET_PROFILE, payload: null });
      }
      if (_event === 'SIGNED_IN' && session) {
        updatePushToken(session.user.id);
        get_profile(session.user.id).then((profile) => {
          dispatch({ type: ActionType.SET_PROFILE, payload: profile });
        });
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const updatePushToken = async (id: string) => {
    const token = await registerForPushNotificationsAsync();

    const res = await supabase
      .from('profiles')
      .update({ push_token: token })
      .eq('id', id);

    res.error && log.error(res.error);
  };

  return (
    <NavigationContainer>
      {state && state.user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.DASHBOARD}>
      <Stack.Screen
        name={ROUTES.DASHBOARD}
        component={Dashboard}
        options={{ title: 'Welcome', headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.EVENT}
        component={Event}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.EDITACCOUNT}
        component={EditAccount}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName={ROUTES.LANDING}
      screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}
    >
      <AuthStack.Screen
        name={ROUTES.LANDING}
        component={Landing}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={ROUTES.SIGNUP}
        component={Signup}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={ROUTES.REQUEST_RESET_PASSWORD}
        component={RequestResetPassword}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={ROUTES.OTP}
        component={OTP}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={ROUTES.RESET_PASSWORD}
        component={ResetPassword}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}
