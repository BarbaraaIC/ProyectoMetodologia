"use strict";
import Movimiento from "../entity/movimiento.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { createValidation, updateValidation } from "../validations/movimiento.validation.js";



export async function getMovimientos(req, res) {
    
    try {
       const movimientoRepository = AppDataSource.getRepository(Movimiento);
       const movimientos = await movimientoRepository.find();

       res.status(200).json({ message: "Movimientos encontrados", data: movimientos});
    } catch (error) {
        console.error("Error al obtener movimientos", error);
        res.status(500).json({ message: "Error al conseguir movimientos." });
    }
}

export async function getMovimientoById(req, res) {
    try {
        const movimientoRepository = AppDataSource.getRepository(Movimiento);
        const { id } = req.params
        const movimiento = await movimientoRepository.findOne({ where: { id }});

        if(!movimiento) {
            return res.status(404).json({ message: "Movimiento no encontrado" });
        }
        res.status(200).json({ message: "Movimiento encontrado", data: movimiento,});
    } catch (error) {
        console.error("Error en movimiento.controller.js -> getMovimientoById(): ", error);
        res.status(500).json({ message: "Error interno del servidor."});
    }
}

export async function createMovimiento(req, res) {
    try {
        const movimientoRepository = AppDataSource.getRepository(Movimiento);
        const { tipo, monto, categoria, descripcion, comprobanteUrl } = req.body; 
        const { error } = createValidation.validate(req.body);
        if (error) 
            return res
        .status(400).
        json({ message: "Error al crear el movimiento", error: error});
    
        const newMovimiento = movimientoRepository.create({
            tipo, 
            monto,
            categoria,
            descripcion,
            comprobanteUrl,
        });
            await movimientoRepository.save(newMovimiento);

            res.status(201).json({
                message: "Movimiento creado exitosamente",
                data: newMovimiento,
            });

        } catch (error) {
        console.error("Error al crear movimiento", error);
        res.status(500).json({message: "Error al crear movimiento."});
    }
}

export async function updateMovimiento(req, res) {
    try {
        const movimientoRepository = AppDataSource.getRepository(Movimiento);
        const { id } = req.params;
        const { tipo, monto, categoria, descripcion, comprobanteUrl } = req.body;
        const movimiento = await movimientoRepository.findOne({ where: { id } }); 

        if (!movimiento) return res.status(404).json({ message: "Movimiento no encontrado" });

        const { error } = updateValidation.validate(req.body)
        if (error) return res.status(400).json({ message: error.message });

        movimiento.tipo = tipo || movimiento.tipo;
        movimiento.monto = monto || movimiento.monto;
        movimiento.categoria = categoria || movimiento.categoria;
        movimiento.descripcion = descripcion || movimiento.descripcion;
        movimiento.comprobanteUrl = comprobanteUrl || movimiento.comprobanteUrl;

        await movimientoRepository.save(movimiento);

        res.status(200).json({
            message: "Movimiento actualizado correctamente",
            data: movimiento,
        });
    } catch (error) {
        console.error("Error al actualizar movimiento: ", error);
        res.status(500).json({ message: "Error al actualizar movimiento." });
    }
}


export async function deleteMovimiento(req, res) {
    try {
        const movimientoRepository = AppDataSource.getRepository(Movimiento);
        const { id } = req.params;
        const movimiento = await movimientoRepository.findOne({ where: { id }});
        
        if(!movimiento) {
            return res.status(404).json({ message: "Movimiento no encontrado"});
        }

        await movimientoRepository.remove(movimiento);
        res.status(200).json({ message: "Movimiento eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar movimiento: ", error);
    res.status(500).json({ message: "Error al eliminar movimiento." });  
    }
}