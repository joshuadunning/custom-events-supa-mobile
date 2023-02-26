import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { supabase } from '~/db/supabase';
import ROUTES from '~/router/routes';
import { ActionType } from '~/contexts/reducer';
import { useStateContext } from '~/contexts/store';
import StyledTextInput from '~/components/StyledTextInput.tsx';
import StyledButton from '~/components/StyledButton.tsx';
import useTheme from '~/hooks/useTheme.ts';

export default function ResetPassword({ navigation }: any) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { state, dispatch } = useStateContext();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  async function reset() {
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.updateUser({
      password: password
    });

    setLoading(false);

    if (error) {
      dispatch({ type: ActionType.ADD_SNACK, payload: { text: error.message, type: 'ERROR' }})
    }else{
      dispatch({ type: ActionType.SET_USER, payload: data.user });
    }

  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Create new password</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>
            Your password must be unique from your previous one.
          </Text>
        </View>

        <StyledTextInput
          containerStyles={{ marginTop: 10 }}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <StyledTextInput
          containerStyles={{ marginTop: 10 }}
          placeholder="Confirm password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
        />
        <View>
          <Text style={styles.error}>
            {error ? '*' : ''}
            {error}
          </Text>
        </View>
        <StyledButton
          containerStyles={{ marginTop: 30 }}
          title="Change Password"
          onPress={reset}
        />
        <View style={styles.bottomLinkContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.LOGIN);
            }}
          >
            <Text style={styles.bottomLink}>Return to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    page: {
      backgroundColor: theme.background
    },
    container: {
      paddingHorizontal: 14,
      height: '100%'
    },
    error: {
      color: theme.error,
      textAlign: 'right'
    },
    title: {
      marginTop: 20,
      fontSize: 28,
      fontWeight: 'bold',
      paddingRight: 20,
      color: theme.title
    },
    subtitle: {
      marginTop: 10,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500',
      color: theme.subtitle
    },
    bottomLinkContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginTop: 'auto',
      justifyContent: 'center'
    },
    bottomLink: {
      color: theme.primary,
      marginLeft: 5,
      fontWeight: 'bold'
    }
  });
