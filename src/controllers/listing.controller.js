import { Router } from 'express'
import isAuthenticated from '../utils/isAuth.js'
import {
    createListing,
    getListing,
    getListings,
} from '../services/listing.service.js'
import User from '../models/user.model.js'

const router = Router()

router.post('/', isAuthenticated, async (req, res) => {
    const { user } = req.user
    try {
        const newLisiting = await createListing(req.body, user.id)
        return res
            .status(201)
            .json({ message: 'Listing created', listing: newLisiting })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const listings = await getListings()
        return res.status(200).json({ listings })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'No id' })
        }
        const listing = await getListing(req.params.id)
        const user = await User.findById(listing.user)
        return res.status(200).json({
            listing: {
                ...listing.toObject(),
                uploadedBy: {
                    username: user.name,
                    email: user.email,
                },
                __v: undefined,
                user: undefined,
            },
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

export default router
