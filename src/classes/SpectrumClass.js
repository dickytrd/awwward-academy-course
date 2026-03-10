import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'




class Spectrum {
    constructor() {
        this.bind()
        this.modelLoader = new GLTFLoader()
        this.textureLoader = new THREE.TextureLoader()

    }

    init(scene) {
        this.scene = scene


         this.modelLoader.load('./assets/models/spectrum.glb', (glb) => {
                    glb.scene.traverse((child) => {
                        if (child instanceof THREE.Mesh) 
                            child.material = new THREE.MeshNormalMaterial({
                        wireframe: true
                    })
                        this.spectrum = child
                        child.scale.multiplyScalar(2.5)
                        child.position.y = -2.5
                    })
                    this.scene.add(this.spectrum)
                    console.log(this.spectrum)
                })


    }

    update() {

    }

    bind() {

    }
}

const _instance = new Spectrum()
export default _instance