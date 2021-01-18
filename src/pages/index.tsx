import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@material-ui/core'
import { appConfig } from '@strips/utils/appConfig'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import { Fragment, ReactNode, useEffect } from 'react'

interface HomeProps {}

export default function Home(props: HomeProps) {
  const auth0 = useAuth0()
  const router = useRouter()
  return (
    <Protected>
      <div>
        <Head>
          <title>Home - strips</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <pre>{JSON.stringify(auth0.user, null, 2)}</pre>
        <pre>{JSON.stringify(router.query, null, 2)}</pre>
        <Button
          variant={'contained'}
          onClick={() => {
            auth0.logout({
              returnTo: appConfig.auth0.logoutRedirectUrl,
            })
          }}
        >
          Logout
        </Button>
      </div>
    </Protected>
  )
}

export async function getStaticProps() {
  return { props: {} }
}

interface ProtectedProps {
  children: ReactNode
}

const Protected = (props: ProtectedProps) => {
  const { children } = props
  const auth0 = useAuth0()
  const router = useRouter()
  useEffect(() => {
    if (auth0.isLoading) return
    if (!auth0.isAuthenticated) {
      redirectToAuthenticate({ router })
    }
  }, [auth0])
  return <Fragment>{auth0.isAuthenticated ? children : null}</Fragment>
}

interface RedirectToAuthenticateApi {
  router: NextRouter
}

const redirectToAuthenticate = (api: RedirectToAuthenticateApi) => {
  const { router } = api
  const searchParamsString = new URLSearchParams(
    router.query as Record<string, string>
  ).toString()
  const originPathParam = searchParamsString
    ? `${router.pathname}?${searchParamsString}`
    : router.pathname
  const authenticateUri = `${appConfig.auth0.redirectUri}?originPath=${originPathParam}`
  router.replace(authenticateUri)
}
