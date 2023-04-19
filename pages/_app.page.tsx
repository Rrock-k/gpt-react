import { fontGrotesk, fontHoves } from '@/config/fonts'
import { Providers } from '@/providers/providers'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import 'normalize.css/normalize.css'

function App({ Component, pageProps }: AppProps) {
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

export default dynamic(() => Promise.resolve(App), { ssr: false })
