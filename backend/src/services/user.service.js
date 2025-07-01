import { AppDataSource } from "../config/configDb";

export async function getUsersServices(){
    try{
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find();

        if(!users || users.length === 0) return [null, "No hay usuarios"];

        const usersData = users.map(({nombreCompleto, Rut}) => users);

        return [usersData, null];
    }catch (error){
        console.error("Error al obtener los usuarios:", error);
        return [null, "Error interno del servidor"];
    }
}