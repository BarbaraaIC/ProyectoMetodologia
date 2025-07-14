// vote.entity.js
import { EntitySchema } from "typeorm";

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
    nombre_candidato: {
      type: String,
      nullable: false,
    },
    apellido_candidato: {
      type: String,
      nullable: false,
    },
    cargo: {
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
      target: "ActiveParticipants",
      type: "many-to-one",
      joinColumn: true,
      inverseSide: "votes",
    },
  },
});
