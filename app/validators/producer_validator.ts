import joi from 'joi'
import { cnpj, cpf } from 'cpf-cnpj-validator';

export const createProducerValidation = joi.object({
    producer_name: joi.string().required(),
    document: joi.string().max(14).custom((document: string) => {
        if (document.length === 14) {
            if(!cnpj.isValid(document)) {
                return joi.forbidden()
            }
        } else if (document.length === 11) {
            if(!cpf.isValid(document)) {
                return joi.forbidden()
            }
        } else {
            throw new Error('document is not cpf or cnpj');
        }
    }, 'cpf/cnpj validation').required(),
    farm_name: joi.string().required(),
    city: joi.string().required(),
    total_area_arable: joi.number().positive().required(),
    total_area_vegetation: joi.number().positive().required(),
    state: joi.string().required(),
    total_area_farm: joi.number().positive().required(),
    planted_crops: joi.array().items(joi.string().valid('soja','milho','algodão','café', 'cana de açucar').required()).required()
})