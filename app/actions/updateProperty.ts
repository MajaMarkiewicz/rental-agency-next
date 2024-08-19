'use server'

import Property from "@/models/Property"
import connectDB from "@/utils/connectDB"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

async function updateProperty(propertyId: string, formData) {
    await connectDB()
    const user = await getSessionUser()

    if (!user || !user.id) throw new Error('User.id is missing')

    const existingProperty = await Property.findById(propertyId)

    if (!existingProperty) throw new Error('Property not found')

    if(existingProperty.owner.toString() !== user.id) {
        throw new Error('Unauthorized')
    }

    const propertyDataFromForm = {
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode'),
        },
        beds: parseInt(formData.get('beds'), 10),
        baths: parseInt(formData.get('baths'), 10),
        square_feet: parseInt(formData.get('square_feet'), 10),
        amenities: formData.getAll('amenities'),
        rates: {
            nightly: formData.get('rates.nightly') ? parseFloat(formData.get('rates.nightly')) : null,
            weekly: formData.get('rates.weekly') ? parseFloat(formData.get('rates.weekly')) : null,
            monthly: formData.get('rates.monthly') ? parseFloat(formData.get('rates.monthly')) : null,
        },
        seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        },
    }

    await Property.findByIdAndUpdate(propertyId, propertyDataFromForm)

    revalidatePath('/', 'layout')

    redirect(`/properties/${propertyId}`)
}

export default updateProperty;