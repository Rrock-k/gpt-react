import { ProvidersWrapper } from './providers-wrapper'
import { MantineProvider } from './mantine'
import { ReactQueryProvider } from './react-query'

import React from 'react'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProvidersWrapper
      /**
       * ProvidersWrapper isolates context providers and wraps them in memo boundary
       * Thus removing unnesessary renders
       */
      providers={[
        // all providers go there
        // the order is from highest to lowest in component tree
        ReactQueryProvider,
        MantineProvider,
      ]}
    >
      {children}
    </ProvidersWrapper>
  )
}
