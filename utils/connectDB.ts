import mongoose from 'mongoose'

let connected = false

const connectDB = async () => {
    mongoose.set('strictQuery', true)

    if (connected) {
        console.log('MongoDB has been already connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || '')
        connected = true
        console.log('MongoDB is connected')
    }
    catch (error) {
        console.log('Error connecting to MongoDB:', (error as Error).message)
    }
}

export default connectDB