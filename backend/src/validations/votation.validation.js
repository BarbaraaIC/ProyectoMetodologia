"use strict";
import Joi from "joi";

// esquema de validación para la votación
export const votationValidation = Joi.object({

    rut: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^\d{2}\.\d{3}\.\d{3}-[\dkK]$/)
    .messages({
    "string.empty": "El rut no puede estar vacío.",
    "string.base": "El rut debe ser de tipo string.",
    "string.min": "El rut debe tener exactamente 10 caracteres.",
    "string.max": "El rut debe tener exactamente 12 caracteres.",
    "string.pattern.base": "Formato rut inválido. Debe ser xx.xxx.xxx-x.",
    }),

    nombre: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
    'string.empty': 'El nombre es obligatorio.',
        'any.required': 'El nombre es obligatorio.',
        'string.pattern.base': 'El nombre solo puede contener letras y espacios.',
        'string.min': 'El nombre debe tener al menos 3 caracteres.',
        'string.max': 'El nombre debe tener como máximo 30 caracteres.',
        'string.minWords': 'El nombre debe tener al menos 1 palabra.',
        'string.symbols': 'El nombre no puede contener símbolos ni números.'
    }),
    apellido: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .messages({
    'string.empty': 'El apellido es obligatorio.',
        'any.required': 'El apellido es obligatorio.',
        'string.pattern.base': 'El apellido solo puede contener letras y espacios.',
        'string.min': 'El apellido debe tener al menos 3 caracteres.',
        'string.max': 'El apellido debe tener como máximo 30 caracteres.',
        'string.minWords': 'El apellido debe tener al menos 1 palabra.',
        'string.symbols': 'El apellido no puede contener símbolos ni números.'
    }),

    cargo: Joi.string()
    .valid("Presidente", "Secretario", "Tesorero")
    .required()
    .messages({
    "any.only": "El cargo del usuario debe ser Presidente, Secretario o Tesorero.",
    "string.base": "El cargo del usuario debe ser un texto.",
    "string.empty": "El campo del cargo no puede estar vacío.",
    "any.required": "El cargo del usuario debe ser Presidente, Secretario o Tesorero."
    }),

})
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten campos adicionales",
    });

export const emitirVotoValidation = Joi.object({
    rut_votante: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^\d{2}\.\d{3}\.\d{3}-[\dkK]$/)
    .messages({
        "string.pattern.base":
        "El RUT del votante solo puede contener letras.",
        "string.min": "El RUT del votante debe tener al menos 3 caracteres.",
        "string.max": "El RUT del votante no puede exceder los 20 caracteres.",
        "string.empty": "El RUT del votante es obligatorio y debe ser el formato 22.222.222-2.",
    }),
    nombre_candidato: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
        "string.pattern.base":
        "El nombre del candidato solo puede contener letras.",
        "string.min": "El nombre del candidato debe tener al menos 3 caracteres.",
        "string.max": "El nombre del candidato no puede exceder los 20 caracteres.",
        "string.empty": "El nombre del candidato es obligatorio.",
    }),
    apellido_candidato: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
        "string.pattern.base":
        "El apellido del candidato solo puede contener letras.",
        "string.min": "El apellido del candidato debe tener al menos 3 caracteres.",
        "string.max": "El apellido del candidato no puede exceder los 20 caracteres.",
        "string.empty": "El apellido del candidato es obligatorio.",
    }),
    cargo: Joi.string()
    .valid("Presidente", "Secretario", "Tesorero")
    .min(3)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
    "string.pattern.base":
    "El cargo del postulante solo puede contener letras.",
    "string.min": "El cargo del usuario debe tener al menos tres caracteres.",
    "string.max": "El cargo del usuario no puedo exceder los 20 caraceres.",
    "string.empty": "El cargo del usuario debe ser Presidente, Secretario o Tesorero.",
    "any.required": "El cargo del usuario debe ser Presidente, Secretario o Tesorero."
    }),
})

export const resultadosVotacionValidation = Joi.object({
    rut_votante: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^\d{2}\.\d{3}\.\d{3}-[\dkK]$/)
    .messages({
        "string.pattern.base":
        "El RUT del votante solo puede contener letras.",
        "string.min": "El RUT del votante debe tener al menos 3 caracteres.",
        "string.max": "El RUT del votante no puede exceder los 20 caracteres.",
        "string.empty": "El RUT del votante es obligatorio y debe ser el formato 22.222.222-2.",
    }),
    nombre_candidato: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
        "string.pattern.base":
        "El nombre del candidato solo puede contener letras.",
        "string.min": "El nombre del candidato debe tener al menos 3 caracteres.",
        "string.max": "El nombre del candidato no puede exceder los 20 caracteres.",
        "string.empty": "El nombre del candidato es obligatorio.",
    }),
    apellido_candidato: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
        "string.pattern.base":
        "El apellido del candidato solo puede contener letras.",
        "string.min": "El apellido del candidato debe tener al menos 3 caracteres.",
        "string.max": "El apellido del candidato no puede exceder los 20 caracteres.",
        "string.empty": "El apellido del candidato es obligatorio.",
    }),
    cargo: Joi.string()
    .valid("Presidente", "Secretario", "Tesorero")
    .min(3)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
    "string.pattern.base":
    "El cargo del postulante solo puede contener letras.",
    "string.min": "El cargo del usuario debe tener al menos tres caracteres.",
    "string.max": "El cargo del usuario no puedo exceder los 20 caraceres.",
    "string.empty": "El cargo del usuario debe ser Presidente, Secretario o Tesorero.",
    "any.required": "El cargo del usuario debe ser Presidente, Secretario o Tesorero."
    }),
})
