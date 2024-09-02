'use server'

import cloudinary from "@/utils/cloudinary"
import connectDB from "@/utils/connectDB"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function deleteProperty(propertyId: string) {
    connectDB()
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.id) {
        throw new Error('User ID is not found, but required')
    }

    const property = await Property.findById(propertyId)

    if (!property) throw new Error('Property not found')

    if(property.owner.toString() !== sessionUser.id) {
        throw new Error('Unauthorized')
    }

    const imageIds = property.images.map((url: string) => url.split('/').at(-1)?.split('.').at(0))

    if(imageIds.length > 0) {
        for (const imageId of imageIds) {
            await cloudinary.uploader.destroy(`Rental-app/'${imageId}`)
        }
    }

    await property.deleteOne()

    revalidatePath('/', 'layout')

}

export default deleteProperty