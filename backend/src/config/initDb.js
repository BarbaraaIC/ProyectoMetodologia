"use strict";

import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

// Función para crear usuarios por defecto
// Se aplica sólo al iniciar la base de datos
export async function createUsers() {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const count = await userRepository.count();
        if (count > 0) return;
        const users = [
            {
        username: "Presidente",
        rut: "11111111-1",
        email: "presidente@gmail.com",
        password: await encryptPassword("presidente123"),
        role: "presidente"
        },
        {
        username: "Secretario",
        rut: "22222222-2",
        email: "secretario@gmail.com",
        password: await encryptPassword("secretario123"),
        role: "secretario"
        },
        {
        username: "Tesorero",
        rut: "33333333-3",
        email: "tesorero@gmail.com",
        password: await encryptPassword("tesorero123"),
        role: "tesorero"
        },
        {
        username: "Vecino",
        rut: "44444444-4",
        email: "vecino@gmail.com",
        password: await encryptPassword("vecino123"),
        role: "vecino"
        }
        ];

        console.log("Creando usuarios...");

        for (const user of users) {
            await userRepository.save((userRepository.create(user)));
            console.log(`Usuario '${user.username}' creado exitosamente.`);
        }
    } catch (error) {
        console.error("Error al crear usuarios: ", error);
        process.exit(1);
    }
}