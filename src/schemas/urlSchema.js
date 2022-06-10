import Joi from "joi";

const regexUrl = /^(ftp|http|https):\/\/[^ "]+$/

const urlSchema = Joi.object({
    url: Joi.string().regex(regexUrl).required()
})

export default urlSchema