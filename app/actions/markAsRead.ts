'use server';

import connectDB from '@/utils/connectDB';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function markAsRead(messageId: string) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) return false;

  const message = await Message.findById(messageId);

  if (!message) throw new Error('Message not found');

  if (message.recipient.toString() !== sessionUser.id)
    throw new Error('Unauthorized');

  message.read = !message.read;

  revalidatePath('/messages', 'page');

  await message.save();

  return message.read;
}

export default markAsRead;
