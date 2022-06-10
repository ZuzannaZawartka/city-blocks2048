class Building {
    constructor(lvl, file, scene, posX, posY, posZ, queue) {
        this.queue = queue
        this.level = lvl
        this.file = file
        this.posX = posX
        this.posY = posY
        this.posZ = posZ
        this.scene = scene
        this.manager = new THREE.LoadingManager()
        this.loader = new THREE.OBJLoader(this.manager)
        this.loading()
    }

    loading() {
        var objpath = '../models/' + this.file

        this.loader.load(objpath, (object) => this.load(object, this.lvl))
    }

    load(object) {
        switch (this.level) {
            case 1:
                this.setScale(20, object)
                this.posY += 20
                break;
            case 2:
                this.setScale(20, object)
                this.posY += 20
                break;
            case 3:
                this.setScale(25, object)
                this.posY += 20
                break;
            case 4:
                this.setScale(1.75, object)
                break;
            case 5:
                this.setScale(2, object)
                this.posY += 5
                break;
            case 6:
                this.setScale(50, object)
                this.posY += 10
                break;

        }
        object.position.set(this.posX, this.posY, this.posZ)
        this.scene.add(object)
    }

    setScale(scale, object) {
        object.scale.x = scale
        object.scale.y = scale
        object.scale.z = scale
        this.scale = object.scale.x
    }

    getBuilding() {
        return this.building
    }
}

export default Building