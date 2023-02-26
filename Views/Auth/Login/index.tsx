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
import { supabase } from '~/db/supabase';
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
import StyledTextInput from '~/components/StyledTextInput.tsx';
import StyledButton from '~/components/StyledButton.tsx';

export default function Login({ navigation }: any) {
  const { state, dispatch } = useStateContext();
  const theme = useTheme().theme;
  const styles = createStyles(theme);

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
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Back route={ROUTES.LANDING} navigation={navigation} />

        <View>
          <Text style={styles.welcomeBackText}>
            Welcome back! Glad to see you again!
          </Text>
        </View>
        <StyledTextInput
          containerStyles={{ marginTop: 20 }}
          placeholder="Enter your email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={'email'}
        />
        <StyledTextInput
          containerStyles={{ marginTop: 10 }}
          placeholder="Enter your password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={hidePassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={'password'}
        >
          <MaterialIcons
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.visibilityIcon}
            name={'visibility'}
            color={theme.subtitle}
            size={20}
          />
        </StyledTextInput>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.REQUEST_RESET_PASSWORD)}
          style={[styles.forgotPassword]}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <StyledButton
          containerStyles={{ marginTop: 30 }}
          title={'Login'}
          onPress={signInWithEmail}
        />
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
            <Image style={styles.socialIcon} colo source={Apple}></Image>
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
    page: {
      backgroundColor: theme.background
    },
    container: {
      paddingHorizontal: 14,
      height: '100%'
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
      color: theme.title,
      paddingRight: 20
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginTop: 20
    },
    forgotPasswordText: {
      color: theme.subtitle
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
      borderColor: theme.backgroundOffsetBorder,
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
