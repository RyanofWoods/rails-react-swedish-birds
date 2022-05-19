import React from 'react'
import ReactDOM from 'react-dom'

interface ReactPortalProps {
  children: React.ReactNode
  wrapperId: string
}

const ReactPortal: React.FC<ReactPortalProps> = ({ children, wrapperId }) => {
  const portalDiv = document.getElementById(wrapperId) as HTMLElement

  return ReactDOM.createPortal(children, portalDiv)
}

export default ReactPortal
