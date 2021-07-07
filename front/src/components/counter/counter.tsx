import * as React from 'react'
import { HiPlus, HiMinus } from 'react-icons/hi';

import './counter.css'

export default function Counter (props: {
  onPressPlus: Function
  onPressMinus: Function
  value: number
}) {

  function onPressMinus (){
    if(props.value > 0){
      props.onPressMinus()
    }
  }

  return (
    <span className='CounterRow'>      
      <HiMinus
        size={20}
        onClick={() => onPressMinus()}
        color='black'
      />  
        <p className='CounterValue'>{props.value }</p>
      <HiPlus
        size={24}
        onClick={() => props.onPressPlus()}
        color='black'

      />
    </span>
  )
}
