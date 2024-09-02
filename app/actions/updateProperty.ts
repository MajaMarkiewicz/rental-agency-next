'use server'

import Property from "@/models/Property"
import type { PropertyApiPost } from "@/types/property"
import connectDB from "@/utils/connectDB"
import { getSessionUser } from "@/utils/getSessionUser"
import { propertiesPath } from "@/utils/paths"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

const getString = (formData: FormData, key: string): string | undefined => {
    const value = formData.get(key);
    return value ? String(value) : undefined;
};

const getNumber = (formData: FormData, key: string): number | null => {
    const value = formData.get(key);
    return value ? Number.parseFloat(String(value)) : null;
};

const getStringArray = (formData: FormData, key: string): string[] => {
    return Array.from(formData.getAll(key)).map(value => String(value));
};

async function updateProperty(propertyId: string, formData: FormData) {
    await connectDB()
    const user = await getSessionUser()

    if (!user || !user.id) throw new Error('User.id is missing')

    const existingProperty = await Property.findById(propertyId)

    if (!existingProperty) throw new Error('Property not found')

    if (existingProperty.owner.toString() !== user.id) {
        throw new Error('Unauthorized')
    }

    const propertyDataFromForm: Omit<PropertyApiPost, 'owner'> = {
        type: getString(formData, 'type') ?? '',
        name: getString(formData, 'name') ?? '',
        description: getString(formData, 'description'),
        location: {
            street: getString(formData, 'location.street') ?? '',
            city: getString(formData, 'location.city') ?? '',
            state: getString(formData, 'location.state') ?? '',
            zipcode: getString(formData, 'location.zipcode') ?? ''
        },
        beds: getNumber(formData, 'beds') ?? 0,
        baths: getNumber(formData, 'baths') ?? 0,
        square_feet: getNumber(formData, 'square_feet') ?? 0,
        amenities: getStringArray(formData, 'amenities'),
        rates: {
            nightly: getNumber(formData, 'rates.nightly') ?? undefined,
            weekly: getNumber(formData, 'rates.weekly') ?? undefined,
            monthly: getNumber(formData, 'rates.monthly') ?? undefined
        },
        seller_info: {
            name: getString(formData, 'seller_info.name'),
            email: getString(formData, 'seller_info.email') ?? '',
            phone: getString(formData, 'seller_info.phone')
        },
    }

    await Property.findByIdAndUpdate(propertyId, propertyDataFromForm);

    revalidatePath('/', 'layout');

    redirect(`${propertiesPath}/${propertyId}`);
}

export default updateProperty;
