import React from 'react'
import './errorText.css'

function ErrorText(props: { text: string }) {
  return (
    <>
      {props.text.length !== 0 && (
        <p className="errorText" data-testid="errorText">
          {props.text}
        </p>
      )}
    </>
  )
}

export default ErrorText
