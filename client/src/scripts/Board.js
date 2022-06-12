import Field from "./Field.js"

class Board {
    constructor(scene) {
        this.scene = scene
        this.elementWidth = 120
        this.elementHeigth = 5
        this.elementDepth = 120
        this.fields = []
        this.boardFields = []
    }

    generateBoard() {
        let board = new THREE.Object3D();
        let row = -(this.elementWidth * 2.5);
        let column = -(this.elementDepth * 2.5);
        for (let r = 0; r < 6; r++) { // tu masz rowsy
            this.fields[r] = []
            this.boardFields[r] = []
            for (let c = 0; c < 6; c++) { // tu są columny
                let boardField = new Field(this.elementWidth, this.elementHeigth, this.elementDepth, row, column) // TWORZYMY JEDNO POLE
                let field = boardField.generate() // GENERUJEMY JE
                this.fields[r][c] = boardField // PRZEKAZUJEMY DO TABILCY DWUWYMIAROWEJ NASZE POLE (DWU  WYMIAROWA, BO BĘDZIE ŁATWIEJ ODNALEŹĆ)
                board.add(field) // DODAJEMY
                row += this.elementWidth // ZWIĘKSZAMY WARTOŚCI DO POZYCJI O 30, BO MASZ 6 PÓL OD -90 DO 90 
            }
            column += this.elementWidth
            row = -(this.elementWidth * 2.5)
        }
        board.position.set(0, 0, 0)
        this.scene.add(board) //DODAJEMY DO SCENY
    }
}
export default Board