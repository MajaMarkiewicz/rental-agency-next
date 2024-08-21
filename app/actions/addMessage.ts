'use server'

import Message from "@/models/Message"
import type { MessageApiPost } from "@/types/message"
import connectDB from "@/utils/connectDB"
import { getSessionUser } from "@/utils/getSessionUser"

const getFormDataString = (formData: FormData, key: string): string => {
    const value = formData.get(key);
    if (typeof value === 'string') {
        return value;
    }
    throw new Error(`${key} is required and must be a string`);
};

async function addMessage(formData: FormData): Promise<{ submitted: boolean }> {
    await connectDB()
    const user = await getSessionUser()

    if (!user || !user.id) throw new Error('User.id is missing')

    const getRequiredString = (field: string) =>  getFormDataString(formData, field)
    const recipient = getRequiredString('recipient')

    if (user.id === 'recipient') {
        throw new Error('User cannot send message to self')
    }

    const newMessage = new Message<MessageApiPost>({
        sender: user.id,
        recipient,
        property: getRequiredString('property'),
        name: getRequiredString('name'),
        email: getRequiredString('email'),
        phone: formData.get('phone') as string | null,
        body: formData.get('body') as string | null
    })

    await newMessage.save()

    return { submitted: true }
}

export default addMessage;