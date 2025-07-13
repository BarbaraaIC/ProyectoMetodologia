import Joi from 'joi';


// Valida que solo sean letras y espacios (sin símbolos ni números)
const onlyLettersRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

const activeParticipantSchema = Joi.object({
    rut: Joi.string()
        .required()
    .pattern(/^\d{2}\.\d{3}\.\d{3}-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.pattern.base": "Formato rut inválido. Debe ser xx.xxx.xxx-x.",
        }),
    nombre: Joi.string()
        .pattern(onlyLettersRegex)
        .min(3)
        .max(30)
        .required()
        .custom((value, helpers) => {
            if (onlyLettersRegex.test(value)) {
                return helpers.error('string.symbols');
            }
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount < 3) {
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
            'string.minWords': 'El nombre debe tener al menos 2 palabras.',
            'string.symbols': 'El nombre no puede contener símbolos ni números.'
        }),
    apellido: Joi.string()
        .pattern(onlyLettersRegex)
        .min(3)
        .max(30)
        .required()
        .custom((value, helpers) => {
            if (onlyLettersRegex.test(value)) {
                return helpers.error('string.symbols');
            }
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount < 3) {
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
            'string.minWords': 'El apellido debe tener al menos 2 palabras.',
            'string.symbols': 'El apellido no puede contener símbolos ni números.'
        }),
    cargo: Joi.string()
        .required()
        .messages({
            'string.empty': 'El cargo es obligatorio.',
            'any.required': 'El cargo es obligatorio.'
        }),
    activo: Joi.boolean()
        .default(true)
        .messages({ 
            'boolean.base': 'El estado activo debe ser un valor booleano.',
            'any.required': 'El estado activo es obligatorio.'
        })  
});

module.exports = {
    activeParticipantSchema
};



