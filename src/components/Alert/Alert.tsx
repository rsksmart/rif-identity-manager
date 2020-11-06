import React from 'react'
import styled from 'styled-components'

const AlertWrapper = styled.div`
  border-radius: 5px;
  padding: 10px 50px;
  border: 1px solid #f1f1f1;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 75%;
  margin: 0 auto;
`

const AlertHeader = styled.h2`
  font-size: 1em;
  font-weight: 700 !important;
  margin: 0;
  padding: 0;
`

const AlertDescription = styled.p`
  font-size: 1em;
  margin: 3px 0;
  padding: 0
`

interface AlertProps {
  title?: string
  description?: string
}

const Alert: React.FC<AlertProps> = ({ title, description }) => (
  <AlertWrapper>
    {title && <AlertHeader>{title}</AlertHeader>}
    {description && <AlertDescription>{description}</AlertDescription>}
  </AlertWrapper>
)

export default Alert
