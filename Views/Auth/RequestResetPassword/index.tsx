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
import Back from '~/Views/Auth/components/Back';

export default function RequestResetPassword({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function resetPasswordRequest() {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) Alert.alert(error.message);

    setLoading(false);

    navigation.navigate(ROUTES.OTP, { email: email });
  }

  return (
    <SafeAreaView>
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
        <View style={styles.sendCodeBtn}>
          <Button
            title={'Send Code'}
            color={'white'}
            onPress={resetPasswordRequest}
          />
        </View>

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
  mt20: {
    marginTop: 20
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
  sendCodeBtn: {
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
  bottomLinkText: {},
  bottomLink: {
    color: '#35C2C1',
    marginLeft: 5,
    fontWeight: 'bold'
  }
});
