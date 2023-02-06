import { useEffect, useState } from 'react';
import { config } from '~/config';
import { Theme } from '~/types/theme';
import { useColorScheme } from 'react-native';

export default function useTheme() {
  const scheme = useColorScheme();

  const [theme, setTheme] = useState<Theme>(config.styles.light);

  useEffect(() => {
    if (scheme == 'dark') {
      setTheme(config.styles.dark);
    } else {
      setTheme(config.styles.light);
    }
  }, [scheme]);

  return { theme, setTheme };
}
