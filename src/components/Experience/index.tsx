/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line import/no-extraneous-dependencies
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js'
import { useEffect, useRef } from 'react'

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // Initialize MindAR
    const mindAR = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: '/targets/qr-code.mind',
      missTolerance: 10,
      warmupTolerance: 5,
      filterMinCF: 0.00001,
      filterBeta: 0.1,
      uiLoading: 'yes',
      uiScanning: 'no',
      uiError: 'no',
    })
  }, [])

  return <div ref={containerRef} />
}

// eslint-disable-next-line import/no-default-export
export default Experience
