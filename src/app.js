/* eslint-disable no-console */
const express = require('express')
const connectToDatabase = require('../dbConnection')

const app = express()

try {
    connectToDatabase().then(() => {
        console.log('Connected to the database')
    })
} catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
}

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
