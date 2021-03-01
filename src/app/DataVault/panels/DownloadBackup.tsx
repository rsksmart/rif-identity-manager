import React, { useState } from 'react'
import Panel from '../../../components/Panel/Panel'
import downloadIcon from '../../../assets/images/icons/download.svg'
import { BaseButton } from '../../../components/Buttons'
import LoadingComponent from '../../../components/Loading/LoadingComponent'

interface DownloadBackupInterface {
  handleDownload: () => Promise<any>
}

const DownloadBackup: React.FC<DownloadBackupInterface> = ({
  handleDownload
}) => {
  const initStatus = { isLoading: false, isError: null }
  const [status, setStatus] = useState<{ isLoading: boolean; isError: string | null }>({
    isLoading: false,
    isError: null
  })

  const download = () => {
    setStatus({ ...initStatus, isLoading: true })
    handleDownload()
      .then(() => setStatus(initStatus))
      .catch((error: Error) => setStatus({ ...initStatus, isError: error.message }))
  }

  return (
    <Panel title={<><img src={downloadIcon} /> Download Backup</>}>
      <p>Download a backup file of all the keys and IPFS hashes that are stored in the DataVault.</p>
      <p><BaseButton onClick={download} disabled={status.isLoading} className="small">
        Download Backup
      </BaseButton></p>
      {status.isLoading && <LoadingComponent />}
      {status.isError && <div className="alert error">{status.isError}</div>}
    </Panel>
  )
}

export default DownloadBackup
