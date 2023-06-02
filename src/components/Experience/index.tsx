// eslint-disable-next-line import/no-extraneous-dependencies
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js'
import { useEffect, useRef } from 'react'

const Experience = () => {
  const containerRef = useRef(null)
  useEffect(() => {
    // Initialize MindAR
    const mindAR = new MindARThree({
      container: containerRef.current,
    })
  }, [])

  return <div ref={containerRef} />
}

// eslint-disable-next-line import/no-default-export
export default Experience
