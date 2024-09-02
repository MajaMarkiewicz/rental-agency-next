'use server';

import Message from '@/models/Message';
import type { MessageApiPost } from '@/types/message';
import connectDB from '@/utils/connectDB';
import { getSessionUser } from '@/utils/getSessionUser';

const getFormDataString = (formData: FormData, key: string): string => {
  const value = formData.get(key);
  if (typeof value === 'string') {
    return value;
  }
  throw new Error(`${key} is required and must be a string`);
};

interface AddMessageResult {
  submitted: boolean;
  error?: string;
}

async function addMessage(
  previousState: FormData,
  formData: FormData,
): Promise<AddMessageResult> {
  await connectDB();
  const user = await getSessionUser();

  if (!user || !user.id) throw new Error('User.id is missing');

  const getRequiredString = (field: string) =>
    getFormDataString(formData, field);
  const recipient = getRequiredString('recipient');

  if (user.id === recipient) {
    return { error: 'You cannot send a message to yourself', submitted: false };
  }

  const newMessage = new Message<MessageApiPost>({
    sender: user.id,
    recipient,
    property: getRequiredString('property'),
    name: getRequiredString('name'),
    email: getRequiredString('email'),
    phone: formData.get('phone') as string | null,
    body: formData.get('message') as string | null,
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;
