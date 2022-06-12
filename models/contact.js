const { Schema, model } = require('mongoose');
const Joi = require('joi');


const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
}, { versionKey: false, timestamps: true });

const joiSchema = Joi.object({
  name: Joi.string()
        .min(3)
        .max(30)
        .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
  phone: Joi.string().min(2).required(),
    favorite: Joi.bool().required(),
});

const joiFavoriteSchema = Joi.object({
    favorite: Joi.bool().required()
})


const Contact = model('contact', contactSchema)

module.exports = {Contact, joiSchema, joiFavoriteSchema};