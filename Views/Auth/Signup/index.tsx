import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Button,
  Image
} from 'react-native';
import { supabase } from '~/lib/supabase';
import { MaterialIcons } from '@expo/vector-icons';
import ROUTES from '~/router/routes';
// @ts-ignore
import FB from '~/assets/images/auth/facebook.png';
// @ts-ignore
import Apple from '~/assets/images/auth/apple.png';
// @ts-ignore
import Google from '~/assets/images/auth/google.png';
import Back from '~/Views/Auth/components/Back';
import { ActionType } from '~/contexts/reducer';
import { useStateContext } from '~/contexts/store';

export default function Signup({ navigation }: any) {
  const { state, dispatch } = useStateContext();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function signUpWithEmail() {
    if (firstName.length < 1) {
      setError('Please enter your name');
      return;
    }

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: firstName
        }
      }
    });

    if (error) Alert.alert(error.message);

    dispatch({ type: ActionType.SET_USER, payload: data.user });

    setLoading(false);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Back route={ROUTES.LANDING} navigation={navigation} />

        <View>
          <Text style={styles.title}>Hello! Register to get started.</Text>
        </View>
        <View style={[styles.mt20, styles.inputContainer]}>
          <TextInput
            style={styles.input}
            placeholder="First name"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            placeholderTextColor={'#8391A1'}
            autoComplete={'name'}
          />
        </View>
        <View style={[styles.mt20, styles.inputContainer]}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholderTextColor={'#8391A1'}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete={'email'}
          />
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
        <View style={styles.loginBtn}>
          <Button
            title={'Register'}
            color={'white'}
            onPress={signUpWithEmail}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <View style={styles.hdiv}></View>
          <Text style={styles.orLoginWith}>Or register with</Text>
          <View style={styles.hdiv}></View>
        </View>
        <View style={styles.socialContainer}>
          <View style={styles.socialBtn}>
            <Image style={styles.socialIcon} source={FB}></Image>
          </View>
          <View style={[{ marginHorizontal: 8 }, styles.socialBtn]}>
            <Image style={styles.socialIcon} source={Google}></Image>
          </View>
          <View style={styles.socialBtn}>
            <Image style={styles.socialIcon} source={Apple}></Image>
          </View>
        </View>
        <View style={styles.noAccountContainer}>
          <Text style={styles.noAccount}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            <Text style={styles.register}>Login Now</Text>
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
  input: {
    height: 56,
    paddingHorizontal: 16,
    width: '80%'
  },
  error: {
    color: 'red',
    textAlign: 'right'
  },
  visibilityIcon: {
    paddingRight: 16
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch'
  },
  mt20: {
    marginTop: 20
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    paddingRight: 20
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#6A707C',
    marginTop: 20
  },
  loginBtn: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: 'black',
    marginTop: 30
  },
  orLoginWith: {
    marginTop: 20,
    marginBottom: 20,
    color: '#6A707C',
    paddingHorizontal: 10
  },
  hdiv: {
    flex: 1,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  socialBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 10,
    paddingVertical: 15
  },
  socialIcon: {
    width: 26,
    height: 26
  },
  noAccountContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 'auto',
    justifyContent: 'center'
  },
  noAccount: {},
  register: {
    color: '#35C2C1',
    marginLeft: 5,
    fontWeight: 'bold'
  }
});
