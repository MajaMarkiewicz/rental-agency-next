import Property from '@/models/Property'
import PropertyCard from '../components/PropertyCard'
import connectDB from '@/utils/connectDB'
import PropertySearchForm from '../components/PropertySeachForm'
import type { PropertyApiGet } from '@/types/property'
import Pagination from '../components/Pagination'

const Properties = async ({ searchParams: {page = '1', pageSize = '12'} }) => {
    await connectDB()
    const pageInt = Number.parseInt(page)
    const pageSizeInt = Number.parseInt(pageSize)
    const skip = (pageInt - 1) * pageSizeInt

    const total = await Property.countDocuments({})
    const properties: PropertyApiGet[] = await Property.find({}).skip(skip).limit(pageSizeInt).lean()

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
                                <Pagination pageNumber={pageInt} total={total} pageSize={pageSizeInt}/>
                            </div>
                        </section>
                    </>)                    
}

export default Properties