'use client';

import type { PropertyApiGet } from '@/types/property';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import addMessage from '../actions/addMessage';
import ContactFormButton from './ContactFormButton';

const PropertyContactForm: React.FC<{ property: PropertyApiGet }> = ({
  property,
}) => {
  const { data: session } = useSession();

  // @ts-expect-error
  const [state, formAction] = useFormState(addMessage, {});

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.submitted) {
      toast.success('Your message has been sent');
    }
  }, [state]);

  if (!session) {
    return (
      <h3 className='text-xl font-bold text-center pt-2'>
        Login to enable contact form
      </h3>
    );
  }

  if (state.submitted) {
    return <p className='text-green-500 mb-4'>Your message has been sent</p>;
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
      <form action={formAction}>
        <input
          type='hidden'
          id='property'
          name='property'
          defaultValue={property._id}
        />
        <input
          type='hidden'
          id='recipient'
          name='recipient'
          defaultValue={property.owner}
        />
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Name:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            name='name'
            type='text'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            name='email'
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='phone'
          >
            Phone:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='phone'
            name='phone'
            type='text'
            placeholder='Enter your phone number'
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='message'
          >
            Message:
          </label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
            id='message'
            name='message'
            placeholder='Enter your message'
          />
        </div>
        <div>
          <ContactFormButton />
        </div>
      </form>
    </div>
  );
};

export default PropertyContactForm;
