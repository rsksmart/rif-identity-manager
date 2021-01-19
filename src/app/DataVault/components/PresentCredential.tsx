import React, { useContext, useState } from 'react'
import Modal from '../../../components/Modal/Modal'
import { DataVaultContent } from '../../state/reducers/datavault'
import { JwtPresentationPayload, createVerifiablePresentationJwt, Issuer } from 'did-jwt-vc'
import { Web3ProviderContext } from '../../../providerContext'

interface PresentCredentialInterface {
  item: DataVaultContent
}

const PresentCredential: React.FC<PresentCredentialInterface> = ({ item }) => {
  const [present, setPresent] = useState<null | DataVaultContent>(null)
  const [presentation, setPresentation] = useState<null | string>(null)

  const address = '0x3dd03d7d6c3137f1eb7582ba5957b8a2e26f304a'
  const did = 'did:ethr:rsk:testnet:0x3dd03d7d6c3137f1eb7582ba5957b8a2e26f304a'
  const context = useContext(Web3ProviderContext)

  const createPresentation = async () => {
    setPresent(item)

    const provider = context.provider
    const issuer: Issuer = {
      did,
      signer: (data: string) => provider.request({ method: 'personal_sign', params: [data, address] })
    }

    const vpPayload: JwtPresentationPayload = {
      vp: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation'],
        verifiableCredential: [item.content]
      }
    }
    const vpJwt = await createVerifiablePresentationJwt(vpPayload, issuer)
    console.log(vpJwt)
    setPresentation(vpJwt)
  }

  return (
    <>
      <button className="icon" onClick={createPresentation}>Present</button>
      <Modal show={!!present} onClose={() => setPresent(null)} title="Present Credential">
        {presentation && <textarea defaultValue={presentation} />}
      </Modal>
    </>
  )
}

export default PresentCredential
