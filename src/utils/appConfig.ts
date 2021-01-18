export const appConfig = {
  api: {
    get baseUrl() {
      return `${appConfig.site.baseUrl}/api`
    },
  },
  auth0: {
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    get redirectUri() {
      return `${appConfig.site.baseUrl}/authenticate`
    },
    get logoutRedirectUrl() {
      return appConfig.site.baseUrl
    },
  },
  site: {
    baseUrl: process.env.NEXT_PUBLIC_SITE_BASE_URL,
  },
}
