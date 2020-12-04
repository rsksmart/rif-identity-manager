import React from 'react'
import styled from 'styled-components'

interface ProgressBarInterface {
  total: number,
  value: number
}

const BarWrapper = styled.div`
  height: 20px;
  position: relative;
  background: #EAEAEA;
  -moz-border-radius: 25px;
  -webkit-border-radius: 25px;
  border-radius: 12.5px;
  padding: 10px;
  box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);
`

const BarProgress = styled.div`
  display: block;
  height: 100%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #47C4E1;
  box-shadow:
    inset 0 2px 9px  rgba(255,255,255,0.3),
    inset 0 -2px 6px rgba(0,0,0,0.4);
  position: relative;
  overflow: hidden;
  }
`

const ProgressBar: React.FC<ProgressBarInterface> = ({ total, value }) => {
  const width = value < total ? Math.round((value * 100) / total) : 100
  return (
    <BarWrapper className="progress-wrapper">
      <BarProgress className="progress" style={{ width: `${width}%` }}></BarProgress>
    </BarWrapper>
  )
}

export default ProgressBar
