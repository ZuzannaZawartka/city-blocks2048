import Board from "./Board.js"
import GiantCube from "./GiantCube.js"
import SideCube from "./SideCubes.js"
import Light from "./Light.js"
class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.init()
    }

    init() {
        this.settingCamera() // Wywoływanie funckji początkowych do kamery, rendera i kreowania świata
        this.settingRenderer()
        this.creatingWorld()
        this.addingLight()
        this.addingHouse()
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
        this.angle = 0 // do obrotu kamery
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
        this.sideCubeQueue = new SideCube(250, 360, 80, 'z', 0, 220, 250) // generowanie dekoracyjnego bocznego cuba koło boarda
        this.scene.add(this.sideCubeQueue.generateSidesCube()) // dodawanie do sceny funkcja zwraca mesha którego dodajemy

        this.sideCubeLongx = new SideCube(10, 360, 150, 'x', 186, 50, 200)
        this.scene.add(this.sideCubeLongx.generateSidesCube())

        this.sideCubeLongxMid = new SideCube(10, 340, 100, 'x', 196, 75, 220)
        this.scene.add(this.sideCubeLongxMid.generateSidesCube())

        this.sideCubeShortx = new SideCube(10, 250, 50, 'x', 186, -100, 250)
        this.scene.add(this.sideCubeShortx.generateSidesCube())

        this.sideCubeShortxMid = new SideCube(10, 200, 30, 'x', 196, -100, 270)
        this.scene.add(this.sideCubeShortxMid.generateSidesCube())

        this.sideCubeSquarex = new SideCube(10, 50, 50, 'x', 186, -100, 50)
        this.scene.add(this.sideCubeSquarex.generateSidesCube())
    }

    addingLight() {
        this.light = new Light(this.GiantCube)
        this.scene.add(this.light.getLight())
        console.log(this.light.getLight())
    }

    addingHouse() {
        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {

            console.log(item, loaded, total);

        };
        let scene = this.scene
        var loader = new THREE.OBJLoader(manager);
        var objpath = '../models/logCabin.obj';

        loader.load(objpath, function (object) {
            object.scale.x = 0.03;
            object.scale.y = 0.03;
            object.scale.z = 0.03;
            object.position.set(35, 1, 40)
            scene.add(object);
        });
    }

    render = () => {
        this.camera.position.x = Math.sin(this.angle) * 500
        this.angle += 0.01 // obrót kamery
        this.renderer.render(this.scene, this.camera)
        this.camera.lookAt(this.giantCube.mesh.position)
        this.camera.updateProjectionMatrix()
        requestAnimationFrame(this.render)
    }
}

export default Game