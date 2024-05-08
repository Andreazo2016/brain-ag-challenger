import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {

  async index({}: HttpContext) {
    return {
      teste: 1
    }
  }

  async store({ request }: HttpContext) {
    const body = request.body()
    return body
  }

  async show({  }: HttpContext) {}

  async update({ }: HttpContext) {}

  async destroy({ }: HttpContext) {}
}