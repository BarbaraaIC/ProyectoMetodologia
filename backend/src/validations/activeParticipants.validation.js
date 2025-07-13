const Joi = require('joi');

// Valida el formato del RUT chileno
const rutRegex = /^(\d{1,2}\d{3}\d{3}-[\dkK])$/;

const activeParticipantSchema = Joi.object({
    rut: Joi.string()
        .pattern(rutRegex)
        .required()
        .messages({
            'string.pattern.base': 'El RUT debe tener un formato válido (XXXXXXXX-X).',
            'string.empty': 'El RUT es obligatorio.',
            'any.required': 'El RUT es obligatorio.'
        }),
    nombre: Joi.string()
        .required()
        .custom((value, helpers) => {
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount < 2) {
                return helpers.error('string.minWords');
            }
            return value;
        })
        .messages({
            'string.empty': 'El nombre es obligatorio.',
            'any.required': 'El nombre es obligatorio.',
            'string.minWords': 'El nombre debe tener al menos 2 palabras.'
        }),
    apellido: Joi.string()
        .required()
        .custom((value, helpers) => {
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount < 2) {
                return helpers.error('string.minWords');
            }
            return value;
        })  
        .messages({
            'string.empty': 'El apellido es obligatorio.',
            'any.required': 'El apellido es obligatorio.',
            'string.minWords': 'El apellido debe tener al menos 2 palabras.'
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



