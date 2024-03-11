/* eslint-disable no-console */
const moongoose = require('mongoose')
require('dotenv').config()

const connectToDatabase = async () => {
    if (process.env.MONGODB_URL == null) {
        throw new Error('MONGODB_URL is not defined')
    }

    try {
        await moongoose.connect(process.env.MONGODB_URL, {})
    } catch (error) {
        throw new Error(
            `Error connecting to the database. Error: ${error.message}`
        )
    }
}

module.exports = connectToDatabase
