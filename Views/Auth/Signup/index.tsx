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
import { supabase } from '~/db/supabase';
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
import StyledTextInput from '~/components/StyledTextInput.tsx';
import StyledButton from '~/components/StyledButton.tsx';
import useTheme from '~/hooks/useTheme.ts';

export default function Signup({ navigation }: any) {
  const { state, dispatch } = useStateContext();

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function signUpWithEmail() {

    setError("")

    if (firstName.length < 1) {
      setError(()=>'Please enter your name');
      return;
    }

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validRegex.test(email)) {
      setError(()=> 'Please enter a valid email');
      return;
    }

    if (username.length < 8) {
      setError(()=>'Username must be at least 8 characters');
      return;
    }

    if(!/^[a-zA-Z0-9]*$/.test(username)) {
      setError(()=>'Username must contain only letters and numbers');
      return;
    }

    if (password.length < 8) {
      setError(()=>'Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError(()=>'Passwords do not match');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: firstName,
          username: username
        }
      }
    });

    if (error) Alert.alert(error.message);

    dispatch({ type: ActionType.SET_USER, payload: data.user });

    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Back route={ROUTES.LANDING} navigation={navigation} />

        <View>
          <Text style={styles.title}>Hello! Register to get started.</Text>
        </View>
        <StyledTextInput
          containerStyles={styles.mt20}
          placeholder="Display name"
          onChangeText={setFirstName}
          value={firstName}
          autoComplete={'name'}
        />
        <StyledTextInput
          containerStyles={{ marginTop: 10 }}
          inputStyles={{ paddingLeft: 30 }}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          autoComplete={'username'}
          autoCapitalize={'none'}
          prepend={<Text style={{color: theme.subtitle}}>@</Text>}
        />
        <StyledTextInput
          containerStyles={{ marginTop: 10 }}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={'email'}
        />
        <StyledTextInput
          containerStyles={{ marginTop: 10 }}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <StyledTextInput
          containerStyles={{ marginTop: 10 }}
          placeholder="Confirm password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={true}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <View>
          <Text style={styles.error}>
            {error ? '*' : ''}
            {error}
          </Text>
        </View>
        <StyledButton title={'Register'} onPress={signUpWithEmail} loading={loading} />
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
      paddingRight: 20,
      color: theme.title
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      color: theme.subtitle,
      marginTop: 20
    },
    orLoginWith: {
      marginTop: 20,
      marginBottom: 20,
      color: theme.subtitle,
      paddingHorizontal: 10
    },
    hdiv: {
      flex: 1,
      borderBottomColor: theme.subtitle,
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
      borderColor: theme.subtitle,
      backgroundColor: 'white',
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
    noAccount: {
      color: theme.subtitle
    },
    register: {
      color: theme.primary,
      marginLeft: 5,
      fontWeight: 'bold'
    }
  });
