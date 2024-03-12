/* eslint-disable no-console */
import express, { json, urlencoded } from 'express'
import connectToDatabase from '../dbConnection.js'
import apiRouter from './routes.js'

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

try {
    connectToDatabase().then(() => {
        console.log('Connected to the database')
    })
} catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
}

app.use('/v1/api', apiRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
