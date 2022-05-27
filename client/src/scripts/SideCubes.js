import GiantCube from "./GiantCube.js"

class SideCubes extends GiantCube {
    constructor(elementWidth, elementHeigth, elementDepth, wall, wallPositionX, wallPositionZ, depthPosition) {
        super(elementWidth, elementHeigth, elementDepth)
        this.wall = wall
        this.wallPositionX = wallPositionX
        this.wallPositionZ = wallPositionZ
        this.depthPosition = depthPosition
        this.fieldMaterial = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load("../images/dirt_low_poly.jpg"), // plik tekstury
            transparent: true, // przezroczysty 
            opacity: 1, // stopień przezroczystości
        })
        this.mesh = new THREE.Mesh(this.geometry, this.fieldMaterial) //TWORZYMY MESHA
    }
    generateSidesCube() {
        if (this.wall == "x") {
            this.mesh.position.set(this.wallPositionX, -(this.depthPosition), this.wallPositionZ)
        }
        else if (this.wall == "z") {
            this.mesh.position.set(this.wallPositionX, -(this.depthPosition), this.wallPositionZ)
        }
        return this.mesh
    }
}
export default SideCubes