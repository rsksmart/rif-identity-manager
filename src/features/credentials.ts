import { createJWT } from 'jesse-did-jwt'
import { fromRpcSig } from 'ethereumjs-util'
import { getAccountAndNetwork } from '../ethrpc'
import { createDidFormat } from '../formatters'

export const createPresentation = (provider: any, jwt: string) => {
  return getAccountAndNetwork(provider).then(([address, chainId]) => {
    const did = createDidFormat(address, chainId)

    const signer = (data: string) => provider.request({ method: 'personal_sign', params: [data, address] })
      .then(fromRpcSig)
      .then(({ v, r, s }: { v: number, r: Buffer, s: Buffer }) => ({
        r: r.toString('hex'),
        s: s.toString('hex'),
        recoveryParam: v
      }))

    const vpPayload = {
      vp: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation'],
        verifiableCredential: [jwt],
        nbf: Math.floor(new Date().getTime() / 1000),
        exp: Math.floor(new Date().getTime() / 1000) + 3600
      }
    }

    return createJWT(vpPayload, { alg: 'ES256K', issuer: did, signer })
  })
}
