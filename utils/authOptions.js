import GooglePorvider from 'next-auth/providers/google'
import connectDB from './connectDB'
import User from '@/models/User'

export const authOptions = {
    providers: [
        GooglePorvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ],
    callbacks: {
        async signIn({ profile }) {
            await connectDB()

            const userExists = await User.findOne({email: profile.email})

            if(!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name,
                    image: profile.picture
                })

            }
            return true
        },
        async session({ session }) {
            await connectDB()
            const user = await User.findOne({email: session.user.email})
            session.user.id = user._id.toString()
            return session
        }
    }
}