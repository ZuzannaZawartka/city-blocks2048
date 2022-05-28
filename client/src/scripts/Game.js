import Board from "./Board.js"
import GiantCube from "./GiantCube.js"
import SideCube from "./SideCubes.js"
import Login from "./Login.js"


class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.net = new Net();
        this.ui = new Ui();
        this.login = new Login(this.net, this.ui)
        this.init()


    }

    init() {



        this.settingCamera() // Wywoływanie funckji początkowych do kamery, rendera i kreowania świata
        this.settingRenderer()
        this.creatingWorld()
        this.render() // wywołanie metody render
    }

    settingRenderer() {
        this.renderer = new THREE.WebGLRenderer(); // dodanie renderera, renderowanie na divie root i ustawienie rozmiaru i koloru tła
        this.renderer.setClearColor(0x1a1717);
        document.getElementById("root").append(this.renderer.domElement);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    settingCamera() {
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000); // Tworzenie kamery oraz ustawienie jej podst. parametrów
        this.camera.position.x = 250;
        this.camera.position.y = 230;
        this.camera.position.z = 250;
        this.camera.fov = 75;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    //CREATING WORLD PART 

    creatingWorld() {
        this.addingAxes() // funckje do tworzenia poszczególnych elementów świata
        this.addingBoard()
        this.addingDecorationCubes()
    }

    addingAxes() {
        this.axes = new THREE.AxesHelper(1000) // dodawanie prowadnic do wyrównywania
        this.scene.add(this.axes)
    }

    addingBoard() {
        this.board = new Board(this.scene) // tworzenie planszy do gry oraz jej generowanie + dodanie
        this.board.generateBoard()
        console.log(this.board)
    }

    addingDecorationCubes() {
        this.giantCube = new GiantCube(360, 360, 360) // generowanie dużego cuba pod boardem, jako dekoracja
        this.scene.add(this.giantCube.generateGiantCube()) // dodawanie do sceny funkcja zwraca mesha którego dodajemy
        this.addingDecorationSidesCubes()
    }

    addingDecorationSidesCubes() {
        this.sideCube = new SideCube(50, 300, 50, 'x', 225) // generowanie dekoracyjnego bocznego cuba koło boarda
        this.scene.add(this.sideCube.generateSidesCube()) // dodawanie do sceny funkcja zwraca mesha którego dodajemy
    }

    render = () => {
        this.camera.position.x += 0.1 // obrót kamery
        this.renderer.render(this.scene, this.camera)
        this.camera.lookAt(this.giantCube.mesh.position)
        this.camera.updateProjectionMatrix()
        requestAnimationFrame(this.render)
    }
}

export default Game