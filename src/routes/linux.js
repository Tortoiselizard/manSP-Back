require("dotenv").config()
const fs = require("fs")
const path = require("path")
const { Router } = require("express")
const { Command } = require("../db")
const axios = require("axios")

const router = Router()
const PATH = "https://script.google.com/macros/s/AKfycbytZRBcqeVArhoPTGtNySfWtaIBlQNAlSP3vXFOodq6IHPEVaq2tERV1m12KeUWnBcsng/exec"
// const PATH = "http://localhost:3001/"

router.get("/", (req, res) => {
    res.send("Hola Mundo!\nEstas en el manual de español de Linux. Bienvenido! ")
})

router.post("/", async (req, res) => {
    const { soruceLanguage, targetLanguage, text } = req.body
    
    return res.status(200).send("Ruta inhabilitada")
})

router.get("/:command", async (req, res) => {
    try {
        const { command } = req.params
        console.log("Searching ...")
        const commandsDB = await Command.findOne({
            where: {
                name: command
            }
        })
        if (!commandsDB) {
            return res.status(200).send("Command not found")
        }
        console.log("Command found")
        res.status(200).send(commandsDB.text)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post("/:command", async (req, res) => {
    const { command } = req.params
    const { sourceLanguage, text } = req.body
    const targetLanguage = "es"
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
        console.log("Translating ...")
        const stringTextTranslate = response.translateText.reduce((acc, cur) => acc + cur + "\n", "")

        const newCommand = await Command.create({
            name: command,
            manual: "Linux",
            text: stringTextTranslate,
            webPage: "www.manual-linux.com"
        })
        console.log("New command saved ")
        return res.status(200).send(newCommand.text)
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

module.exports = router