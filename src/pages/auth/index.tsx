import { useAuth0 } from '@auth0/auth0-react'
import Button from '@material-ui/core/Button'
import { appConfig } from '@strips/utils/appConfig'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect } from 'react'
import { getRedirectUrl, getOriginPath } from './utils'

interface AuthPageProps {}

export default function AuthPage(props: AuthPageProps) {
  const auth0 = useAuth0()
  const router = useRouter()
  useEffect(() => {
    if (auth0.isLoading || auth0.error) return
    if (auth0.isAuthenticated) {
      const targetPath = getOriginPath({
        routerQuery: router.query,
      })
      router.replace(targetPath)
    } else {
      auth0.loginWithRedirect({
        redirectUri: getRedirectUrl({
          baseUrl: appConfig.auth0.redirectUrl,
          routerQuery: router.query,
        }),
      })
    }
  }, [auth0])
  return (
    <Fragment>
      <Head>
        <title>Auth - strips</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {auth0.error ? (
        <Fragment>
          <pre>{JSON.stringify(auth0.error, null, 2)}</pre>
          <Button
            onClick={() => {
              auth0.loginWithRedirect({
                redirectUri: getRedirectUrl({
                  baseUrl: appConfig.auth0.redirectUrl,
                  routerQuery: router.query,
                }),
              })
            }}
          >
            Try Again
          </Button>
        </Fragment>
      ) : null}
    </Fragment>
  )
}
