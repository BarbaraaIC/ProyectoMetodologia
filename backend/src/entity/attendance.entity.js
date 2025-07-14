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
            participants: {
            target: "Participants",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
            eager: true,
        },
        
        event: {
            target: "Event",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
            eager: true,
        },
    },
});

export default AttendanceEntity;
