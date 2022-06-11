import Field from "./Field.js"

class QueueFields {
    constructor() {
        this.fieldsQ = []
        this.elementWidth = 107.5
        this.elementHeigth = 1
        this.elementDepth = 75
    }

    createQueueFields() {
        this.queueFields = new THREE.Object3D();
        let row = -74;
        let column = 500;
        for (let r = 0; r < 1; r++) { // tu masz rowsy
            this.fieldsQ[r] = []
            for (let c = 0; c < 3; c++) { // tu są columny
                let boardField = new Field(this.elementWidth, this.elementHeigth, this.elementDepth, row, column) // TWORZYMY JEDNO POLE
                let field = boardField.generate() // GENERUJEMY JE
                field.name = "queueField"
                this.fieldsQ[r][c] = field // PRZEKAZUJEMY DO TABILCY DWUWYMIAROWEJ NASZE POLE (DWU  WYMIAROWA, BO BĘDZIE ŁATWIEJ ODNALEŹĆ)
                this.queueFields.add(field) // DODAJEMY
                row += this.elementWidth // ZWIĘKSZAMY WARTOŚCI DO POZYCJI O 30, BO MASZ 6 PÓL OD -90 DO 90 
            }
            column += this.elementWidth
        }
        this.queueFields.position.set(0, 0, 0)
        return this.queueFields;
    }
}
export default QueueFields