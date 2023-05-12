require("dotenv").config()
const { Router } = require("express")
const axios = require("axios")

const router = Router()
const PATH = "https://script.google.com/macros/s/AKfycbytZRBcqeVArhoPTGtNySfWtaIBlQNAlSP3vXFOodq6IHPEVaq2tERV1m12KeUWnBcsng/exec"
// const PATH = "http://localhost:3001/"

router.get("/", (req, res) => {
    res.send("Hola Mundo!\nTu estas en el manual de español de Linux. Bienvenido! ")
})

router.post("/", async (req, res) => {
    const {soruceLanguage, targetLanguage, text} = req.body
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

router.get("/:comand", async (req, res) => {
    const { comand } = req.params

    res.send(`${comand}\nAquí se muestra la informaicón del comando ${comand}`)
})

router.post("/:comand", async (req, res) => {
    const { comand } = req.params
    const {soruceLanguage, text} = req.body
    const targetLanguage = "es"
    try {
        const response = await axios.post(PATH, {
            soruceLanguage,
            targetLanguage,
            text
          })
          .then(response => {
            return response.data;
          })
          .catch(error => {
            console.error(error);
          });
        const stringTextTranslate = response.translateText.reduce((acc, cur) => acc+cur+"\n", "")
        return res.status(200).send(stringTextTranslate)
    } catch (error) {
        return res.status(400).send(error)
    }
})

module.exports = router