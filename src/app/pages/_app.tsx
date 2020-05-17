import * as React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'

import Head from 'next/head'

import theme from 'lib/theme'
import { client } from 'lib/axiosClient'
import { initializeStore } from 'modules/reducer'

import { createUserAction } from 'modules/auth'
import { getOrInitializeStore } from 'lib/store'

client.interceptors.request.use(
  (req) => {
    const token = initializeStore().getState().auth?.user?.token
    if (token) {
      // 認証トークン
      req.headers.Authorization = `Bearer ${token}`
    }
    return req
  },
  (err) => Promise.reject(err)
)

// client.interceptors.response.use(
//   res => res,
//   err => {
//     if (axios.isCancel(err)) {
//       return Promise.reject({ status: 999, statusText: 'Canceled' })
//     }
//     const response = err.response || {}
//     const status = response.status || 400
//     if (status === 401) {
//       // connectしていないので明示的にdispatchを渡す
//       // logout()(store.dispatch)
//     }
//     const statusText = response.statusText || 'Error'
//     let data = response.data || {}
//     if (typeof data === 'string') {
//       data = { statusText: data }
//     }
//     return Promise.reject({ status, statusText, ...data })
//   }
// )

const MyApp = (props) => {
  const { Component, pageProps } = props
  const store = getOrInitializeStore()
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }

    import('viewport-units-buggyfill').then((viewportUnitsBuggyfill) => viewportUnitsBuggyfill.init({ force: true }))
  }, [])

  return (
    <>
      <style>
        {`html {
          touch-action: manipulation;
        }`}
      </style>
      <Head>
        <title>My page</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='robots' content='noarchive' />
        <title>Golf Scorer</title>
        <meta
          name='description'
          content='シンプルなゴルフのスコアカウ
        ンターです。オリンピックの自動計算もできます。スマホに最適化されているのでラウンド中に使いやすいです。'
        />
        <meta name='keywords' content='ゴルフ,スコア,スコア管理,管理,オリンピック,自動,計算,保存,ラウンド,スマホ' />
        <meta property='og:url' content='https://golfix.herokuapp.com/' />
        <meta property='og:title' content='Golf Scorer' />
        <meta property='og:type' content='website' />
        <meta property='og:description' content='シンプルなゴルフのスコアカウンターです' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@motchsk' />
        <meta property='og:site_name' content='Golf Scorer' />
        <meta property='og:locale' content='ja_JP' />
        {/* <!-- Android PWA設定 --> */}
        <link rel='manifest' href='/manifest.json' />
        {/* <!-- iOS PWA設定 --> */}
        <link rel='apple-touch-icon' href='/icons/icon-72x72.png' sizes='72x72' />
        <link rel='apple-touch-icon' href='/icons/icon-96x96.png' sizes='96x96' />
        <link rel='apple-touch-icon' href='/icons/icon-128x128.png' sizes='128x128' />
        <link rel='apple-touch-icon' href='/icons/icon-144x144.png' sizes='144x144' />
        <link rel='apple-touch-icon' href='/icons/icon-152x152.png' sizes='152x152' />
        <link rel='apple-touch-icon' href='/icons/icon-192x192.png' sizes='192x192' />
        <link rel='apple-touch-icon' href='/icons/icon-384x384.png' sizes='384x384' />
        <link rel='apple-touch-icon' href='/icons/icon-512x512.png' sizes='512x512' />
        {/* <!-- iPhone Xs Max (1242px x 2688px) --> */}
        <link
          rel='apple-touch-startup-image'
          media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3 and (orientation: portrait)'
          href='/splashes/launch-1242x2688.png'
        />
        {/* <!-- iPhone Xr (828px x 1792px) --> */}
        <link
          rel='apple-touch-startup-image'
          media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
          href='/splashes/launch-828x1792.png'
        />
        {/* <!-- iPhone X, Xs (1125px x 2436px) --> */}
        <link
          rel='apple-touch-startup-image'
          media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
          href='/splashes/launch-1125x2436.png'
        />
        {/* <!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) --> */}
        <link
          rel='apple-touch-startup-image'
          media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
          href='/splashes/launch-1242x2208.png'
        />
        {/* <!-- iPhone 8, 7, 6s, 6 (750px x 1334px) --> */}
        <link
          rel='apple-touch-startup-image'
          media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
          href='/splashes/launch-750x1334.png'
        />
        {/* <!-- iPhone SE (320px x 568px)  --> */}
        <link
          rel='apple-touch-startup-image'
          media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
          href='/splashes/launch-640x1136.png'
        />

        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Golf Score' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} store={store} />
        </Provider>
      </ThemeProvider>
    </>
  )
}
export const getServerSideProps = async (ctx) => {
  const store = getOrInitializeStore()
  if (ctx?.req?.user) {
    store.dispatch(createUserAction(ctx.req.user))
  }
  return { store }
}

export default MyApp
