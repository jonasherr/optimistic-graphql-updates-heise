import { useEffect, useState } from "react"

export const useMeasureTime = (props: { variableToChange?: number }) => {
  const [time, setTime] = useState<null | number>(null)
  const [timePassed, setTimePassed] = useState<null | number>(null)

  useEffect(() => {
    if (time === null) return

    const end = performance.now()
    setTimePassed(end - time)

    setTime(null)
  }, [props.variableToChange])

  const startMeasuringTime = (t: number) => setTime(t)

  return {
    timePassed,
    startMeasuringTime
  }
}
