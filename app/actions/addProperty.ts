'use server'

import Property from "@/models/Property"
import connectDB from "@/utils/connectDB"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

async function addProperty(formData) {
    await connectDB()
    const user = await getSessionUser()

    if (!user || !user.id) throw new Error('User.id is missing')

    const amenities = formData.getAll('amenities')
    const images = formData.getAll('images').filter(image => (image.name !== '' && image.size !== 0)).map(image => image.name)

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
        amenities,
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
        images,
    }

    const propertyData = {
        owner: user.id,
        ...propertyDataFromForm
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath('/', 'layout')

    redirect(`/properties/${newProperty._id}`)
}

export default addProperty;