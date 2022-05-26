class Board {
    constructor(scene) {
        this.scene = scene
        this.elementWidth = 30
        this.elementHeigth = 30
        this.elementDepth = 30
        this.fields = []
        this.generateBoard()
    }

    generateBoard() {
        let board = new THREE.Object3D();
        let row = -(this.elementWidth * 3);
        let column = -(this.elementHeigth * 3);
        for (let r = 0; r < 5; r++) { // tu masz rowsy
            for (let c = 0; c < 5; c++) { // tu są columny
                let boardField = new Field(this.elementWidth, this.elementHeigth, this.elementDepth, row, column) // TWORZYMY JEDNO POLE
                let field = boardField.generate() // GENERUJEMY JE
                board.add(field) // DODAJEMY
                this.fields[r][c] = field // PRZEKAZUJEMY DO TABILCY DWUWYMIAROWEJ NASZE POLE (DWU  WYMIAROWA, BO BĘDZIE ŁATWIEJ ODNALEŹĆ)
                row += 30 // ZWIĘKSZAMY WARTOŚCI DO POZYCJI O 30, BO MASZ 6 PÓL OD -90 DO 90 
                column += 30
            }
        }
        this.scene.add(board) //DODAJEMY DO SCENY
    }
}