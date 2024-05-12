import type { HttpContext } from '@adonisjs/core/http'
import { ProducerService } from '../services/producer_service.js'
import { inject } from '@adonisjs/core'

@inject()
export default class DashboardController {

  constructor(protected producerService: ProducerService) {}

  async index({}: HttpContext) {
    const [farms, total_area_farms, farms_by_state, total_bry_crops] = await Promise.all([
      this.producerService.getQtdFarms(),
      this.producerService.getTotalAreaFarms(),
      this.producerService.getTotalFarmByState(),
      this.producerService.getTotalByCrops(),
    ])
    return { 
      farms,
      total_area_farms,
      farms_by_state,
      total_bry_crops
     }
  }
}