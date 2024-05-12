import type { HttpContext } from '@adonisjs/core/http'
import { ProducerService } from '../services/producer_service.js'
import { inject } from '@adonisjs/core'

@inject()
export default class DashboardController {

  constructor(protected producerService: ProducerService) {}

  async index({}: HttpContext) {
    const farms = await this.producerService.getQtdFarms()
    return { farms }
  }
}