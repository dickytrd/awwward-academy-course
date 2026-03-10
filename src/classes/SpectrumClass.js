import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

import spectrumFrag from '../shaders/spectrum.frag'
import spectrumVert from '../shaders/spectrum.vert'



class Spectrum {
    constructor() {
        this.bind()
        this.modelLoader = new GLTFLoader()
        this.textureLoader = new THREE.TextureLoader()

    }

    init(scene) {
        this.scene = scene

        this.uniforms = {
            uMatCap: {
                value: this.textureLoader.load('./assets/textures/blackMetal.png')
            },
            uSpecterSize: {
                value: 0.8
            },
            uWaveBorder: {
                value: 0.3
            },
            uBorderColor: {
                value: new THREE.Color("hsl(220, 100%, 50%)")
            },
            uTime: {
                value: 0
            }
        }

        this.shaderMat = new THREE.ShaderMaterial({
            fragmentShader: spectrumFrag,
            vertexShader: spectrumVert,
            uniforms: this.uniforms,
            transparent: true,
        })


        this.modelLoader.load('./assets/models/spectrum.glb', (glb) => {
            glb.scene.traverse((child) => {
                if (child instanceof THREE.Mesh) 
                        child.material = this.shaderMat
                        this.spectrum = child
                        child.scale.multiplyScalar(2.5)
                        child.position.y = -2.5
                    })
                    this.scene.add(this.spectrum)
                    console.log(this.spectrum)
            })


    }

    update() {
        this.uniforms.uTime.value += 1

    }

    bind() {

    }
}

const _instance = new Spectrum()
export default _instance