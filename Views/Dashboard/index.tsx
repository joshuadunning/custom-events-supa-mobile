import React, { useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import ROUTES from '~/router/routes';
import { supabase } from '~/db/supabase';
import useTheme from '~/hooks/useTheme.ts';
import { useStateContext } from '~/contexts/store.tsx';
const Dashboard = ({ navigation }: any) => {
  const { state } = useStateContext();

  const { theme } = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    console.log(state.snack);
  }, [state.snack]);

  return (
    <SafeAreaView style={styles.page}>
      <Text>Dashboard</Text>
      <Button
        title={'Go to Event'}
        onPress={() => navigation.navigate(ROUTES.EVENT)}
      />
      <Button
        title={'Go to Profile'}
        onPress={() => navigation.navigate(ROUTES.EDITACCOUNT)}
      />
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </SafeAreaView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: theme.background
    }
  });

export default Dashboard;
