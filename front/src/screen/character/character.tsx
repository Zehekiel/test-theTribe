import React from 'react'
import { useParams } from 'react-router-dom'

function Character() {
  let id = useParams()
  console.log('id', id)

  return (
    <main>
      <h1>Hello Character</h1>
    </main>
  )
}

export default Character
