
"use strict";

import { EntitySchema } from "typeorm";

export const AttendanceEntity = new EntitySchema({
    name: "Attendance",
    tableName: "attendances",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
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
        
        asistencia: {
            type: Boolean,
            nullable: false,
        },
    },
    relations: {
        participant: {
            type: "many-to-one",
            target: "ActiveParticipants", 
            joinColumn: { name: "participant_id" }, 
            eager: true,
            nullable: false,
        },
        event: {
            type: "many-to-one",
            target: "Event", 
            joinColumn: { name: "event_id" },
            eager: true,
            nullable: false,
        },
    },
});

export default AttendanceEntity;