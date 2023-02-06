import React, { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
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
import { useStateContext } from '~/contexts/store';
import { ActionType } from '~/contexts/reducer';
import { Theme } from '~/types/theme';
import useTheme from '~/hooks/useTheme';

export default function Login({ navigation }: any) {
  const { state, dispatch } = useStateContext();

  const styles = createStyles(useTheme().theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  async function signInWithEmail() {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) Alert.alert(error.message);

    dispatch({ type: ActionType.SET_USER, payload: data.user });

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  const googleSignIn = async () => {
    console.log('googleSignIn');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Back route={ROUTES.LANDING} navigation={navigation} />

        <View>
          <Text style={styles.welcomeBackText}>
            Welcome back! Glad to see you again!
          </Text>
        </View>

        <View style={[styles.mt20, styles.inputContainer]}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={hidePassword}
            placeholderTextColor={'#8391A1'}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete={'password'}
          />
          <MaterialIcons
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.visibilityIcon}
            name={'visibility'}
            color={'#1E232C'}
            size={20}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.REQUEST_RESET_PASSWORD)}
          style={[styles.forgotPassword]}
        >
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.loginBtn}>
          <Button title={'Login'} color={'white'} onPress={signInWithEmail} />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <View style={styles.hdiv}></View>
          <Text style={styles.orLoginWith}>Or login with</Text>
          <View style={styles.hdiv}></View>
        </View>
        <View style={styles.socialContainer}>
          <View style={styles.socialBtn}>
            <Image style={styles.socialIcon} source={FB}></Image>
          </View>
          <TouchableOpacity
            onPress={googleSignIn}
            style={[{ marginHorizontal: 8 }, styles.socialBtn]}
          >
            <Image style={styles.socialIcon} source={Google}></Image>
          </TouchableOpacity>
          <View style={styles.socialBtn}>
            <Image style={styles.socialIcon} source={Apple}></Image>
          </View>
        </View>
        <View style={styles.noAccountContainer}>
          <Text style={styles.noAccount}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.SIGNUP);
            }}
          >
            <Text style={styles.register}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
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

    welcomeBackText: {
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
      color: theme.accent1,
      marginLeft: 5,
      fontWeight: 'bold'
    }
  });
