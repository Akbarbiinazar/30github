import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";
import {v4 as uuid} from 'uuid'

export type UserDocument = User & Document 

@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
})

export class User {
    @Prop({
        type: String,
        unique: true,
        default: function genUUID() {
            return uuid()
        },
    })
    userId: string;

    @Prop({trquired: true})
    nickname: string;

    @Prop({required: true, unique: true})
    email: string

    @Prop({required: true})
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
