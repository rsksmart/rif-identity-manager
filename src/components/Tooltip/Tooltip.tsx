import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface TooltipInterface {
  children: ReactNode
  hoverContent: string | ReactNode
  className?: string
}

const HoverSpan = styled.span`
  visibility: hidden;
  position: absolute;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 10px;
  border-radius: 6px;
  z-index: 1;
  opacity: 0;
  transition: opacity .6s;
  max-width: 250px;
  word-break: break-all;
`

const HoverTrigger = styled.span`
  position: relative;
  display: inline-block;
  cursor: help;
  margin-right: 20px;
  &:hover + ${HoverSpan} {
    visibility: visible;
    opacity: 1;
  }
`

const ToolTip: React.FC<TooltipInterface> = ({ hoverContent, children, className }) => (
  <>
    <HoverTrigger className={className}>{children}</HoverTrigger>
    <HoverSpan className="hover-content">{hoverContent}</HoverSpan>
  </>
)

export default ToolTip
