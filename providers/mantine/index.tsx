import { theme } from '@/config/theme'
import { logColored } from '@/dev/logColored'
import { MantineProvider as MantineProviderFromLibrary, ColorSchemeProvider, ColorScheme } from '@mantine/core'

import { Notifications } from '@mantine/notifications'
import { useState } from 'react'

export const MantineProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProviderFromLibrary
        withGlobalStyles
        withNormalizeCSS
        theme={{
          ...theme,
          primaryColor: colorScheme === 'dark' ? theme.primaryColor : 'teal',
          colorScheme,
        }}
      >
        <Notifications />
        {children}
      </MantineProviderFromLibrary>
    </ColorSchemeProvider>
  )
}
