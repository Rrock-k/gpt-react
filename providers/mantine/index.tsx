import { theme } from '@/config/theme'
import { MantineProvider as MantineProviderFromLibrary } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

export const MantineProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <MantineProviderFromLibrary
      withGlobalStyles
      withNormalizeCSS
      theme={{
        ...theme,
        colorScheme: 'dark',
      }}
    >
      <Notifications />
      {children}
    </MantineProviderFromLibrary>
  )
}
