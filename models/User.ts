import type { UserType } from '@/types/user'
import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema<UserType>({
    email: { 
        type: String, 
        unique: true,
        required: [true, 'Email is required'] 
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    image: {
        type: String,
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }]
}, {
    timestamps: true
})

const User = models.User || model('User', UserSchema)

export default User