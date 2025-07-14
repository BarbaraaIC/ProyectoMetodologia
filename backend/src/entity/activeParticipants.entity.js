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
        rut: {
            type: String,
            nullable: false,
        },
        nombre: {
            type: String,
            nullable: false,
        },
        apellido: {
            type: String,
            nullable: false,
        },
    },
});

export default ParticipantsEntity;