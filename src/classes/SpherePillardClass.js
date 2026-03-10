import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'


class  SpherePillard {
    constructor() {
        this.bind()
        this.modelLoader = new GLTFLoader()
        this.textureLoader = new THREE.TextureLoader()
    }

    init(scene) {
        this.scene = scene
        this.upVec = new THREE.Vector3(0, 1, 0)
        this.pillards = new THREE.Group()
        this.pillard

        const gTex = this.textureLoader.load('./assets/textures/grayMetal.png')
        const bTex = this.textureLoader.load('./assets/textures/blackMetal.png')

        this.gMatCap = new THREE.MeshMatcapMaterial({
            matcap: gTex
        })
        this.bMatCap = new THREE.MeshMatcapMaterial({
            matcap: bTex
        })


        this.modelLoader.load('./assets/models/pillard.glb', (glb) => {
            glb.scene.traverse((child) => {
                if (child.name  === "Base"){
                    this.pillard = child
                    child.material = this.bMatCap
                }
                if (child.name === "Cylinder"){
                    child.material = this.gMatCap
                }
                console.log(child)
            })
            // this.scene.add(glb.scene)
            this.computePosition()

        })
    }

    computePosition() {
        const sphereGeom = new THREE.IcosahedronGeometry(2, 3,)
        const sphereMat = this.gMatCap
        const sphere = new THREE.Mesh(sphereGeom, sphereMat)
        // const sphere = new THREE.Mesh(sphereGeom, new THREE.MeshNormalMaterial({
        //         wireframe: true
        // }))

        this.scene.add(sphere)

        let verArray = []
        for (let i = 0; i < sphereGeom.attributes.position.count; i ++) {
            const x = sphereGeom.attributes.position.getX(i)
            const y = sphereGeom.attributes.position.getY(i)
            const z = sphereGeom.attributes.position.getZ(i)
            verArray.push({
                x: x, 
                y: y,
                z: z,
            });
        }

        let pillardPos = []
        for (let i=0; i < verArray.length; i++) {
            let existsFlag = false
            for (let j=0; j < pillardPos.length; j++) {
                if (pillardPos[j].x == verArray[i].x && pillardPos[j].y == verArray[i].y && pillardPos[j].z == verArray[i].z) {
                    existsFlag = true
                }
            }

            if (!existsFlag) {
                pillardPos.push({
                    x: verArray[i].x,
                    y: verArray[i].y,
                    z: verArray[i].z,
                })
                const c = this.pillard.clone()
                const posVec = new THREE.Vector3(verArray[i].x, verArray[i].y, verArray[i].z)
                c.position.copy(posVec)
                c.scale.multiplyScalar(.2)
                c.quaternion.setFromUnitVectors(this.upVec, posVec.normalize())
                this.pillards.add(c)
                }
            }

            this.scene.add(this.pillards)
            
            console.log(pillardPos)

        }

    update() {
        let i = 0
        while (i < this.pillards.children.length) {
            this.pillards.children[i].children[0].position.y = (Math.sin(Date.now() * 0.01 + this.pillards.children[i].position.x) + 1) * 1.1
            i++
        }

    }

    bind() {

    }
}

const _instance = new SpherePillard ()
export default _instance