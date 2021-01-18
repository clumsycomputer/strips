import { useAuth0 } from '@auth0/auth0-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect } from 'react'
import { appConfig } from '@strips/utils/appConfig'
import { getOriginPath, getRedirectUrl } from './utils'

interface LogoutPageProps {}

export default function LogoutPage(props: LogoutPageProps) {
  const auth0 = useAuth0()
  const router = useRouter()
  useEffect(() => {
    if (auth0.isLoading || auth0.error) return
    if (auth0.isAuthenticated) {
      auth0.logout({
        returnTo: getRedirectUrl({
          baseUrl: appConfig.auth0.logoutRedirectUrl,
          routerQuery: router.query,
        }),
      })
    } else {
      const targetPath = getOriginPath({
        routerQuery: router.query,
      })
      router.replace(targetPath)
    }
  }, [auth0])
  return (
    <Fragment>
      <Head>
        <title>Logout - strips</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Fragment>
  )
}
