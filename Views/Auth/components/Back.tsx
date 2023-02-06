import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Routes from '~/router/routes';

interface Props {
  navigation: any;
  route?: string;
}

export default function Back({ navigation, route }: Props) {
  return (
    <TouchableOpacity
      onPress={() => {
        route ? navigation.navigate(route) : navigation.goBack();
      }}
      style={styles.backBtnContainer}
    >
      <MaterialIcons name={'chevron-left'} color={'#1E232C'} size={40} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    width: 44,
    borderRadius: 10
  }
});
