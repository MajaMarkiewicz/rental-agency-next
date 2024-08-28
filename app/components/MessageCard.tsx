'use client'

import { useState } from 'react'
import type { MessagePopulated } from "@/types/message"
import markAsRead from '../actions/markAsRead'
import { toast } from 'react-toastify'
import deleteMessage from '../actions/deleteMessage'

const MessageCard: React.FC<{ message: MessagePopulated }> = ({ message }) => {
    const [isRead, setIsRead] = useState(message.read)
    const [isDeleted, setIsDeleted] = useState(false)

    const handleReadClick = async () => {
        const newRead = await markAsRead(message._id)
        setIsRead(newRead)
        toast.success(`Message marked as ${newRead ? 'read' : 'unread'}`)
    }

    const handleDeleteClick = async () => {
        await deleteMessage(message._id)
        setIsDeleted(true)
        toast.success('Message deleted')
    }

    if (isDeleted) return (
        <p>Message is deleted</p>
    )

    const formattedDate = new Date(message.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    })

    return <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
        {!isRead && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white py-1 px-2 rounded-md">
                New
            </div>
        )}
        <h2 className="text-xl mb-4">
            <span className="font-bold">From: </span>
            {message.sender.username} {' | '}
            <span className="font-bold">Regarding: </span>
            {message.property.name}
        </h2>
        <p className="text-gray-700">{message.body}</p>
        <ul className="mt-4">
            <li>
                <strong>Email: </strong>
                {message.email}
            </li>
            {message.phone && (
                <li>
                    <strong>Phone: </strong>
                    {message.phone}
                </li>
            )}
            <li>
                <strong>Date: </strong>
                { formattedDate }
            </li>
        </ul>
        <button 
            type='button'
            className={`mt-4 mr-3 ${isRead ? 'bg-gray-300' : 'bg-blue-500'} text-white py-1 px-3 rounded-md`}
            onClick={handleReadClick}
        >
            {isRead ? 'Mark as unread' : 'Mark as read'}
        </button>
        <button
            type="button"
            className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
            onClick={handleDeleteClick}
        >
            Delete
        </button>
    </div>
}

export default MessageCard