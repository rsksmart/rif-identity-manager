/* eslint-disable no-unused-vars */
import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface ModalLightboxProps {
  show: boolean;
}

// eslint-disable-next-line no-undef
export const ModalLightbox = styled.div<ModalLightboxProps>`
font-family: Rubik;
transition: opacity 0.1s ease-in-out;
text-align: center;
position: fixed;
width: 100vw;
height: 100vh;
margin-left: -50vw;
top: 0;
left: 50%;
z-index: 2;
will-change: opacity;
background-color: rgba(0, 0, 0, 0.4);
opacity: 1;
visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
display: flex;
justify-content: center;
align-items: center;

& * {
  box-sizing: border-box !important;
}
`

const ModalBody = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
`

const ModalTitle = styled.div`
  background: #F2F2F2;
  font-size: 16px;
  padding: 15px 0
`

const ModalCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 10px;
  color: #C4C4C4;
  font-size: 2em;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 300;
  &:after {
    content: '\\d7';
  }
`

const ModalContent = styled.div`
  background: #ffffff;
  padding: 0 20px 15px 20px;
`

interface PanelInterface {
  children: ReactNode
  show: boolean
  title?: string | ReactNode
  className?: string
  onClose: () => void
}

const Modal: React.FC<PanelInterface> = ({ children, show, title, className, onClose }) => (
  show
    ? (
      <ModalLightbox show={show} className={className}>
        <ModalBody>
          <ModalTitle className="modal-title">
            {title}
            <ModalCloseButton className="close" onClick={onClose} />
          </ModalTitle>
          <ModalContent className="modal-content">
            {children}
          </ModalContent>
        </ModalBody>
      </ModalLightbox>
    )
    : <></>
)

export default Modal
