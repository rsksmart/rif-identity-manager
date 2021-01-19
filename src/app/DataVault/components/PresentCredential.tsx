import React, { useContext, useState } from 'react'
import Modal from '../../../components/Modal/Modal'
import { Web3ProviderContext } from '../../../providerContext'
import { createPresentation } from '../../../features/credentials'
import LoadingComponent from '../../../components/Loading/LoadingComponent'
import CopyButton from '../../../components/CopyButton/CopyButton'
import { BaseButton } from '../../../components/Buttons'

interface PresentCredentialInterface {
  jwt: string
}

const PresentCredential: React.FC<PresentCredentialInterface> = ({ jwt }) => {
  interface stateInterface {
    status: 'NONE' | 'LOADING' | 'DONE' | 'ERROR'
    message: string
  }
  const initialState: stateInterface = { status: 'NONE', message: '' }
  const [state, setState] = useState<stateInterface>(initialState)

  const context = useContext(Web3ProviderContext)

  const handleCreate = () => {
    setState({ status: 'LOADING', message: '' })
    createPresentation(context.provider, jwt)
      .then((message: string) => setState({ status: 'DONE', message }))
      .catch((error: Error) => setState({ status: 'ERROR', message: error.message }))
  }

  return (
    <>
      <button className="icon" onClick={handleCreate}>Present</button>
      <Modal show={state.status !== 'NONE'} onClose={() => setState(initialState)} title="Present Credential">
        {state.status === 'LOADING' && <LoadingComponent />}
        {state.status === 'DONE' && (
          <div>
            <h2>Raw JWT</h2>
            <textarea defaultValue={state.message} className="jwt" />
            <CopyButton value={state.message} />
          </div>
        )}
        {state.status === 'ERROR' && (
          <>
            <p className="alert error">{state.message}</p>
            <p><BaseButton onClick={handleCreate}>Try Again</BaseButton></p>
          </>
        )}
      </Modal>
    </>
  )
}

export default PresentCredential
