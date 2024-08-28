import type { Types } from "mongoose";

export interface MessageForm {
    name: string;
    email: string;
    phone: string | null;
    body: string | null;
}

export type MessageApiPost = MessageForm & {
    sender: string;
    recipient: string;
    property: string;
}

export type MessageSchemaType = MessageForm & {
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

export type MessagePopulated = MessageApiGet & {
    property: {
        name: string;
    },
    sender: {
        username: string;
    }
}