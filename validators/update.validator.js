const Joi = require('joi');

const updateSchema = Joi.object({
    nom: Joi.string().min(1).required(),
    matricule: Joi.string().min(1).required(),
    departement: Joi.string().min(1).required(),
    titre_memoire: Joi.string().min(1).required(),
    mot_cle: Joi.string().min(1).required(),
    membre_jury: Joi.string().min(1).required(),
    directeur_memoire: Joi.string().min(1).required(),
    description: Joi.string().min(1).required()
});

function validateUpdate(body) {

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };

 
  return updateSchema.validate(body, options);
}

module.exports = validateUpdate;