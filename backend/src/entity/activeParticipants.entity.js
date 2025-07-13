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
        rut: {
            type: String,
            unique: true,
            nullable: false,
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
        votes: {
            target: "Vote",
            type: "one-to-many",
            inverseSide: "active",
        },
    },
});
export default ParticipantsEntity;