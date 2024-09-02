'use server';

import connectDB from '@/utils/connectDB';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteMessage(messageId: string) {
  connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error('User ID is not found, but required');
  }

  const message = await Message.findById(messageId);
  if (message.recipient.toString() !== sessionUser.id)
    throw new Error('Unauthorized');

  await message.deleteOne();

  revalidatePath('/', 'layout');
}

export default deleteMessage;
