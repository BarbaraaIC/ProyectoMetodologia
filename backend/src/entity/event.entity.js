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
        lugar: {
            type: String,
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
    }

});
export default EventEntity;