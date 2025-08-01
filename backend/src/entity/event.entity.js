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
        votacionAbierta: { //aqui nuevo
        type: Boolean,
        default: false,
        },
        votacionInicio: {
        type: "timestamp",
        nullable: true,
        },
        votacionFin: {
        type: "timestamp",
        nullable: true,
        },               // aqui nuevo
    },
    relations: {
        attendances: {
            type: "one-to-many",
            target: "Attendance",
            inverseSide: "event",
        },
    },
});
export default EventEntity;