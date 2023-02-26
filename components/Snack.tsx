import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStateContext } from '~/contexts/store.tsx';
import useTheme from '~/hooks/useTheme.ts';
import { ActionType } from '~/contexts/reducer.ts';

export default function Snack() {
  const { state, dispatch } = useStateContext();

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [ids, setIds] = React.useState([]);

  useEffect(() => {
    state.snacks.forEach((snack) => {
      if (!ids.includes(snack.id)) {
        const timeout = snack.timeout || 5000;
        setIds((ids) => [...ids, snack.id]);
        setTimeout(() => {
          setIds((ids) => ids.filter((id) => id !== snack.id));
          dispatch({ payload: snack.id, type: ActionType.REMOVE_SNACK });
        }, timeout);
      }
    });
  }, [state.snacks]);

  return (
    <View style={styles.container}>
      {state.snacks.map((snack) => (
        <View
          key={snack.id}
          style={[
            styles.snack,
            snack.type === 'ERROR' ? styles.error : styles.info
          ]}
        >
          <Text
            style={[
              styles.text,
              snack.type === 'ERROR' ? styles.errorText : styles.infoText
            ]}
          >
            {snack.text}
          </Text>
        </View>
      ))}
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      position: 'fixed',
      bottom: 40
    },
    snack: {
      left: '7.5%',
      width: '85%',
      borderRadius: 5,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginTop: 5,
      backgroundColor: theme.snackBackground
    },
    text: { color: theme.snackForeground },
    error: {
      backgroundColor: theme.error
    },
    errorText: {
      color: 'white'
    },
    info: {
      backgroundColor: theme.snackBackground
    },
    infoText: {
      color: theme.snackForeground
    }
  });
