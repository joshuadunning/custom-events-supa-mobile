import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import useTheme from '~/hooks/useTheme.ts';

interface Props {
  code: string;
  setCode: (code: string) => void;
  autoFocus?: boolean;
  size: number;
}

export default function OTPInput({ size, code, setCode }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [numbers, setNumbers] = useState(Array(size).fill(''));
  const hiddenInput = React.useRef<TextInput>(null);

  //Update numbers array when code changes
  useEffect(() => {
    handleInput(code);
  }, [code]);

  useEffect(() => {
    setNumbers(Array(size).fill(''));
  }, [size]);

  //Update numbers array with code from hidden field
  const handleInput = (text: string) => {
    const code = text.split('');
    setNumbers((prev) => prev.map((_, index) => code[index] || ''));
  };

  //Verify code length in hidden field doesn't exceed size specified
  //then emit the change
  const handleCodeChange = (text: string) => {
    if (text.length > size) return;
    setCode(text);
  };

  const focusOnHidden = () => {
    hiddenInput.current?.focus();
  };

  return (
    <TouchableOpacity onPress={focusOnHidden} style={styles.container}>
      <TextInput
        style={styles.hidden}
        autoFocus={true}
        keyboardType={'numeric'}
        onChangeText={handleCodeChange}
        value={code}
        ref={hiddenInput}
      />
      {numbers.map((number, index) => (
        <View
          key={index}
          style={[
            styles.numberContainer,
            number ? styles.numberContainerFilled : styles.numberContainerEmpty
          ]}
        >
          <Text style={styles.number}>{number}</Text>
        </View>
      ))}
    </TouchableOpacity>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    numberContainer: {
      borderColor: theme.backgroundOffsetBorder,
      borderWidth: 1,
      borderRadius: 8,
      height: 80,
      width: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    numberContainerEmpty: {
      borderColor: theme.backgroundOffsetBorder,
      backgroundColor: theme.backgroundOffset
    },
    numberContainerFilled: {
      borderColor: theme.primary
    },
    number: {
      fontSize: 28,
      color: theme.title
    },
    hidden: {
      display: 'none'
    }
  });
