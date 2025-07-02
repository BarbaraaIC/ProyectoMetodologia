import { AppDataSource } from "../config/configDb.js";

export async function getUsersService(){
    try{
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find();

        if(!users || users.length === 0) return [null, "No hay usuarios"];

        const usersData = users.map(({password,...user})=> user);

        return [usersData, null];
    }catch(error){
        console.error("Error al obtener usuarios:", error);
        return [null, "Error interno del servidor"];
    }
}