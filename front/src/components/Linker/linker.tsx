import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import './linker.css'

type LinkerProps = {
  to: string;
  children?: ReactElement[] | ReactElement;
};

function Linker(props: LinkerProps) {
  const { to, children } = props
  return (
    <Link className="link" to={to}>
      {children}
    </Link>
  )
}

export default Linker
