import * as React from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'

import './counter.css'

export default function Counter(props: {
  onPressPlus: Function,
  onPressMinus: Function,
  ableMinus: boolean,
  value: number,
}) {
  const { onPressPlus, onPressMinus,  value, ableMinus } = props

  function onPressMinusIcon() {
    if (value > 0 && ableMinus) {
      onPressMinus()
    }
  }

  return (
    <span className="CounterRow" data-testid="counter">
      <HiMinus
        size={20}
        onClick={() => onPressMinusIcon()}
        color="black"
        data-testid="counter-minus"
      />
      <p className="CounterValue" data-testid="counter-value">
        {value}
      </p>
      <HiPlus
        size={24}
        onClick={() => onPressPlus()}
        color="black"
        data-testid="counter-plus"
      />
    </span>
  )
}
