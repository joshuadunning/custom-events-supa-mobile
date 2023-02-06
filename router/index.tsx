import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Views/Dashboard';
import Event from '../Views/Event';
import ROUTES from './routes';
import Login from '../Views/Auth/Login';
import { supabase } from '../lib/supabase';
import Landing from '~/Views/Auth/Landing';
import Signup from '~/Views/Auth/Signup';
import RequestResetPassword from '~/Views/Auth/RequestResetPassword';
import OTP from '~/Views/Auth/OTP';
import { useStateContext } from '~/contexts/store';
import { ActionType } from '~/contexts/reducer';
import ResetPassword from '~/Views/Auth/ResetPassword';
import { registerForPushNotificationsAsync } from '~/helpers';

export const Navigation = () => {
  const { state, dispatch } = useStateContext();

  // On logout, make sure to clear the user from the state
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_OUT') {
        dispatch({ type: ActionType.SET_USER, payload: null });
      }
      if (_event === 'SIGNED_IN') {
        registerForPushNotificationsAsync().then((token) => {
          supabase.auth.updateUser({
            pushToken: token
          });
        });
      }
    });
  }, []);

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
