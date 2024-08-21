import Property from '@/models/Property'
import PropertyCard from '../components/PropertyCard'
import connectDB from '@/utils/connectDB'
import PropertySearchForm from '../components/PropertySeachForm'
import type { PropertyApiGet } from '@/types/property'

const Properties = async () => {
    await connectDB()
    const properties: PropertyApiGet[] = await Property.find({}).lean()

    return properties.length === 0 
                    ? (<section className="px-4 px-6">
                            <div className='container-xl lg:container m-auto px-4 py-6'>
                                <p>No properties found</p>
                            </div> 
                        </section>)
                    : (<>
                        <section className="bg-blue-700 py-4">
                            <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                                <PropertySearchForm />
                            </div>
                        </section>
                        <section className="px-4 py-6">
                            <div className='container-xl lg:container m-auto px-4 py-6'>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                    {properties.map((property) => <PropertyCard key={property._id} property={property}/>)}
                                </div>
                            </div>
                        </section>
                    </>)                    
}

export default Properties