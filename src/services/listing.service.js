import Listing from '../models/listing.model.js'
import HttpException from '../models/http-exception.model.js'

const createListing = async (listingData, uploader) => {
    if (!listingData) {
        throw new HttpException(400, 'No listing data')
    }
    const exisingListing = await Listing.findOne({
        location: listingData.location,
    })
    if (exisingListing) {
        throw new HttpException(
            409,
            `Listing with same location already exists`
        )
    }
    const listing = new Listing({ ...listingData, user: uploader })
    return listing.save()
}

const getListing = async (id) => {
    if (!id) {
        throw new HttpException(400, 'No id')
    }
    return Listing.findById(id)
}

const getListings = async () => Listing.find()

export { createListing, getListing, getListings }
