"use strict"
import Votation from "../entity/votation.entity.js";
import { VotationEntity } from "../entity/votation.entity.js";
import { AppDataSource } from "../config/configDb.js";


export async function postularCandidatos(req, res) {
    try{
         const resultado = await pool.query(
            
         )
            
        
        const {id, username, apellido, cargo} = req.body;
       
        if(!id || !username || !apellido || !cargo){
            return res.status(400).json({message: "Faltan datos para la postulación."});
        }
    }catch(error){
        if(cargo === cargo)
            return res.status(400).json({message: "Este miembro ya esta postulado a este cargo."});

    }
    console.error("Error al postular", error);
    res.status(500).json ({message: "Error interno del sevrvidor"});
    
}

export async function mostrarCandidatos(req, res) {
    try{
        const resultado = await pool.query
    }catch(error){

    }
}

export async function emitirVoto(req, res){
    try{
        const resultado = await pool.query
    }catch(error){

    }
}

export async function mostrarResultadoVotacion(req, res){
    try{
        const resultado = await pool.query
    }catch(error){

    }
}