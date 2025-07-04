"use strict"
import Event from "../entity/event.entity.js" ;
import { AppDataSource } from "../config/configDb.js";
import { eventValidation } from "../validations/event.validation.js";

export async function getEvents(req, res) {
    try {
    // Obtener el repositorio de eventos y buscar todos los eventos
    const eventRepository = AppDataSource.getRepository(Event);
    const events = await eventRepository.find();

    res.status(200).json({ message: "Eventos encontrados: ", data: events });
    } catch (error) {
    console.error("Error en event.controller.js -> getEvents(): ", error);
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
    console.error("Error en event.controller.js -> getEventById(): ", error);
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

    res
    .status(201)
    .json({message: "Evento creado con éxito",data: event});
    } catch (error) {
    console.error("Error en event.controller.js -> createEvent(): ", error);
    return res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
}
export async function updateEventById(req, res) {
    try {
    // Obtener el repositorio de evento y buscar un evento por ID
    const eventRepository = AppDataSource.getRepository(Event);
    const { id } = req.params;
    const { titulo, descripcion, fecha, lugar} = req.body;
    const event = await eventRepository.findOne({ where: { id } });

    // Si no se encuentra el evento, devolver un error 404
    if (!event) {
        return res.status(404).json({ message: "Evento no encontrado." });
    }

    // Validar que al menos uno de los campos a actualizar esté presente
    event.titulo = titulo || event.titulo;
    event.descripcion = descripcion || event.descripcion;
    event.fecha = fecha || event.fecha;
    event.lugar = lugar || event.lugar;

    // Guardar los cambios en la base de datos
    await eventRepository.save(event);

    res
    .status(200)
    .json({ message: "Evento actualizado exitosamente.", data: event });
    } catch (error) {
    console.error("Error en event.controller.js -> updateEventById(): ", error);
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
    console.error("Error en event.controller.js -> deleteEventById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
    }
}