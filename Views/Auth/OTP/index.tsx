import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Button,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { supabase } from '~/lib/supabase';
import { MaterialIcons } from '@expo/vector-icons';
import ROUTES from '~/router/routes';
import Back from '~/Views/Auth/components/Back';
import { EmailOtpType } from '@supabase/gotrue-js/src/lib/types';
import OTPInput from '~/Views/Auth/components/OTPInput';

export default function OTP({ navigation, route }: any) {
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

    if (error) Alert.alert(error.message);

    setLoading(false);

    navigation.navigate(ROUTES.RESET_PASSWORD, { email: route.params.email });
  }

  return (
    <SafeAreaView>
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    height: '100%'
  },
  title: {
    marginTop: 20,
    fontSize: 40,
    fontWeight: 'bold',
    paddingRight: 20
  },
  subtitle: {
    marginTop: 14,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '400',
    color: '#6A707C',
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
  bottomLinkText: {},
  bottomLink: {
    color: '#35C2C1',
    marginLeft: 5,
    fontWeight: 'bold'
  }
});
