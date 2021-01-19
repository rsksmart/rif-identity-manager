import { Issuer, JwtPresentationPayload, createVerifiablePresentationJwt } from 'did-jwt-vc'
import { getAccountAndNetwork } from '../ethrpc'
import { createDidFormat } from '../formatters'

export const createPresentation = (provider: any, jwt: string) => {
  return getAccountAndNetwork(provider).then(([address, chainId]) => {
    const did = createDidFormat(address, chainId)
    const issuer: Issuer = {
      did,
      signer: (data: string) => provider.request({ method: 'personal_sign', params: [data, address] })
    }

    const vpPayload: JwtPresentationPayload = {
      vp: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation'],
        verifiableCredential: [jwt],
        nbf: Math.floor(new Date().getTime() / 1000),
        exp: Math.floor(new Date().getTime() / 1000) + 3600
      }
    }
    return createVerifiablePresentationJwt(vpPayload, issuer)
  })
}
