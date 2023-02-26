import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Routes from '~/router/routes';
import useTheme from '~/hooks/useTheme.ts';

interface Props {
  navigation: any;
  route?: string;
}

export default function Back({ navigation, route }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      onPress={() => {
        route ? navigation.navigate(route) : navigation.goBack();
      }}
      style={styles.backBtnContainer}
    >
      <MaterialIcons name={'chevron-left'} color={theme.subtitle} size={26} />
    </TouchableOpacity>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    backBtnContainerSquare: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 0,
      borderWidth: 1,
      borderColor: theme.backgroundOffsetBorder,
      width: 44,
      borderRadius: 10
    },
    backBtnContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 0,
      borderWidth: 1,
      borderColor: theme.backgroundOffsetBorder,
      backgroundColor: theme.backgroundOffset,
      borderRadius: 14,
      maxWidth: 28
    }
  });
