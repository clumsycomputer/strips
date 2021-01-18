import { Auth0Provider } from '@auth0/auth0-react'
import { appConfig } from '@strips/utils/appConfig'

export default function App({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={appConfig.auth0.domain}
      clientId={appConfig.auth0.clientId}
      redirectUri={appConfig.auth0.redirectUrl}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  )
}
