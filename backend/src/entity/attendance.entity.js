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
        asistencia: {
            type: Boolean,
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
    relations: {
        participant: {
        type: "many-to-one",
        target: "Participants",
        joinColumn: true,
        eager: true, // opcional, para que cargue automáticamente
        nullable: false,
        },
        event: {
        type: "many-to-one",
        target: "Event",
        joinColumn: true,
        eager: true,
        nullable: false,
        },
    },
});

export default AttendanceEntity;
