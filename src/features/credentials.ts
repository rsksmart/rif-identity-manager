import { createJWT } from 'jesse-did-jwt'
import { fromRpcSig } from 'ethereumjs-util'
import Axios from 'axios'

import serverConfig from '../config/config.server.json'
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

export const requestVerification = (did: any, type: string, userInput: string) =>
  Axios.post(`${serverConfig.issuerServerUrl}/${type.toLowerCase()}/requestVerification/${did}`, {
    subject: userInput
  })

export const verifyCode = (provider: any, verificationCode: string, address: string, did: string, type: string) =>
  provider.request({
    method: 'personal_sign',
    params: [
      `Verification code: ${verificationCode}`,
      address
    ]
  })
    .then((sig: string) =>
      Axios.post(`${serverConfig.issuerServerUrl}/${type}/verify/${did}`, { sig }))
