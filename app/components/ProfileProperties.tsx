'use client'

import { PropertyApiGet } from "@/types/property"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

const ProfileProperties: React.FC<{ properties: PropertyApiGet[] }> = ({ properties: initialProperties }) => {
    const [properties, setProperties] = useState(initialProperties)
    return properties.map(({images, name, location, _id}) => (
    <div key={_id} className="mb-10">
        <Link href={`/properties/${_id}`}>
          <Image
            className="h-32 w-full rounded-md object-cover"
            src={images?.[0] || ''}
            alt="Property 1"
            width={1000}
            height={200}
          />
        </Link>
        <div className="mt-2">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-gray-600">Address: {location.street} {location.city} {location.state}</p>
        </div>
        <div className="mt-2">
          <a href="/add-property.html"
            className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
          >
            Edit
          </a>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    ))
}

export default ProfileProperties