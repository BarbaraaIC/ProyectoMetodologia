import axios from '@services/root.service.js';

export async function GetCandidatos(){
    try{
        const response = await axios.get('/votations/mostrarCandidatos');
        return response.data;
    } catch (error){
        console.error("Error al obtener candidatos", error);
    }
}

export async function  PostEmitirVoto(candidatoData){
  try{
    const response = await axios.post('/votations/emitirVoto', candidatoData);
    return response.data;
  }catch (error){
    console.error("Error al emitir voto", error);
  }
}