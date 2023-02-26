import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import useTheme from '~/hooks/useTheme.ts';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: string;
  autoCapitalize?: string;
  autoCompleteType?: string;
  autoCorrect?: boolean;
  autoFocus?: boolean;
  editable?: boolean;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  placeholderTextColor?: string;
  containerStyles?: any;
  inputStyles?: any;
  children?: any;
  height?: number;
  label?: string;
  prepend?: any;
}
export default function StyledTextInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoCompleteType,
  autoCorrect,
  autoFocus,
  editable,
  maxLength,
  multiline,
  numberOfLines,
  placeholderTextColor,
  containerStyles,
  inputStyles,
  children,
  height = 56,
  label,
  prepend
}) {
  const theme = useTheme().theme;
  const styles = createStyles(theme, height);
  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[containerStyles, styles.container]}>
        <View style={styles.prepend}>
          {prepend}
        </View>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCompleteType={autoCompleteType}
          autoCorrect={autoCorrect}
          autoFocus={autoFocus}
          editable={editable}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          placeholderTextColor={placeholderTextColor || theme.subtitle}
          style={[inputStyles, styles.input]}
        />
        {children}
      </View>
    </>
  );
}

const createStyles = (theme, height) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: height,
      backgroundColor: theme.backgroundOffset,
      borderRadius: 8,
      borderColor: theme.backgroundOffsetBorder,
      borderWidth: 1,
      marginBottom: 5
    },
    input: {
      height: height,
      paddingHorizontal: 16,
      width: '80%',
      color: theme.title
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.subtitle,
      paddingBottom: 5,
      marginLeft: 5
    },
    prepend:{
      position: 'absolute',
      left: 16,
    }
  });
