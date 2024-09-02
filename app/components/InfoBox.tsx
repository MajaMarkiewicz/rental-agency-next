import Link from 'next/link';
import type React from 'react';

interface InfoBoxProps {
  children: React.ReactNode;
  title: string;
  buttonText: string;
  linkTo: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  linkTo,
  buttonText,
  children,
}) => {
  return (
    <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p className='mt-2 mb-4'> {children}</p>
      <Link
        href={linkTo}
        className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default InfoBox;
