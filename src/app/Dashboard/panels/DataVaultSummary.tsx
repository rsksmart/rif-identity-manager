import React from 'react'
import Panel from '../../../components/Panel/Panel'
import datavaultIcon from '../../../assets/images/icons/data-vault.svg'
import { BaseButton } from '../../../components/Buttons'
import ProgressBar from '../../../components/ProgressBar/ProgressBar'
import ToolTip from '../../../components/Tooltip/Tooltip'
import { DataVaultStorageState } from '../../state/reducers/datavault'

interface DataVaultSummaryInterface {
  storage?: DataVaultStorageState
  handleButton: () => void
}

const DataVaultSummary: React.FC<DataVaultSummaryInterface> = ({ storage, handleButton }) =>
  storage ? (
    <Panel title={<><img src={datavaultIcon} alt="DataVault" /> DataVault Summary</>} className="dataVault">
      <h2>Storage Usage</h2>
      <div className="container">
        <div className="columnDouble">
          <ToolTip className="tooltip-progress" hoverContent={<p>{storage.used} of {(storage.available + storage.used).toLocaleString()} bytes</p>}>
            <ProgressBar total={(storage.available + storage.used)} value={storage.used} />
          </ToolTip>
        </div>
        <div className="column">
          <BaseButton onClick={handleButton} className="turquoise panel-button">DataVault</BaseButton>
        </div>
      </div>
    </Panel>
  )
    : <></>

export default DataVaultSummary
