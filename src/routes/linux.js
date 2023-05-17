require("dotenv").config()
const { Router } = require("express")
const { Command } = require("../db")
const axios = require("axios")

const router = Router()
const PATH = "https://script.google.com/macros/s/AKfycbytZRBcqeVArhoPTGtNySfWtaIBlQNAlSP3vXFOodq6IHPEVaq2tERV1m12KeUWnBcsng/exec"
// const PATH = "http://localhost:3001/"

router.get("/", (req, res) => {
    res.send("Hola Mundo!\nTu estas en el manual de español de Linux. Bienvenido! ")
})

router.post("/", async (req, res) => {
    const { soruceLanguage, targetLanguage, text } = req.body
    // try {
    //     const respuesta = await axios.post(PATH, {
    //         soruceLanguage,
    //         targetLanguage,
    //         text
    //       })
    //       .then(response => response.data)
    //       .catch(error => {
    //         console.error(error);
    //       });
    //     console.log(respuesta)
    //     return res.status(200).send(respuesta)
    // } catch (error) {
    //     return res.status(400).send(error)
    // }
    return res.status(200).send(req.body)
})

router.get("/:command", async (req, res) => {
    const { command } = req.params

    res.send(`${command}\nAquí se muestra la informaicón del comando ${command}`)
})

router.post("/:command", async (req, res) => {
    const { command } = req.params
    const { sourceLanguage, text } = req.body
    const targetLanguage = "es"
    // const correctedText = text.map(line => line.replaceAll("	", " "))
    console.log("Loading: command, sourceLanguage, targetLanguage, and text")
    const correctedText = text
    try {
        const response = await axios.post(PATH, {
            sourceLanguage,
            targetLanguage,
            correctedText
        })
            .then(response => {
                return response.data;
            })
            .catch(err => ({
                error: err.message
            }));
        console.log("getting response: ")
        const stringTextTranslate = response.translateText.reduce((acc, cur) => acc + cur + "\n", "")
        const newCommand = await Command.create({
            name: command,
            manual: "Linux",
            text: stringTextTranslate,
            webPage: "www.manual-linux.com"
        })
        return res.status(200).send(newCommand.text)
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

module.exports = router