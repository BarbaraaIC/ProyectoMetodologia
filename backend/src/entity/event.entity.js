"use strict";

import { EntitySchema } from "typeorm";

export const EventEntity= new EntitySchema({
    name: "Event",
    tableName:"events",
    columns: {
        id:{
            type : Number,
            primary : true,
            generated : true,
        },

        titulo: {
            type : String,
            nullable : false,
        },

        descripcion: {
            type: String,
            nullable : false,
        },

        fecha: {
            type : Date,
            nullable: false,
        },

        hora: {
        type: String,
        length: 5,
        nullable: false,
        },

        lugar: {
            type: String,
            nullable: false,
        }, 

        tipo: {
            type: "enum",
            enum: ["evento", "reunion"],
            nullable: false,
        },

        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },

        updatedAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: () => "CURRENT_TIMESTAMP",
        },
    },
    attendances: {
    target: "Attendance",
    type: "one-to-many",
    inverseSide: "event",
},
});
export default EventEntity;