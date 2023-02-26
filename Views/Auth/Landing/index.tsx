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
import StyledButton from '~/components/StyledButton.tsx';

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
          <StyledButton
            title={'Login'}
            onPress={() => navigation.navigate(ROUTES.LOGIN)}
          />
          <StyledButton
            title={'Register'}
            outlined={true}
            onPress={() => navigation.navigate(ROUTES.SIGNUP)}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    lowerThird: {
      backgroundColor: theme.background,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '50%',
      alignItems: 'center'
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
      width: '90%',
      marginTop: 40
    }
  });
