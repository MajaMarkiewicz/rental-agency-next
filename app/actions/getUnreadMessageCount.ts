'use server';

import connectDB from '@/utils/connectDB';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

async function getUnreadMessageCount() {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) throw new Error('User id is required');

  const unreadCount = await Message.countDocuments({
    recipient: sessionUser.id,
    read: false,
  });
  return { unreadCount };
}

export default getUnreadMessageCount;
