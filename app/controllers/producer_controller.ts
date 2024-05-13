import type { HttpContext } from '@adonisjs/core/http'
import HttpStatus from 'http-status'
import { createProducerValidation, updateProducerValidation } from '#validators/producer_validator'
import { Producer, ProducerParams } from '../models/producer.js'
import { ProducerService } from '../services/producer_service.js'
import { inject } from '@adonisjs/core'
import Joi from 'joi'

@inject()
export default class ProductsController {
  constructor(protected producerService: ProducerService) {}

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
      if (!producer.isValidFarmArea()) {
          return response.status(HttpStatus.BAD_REQUEST).send({
            message: 'Invalid Farm Area'
          })
      }
      const producerId = await this.producerService.save(producer)
      return response.status(HttpStatus.OK).send({
        id: producerId
      })
    } catch (ex) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error'
      })
    }
  }

  async update({ request, response }: HttpContext) {
    const body = request.body()
    const { id } = request.params()
    try {
      await updateProducerValidation.validateAsync(body)
      const producer = new Producer(body as ProducerParams)
      await this.producerService.update(id, producer)
      return response.status(HttpStatus.OK).send({})
    } catch (ex) {
      if (ex instanceof Joi.ValidationError) {
        throw ex
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error'
      })
    }
  }

  async destroy({ request, response }: HttpContext) {
    const { id } = request.params()
    await this.producerService.delete(id)
    return response.status(HttpStatus.OK).send({})
  }
}