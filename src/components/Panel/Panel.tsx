import React, { ReactNode } from 'react'
import styled from 'styled-components'

const PanelWrapper = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(145, 145, 145, 0.1);
  border-radius: 20px;
  padding: 10px 0;
`
const PanelHeader = styled.div`
  padding: 10px 25px 10px 25px;
  border-bottom: 1px solid #F2F2F2;
  margin: 0 0 15px 0;
`

const PanelTitle = styled.p`
  display: inline-block;
  font-weight: 600 !important;
  font-size: 16px;
  line-height: 19px;
  color: #50555c;
  margin: 0;
  padding: 0;
`

const PanelRight = styled.div`
  float: right;
`

const PanelContent = styled.div`
  padding: 25px 50px;
`

interface PanelInterface {
  title?: string | ReactNode
  className?: string
  headerRight?: string | ReactNode
  children: ReactNode
}

const Panel: React.FC<PanelInterface> = ({ title, headerRight, children, className }) => (
  <PanelWrapper className={`panel ${className}`}>
    {title && (
      <PanelHeader className="panel-header">
        <PanelTitle className="panel-title">{title}</PanelTitle>
        {headerRight && <PanelRight className="panel-right">{headerRight}</PanelRight>}
      </PanelHeader>
    )}
    <PanelContent className="panel-content">
      {children}
    </PanelContent>
  </PanelWrapper>
)

export default Panel
