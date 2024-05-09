import type { HttpContext } from '@adonisjs/core/http'
import { createProducerValidation } from '#validators/producer_validator'
export default class ProductsController {

  async index({}: HttpContext) {
    return {
      teste: 1
    }
  }

  async store({ request }: HttpContext) {
    const body = request.body()
    try {
      await createProducerValidation.validateAsync(body)
    } catch (ex) {
      throw ex
    }
  }

  async show({  }: HttpContext) {}

  async update({ }: HttpContext) {}

  async destroy({ }: HttpContext) {}
}