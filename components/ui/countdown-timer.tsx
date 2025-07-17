"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  endTime: string
  onComplete?: () => void
}

export function CountdownTimer({ endTime, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endTime).getTime()
      const difference = end - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        onComplete?.()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime, onComplete])

  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-3">
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.days}</div>
        <div className="countdown-label">Days</div>
      </div>
      <div className="text-gray-400 font-bold text-lg sm:text-xl">:</div>
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.hours}</div>
        <div className="countdown-label">Hours</div>
      </div>
      <div className="text-gray-400 font-bold text-lg sm:text-xl">:</div>
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.minutes}</div>
        <div className="countdown-label">Min</div>
      </div>
      <div className="text-gray-400 font-bold text-lg sm:text-xl">:</div>
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.seconds}</div>
        <div className="countdown-label">Sec</div>
      </div>
    </div>
  )
}
