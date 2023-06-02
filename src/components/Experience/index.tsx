/* eslint-disable react/forbid-dom-props */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line import/no-extraneous-dependencies
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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

    const { renderer, scene, camera } = mindAR
    const anchor = mindAR.addAnchor(0)

    // Portal
    const stencilRef = 1
    const portalGroup = new THREE.Group()
    portalGroup.renderOrder = 1

    // Portal Geometry
    const portalGeom = new THREE.PlaneGeometry(1.6 * 3, 0.9 * 3)
    const portalMat = new THREE.MeshPhongMaterial({ color: 'white' })
    const portalMesh = new THREE.Mesh(portalGeom, portalMat)
    portalMesh.position.set(0, 0, 0)
    portalMat.stencilWrite = true
    portalMat.stencilRef = stencilRef
    portalMat.stencilFunc = THREE.AlwaysStencilFunc
    portalMat.stencilZPass = THREE.ReplaceStencilOp
    portalMat.depthWrite = false
    portalGroup.add(portalMesh)

    //GLTF Model
    const modelGroup = new THREE.Group()
    const loader = new GLTFLoader()
    loader.load('models/city.glb', (gltf) => {
      const skinnedMesh = gltf.scene
      console.log(skinnedMesh)

      skinnedMesh.traverse((child) => {
        child.renderOrder = 2
        if (child instanceof THREE.Mesh) {
          child.material.stencilWrite = true
          child.material.stencilRef = stencilRef
          child.material.stencilFunc = THREE.EqualStencilFunc
        }
      })

      modelGroup.renderOrder = 2
      gltf.scene.position.set(0, -2.5, -5)
      modelGroup.add(skinnedMesh)
    })

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)

    anchor.group.add(portalGroup, modelGroup, ambientLight)

    // Run MindAR
    mindAR.start()

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera)
      camera.fov = 45
      camera.updateProjectionMatrix()
    })
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

// eslint-disable-next-line import/no-default-export
export default Experience
