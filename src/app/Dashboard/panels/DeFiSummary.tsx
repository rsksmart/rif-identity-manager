import React from 'react'
import { BaseButton } from '../../../components/Buttons'
import Panel from '../../../components/Panel/Panel'

interface BalanceSummaryInterface {

}

const BalanceSummary: React.FC<BalanceSummaryInterface> = () => {
  return (
    <Panel title={<>DeFi Summary</>} className="defi">
      <div className="container">
        <div className="columnDouble">

        </div>
        <div className="column">
          <BaseButton className="blue">Add More</BaseButton>
        </div>
      </div>
    </Panel>
  )
}

export default BalanceSummary
