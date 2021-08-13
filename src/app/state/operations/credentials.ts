import Axios from 'axios'
import serverConfig from '../../../config/config.server.json'

export const requestVerification = (did: any, type: string, userInput: string) =>
  Axios.post(`${serverConfig.issuerServerUrl}/${type}/requestVerification/${did}`, {
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
