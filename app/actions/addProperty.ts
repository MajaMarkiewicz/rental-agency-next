import { Image } from 'next/image';
'use server'

import Property from "@/models/Property"
import connectDB from "@/utils/connectDB"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import cloudinary from '@/utils/cloudinary'
import type { PropertyApiPost } from "@/types/property"

interface ImageFile {
    name: string;
    size: number;
}

async function addProperty(formData: FormData): Promise<void> {
    await connectDB()
    const user = await getSessionUser()

    if (!user || !user.id) throw new Error('User.id is missing')

    const amenities = formData.getAll('amenities') as string[]
    const images = formData.getAll('images')
    .filter((entry) => (entry as ImageFile).name !== '' && (entry as ImageFile).size !== 0);

    const propertyDataFromForm: Omit<PropertyApiPost, 'owner' | 'images'> = {
        type: formData.get('type') as string,
        name: formData.get('name') as string,
        description: formData.get('description') as string | undefined,
        location: {
            street: formData.get('location.street') as string,
            city: formData.get('location.city') as string,
            state: formData.get('location.state') as string,
            zipcode: formData.get('location.zipcode') as string,
        },
        beds: Number.parseInt(formData.get('beds') as string, 10),
        baths: Number.parseInt(formData.get('baths') as string, 10),
        square_feet: Number.parseInt(formData.get('square_feet') as string, 10),
        amenities: amenities.length > 0 ? amenities : undefined,
        rates: {
            nightly: formData.get('rates.nightly') ? Number.parseFloat(formData.get('rates.nightly') as string) : undefined,
            weekly: formData.get('rates.weekly') ? Number.parseFloat(formData.get('rates.weekly') as string) : undefined,
            monthly: formData.get('rates.monthly') ? Number.parseFloat(formData.get('rates.monthly') as string) : undefined,
        },
        seller_info: {
            name: formData.get('seller_info.name') as string | undefined,
            email: formData.get('seller_info.email') as string,
            phone: formData.get('seller_info.phone') as string | undefined,
        },
    }

    const imageUrls: string[] = []

    for (const imageFile of images) {
        const imageBuffer = await imageFile.arrayBuffer()
        const imageArray = Array.from(new Uint8Array(imageBuffer))
        const imageData = Buffer.from(imageArray)

        const imageBase64 = imageData.toString('base64')

        const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
            folder: 'Rental-app'
        })

        imageUrls.push(result.secure_url)
    }

    const propertyData: PropertyApiPost = {
        owner: user.id,
        images: imageUrls.length > 0 ? imageUrls : undefined,
        ...propertyDataFromForm
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath('/', 'layout')

    redirect(`/properties/${newProperty._id}`)
}

export default addProperty