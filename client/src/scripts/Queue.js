class Queue {
    constructor(object1) {
        this.object1 = object1
    }

    setQueueParams() {
        this.setQueuePositionY()
    }

    setQueuePositionY() {
        console.log(this.object1.posY)
    }
}
export default Queue