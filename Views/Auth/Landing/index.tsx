import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  Button
} from 'react-native';
// @ts-ignore
import LandingBG from '~/assets/images/auth/landing.png';
// @ts-ignore
import ELogo from '~/assets/images/auth/elogo.png';
import ROUTES from '~/router/routes';
import useTheme from '~/hooks/useTheme';
import { Theme } from '~/types/theme';

export default function Landing({ navigation }: any) {
  const styles = createStyles(useTheme());

  return (
    <ImageBackground style={styles.image} source={LandingBG}>
      <View style={styles.lowerThird}>
        <View style={styles.appHeader}>
          <Image source={ELogo} />
          <Text style={styles.appTitle}>Event App</Text>
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.loginBtn}>
            <Button
              title={'Login'}
              color={'white'}
              onPress={() => {
                navigation.navigate(ROUTES.LOGIN);
              }}
            />
          </View>
          <View style={styles.signupBtn}>
            <Button
              title={'Register'}
              color={'black'}
              onPress={() => {
                navigation.navigate(ROUTES.SIGNUP);
              }}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    lowerThird: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '50%'
    },
    appHeader: {
      display: 'flex',
      alignItems: 'center'
    },
    appTitle: {
      fontSize: 30
    },
    image: {
      flex: 1,
      resizeMode: 'cover'
    },
    btnContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 40
    },
    loginBtn: {
      width: '90%',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 5,
      backgroundColor: 'black'
    },
    signupBtn: {
      width: '90%',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 5,
      backgroundColor: 'white',
      marginTop: 10
    }
  });
