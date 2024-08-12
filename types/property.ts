import { Types } from "mongoose";

export interface PropertyType {
    owner: Types.ObjectId;
    name: string;
    type: string;
    description?: string;  
    location?: {
        street?: string;
        city?: string;
        state?: string;
        zipcode?: string;
    };
    beds: number;
    baths: number;
    square_feet: number;
    amenities?: string[];
    rate?: {
        nightly?: number;
        weekly?: number;
        monthly?: number;
    };
    seller_info?: {
        name?: string;
        email?: string;
        phone?: string;
    };
    images?: string[];
    is_featured: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
