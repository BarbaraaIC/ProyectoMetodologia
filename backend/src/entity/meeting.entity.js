"use strict";

import { EntitySchema } from "typeorm";

export const MeetingEntity= new EntitySchema({
    name: "Meeting",
    tableName:"meetings",
    columns: {
        id:{
            type : Number,
            primary : true,
            generated : true,
        },
        titulo: {
            type : String,
            nullable : false, //no puede estar vacío en la base de datos
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
export default MeetingEntity;