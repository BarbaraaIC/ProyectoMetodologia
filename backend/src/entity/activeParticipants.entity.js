import { EntitySchema } from "typeorm";

export const ActiveParticipantsEntity = new EntitySchema({
  name: "ActiveParticipants",
  tableName: "participants",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    rut: {
      type: String,
      unique: true,
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
    votes: {
      target: "Vote",
      type: "one-to-many",
      inverseSide: "active",
    },
  },
});