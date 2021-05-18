import React, { useEffect } from 'react'

interface Interface {
  domain: string,
}

const PlausibleAnalytics: React.FC<Interface> = () => {
  const linkProps = {
    target: '_blank',
    rel: 'noopener'
  }

  const handleClick = (props: any) => {
    console.log('handling click...', props)
  }

  useEffect(() => {
    console.log('Plausible useEffect!')
  }, [])

  return (
    <div id="analytics">
      <p>In order to improve the user&apos;s experience, this site uses Plausible, an open source and privacy-friendly tool, which does not use cookies and is compliant with GDPR, CCPA and PECR. We analyse your activity and our traffic. We strive to collect only the data that we need. We do not share your information with third parties; we want to better understand your behaviour in order to improve our website. Please take a moment to familiarize yourself with <a href="https://plausible.io/data-policy" {...linkProps}>Plausible’s</a> and <a href="https://www.rsk.co/privacy-policy" {...linkProps}>our policies</a>.</p>
      <p>If you accept Plausible’s and ours policy, please click Accept.</p>
      <p>If you do not accept Plausible’s and ours policy, we provide you with the means to disable our tracking system, please click Reject.</p>
      <p>Certain features of the site may not be available if the tracking system is disabled.*</p>
      <p>
        <button onClick={handleClick} className="accept">Accept</button>
        <button onClick={handleClick} className="reject">Reject</button>
      </p>
    </div>
  )
}

export default PlausibleAnalytics
