"use strict";

import { EntitySchema } from "typeorm";

export const VotationEntity = new EntitySchema({
    name: "Votation",
    tableName: "Votations",
    columns: {
        id:{
            type: Number,
            primary: true,
            generated: true,
        },
        username:{
            type: String,
            generated: false,
        },
        apellido: {
            type: String,
            generated: false,
        },
        cargo:{
            type: String,
            generated: false,
        },
    }
})