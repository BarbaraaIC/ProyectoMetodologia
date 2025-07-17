"use strict";

import { DataSource } from "typeorm"
import { HOST, DB_USERNAME, PASSWORD, DATABASE } from "./configEnv.js";
import AttendanceEntity from "../entity/attendance.entity.js";
import ParticipantsEntity from "../entity/activeParticipants.entity.js";
import EventEntity from "../entity/event.entity.js";

// Configuración de la conexión a la base de datos
export const AppDataSource = new DataSource({
    type: "postgres",
    host: HOST,
    port: 5432,
    username: DB_USERNAME,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    entities: [
        AttendanceEntity,
        ParticipantsEntity,
        EventEntity
    ],
    synchronize: true,
    logging: false,
});

// Función para conectar a la base de datos
export async function connectDB() {
    try {
        await AppDataSource.initialize();
        console.log("=> Conexión con la base de datos exitosa!");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        process.exit(1);
    }
}