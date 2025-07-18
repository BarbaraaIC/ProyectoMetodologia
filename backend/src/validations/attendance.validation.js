import Joi from "joi";

export const attendanceSchema = Joi.object({
    rut: Joi.string()
            .required()
        .pattern(/^\d{2}\.\d{3}\.\d{3}-[\dkK]$/)
        .min(11)
        .max(12)
        .messages({
            "string.empty": "El rut no puede estar vacío.",
            "string.base": "El rut debe ser de tipo string.",
            "string.min": "El rut debe tener exactamente 10 caracteres.",
            "string.max": "El rut debe tener exactamente 12 caracteres.",
            "string.pattern.base": "Formato rut inválido. Debe ser xx.xxx.xxx-x.",
    }),

    nombre: Joi.string()
            .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
            .min(3)
            .max(30)
            .required()
            .custom((value, helpers) => {
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                return helpers.error('string.symbols');
            }
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount < 1) { // minimo de 1 palabra
                return helpers.error('string.minWords');
            }
            return value;
        })
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
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .min(3)
        .max(30)
        .required()
        .custom((value, helpers) => {
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                return helpers.error('string.symbols');
            }
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount < 1) { // minimo una palabra
                return helpers.error('string.minWords');
            }
            return value;
        })
        .messages({
            'string.empty': 'El apellido es obligatorio.',
            'any.required': 'El apellido es obligatorio.',
            'string.pattern.base': 'El apellido solo puede contener letras y espacios.',
            'string.min': 'El apellido debe tener al menos 3 caracteres.',
            'string.max': 'El apellido debe tener como máximo 30 caracteres.',
            'string.minWords': 'El apellido debe tener al menos 1 palabra.',
            'string.symbols': 'El apellido no puede contener símbolos ni números.'
        }),

    asistencia: Joi.boolean()
        .required()
        .messages({
        "any.required": "Debe indicar si está presente o ausente",
        "boolean.base": "El campo asistencia debe ser verdadero o falso",
    }),

    participant_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
        "any.required": "El ID del participante es obligatorio",
        "number.base": "El ID del participante debe ser un número",
        "number.positive": "El ID del participante debe ser positivo",
    }),

    event_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
        "any.required": "El ID del evento es obligatorio",
        "number.base": "El ID del evento debe ser un número",
        "number.positive": "El ID del evento debe ser positivo",
    }),

});
