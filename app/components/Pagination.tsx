import { propertiesPath } from '@/utils/paths';
import Link from 'next/link';
import type React from 'react';

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  total: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNumber,
  pageSize,
  total,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      {pageNumber > 1 && (
        <Link
          href={`${propertiesPath}?page=${pageNumber - 1}`}
          className='mr-2 px-2 py-1 border border-gray-300 rounded'
        >
          Previous
        </Link>
      )}

      <span className='mx-2'>
        Page {pageNumber} of {totalPages}
      </span>

      {pageNumber < totalPages && (
        <Link
          href={`${propertiesPath}?page=${pageNumber + 1}`}
          className='ml-2 px-2 py-1 border border-gray-300 rounded'
        >
          Next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
