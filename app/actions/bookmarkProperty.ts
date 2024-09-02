'use server'

import connectDB from "@/utils/connectDB"
import { revalidatePath } from "next/cache"
import User from '@/models/User' 
import { getSessionUser } from "@/utils/getSessionUser"
import { propertiesSavedPath } from "@/utils/paths"

async function bookmarkProperty(propertyId: string) {
    await connectDB()

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.id) throw new Error('User.id is missing')

    const dbUser = await User.findById(sessionUser.id)

    const isInFavorites = dbUser.favorites.includes(propertyId)

    let message: string;
    let isBookmarked : boolean;

    if (isInFavorites) {
        dbUser.favorites.pull(propertyId)
        message = 'Removed from favorites'
        isBookmarked = false
    } else {
        dbUser.favorites.push(propertyId)
        message = 'Added to favorites'
        isBookmarked = true
    }

    await dbUser.save()
    revalidatePath(propertiesSavedPath, 'page')

    return { message, isBookmarked }

}

export default bookmarkProperty