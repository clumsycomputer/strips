export const appConfig = {
  api: {
    get baseUrl() {
      return `${appConfig.site.baseUrl}/api`
    },
  },
  auth0: {
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    get redirectUrl() {
      return `${appConfig.site.baseUrl}/auth`
    },
    get logoutRedirectUrl() {
      return `${appConfig.auth0.redirectUrl}/logout`
    },
  },
  site: {
    baseUrl: process.env.NEXT_PUBLIC_SITE_BASE_URL,
  },
}
