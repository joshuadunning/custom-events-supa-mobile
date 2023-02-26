import React from 'react';
import { StyleSheet, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import useTheme from '~/hooks/useTheme.ts';

interface Props {
  title: string;
  onPress: () => void;
  outlined?: boolean;
  containerStyles?: any;
  loading?: boolean;
}

export default function StyledButton({
  title,
  onPress,
  outlined,
  containerStyles,
  loading
}: Props) {
  const theme = useTheme().theme;
  const styles = createStyles(theme, outlined);

  const handleOnPress = () => {
    if (!loading) {
      onPress();
    }
  }

  return (
    <TouchableOpacity disabled={loading} onPress={onPress} style={[containerStyles, styles.container, loading ? styles.loading: styles.containerColors]}>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <Text
          style={styles.text}
          color={outlined ? theme.buttonBackground : theme.buttonForeground}
        >{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const createStyles = (theme, outlined) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 5,
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
      height: 56
    },
    containerColors:{
      borderColor: theme.buttonBackground,
      backgroundColor: outlined ? 'transparent' : theme.buttonBackground,
    },
    loading:{
      borderColor: theme.buttonBackgroundDisabled,
      backgroundColor: outlined ? theme.buttonBackgroundOutlinedDisabled: theme.buttonBackgroundDisabled,
    },
    text:{
      color: outlined ? theme.buttonBackground : theme.buttonForeground,
      fontSize: 16,
    }
  });
