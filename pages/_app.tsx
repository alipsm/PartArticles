// import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import '../styles/global.css'
import '../styles/style.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
