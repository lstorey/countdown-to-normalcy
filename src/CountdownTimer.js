import React, { useState } from 'react'
import { useInterval } from './hooks'

const SPM = 60
const SPH = SPM * 60
const SPD = SPH * 24
const START_TIME = 90 * SPD + 22 * SPH + 30 * SPM + 59

export default function CountdownTimer() {
  const [ seconds, setSeconds ] = useState(START_TIME)
  const [ optimism, setOptimism ] = useState(50)

  const updateOptimism = ({ target }) => {
    setOptimism(target.value)
  }

  const updateSeconds = () => {
    const optimismConstant = (1 - (optimism / 100)) ** 4
    const additionalSeconds = Math.random() < optimismConstant ? SPH : 0
    const newSeconds = seconds - 1 + additionalSeconds
    setSeconds(newSeconds)
  }

  const days = Math.floor(seconds / SPD)
  const hours = Math.floor((seconds - days * SPD) / SPH)
  const minutes = Math.floor((seconds - days * SPD - hours * SPH) / SPM)
  const secs = seconds % SPM

  const backgroundColor = `rgba(232, 176, 194, ${Math.max(0, (optimism - 50)*0.02)})`

  useInterval(updateSeconds, 1000)

  return (
    <div className="flex-center" style={{ backgroundColor }}>
      <h1>Coundown to Normalcy</h1>
      <div className="countdown">{days} days :: {hours} hours :: {minutes} minutes :: {secs} seconds</div>
      <h4>Optimism</h4>
      <input type="range" onChange={updateOptimism} value={optimism} />
    </div>
  )
}