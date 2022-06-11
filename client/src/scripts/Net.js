class Net {

    constructor() {

    }

    async login() {

        const data = JSON.stringify({
            nick: document.getElementById("nick").value,
        })

        const options = {
            method: "POST",
            body: data,
        };
        let response = await fetch("/login", options)
        let json = await response.json()
        console.log(json)

    }


}

export default Net