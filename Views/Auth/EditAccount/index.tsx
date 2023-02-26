import React, { useState, useEffect } from 'react';
import { supabase } from '~/db/supabase';
import {
  StyleSheet,
  View,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useStateContext } from '~/contexts/store.tsx';
import EditAvatar from '~/Views/Auth/components/EditAvatar.tsx';
import Logger from '~/helpers/Logger.ts';
import Back from '~/Views/Auth/components/Back.tsx';
import useTheme from '~/hooks/useTheme.ts';
import ROUTES from '~/router/routes.ts';
import StyledTextInput from '~/components/StyledTextInput.tsx';
import StyledButton from '~/components/StyledButton.tsx';
import { get_profile } from '~/db/index.ts';
import { ActionType } from '~/contexts/reducer.ts';

const log = new Logger('EditAccount.tsx');

export default function EditAccount({ navigation }) {
  const { state, dispatch } = useStateContext();

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => {
    if (showPassword) {
      setPassword('');
      setConfirmPassword('');
      setError('');
    }
    setShowPassword((val) => !val);
  };

  const passwordValid = () => {
    if (password.length > 0 || confirmPassword.length > 0) {
      if (password.length < 8 || confirmPassword.length < 8) {
        return 'Password must be at least 8 characters';
      } else if (password !== confirmPassword) {
        return "Passwords don't match";
      } else {
        return '';
      }
    } else {
      return '';
    }
  };

  useEffect(() => {
    if (state.user && state.profile) {
      setName(state.profile.full_name);
      setEmail(state.user.email);
      setUsername(state.profile.username?.toLowerCase());
    } else {
      Alert('You must be logged in to edit your account.');
      navigation.navigate(ROUTES.LOGIN);
    }
  }, [state.user]);

  const save = async () => {
    setLoading(true);
    const passwordError = passwordValid();
    if (passwordError.length > 0) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    let attributes = {};
    if (password.length > 0) {
      attributes.password = password;
    }
    if (email !== state.user.email) {
      attributes.email = email;
    }
    if (Object.keys(attributes).length > 0) {
      const { error } = await supabase.auth.updateUser(attributes);
      if (error) {
        log.error('Error updating User', error);
        Alert.alert('Error updating User');
        setLoading(false);
        return;
      } else if (attributes.email) {
        Alert.alert(
          'Email changes will go into effect once you confirm on both your old and new email address.'
        );
      }
    }

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: name, username: username.toLowerCase() })
      .eq('id', state.user.id);

    if (error) {
      log.error('Error updating profile', error);
      Alert.alert('Error updating profile');
      setLoading(false);
      return;
    }

    const profile = await get_profile(state.user.id);
    dispatch({ type: ActionType.SET_PROFILE, payload: profile });
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerBack}>
            <Back navigation={navigation} />
          </View>
          <Text style={styles.headerText}>Profile</Text>
          {/*<MaterialIcons name={'menu'} size={24} color={'black'} />*/}
        </View>
        <View style={styles.profile}>
          <EditAvatar id={state.user?.id} onUpload={console.log} />
          <Text style={styles.name}>{state.profile?.full_name}</Text>
          <Text style={styles.username}>@{state.profile.username}</Text>
        </View>
        <View style={styles.selectionContainer}>
          <StyledTextInput
            label={'Name'}
            height={46}
            value={name}
            onChangeText={setName}
          />
          <StyledTextInput
            label={'Email'}
            height={46}
            value={email}
            onChangeText={setEmail}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <StyledTextInput
            label={'Username'}
            height={46}
            value={username}
            onChangeText={setUsername}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          {showPassword && (
            <>
              <StyledTextInput
                label={'Password'}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
              />
              <StyledTextInput
                label={'Confirm Password'}
                placeholder="Confirm password"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry={true}
              />
              <View>
                <Text style={styles.error}>
                  {error ? '*' : ''}
                  {error}
                </Text>
              </View>
            </>
          )}

          <TouchableOpacity onPress={toggleShowPassword}>
            <Text style={styles.changePassword}>
              {showPassword ? 'Cancel' : 'Change Password?'}
            </Text>
          </TouchableOpacity>
          <StyledButton
            containerStyles={{ marginTop: 20 }}
            title={'Save'}
            onPress={save}
            loading={loading}
          />
          <StyledButton
            outlined={true}
            title={'Logout'}
            onPress={() => supabase.auth.signOut()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: theme.background
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      height: 30
    },
    headerBack: {
      position: 'absolute',
      left: 20,
      top: 0
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.title
    },
    profile: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.title,
      marginTop: 10
    },
    username: {
      fontSize: 14,
      color: theme.subtitle
    },
    selectionContainer: {
      marginTop: 40,
      borderTopWidth: 1,
      borderTopColor: theme.backgroundOffsetBorder,
      borderBottomWidth: 1,
      borderBottomColor: theme.backgroundOffsetBorder,
      marginHorizontal: 30,
      paddingVertical: 10
    },
    settingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      paddingVertical: 5
    },
    settingIcon: {
      color: '#3160e3'
    },
    settingIconContainer: {
      backgroundColor: '#e2e2e2',
      borderRadius: 10,
      padding: 7
    },
    settingText: {
      flex: 1,
      marginLeft: 15,
      fontWeight: '800'
    },
    changePassword: {
      color: theme.primary,
      textAlign: 'right'
    },
    error: {
      color: 'red',
      textAlign: 'right'
    }
  });
