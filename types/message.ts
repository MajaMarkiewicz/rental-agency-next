import type { Types } from "mongoose";

export interface MessageApiPost {
    sender: string;
    recipient: string;
    property: string;
    name: string;
    email: string;
    phone?: string;
    body?: string;
}

export type MessageSchemaType = Omit<MessageApiPost, 'sender' | 'recipient' | 'property'> & {
    sender: Types.ObjectId;
    recipient: Types.ObjectId;
    property: Types.ObjectId;
    read: boolean;
};

export type MessageApiGet = MessageApiPost & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    read: boolean;
}