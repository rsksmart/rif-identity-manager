import React from 'react'
import Panel from '../../../components/Panel/Panel'
import declarativeIcon from '../../../assets/images/icons/declarative-details.svg'

interface DeclarativeDetailsDisplayInterface {

}

const DeclarativeDetailsDisplay: React.FC<DeclarativeDetailsDisplayInterface> = () => {
  const title = <><img src={declarativeIcon} /> Declarative Details</>
  return (
    <Panel title={title}>
      DeclarativeDetailsDisplay
    </Panel>
  )
}

export default DeclarativeDetailsDisplay
