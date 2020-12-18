import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

interface CredentialViewInterface {
  jwt: string
}

const CredentialView: React.FC<CredentialViewInterface> = ({ jwt }) => {
  const [showRaw, setShowRaw] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)
  const [prettyJson, setPrettyJson] = useState<string>('')

  useEffect(() => {
    try {
      setPrettyJson(JSON.stringify(jwtDecode(jwt), null, 2))
    } catch (err) {
      setError(err.message)
      setShowRaw(true)
    }
  }, [jwt])

  return (
    <div className="content-row">
      <div className="content">
        {prettyJson && (
          <div className="break-all">
            <textarea
              defaultValue={prettyJson}
              disabled={true}></textarea>
          </div>
        )}

        {error && (
          <div className="alert error">
            <strong>Could not decode credential!</strong><br />
            <em>The raw data is displayed below.</em>
          </div>
        )}

        {showRaw && <div className="raw break-all">{jwt}</div>}
      </div>
      {!error && (
        <div className="options">
          <button className="icon raw" onClick={() => setShowRaw(!showRaw)}>{showRaw ? 'Hide' : 'View'} Raw</button>
        </div>
      )}
    </div>
  )
}

export default CredentialView
