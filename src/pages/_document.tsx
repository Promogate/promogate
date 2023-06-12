import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9258286762385899"
          crossOrigin="anonymous"></script>
        <link rel='icon' type='image/png' href='/favicon.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
