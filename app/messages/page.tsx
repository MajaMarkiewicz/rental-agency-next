import connectDB from "@/utils/connectDB"
import Message from "@/models/Message"
import "@/models/Property"
import { convertToSerializableObject } from "@/utils/convertToObject"
import { getSessionUser } from "@/utils/getSessionUser"
import MessageCard from "../components/MessageCard"
import type { MessagePopulated } from "@/types/message"

const MessagesPage: React.FC = async () => {
    connectDB()

    const sessionUser = await getSessionUser()
    const readMessages = await Message
        .find({ recipient: sessionUser.id, read: true })
        .sort({ createdAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean()

    const unreadMessages = await Message
        .find({ recipient: sessionUser.id, read: false })
        .sort({ createdAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean()

    const messages: MessagePopulated[] = [...readMessages, ...unreadMessages].map((messageDoc) => {
        const message = convertToSerializableObject(messageDoc)
        message.sender = convertToSerializableObject(message.sender)
        message.property = convertToSerializableObject(message.property)
        return message
    })

    return (
    <section className="bg-blue-50">
        <div className="container py-24 m-auto max-width-6xl">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <h1 className="text-3xl font-bold mb-4">
                   Your Messages
                </h1>
                <div className="space-y-4">
                    {messages.length === 0 ? (
                        <p>You have no messages</p>
                    ) : (
                        messages.map((message) => (
                            <MessageCard key={message._id} message={message}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    </section>
    )
}

export default MessagesPage;