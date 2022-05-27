class Light {
    constructor(box) {
        this.box = box
        this.light
        this.container = new THREE.Object3D()
        this.init()
    }

    init() {
        const geometry = new THREE.BoxGeometry(20, 20, 20)
        const material = new THREE.MeshBasicMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: true,
            opacity: 1
        })
        this.light = new THREE.DirectionalLight(0xffffff, 1)
        this.container.add(this.light)
        this.light.position.set(0, 0, 0)
        this.light.intensity = 1
        this.mesh = new THREE.Mesh(geometry, material)
        this.container.add(this.mesh)
        this.container.position.x = 300
        this.container.position.y = 50;
        this.container.position.z = 300
    }

    getLight() {
        return this.container
    }
}

export default Light
