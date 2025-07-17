"use strict"
import Event from "../entity/event.entity.js" ;
import { AppDataSource } from "../config/configDb.js";
import { eventValidation } from "../validations/event.validation.js";
import cron from "node-cron";

//-------------------------------------Eventos y Reuniones-------------------------------------------------

export async function getEvents(req, res) {
    try {
        const eventRepository = AppDataSource.getRepository(Event);
        const { tipo } = req.query;

        let events;

        // Para filtrar por tipo 
        if (tipo) {
            events = await eventRepository.find({ where: { tipo: tipo } });
        } else {
            //Muestra ambos tipos si no se envia el tipo en la query
            events = await eventRepository.find();
        }

        res.status(200).json({ message: "Eventos encontrados:", data: events });
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

export async function getEventById(req, res) {
    try {
    // Obtener el repositorio de usuarios y buscar un usuario por ID
    const eventRepository = AppDataSource.getRepository(Event);
    const { id } = req.params;
    const event = await eventRepository.findOne({ where: { id } });

    // Si no se encuentra el usuario, devolver un error 404
    if (!event) {
        return res.status(404).json({ message: "Evento no encontrado." });
    }

    res.status(200).json({ message: "Evento encontrado: ", data: event });
    } catch (error) {
    console.error("Error al obtener evento por ID:", error);
    res.status(500).json({ message: "Error interno del servidor." });
    }
}

export async function createEvent(req, res) {
    try {
    const { body } = req;

    const { error } = eventValidation.validate(body);

    if (error) {
        return res.status(400).json({message: "Error de validación", error: error.message});
    }
    // Crear el repositorio de eventos
    const eventRepository = AppDataSource.getRepository(Event);
    const event = eventRepository.create(body);

    await eventRepository.save(event);

    //evento apertura votacion//

    if (body.tipo === "evento" && body.votacion === true && body.titulo === "votacion") {
        const inicio = new Date();
        const duracionHoras= body.duracionVotacion || 1800; // 30 min por defecto
        const fin = new Date(inicio.getTime() + duracionHoras * 60 * 60 * 1000); // Convertir horas a milisegundos

      // Actualizar campos de votación
        event.votacionAbierta = true;
        event.votacionInicio = inicio;
        event.votacionFin = fin;

      await eventRepository.save(event); // Guardar actualización

      // Programar cierre automático con node-cron
        const minuto = fin.getMinutes();
        const hora = fin.getHours();
        const dia = fin.getDate();
        const mes = fin.getMonth() + 1;

      const cronExpresion = `${minuto} ${hora} ${dia} ${mes} *`;

        cron.schedule(cronExpresion, async () => {
        const eventoActualizado = await eventRepository.findOne({ where: { id: event.id } });

        if (eventoActualizado && eventoActualizado.votacionAbierta) {
            eventoActualizado.votacionAbierta = false;
            eventoActualizado.votacionFin = new Date();
            await eventRepository.save(eventoActualizado);
        console.log(`Votación cerrada automáticamente para el evento ${eventoActualizado.titulo}`);
        }
    });

        console.log(`Cierre de votación programado para el evento ${event.id} a las ${hora}:${minuto} del ${dia}/${mes}`);
    }

    //evento apertura votacion

    res.status(201).json({message: "Evento creado con éxito",data: event});

    } catch (error) {
    console.error("Error al crear evento: ", error);
    return res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
}
export async function updateEventById(req, res) {
    try {
    // Obtener el repositorio de evento y buscar un evento por ID
    const eventRepository = AppDataSource.getRepository(Event);
    const { id } = req.params;
    const { titulo, descripcion, fecha, hora, lugar, tipo} = req.body;
    const event = await eventRepository.findOne({ where: { id } });

    // Si no se encuentra el evento, devolver un error 404
    if (!event) {
        return res.status(404).json({ message: "Evento no encontrado." });
    }

    // Validar que al menos uno de los campos a actualizar esté presente
    event.titulo = titulo || event.titulo;
    event.descripcion = descripcion || event.descripcion;
    event.fecha = fecha || event.fecha;
    event.hora = hora || event.hora;
    event.lugar = lugar || event.lugar;
    event.tipo = tipo || event.tipo;

    // Guardar los cambios en la base de datos
    await eventRepository.save(event);

    res
    .status(200)
    .json({ message: "Evento actualizado exitosamente.", data: event });
    } catch (error) {
    console.error("Error al actualizar evento: ", error);
    res.status(500).json({ message: "Error interno del servidor." });
    }
}

export async function deleteEventById(req, res) {
    try {
    // Obtener el repositorio de evento y buscar el evento por ID
    const eventRepository = AppDataSource.getRepository(Event);
    const { id } = req.params;
    const event = await eventRepository.findOne({ where: { id } });

    // Si no se encuentra el evento, devolver un error 404
    if (!event) {
        return res.status(404).json({ message: "Evento no encontrado." });
    }

    // Eliminar el evento de la base de datos
    await eventRepository.remove(event);

    res.status(200).json({ message: "Evento eliminado exitosamente." });
    } catch (error) {
    console.error("Error al eliminar evento: ", error);
    res.status(500).json({ message: "Error interno del servidor." });
    }
}