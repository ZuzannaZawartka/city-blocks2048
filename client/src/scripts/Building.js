class Building {
    constructor(lvl, file, scene, posX, posY, posZ, queue) {
        this.queue = queue
        this.level = lvl
        this.file = file
        this.posX = posX
        this.posY = posY
        this.posZ = posZ
        this.scene = scene
        this.object = undefined
        this.points = undefined
        this.manager = new THREE.LoadingManager()
        this.loader = new THREE.OBJLoader(this.manager)
    }

    async loading() {
        var objpath = '../models/' + this.file
        await this.loader.load(objpath, (object) => this.load(object, this.lvl))
    }

    load(object) {
        switch (this.level) {
            case 1:
                this.setScale(20, object)
                this.posY += 20
                this.points = 50
                break;
            case 2:
                this.setScale(20, object)
                this.posY += 20
                this.points = 100
                break;
            case 3:
                this.setScale(25, object)
                this.posY += 20
                this.points = 150
                break;
            case 4:
                this.setScale(1.75, object)
                this.points = 200
                break;
            case 5:
                this.setScale(2, object)
                this.posY += 5
                this.points = 250
                break;
            case 6:
                this.setScale(50, object)
                this.posY += 20
                this.points = 350
                break;

        }
        object.position.set(this.posX, this.posY, this.posZ)
        this.object = object
        this.scene.add(object)
    }

    setPosition(x, y, z) {
        this.object.position.x = x
        this.object.position.y = y
        this.object.position.z = z
    }

    setScale(scale, object) {
        object.scale.x = scale
        object.scale.y = scale
        object.scale.z = scale
        this.scale = object.scale.x
    }
}

export default Building