import { useState, useEffect } from 'react';
import { supabase } from '~/db/supabase';
import * as ImagePicker from 'expo-image-picker';
import Logger from '~/helpers/Logger.ts';
import { useStateContext } from '~/contexts/store.tsx';
import Avatar from '~/components/Avatar.tsx';

const log = new Logger('EditAvatar.tsx');

interface Props {
  size?: number;
  id: string | null;
  onUpload: (filePath: string) => void;
}

export default function EditAvatar({ id, size = 100, onUpload }: Props) {
  const { state } = useStateContext();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (id || !uploading) downloadImage(id);
  }, [id, uploading]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(`${id}/avatar`);

      console.log('data', data);
      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        log.warn('Error downloading image: ', error.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        selectionLimit: 1
      });

      const photo = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: 'avatar'
      };

      // if (!result.canceled && result.type == 'image') {
      //   uploadImage(pickerResult);
      // }

      const formData = new FormData();
      formData.append('file', photo);

      const filePath = `${state.user?.id}/avatar`;

      let { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, formData, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        log.warn(error);
      }

      onUpload(filePath);
    } catch (error) {
      if (error instanceof Error) {
        log.warn(error.message);
      } else {
        log.info(error);
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <Avatar
      size={150}
      url={avatarUrl}
      isEditable={true}
      uploading={uploading}
      onPress={uploadAvatar}
    />
  );
}
