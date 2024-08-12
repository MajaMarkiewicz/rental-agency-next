export interface UserType {  
    _id: string;
    email: string;
    username: string;
    image?: string;
    favorites: string[];    
    createdAt: Date;
    updatedAt: Date;
}  