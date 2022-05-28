import Board from "./Board.js"
import GiantCube from "./GiantCube.js"
import SideCube from "./SideCubes.js"
import Light from "./Light.js"
import Building from "./Building.js"
import Queue from "./Queue.js"
class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.init()
        window.addEventListener('mousedown', (e) => {
            this.mouseDown(e)
        })
    }

    init() {
        this.settingCamera() // Wywoływanie funckji początkowych do kamery, rendera i kreowania świata
        this.settingRenderer()
        this.creatingWorld()
        this.addingLight()
        this.createQueue()
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
        this.camera.position.x = 1150
        this.camera.position.y = 680
        this.camera.position.z = 1150
        this.camera.fov = 20
        this.camera.lookAt(0, 0, 0)
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
        this.giantCube = new GiantCube(720, 1920, 720) // generowanie dużego cuba pod boardem, jako dekoracja
        this.scene.add(this.giantCube.generateGiantCube()) // dodawanie do sceny funkcja zwraca mesha którego dodajemy
        this.addingDecorationSidesCubes()
    }

    addingDecorationSidesCubes() {
        this.sideCubeQueue = new SideCube(350, 360, 80, 'z', -50, 450, 230) // generowanie dekoracyjnego bocznego cuba koło boarda
        this.scene.add(this.sideCubeQueue.generateSidesCube()) // dodawanie do sceny funkcja zwraca mesha którego dodajemy

        this.sideCubeLongx = new SideCube(10, 360, 150, 'x', 365, 50, 200)
        this.scene.add(this.sideCubeLongx.generateSidesCube())

        this.sideCubeLongxMid = new SideCube(20, 340, 100, 'x', 385, 75, 220)
        this.scene.add(this.sideCubeLongxMid.generateSidesCube())

        this.sideCubeLongx2 = new SideCube(30, 260, 120, 'x', 375, 220, 200)
        this.scene.add(this.sideCubeLongx2.generateSidesCube())

        this.sideCubeShortx = new SideCube(10, 250, 75, 'x', 385, -100, 250)
        this.scene.add(this.sideCubeShortx.generateSidesCube())

        this.sideCubeShortxMid = new SideCube(20, 200, 50, 'x', 405, -100, 270)
        this.scene.add(this.sideCubeShortxMid.generateSidesCube())

        this.sideCubeSquarex = new SideCube(10, 300, 100, 'x', 395, -200, 200)
        this.scene.add(this.sideCubeSquarex.generateSidesCube())
    }

    addingLight() {
        this.light = new Light(this.GiantCube)
        this.scene.add(this.light.getLight())
        console.log(this.light.getLight())
    }

    createQueue() {
        //this.queue = new Queue(this.addingHouse(posX, posY, posZ), this.addingHouse(posX, posY, posZ), this.addingHouse(posX, posY, posZ))
    }

    addingHouse(posX, posY, posZ) {
        let lvl = this.generateRandomBuilding()
        let file = lvl + ".obj"
        this.building = new Building(lvl, file, this.scene, posX, posY, posZ)
        return this.building
    }

    generateRandomBuilding() {
        return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    }

    mouseDown = (event) => {
        this.raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
        this.mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D

        this.mouseVector.x = (event.clientX / innerWidth) * 2 - 1;
        this.mouseVector.y = -(event.clientY / innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouseVector, this.camera);
        this.intersects = this.raycaster.intersectObjects(this.scene.children);
        if (this.intersects.length > 0) {
            // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
            if (this.intersects[0].object.name == "field")
                this.addingHouse(this.intersects[0].object.position.x, this.intersects[0].object.position.y, this.intersects[0].object.position.z);
        }
    }

    render = () => {
        // this.camera.position.x = Math.sin(this.angle) * 500
        // this.angle += 0.01 // obrót kamery
        this.renderer.render(this.scene, this.camera)
        this.camera.updateProjectionMatrix()
        requestAnimationFrame(this.render)
    }
}

export default Game