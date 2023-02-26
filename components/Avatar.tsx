import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Logger from '~/helpers/Logger.ts';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import useTheme from '~/hooks/useTheme.ts';

const log = new Logger('Avatar.tsx');

interface Props {
  size: number;
  url: string | null;
  isEditable?: boolean;
  uploading?: boolean;
  onPress?: () => void;
}

export default function Avatar({
  url,
  size = 100,
  isEditable,
  uploading,
  onPress
}: Props) {
  const theme = useTheme().theme;
  const styles = createStyles(theme, size);

  const renderAvatar = () => {
    return (
      <>
        {url ? (
          <Image
            source={{ uri: url }}
            accessibilityLabel="EditAvatar"
            style={[styles.avatar, styles.image]}
          />
        ) : (
          <FontAwesome
            name={'user'}
            size={size - 30}
            color={'rgb(255, 255, 255)'}
            style={[styles.noImage]}
          />
        )}
        <TouchableOpacity onPress={onPress} style={styles.cameraContainer}>
          <MaterialIcons
            name={'edit'}
            size={size / 8}
            color={'white'}
            style={styles.camera}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View
      style={[
        styles.container,
        url
          ? { backgroundColor: 'rgb(255,255,255)' }
          : { backgroundColor: 'rgb(100,100,100)' }
      ]}
    >
      {uploading ? <ActivityIndicator size={'large'} /> : renderAvatar()}
    </View>
  );
}

const createStyles = (theme, size) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#3160e3',
      borderRadius: size / 2,
      height: size,
      width: size
    },
    avatar: {
      borderRadius: size / 2,
      height: size - 6,
      width: size - 6
    },
    image: {
      padding: 0,
      objectFit: 'cover'
    },
    cameraContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: '#3160e3',
      borderRadius: 50,
      padding: 7
    }
  });
