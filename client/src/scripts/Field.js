class Field {
    constructor(elementWidth, elementHeigth, elementDepth, row, column) {
        this.elementWidth = elementWidth //USTALAMY JAKIEŚ PODST. WARTOŚĆI DLA CUBE'A
        this.elementHeigth = elementHeigth
        this.elementDepth = elementDepth
        this.row = row
        this.column = column
        this.fieldRow = undefined
        this.fieldColumn = undefined
        this.isTaken = false
        this.lvl = undefined
        this.placedBuilding = undefined
        this.fieldMaterial = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load("../images/field_low_poly.jpg"), // plik tekstury
            transparent: true, // przezroczysty / nie
            opacity: 0.5, // stopień przezroczystości
        })
        this.geometry = new THREE.BoxGeometry(elementWidth, elementHeigth, elementDepth)
        this.mesh = new THREE.Mesh(this.geometry, this.fieldMaterial) //TWORZYMY MESHA
        this.generate() // GENERUJEMY
    }

    setPosition() {
        this.mesh.position.set(this.row, this.elementHeigth / 4, this.column) //TA TWOJA PIEKNA FUNKCJA OD USTALANIA POZYCJI
    }

    generate() {
        this.setPosition() // USTAWIAMY POZYCJĘ I ZWRACAMY
        this.mesh.name = "field"
        return this.mesh
    }
}
export default Field