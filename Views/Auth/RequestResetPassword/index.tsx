import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { supabase } from '~/db/supabase';
import ROUTES from '~/router/routes';
import Back from '~/Views/Auth/components/Back';
import StyledTextInput from '~/components/StyledTextInput.tsx';
import StyledButton from '~/components/StyledButton.tsx';
import useTheme from '~/hooks/useTheme.ts';
import { useStateContext } from "~/contexts/store.tsx";
import { ActionType } from "~/contexts/reducer.ts";

export default function RequestResetPassword({ navigation }: any) {

  const {dispatch} = useStateContext();

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function resetPasswordRequest() {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    setLoading(false);

    if (error) {
      dispatch({type: ActionType.ADD_SNACK, payload: {text: error.message, type: "ERROR"}});
    }else{
      navigation.navigate(ROUTES.OTP, { email: email });
    }


  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Back navigation={navigation} />

        <View>
          <Text style={styles.title}>Forgot Password?</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>
            Don't worry, we got you. Enter your email and we'll send you a code
            to reset your password.
          </Text>
        </View>

        <StyledTextInput
          containerStyles={styles.mt20}
          placeholder="Enter your email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={'email'}
        />
        <StyledButton
          containerStyles={{ marginTop: 30 }}
          title={'Send Code'}
          onPress={resetPasswordRequest}
          loading={loading}
        />

        <View style={styles.bottomLinkContainer}>
          <Text style={styles.bottomLinkText}>Remember Password?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.LOGIN);
            }}
          >
            <Text style={styles.bottomLink}>Login</Text>
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
    bottomLinkText: {
      color: theme.subtitle
    },
    bottomLink: {
      color: theme.primary,
      marginLeft: 5,
      fontWeight: 'bold'
    }
  });
