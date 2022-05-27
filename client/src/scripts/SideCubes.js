class SideCubes {
    constructor(elementWidth, elementHeigth, elementDepth, wall) {
        this.elementWidth = elementWidth
        this.elementHeigth = elementHeigth
        this.elementDepth = elementDepth
        this.fieldMaterial = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load("../images/field_low_poly.jpg"), // plik tekstury
            transparent: true, // przezroczysty 
            opacity: 1, // stopień przezroczystości
        })
        this.geometry = new THREE.BoxGeometry(this.elementWidth, this.elementHeigth, this.elementDepth)
        this.mesh = new THREE.Mesh(this.geometry, this.fieldMaterial) //TWORZYMY MESHA
        this.generateSideCube() // GENERUJEMY
    }
    generateSideCube() {
        this.mesh.position.set(0, -(this.elementHeigth / 2), 0)
        return this.mesh
    }
}
export default SideCubes