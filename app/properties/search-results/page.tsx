import Property from "@/models/Property";
import connectDB from "@/utils/connectDB";
import { convertToSerializableObject } from "@/utils/convertToObject";
import Link from "next/link"
import PropertyCard from "@/app/components/PropertyCard";
import PropertySearchForm from "@/app/components/PropertySeachForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import type { PropertyApiGet } from "@/types/property";
import { propertiesPath } from "@/utils/paths";

interface SearchParams {
    location: string;
    propertyType: string;
}

interface Query {
    $or: { [key: string]: RegExp } [];
    type?: RegExp;
}

const searchResultsPage: React.FC<{searchParams: SearchParams}> = async ({ searchParams : { location, propertyType }}) => {
    await connectDB()

    const locationPattern = new RegExp(location, 'i')
    const query: Query = {
        $or: [
            { 'location.street': locationPattern },
            { 'location.city': locationPattern },
            { 'location.state': locationPattern },
            { 'location.zipcode': locationPattern },
            { name: locationPattern },
            { description: locationPattern},
        ]
    }

    if(propertyType && propertyType !== 'All') {
        query.type = new RegExp(propertyType, 'i')
    }

    const propertiesFound = convertToSerializableObject(await Property.find(query).lean())

    return (
        <>
            <section className="bg-blue-700 py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm />
                </div>
            </section>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto px-4 py-6">
                    <Link href={propertiesPath} className="flex items-center text-blue-500 hover:underline mb-3">
                        <FaArrowAltCircleLeft className="mr-2 mb-1" />
                        Back to Properties
                    </Link>
                    <h1 className="text-2xl mb-4">Search Results</h1>
                    { propertiesFound.length === 0 ? (<p>No properties found</p>) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {propertiesFound.map((property: PropertyApiGet) => <PropertyCard key={property._id} property={property}/>)}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default searchResultsPage