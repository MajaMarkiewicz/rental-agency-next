import PropertyCard from "@/app/components/PropertyCard"
import User from "@/models/User"
import type { PropertyApiGet } from "@/types/property"
import connectDB from "@/utils/connectDB"
import { getSessionUser } from "@/utils/getSessionUser"

const PropertiesSaved: React.FC = async () => {
    await connectDB()

    const {id: userId} = await getSessionUser() || {}
    if (!userId) throw new Error('User.id is missing')

    const { favorites } = await User.findById(userId).populate('favorites')

    return (
        <section className="container lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4">Saved properties</h1>
            {favorites.length === 0 ? (<p>No saved properties</p>) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {favorites.map((property: PropertyApiGet) => {
                        return <PropertyCard key={property._id} property={property}/>
                    })}
                </div>
            )}
        </section>
    )
}

export default PropertiesSaved