import Property from '@/models/Property'
import PropertyCard from '../components/PropertyCard'
import connectDB from '@/utils/connectDB'
import { PropertyApiGet } from '@/types/property'

const Properties = async () => {
    await connectDB()
    const properties: PropertyApiGet[] = await Property.find({}).lean()

    return (
        <section className="px-4 px-6">
            <div className='container-xl lg:container m-auto px-4 py-6'>
                {properties.length === 0 
                    ? (<p>No properties found</p>) 
                    : (<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {properties.map((property) => <PropertyCard key={property._id} property={property}/>)}
                        </div>)
                }
            </div>
        </section>
    )
}
  
export default Properties