import { useAuth0 } from '@auth0/auth0-react'
import Button from '@material-ui/core/Button'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React, { Fragment, useEffect } from 'react'
import { appConfig } from '@strips/utils/appConfig'

interface AuthenticatePageProps {}

export default function AuthenticatePage(props: AuthenticatePageProps) {
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
        redirectUri: getLoginRedirectUri({
          routerQuery: router.query,
        }),
      })
    }
  }, [auth0])
  return (
    <Fragment>
      <Head>
        <title>Authenticate - strips</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {auth0.error ? (
        <Fragment>
          <pre>{JSON.stringify(auth0.error, null, 2)}</pre>
          <Button
            onClick={() => {
              auth0.loginWithRedirect({
                redirectUri: getLoginRedirectUri({
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

export async function getStaticProps() {
  return { props: {} }
}

interface GetLoginRedirectUriApi
  extends Pick<GetOriginPathApi, 'routerQuery'> {}

const getLoginRedirectUri = (api: GetLoginRedirectUriApi) => {
  const { routerQuery } = api
  const originPath = getOriginPath({ routerQuery })
  const queryString = new URLSearchParams({ originPath }).toString()
  return `${appConfig.auth0.redirectUri}?${queryString}`
}

interface GetOriginPathApi {
  routerQuery: ParsedUrlQuery
}

const getOriginPath = (api: GetOriginPathApi) => {
  const { routerQuery } = api
  return typeof routerQuery.originPath === 'string'
    ? routerQuery.originPath
    : '/'
}
