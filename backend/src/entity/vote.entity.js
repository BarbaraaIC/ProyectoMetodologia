import { EntitySchema } from "typeorm";
import ParticipantsEntity from "./activeParticipants.entity.js";

export const Vote = new EntitySchema({
    name: "Vote",
    tableName: "votes",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        rut_votante: {
            type: String,
            nullable: false,
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
    },
    relations: {
        active: {
            target: "Participants",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
            eager: true,
        },
    },
});

export default Vote;
