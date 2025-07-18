"use strict";

import { EntitySchema } from "typeorm";

export const MovimientoEntity = new EntitySchema({
  name: "Movimiento",
  tableName: "movimientos",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true, 
    },
    tipo: {
      type: String,
      enum: ["ingreso", "egreso"], 
    },
    monto: {
      type: Number,
      nullable: false,
    },
    categoria: {
      type: String,
      nullable: false,
    },
    descripcion: {
      type: String,
      nullable: true, 
    },
    comprobanteUrl: {
      type: String,
      nullable: true, 
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
});

export default MovimientoEntity;