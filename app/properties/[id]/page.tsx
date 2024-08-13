import connectDB from '@/utils/connectDB'
import Property from '@/models/Property'
import { PropertyApiGet } from '@/types/property';
import PropertyHeaderImage from '@/app/components/PropertyHeaderImage';
import PropertyDetails from '@/app/components/PropertyDetails';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface PropertyParams {
    id: string;
}

interface PropertyProps {
    params: PropertyParams;
}

const PropertyDetail: React.FC<PropertyProps> = async({ params }) => {
    await connectDB()
    const property: PropertyApiGet | null = await Property.findById(params.id).lean()
    const { images } = property || {}

    return (
        <>
        <PropertyHeaderImage image={images?.[0] || ''}></PropertyHeaderImage>
        <section>
            <div className="container m-auto py-6 px-6">
                <Link
                    href="/properties"
                    className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                    <FaArrowLeft className='mr-2' /> 
                    Back to Properties
                </Link>
            </div>
        </section>
        <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                    <PropertyDetails property={property!}></PropertyDetails>
                </div>
            </div>
        </section>
        </>
    )
  }
  
export default PropertyDetail