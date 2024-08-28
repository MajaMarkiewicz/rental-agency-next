'use server'

import connectDB from "@/utils/connectDB"
import User from '@/models/User' 
import { getSessionUser } from "@/utils/getSessionUser"

async function checkIsFavourite(propertyId: string) {
    await connectDB()

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.id) return false

    const dbUser = await User.findById(sessionUser.id)

    return dbUser.favorites.includes(propertyId)
}

export default checkIsFavourite