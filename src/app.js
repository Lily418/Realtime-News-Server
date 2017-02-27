"use strict"

const cors = require("cors")
const express = require("express")
const r = require("rethinkdb")
const selectDistinctEntities = require("./push_entity_changes.js").selectDistinctEntities
const app = express()

app.use(cors())

let connection = null

r.connect( {host: process.env.RETHINK_DB_HOST , port: parseInt(process.env.RETHINK_DB_PORT)}).then((conn) => {
    connection = conn
}).then(() => {
    app.get("/current-entities", (req, res) => {
        return selectDistinctEntities(r, connection).then((results) => {
            return res.json({
                entities : results
            })
        })
    })

    app.listen(9001)
})
