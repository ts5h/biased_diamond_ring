import React, { useEffect, useState } from "react"
import Sketch from "react-p5"
import p5Types from "p5"
import "../scss/components/BiasedDiamondRing.scss"

type pointProps = {
  deg: number
  x: number
  y: number
}[]

const BiasedDiamondRing: React.FunctionComponent = () => {
  const [p5Obj, setP5Obj] = useState<p5Types>()
  const [waitFlag, setWaitFlag] = useState(false)

  let cx = 0
  let cy = 0
  let r = 0
  let points: pointProps = []

  let cnt = 0
  let waitTime = 0

  useEffect(() => {
    window.addEventListener("resize", windowResized)
    return () => window.removeEventListener("resize", windowResized)
  }, [])

  const windowResized = () => {
    if (p5Obj) {
      p5Obj.resizeCanvas(window.innerWidth, window.innerHeight)
    }
  }

  // Support Functions
  const setPoints = () => {
    if (p5Obj) {
      points = []
      const pointNum = p5Obj.floor(p5Obj.random(3, 101))

      for (let i = 0; i < pointNum; i++) {
        const deg = p5Obj.random(360)
        const rad = (deg * p5Obj.PI) / 180

        points[i] = { deg: 0, x: 0, y: 0 }
        points[i].deg = deg
        points[i].x = r * p5Obj.cos(rad) + cx
        points[i].y = r * p5Obj.sin(rad) + cy
      }

      points.sort((a, b) => {
        if (a.deg < b.deg) return -1
        if (a.deg > b.deg) return 1
        return 0
      })

      // console.log(points)

      // Show points length
      p5Obj.fill(51)
      p5Obj.textAlign(p5Obj.RIGHT, p5Obj.BOTTOM)
      p5Obj.textSize(10)
      p5Obj.text(points.length, p5Obj.width - 10, p5Obj.height - 10)
    }
  }

  // See annotations in JS for more information
  const setup = (p5: p5Types, parentRef: Element) => {
    setP5Obj(p5)
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(parentRef)

    cx = p5.width / 2
    cy = p5.height / 2
    r = p5.min(p5.width, p5.height) / 2 - 80

    p5.background(255)
    p5.stroke(0)
    p5.strokeWeight(0.1)
    p5.noFill()
    setPoints()
  }

  const draw = (p5: p5Types) => {
    if (!waitFlag) {
      // Draw outer circle
      if (cnt === 0) {
        p5.stroke(127)
        p5.circle(cx, cy, r * 2)
        p5.stroke(0)
      }

      // Draw the diamond ring
      for (let i = cnt + 1; i < points.length; i++) {
        p5.line(points[cnt].x, points[cnt].y, points[i].x, points[i].y)
      }

      cnt++
      if (cnt >= points.length) {
        setWaitFlag(true)
      }
    } else {
      // Wait on complete
      waitTime++
      if (waitTime > 300) {
        cnt = 0
        p5.clear()
        p5.background(255)
        p5.noFill()
        setPoints()

        waitTime = 0
        setWaitFlag(false)
      }
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default BiasedDiamondRing
