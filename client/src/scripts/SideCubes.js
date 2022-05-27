import GiantCube from "./GiantCube.js"

class SideCubes extends GiantCube {
    constructor(elementWidth, elementHeigth, elementDepth, wall, wallPosition) {
        super(elementWidth, elementHeigth, elementDepth)
        this.wall = wall
        this.wallPosition = wallPosition
        this.fieldMaterial = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load("../images/field_low_poly.jpg"), // plik tekstury
            transparent: true, // przezroczysty 
            opacity: 0.5, // stopień przezroczystości
        })
    }
    generateSidesCube() {
        if (this.wall = "x") {
            this.mesh.position.set(this.wallPosition, -(this.elementHeigth / 2), 0)
        }
        else if (this.wall = "z") {
            this.mesh.position.set(0, -(this.elementHeigth / 2), this.wallPosition)
        }
        return this.mesh
    }
}
export default SideCubes