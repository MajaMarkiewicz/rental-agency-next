'use client';

import type { PropertyApiGet } from '@/types/property';
import { FaBookmark } from 'react-icons/fa';
import bookmarkProperty from '../actions/bookmarkProperty';
import checkIsFavorite from '../actions/checkIsFavorite';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const BookmarkButton: React.FC<{ property: PropertyApiGet }> = ({
  property,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const userId = session?.user?.id || null;

  useEffect(() => {
    checkIsFavorite(property._id).then((res) => {
      setIsBookmarked(res);
      setIsLoading(false);
    });
  }, [property._id, userId]);
  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to sign in to bookmark a property');
    }

    try {
      const result = await bookmarkProperty(property._id);
      setIsBookmarked(!isBookmarked);
      toast.success(result.message);
    } catch (error) {
      toast.error('Something went wrong when adding property to favorites');
    }
  };

  return isLoading ? (
    <button
      type='button'
      className='bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
    >
      <FaBookmark className='mr-2' />
      Loading...
    </button>
  ) : isBookmarked ? (
    <button
      type='button'
      className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
      onClick={handleClick}
    >
      <FaBookmark className='mr-2' />
      Remove bookmark
    </button>
  ) : (
    <button
      type='button'
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
      onClick={handleClick}
    >
      <FaBookmark className='mr-2' />
      Bookmark Property
    </button>
  );
};

export default BookmarkButton;
