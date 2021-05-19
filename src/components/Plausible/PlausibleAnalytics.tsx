import React, { useState, useEffect } from 'react'

// eslint-disable-next-line no-unused-vars
export enum Decision { DENIED = 'DENIED', GRANTED = 'GRANTED', DEFAULT = 'DEFAULT' }

const APP_NAME = 'ID_MANAGER'

interface Interface {
  domain: string,
}

const PlausibleAnalytics: React.FC<Interface> = ({ domain }) => {
  const [show, setShow] = useState<boolean>(false)

  const linkProps = {
    target: '_blank',
    rel: 'noopener'
  }

  useEffect(() => {
    const answer = localStorage.getItem(`PLAUSIBLE_${APP_NAME}`) || Decision.DEFAULT

    setShow(answer === Decision.DEFAULT)
    if (answer === Decision.GRANTED) {
      addAnalyticsScript()
    }
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const decision = event.currentTarget.id === 'accept' ? Decision.GRANTED : Decision.DENIED
    localStorage.setItem(`PLAUSIBLE_${APP_NAME}`, decision)

    setShow(false)
    if (decision === Decision.GRANTED) {
      addAnalyticsScript()
    }
  }

  const addAnalyticsScript = () => {
    const script = document.createElement('script')
    script.setAttribute('src', 'https://plausible.io/js/plausible.js')
    script.setAttribute('async', 'true')
    script.setAttribute('data-domain', domain)
    document.head.appendChild(script)
  }

  return show ? (
    <div id="analytics">
      <p>In order to improve the user&apos;s experience, this site uses Plausible, an open source and privacy-friendly tool, which does not use cookies and is compliant with GDPR, CCPA and PECR. We analyse your activity and our traffic. We strive to collect only the data that we need. We do not share your information with third parties; we want to better understand your behaviour in order to improve our website. Please take a moment to familiarize yourself with <a href="https://plausible.io/data-policy" {...linkProps}>Plausible’s</a> and <a href="https://www.rsk.co/privacy-policy" {...linkProps}>our policies</a>.</p>
      <p>If you accept Plausible’s and ours policy, please click Accept.</p>
      <p>If you do not accept Plausible’s and ours policy, we provide you with the means to disable our tracking system, please click Reject.</p>
      <p>Certain features of the site may not be available if the tracking system is disabled.*</p>
      <p>
        <button onClick={handleClick} id="accept">Accept</button>
        <button onClick={handleClick} id="reject">Reject</button>
      </p>
    </div>
  ) : <></>
}

export default PlausibleAnalytics
