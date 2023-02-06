import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Button
} from 'react-native';
import { supabase } from '~/lib/supabase';
import ROUTES from '~/router/routes';
import { ActionType } from '~/contexts/reducer';
import { useStateContext } from '~/contexts/store';

export default function ResetPassword({ navigation }: any) {
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

    if (error) Alert.alert(error.message);

    dispatch({ type: ActionType.SET_USER, payload: data.user });

    setLoading(false);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Create new password</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>
            Your password must be unique from your previous one.
          </Text>
        </View>

        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholderTextColor={'#8391A1'}
          />
        </View>
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
            placeholderTextColor={'#8391A1'}
          />
        </View>
        <View>
          <Text style={styles.error}>
            {error ? '*' : ''}
            {error}
          </Text>
        </View>
        <View style={styles.changePasswordBtn}>
          <Button title={'Change Password'} color={'white'} onPress={reset} />
        </View>

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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    height: '100%'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderColor: '#eeeeee',
    borderWidth: 1
  },
  error: {
    color: 'red',
    textAlign: 'right'
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    width: '80%'
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    paddingRight: 20
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: '#6A707C'
  },
  changePasswordBtn: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: 'black',
    marginTop: 30
  },
  bottomLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 'auto',
    justifyContent: 'center'
  },
  bottomLink: {
    color: '#35C2C1',
    marginLeft: 5,
    fontWeight: 'bold'
  }
});
