"use strict"

import { EntitySchema } from "typeorm";

export const ParticipantsEntity = new EntitySchema({
    name: "Participants",
    tableName: "participants",
    columns : {
        id : {
            type : Number,
            primary : true,
            generated : true,
        },
        cargo: {
            type: String,
            nullable: true, 
        },
        activo: {
            type: Boolean,
            default: true, 
        },
    },
        relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
            cascade: false,
            eager: true,
        },
    },
});

export default ParticipantsEntity;