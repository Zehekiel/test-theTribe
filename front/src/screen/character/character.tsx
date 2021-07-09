import React from 'react'
import { useParams } from 'react-router-dom';


function Character(props: any) {
  let id = useParams()

  return (
    <main>
      <h1>Hello Character</h1>
    </main>
  );
}

export default Character
