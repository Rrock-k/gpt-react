import { fontGrotesk, fontHoves } from '@/config/fonts'
import { Providers } from '@/providers/providers'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`app-wrapper ${fontHoves.className} ${fontGrotesk.variable}`}
    >
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </div>
  )
}
