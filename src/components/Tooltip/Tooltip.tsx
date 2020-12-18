import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface TooltipInterface {
  children: ReactNode
  hoverContent: string | ReactNode
  className?: string
}

const HoverSpan = styled.span`
  opacity: 0;
  position: absolute;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 10px;
  border-radius: 6px;
  z-index: 1;
  margin-top:25px;
  top: 0px;
  transition: opacity .6s;
  display: block;
  min-width: 250px;
  word-break: break-all;
`

const HoverTrigger = styled.span`
  position: relative;
  display: inline-block;
  cursor: help;
  margin-right: 20px;
  &:hover {
    ${HoverSpan} {
      visibility: visible;
      opacity: 1;
    }
  }
`

const ToolTip: React.FC<TooltipInterface> = ({ hoverContent, children, className }) => (
  <HoverTrigger className={className}>
    {children}
    <HoverSpan className="hover-content">{hoverContent}</HoverSpan>
  </HoverTrigger>
)

export default ToolTip
