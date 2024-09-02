import connectDB from '@/utils/connectDB';
import Property from '@/models/Property';
import type { PropertyApiGet } from '@/types/property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import PropertyAddEditForm from '@/app/components/PropertyAddEditForm';
import updateProperty from '@/app/actions/updateProperty';

interface PropertyParams {
  id: string;
}

const PropertyEdit: React.FC<{ params: PropertyParams }> = async ({
  params,
}) => {
  await connectDB();
  const propertyRaw: PropertyApiGet | null = await Property.findById(
    params.id,
  ).lean();

  if (!propertyRaw) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property not found
      </h1>
    );
  }

  const property = convertToSerializableObject(propertyRaw);

  return (
    <section>
      <div className='container m-auto py-24 max-w-2xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyAddEditForm
            property={property}
            title='Edit property'
            buttonText='Update Property'
            action={updateProperty.bind(null, property._id)}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyEdit;
