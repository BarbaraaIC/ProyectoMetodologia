import { AppDataSource } from "../config/configDb.js";
import { UserEntity } from "../entity/user.entity.js";

export async function getUsersService(){
    try{
        const userRepository = AppDataSource.getRepository(UserEntity);

        const users = await userRepository.find();

        if(!users || users.length === 0) return [null, "No hay usuarios"];

        const usersData = users
        .filter(user => user.username && user.rut)
        .map(user => ({
            username: user.username,
            rut: user.rut
        }));
        
        if(usersData.length === 0)
            return[null, "No hay usuarios validos"];

        return [usersData, null];
    }catch(error){
        console.error("Error al obtener usuarios:", error);
        return [null, "Error interno del servidor"];
    }
}
