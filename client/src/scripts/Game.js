import Board from "./Board.js"
import GiantCube from "./GiantCube.js"
import SideCube from "./SideCubes.js"
import Light from "./Light.js"
import Building from "./Building.js"
import Queue from "./Queue.js"
import Login from "./Login.js"
import Net from "./Net.js"
import Ui from "./Ui.js"
import QueueFields from "./QueueFields.js"


class Game {
    constructor(socket) {
        this.scene = new THREE.Scene();
        this.net = new Net();
        this.ui = new Ui();
        this.login = new Login(this.net, this.ui)
        this.yourTurn = false;
        this.socket = socket
        this.init()
        socket.start(this)
        this.buildings = []
        this.buildingsAll = []
    }

    start() {
        window.addEventListener('mousemove', (e) => {
            this.mousemove(e)
        })
        window.addEventListener('mousedown', (e) => {
            if (this.yourTurn) {
                this.mouseDown(e)
            }
        })
    }


    init() {
        this.settingCamera() // Wywoływanie funckji początkowych do kamery, rendera i kreowania świata
        this.settingRenderer()
        this.creatingWorld()
        this.addingLight()
        this.addingQueueFields()
        this.createQueue()
        this.render() // wywołanie metody render
    }

    resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        // resize only when necessary
        if (needResize) {
            //3rd parameter `false` to change the internal canvas size
            renderer.setSize(width, height, false);
        }
        return needResize;
    };

    settingRenderer() {
        this.renderer = new THREE.WebGLRenderer(); // dodanie renderera, renderowanie na divie root i ustawienie rozmiaru i koloru tła
        this.renderer.setClearColor("#4f5a32");
        document.getElementById("root").append(this.renderer.domElement);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', this.WindowResize, false);
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
    }

    creatingBackground() {
        const material = new THREE.PointsMaterial({
            size: 0.05,
            map: loader.load(
                "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
            ),
            transparent: true
            // color: 0x44aa88
        });
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(getRandomParticelPos(350), 3)
        );
        const getRandomParticelPos = (particleCount) => {
            const arr = new Float32Array(particleCount * 3);
            for (let i = 0; i < particleCount; i++) {
                arr[i] = (Math.random() - 0.5) * 10;
            }
            return arr;
        };
    }

    addingQueueFields() {
        this.queueFields = new QueueFields()
        this.queueFieldsArray = this.queueFields.createQueueFields()
        this.scene.add(this.queueFieldsArray)
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
    }

    async createQueue() {
        // console.log(this.board.fields)
        this.housesQueue = []
        for (let i = 0; i < 3; i++) {
            let building = await this.addingHouse(this.queueFields.fieldsQ[0][i].position.x, this.queueFields.fieldsQ[0][i].position.y, this.queueFields.fieldsQ[0][i].position.z)
            //const House = new Queue(building)
            this.housesQueue.push(building)
        }
    }

    async updateQueue() {
        for (let i = 2; i >= 0; i--) {
            if (i == 0) {
                this.housesQueue[i] = await this.addingHouse(this.queueFields.fieldsQ[0][i].position.x, this.queueFields.fieldsQ[0][i].position.y, this.queueFields.fieldsQ[0][i].position.z)
            }
            else {
                this.housesQueue[i] = this.housesQueue[i - 1]
                let positionZ = this.queueFields.fieldsQ[0][i].position.z
                if (this.housesQueue[i].level == 3) {
                    positionZ += 20
                }
                this.housesQueue[i - 1].setPosition(this.queueFields.fieldsQ[0][i].position.x, this.housesQueue[i - 1].posY, positionZ)
            }
        }
    }

    async addingHouse(posX, posY, posZ) {
        let lvl = this.generateRandomBuilding()
        let file = lvl + ".obj"
        // console.log(file)
        this.building = new Building(lvl, file, this.scene, posX, posY, posZ)
        await this.building.loading()
        return this.building
    }

    async addingHouseUpdate(posX, posY, posZ, lvl, row, column) {
        let file = lvl + ".obj"
        // console.log(file)
        this.board.fields[row][column].isTaken = true
        this.board.fields[row][column].lvl = lvl
        this.building = new Building(lvl, file, this.scene, posX, posY, posZ)
        await this.building.loading()
        console.log("ZWRACAMY OBIEKT")
        return this.building
    }

    generateRandomBuilding() {
        return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    }

    clearFieldsData() {
        for (let i = 0; i < this.board.fields.length; i++) {
            for (let j = 0; j < this.board.fields[i].length; j++) {
                this.board.fields[i][j].isTaken = false
                this.board.fields[i][j].lvl = undefined
            }
        }
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
            this.building;
            let r, c
            for (let k = 0; k < this.board.fields.length; k++) {
                for (let j = 0; j < this.board.fields[0].length; j++) {
                    if (this.intersects[0].object.uuid == this.board.fields[k][j].mesh.uuid) {
                        this.building = this.board.fields[k][j]
                        r = k
                        c = j
                    }
                }
            }

            if (this.intersects[0].object.name == "field" && !this.building.isTaken) {
                this.board.fields[r][c].isTaken = true
                let positionZ = this.intersects[0].object.position.z
                if (this.housesQueue[2].level == 3) {
                    positionZ += 20
                }

                this.buildings.push({ level: this.housesQueue[2].level, fieldRow: r, fieldColumn: c, posX: this.housesQueue[2].posX, posY: this.housesQueue[2].posY, posZ: this.housesQueue[2].posZ })
                this.buildingsAll.push(this.housesQueue[2])
                //  console.log(this.buildings)
                //console.log(this.board.fields.find(ele => ele.field.mesh.uuid == intersects[0].object.uuid))

                this.housesQueue[2].setPosition(this.intersects[0].object.position.x, this.housesQueue[2].posY, positionZ)
                this.building.isTaken = true
                console.log(this.buildings)
                this.building.placedBuilding = this.housesQueue[2]
                //console.log(building)
                console.log(this.board.fields)
                this.updateQueue()
                this.socket.nextTurn(this.buildings)
                this.yourTurn = false
            }
        }
    }

    mousemove = (event) => {
        this.raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
        this.mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D

        this.mouseVector.x = (event.clientX / innerWidth) * 2 - 1;
        this.mouseVector.y = -(event.clientY / innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouseVector, this.camera);
        this.intersects = this.raycaster.intersectObjects(this.scene.children);
        if (this.intersects.length > 0) {
            // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
            this.building;
            let r, c
            for (let k = 0; k < this.board.fields.length; k++) {
                for (let j = 0; j < this.board.fields[0].length; j++) {
                    if (this.intersects[0].object.uuid == this.board.fields[k][j].mesh.uuid) {
                        this.building = this.board.fields[k][j]
                        r = k
                        c = j
                    }
                }
            }

            if (this.intersects[0].object.name == "field" && !this.building.isTaken && this.yourTurn) {
                if (this.selectedField != undefined) {
                    this.selectedField.material.color.r = 1
                }
                this.intersects[0].object.material.color.r = 255
                this.selectedField = this.intersects[0].object

            }
        }
    }

    render = () => {
        // this.camera.position.x = Math.sin(this.angle) * 500
        // this.angle += 0.01 // obrót kamery
        window.addEventListener('resize', this.WindowResize, false);
        this.renderer.render(this.scene, this.camera)
        this.camera.updateProjectionMatrix()
        requestAnimationFrame(this.render)
    }
}

export default Game