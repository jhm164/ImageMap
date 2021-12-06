const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();
const jsonPath = "config/data.json"
app.use(bodyParser.json())
app.use("/images",express.static("images"))
app.use(cors())
app.post("/", async(req, res) => {
    const title = req.body.title;
    const coords = req.body.coords;
    const shape = req.body.shape;
    console.log(title,coords,shape)
    if (title && coords && shape) {
        await writeFile({
            "title": title,
            "coords": coords,
            "shape": shape
        })
        res.json({ status: 200, data: "Added Successfully" })
    } else {
        res.json({ status: 400, data: "Unable to add data" })
    }
})

app.get("/", async (req, res) => {
    res.json(await readFile())
})


function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(jsonPath, 'utf-8', (err, response) => {
            if (err) {
                resolve({ status: 300, data: err })
            }
            // console.log(err, response)
            if (response) {
                resolve({ status: 200, data: JSON.parse(response) })
            } else {
                resolve({ status: 400, data: response })
            }
        })
    })
}

function writeFile(newObject) {
    readFile().then((data) => {
        if (data.status == "200") {
            let newData = data.data
            newData.push(newObject)
            return new Promise((resolve, reject) => {
                fs.writeFile(jsonPath, JSON.stringify(newData), (err, response) => {
                    if (err) {

                        resolve({ status: 300, data: err })
                    }
                    resolve({ status: 200, data: "success !" })

                })
            })
        } else {
            return { status: 300, data: err }
        }
    })
}


const PORT = process.platform.env || 4000;
app.listen(PORT, () => {
    console.log("Server running 4000")
})
