class Building {
    constructor(lvl, file, scene, posX, posY, posZ) {
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
        this.manager.onProgress = function (item, loaded, total) {

            console.log(item, loaded, total)

        };

        var objpath = '../models/' + this.file

        this.loader.load(objpath, (object) => this.load(object, this.lvl))
    }

    load(object) {
        console.log(this.level)
        switch (this.level) {
            case 1:
                this.setScale(30, object)
                this.posY = 20
                break;
            case 2:
                this.setScale(30, object)
                this.posY = 20
                break;
            case 3:
                this.setScale(30, object)
                this.posY = 20
                break;
            case 4:
                this.setScale(2, object)
                break;
            case 5:
                this.setScale(2.5, object)
                this.posY = 5
                break;
            case 6:
                this.setScale(50, object)
                this.posY = 10
                break;

        }
        object.position.set(this.posX, this.posY, this.posZ)
        console.log(object)
        this.scene.add(object)
    }

    setScale(scale, object) {
        object.scale.x = scale
        object.scale.y = scale
        object.scale.z = scale
    }

    getBuilding() {
        return this.building
    }
}

export default Building