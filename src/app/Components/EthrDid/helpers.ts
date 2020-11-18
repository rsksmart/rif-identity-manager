import { DIDDocument, PublicKey } from 'did-resolver'

export const getOwnerFromDidDoc = (didDocument: DIDDocument) =>
  didDocument.publicKey.filter((pk: PublicKey) => pk.id.endsWith('#controller'))[0].ethereumAddress
