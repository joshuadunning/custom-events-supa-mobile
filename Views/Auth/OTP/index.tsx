import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "~/db/supabase";
import ROUTES from "~/router/routes";
import Back from "~/Views/Auth/components/Back";
import OTPInput from "~/Views/Auth/components/OTPInput";
import useTheme from "~/hooks/useTheme.ts";
import { useStateContext } from "~/contexts/store.tsx";
import { ActionType } from "~/contexts/reducer.ts";

export default function OTP({ navigation, route }: any) {

  const {dispatch} = useStateContext();

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string>('');

  useEffect(() => {
    if (otp.length === 6) verify(otp);
  }, [otp]);

  async function resend() {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(
      route.params.email
    );

    console.log("RESEND OTP")

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function verify(otp: string) {
    setLoading(true);
    const { error, data } = await supabase.auth.verifyOtp({
      email: route.params.email,
      token: otp,
      type: 'recovery'
    });

    setLoading(false);

    if (error) {
      dispatch({type: ActionType.ADD_SNACK, payload: {text: error.message, type: "ERROR"}});
      setOtp(()=>'')
      return
    }else{
      navigation.navigate(ROUTES.RESET_PASSWORD, { email: route.params.email });
    }
  }

  return (
    <SafeAreaView style={styles.page}>
      <KeyboardAvoidingView behavior={'padding'}>
        <View style={styles.container}>
          <Back navigation={navigation} />
          <View>
            <Text style={styles.title}>OTP Verification</Text>
          </View>
          <View>
            <Text style={styles.subtitle}>
              Enter the verification code we sent to {route.params.email}
            </Text>
          </View>

          <OTPInput size={6} code={otp} setCode={setOtp} />

          <View style={styles.bottomLinkContainer}>
            <Text style={styles.bottomLinkText}>Didn't receive a code?</Text>
            <TouchableOpacity onPress={resend}>
              <Text style={styles.bottomLink}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    title: {
      marginTop: 20,
      fontSize: 40,
      fontWeight: 'bold',
      paddingRight: 20,
      color: theme.title
    },
    subtitle: {
      marginTop: 14,
      fontSize: 24,
      lineHeight: 30,
      fontWeight: '400',
      color: theme.subtitle,
      marginBottom: 30
    },
    bottomLinkContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginTop: 'auto',
      justifyContent: 'center',
      marginBottom: 20
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
