import localFont from '@next/font/local'

export const fontGrotesk = localFont({
  src: [
    {
      path: '../assets/fonts/PPRadioGrotesk-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/PPRadioGrotesk-Black.woff',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/PPRadioGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/PPRadioGrotesk-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/PPRadioGrotesk-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../assets/fonts/PPRadioGrotesk-Regular.woff',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../assets/fonts/PPRadioGrotesk-Ultralight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/PPRadioGrotesk-Ultralight.woff',
      weight: '200',
      style: 'normal',
    },
  ],
  variable: '--font-grotesk',
})

export const fontHoves = localFont({
  src: [
    {
      path: '../assets/fonts/TTHoves-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/TTHoves-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/TTHoves-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/TTHoves-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/TTHoves-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/TTHoves-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-hoves',
})
