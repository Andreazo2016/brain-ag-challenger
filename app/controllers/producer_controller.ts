import type { HttpContext } from '@adonisjs/core/http'
import HttpStatus from 'http-status'
import { createProducerValidation } from '#validators/producer_validator'
import { Producer, ProducerParams } from '../models/producer.js'
import { ProducerService } from '../services/producer_service.js'
export default class ProductsController {

  async index({}: HttpContext) {
    return {
      teste: 1
    }
  }

  async store({ request, response }: HttpContext) {
    const body = request.body()
    try {
      await createProducerValidation.validateAsync(body)
      const producer = new Producer(body as ProducerParams)
      const producerService = new ProducerService()
      if (!producer.isValidFarmArea()) {
          return response.status(HttpStatus.BAD_REQUEST).send({
            message: 'Invalid Farm Area'
          })
      }
      const producerId = await producerService.save(producer)
      return response.status(HttpStatus.OK).send({
        id: producerId
      })
    } catch (ex) {
      throw ex
    }
  }

  async show({  }: HttpContext) {}

  async update({ }: HttpContext) {}

  async destroy({ }: HttpContext) {}
}