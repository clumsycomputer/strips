import { useRouter } from 'next/router'

export interface GetRedirectUrlApi
  extends Pick<GetOriginPathApi, 'routerQuery'> {
  baseUrl: string
}

export const getRedirectUrl = (api: GetRedirectUrlApi) => {
  const { routerQuery, baseUrl } = api
  const originPath = getOriginPath({ routerQuery })
  const queryString = new URLSearchParams({ originPath }).toString()
  return `${baseUrl}?${queryString}`
}

type RouterQuery = ReturnType<typeof useRouter>['query']

export interface GetOriginPathApi {
  routerQuery: RouterQuery
}

export const getOriginPath = (api: GetOriginPathApi) => {
  const { routerQuery } = api
  return typeof routerQuery.originPath === 'string'
    ? routerQuery.originPath
    : '/'
}
