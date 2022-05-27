class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.camera.position.x = 250;
        this.camera.position.y = 230;
        this.camera.position.z = 250;
        this.camera.fov = 75;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x1a1717);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes)
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.board = new Board(this.scene)
        this.board.generateBoard()
        console.log(this.board)
        this.giantCube = new GiantCube(this.scene, 360, 360, 360)
        this.render() // wywołanie metody render
    }

    render = () => {
        this.renderer.render(this.scene, this.camera);
        this.camera.lookAt(this.giantCube.mesh.position);
        this.camera.updateProjectionMatrix();
        requestAnimationFrame(this.render);
    }
}