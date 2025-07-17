"use strict";
import Joi from "joi";

export const createValidation = Joi.object({
    tipo: Joi.string()
    .valid("ingreso", "egreso") 
    .required()
    .messages({
      "string.base": "'tipo' debe ser un texto.",
      "any.only": "'tipo' debe ser 'ingreso' o 'egreso'.",
      "any.required": "'tipo' es obligatorio.",
}), monto: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "'monto' debe ser un número.",
      "number.positive": "'monto' debe ser mayor a 0.",
      "any.required": "'monto' es obligatorio.",
    }),

    categoria: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.base": "'categoria' debe ser un texto.",
      "string.min": "'categoria' debe tener al menos 3 caracteres.",
      "any.required": "'categoria' es obligatoria.",
    }),

    descripcion: Joi.string()
    .allow(null, "")
    .max(255)
    .messages({
      "string.base": "'descripcion' debe ser un texto.",
      "string.max": "'descripcion' no puede exceder los 255 caracteres.",
    }),

    comprobanteUrl: Joi.string()
    .uri()
    .allow(null, "")
    .messages({
      "string.base": "'comprobanteUrl' debe ser un texto.",
      "string.uri": "'comprobanteUrl' debe ser una URL válida.",
    }),
});


export const updateValidation = Joi.object({
    tipo: Joi.string()
    .valid("ingreso", "egreso")
    .messages({
      "string.base": "'tipo' debe ser un texto.",
      "any.only": "'tipo' debe ser 'ingreso' o 'egreso'.",
    }),

    monto: Joi.number()
    .positive()
    .messages({
      "number.base": "'monto' debe ser un número.",
      "number.positive": "'monto' debe ser mayor a 0.",
    }),

    categoria: Joi.string()
    .min(3)
    .messages({
      "string.base": "'categoria' debe ser un texto.",
      "string.min": "'categoria' debe tener al menos 3 caracteres.",
    }),

    descripcion: Joi.string()
    .allow(null, "")
    .max(255)
    .messages({
      "string.base": "'descripcion' debe ser un texto.",
      "string.max": "'descripcion' no puede exceder los 255 caracteres.",
    }),

    comprobanteUrl: Joi.string()
    .uri()
    .allow(null, "")
    .messages({
      "string.base": "'comprobanteUrl' debe ser un texto.",
      "string.uri": "'comprobanteUrl' debe ser una URL válida.",
    }),
}).unknown(false).messages({
    "object.unknown": "No se permiten campos adicionales",
});