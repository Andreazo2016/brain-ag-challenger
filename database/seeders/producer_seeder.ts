import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import { Producer } from '../../app/models/producer.js'

export default class extends BaseSeeder {

  async save(producer: Producer) {
      const trx = await db.transaction()
      try {
      const result = await trx.insertQuery().table('producers').returning('id').insert({
          producer_name: producer.getProducerName,
          document: producer.getDocument,
          document_type: producer.getDocumentType,
          farm_name: producer.getFarmName,
          state: producer.getState,
          city: producer.getCity,
          total_area_arable: producer.getTotalAreaArable,
          total_area_vegetation: producer.getTotalAreaVegetation,
          total_area_farm: producer.getTotalAreaFarm,
          created_at: new Date()
      })
      const producerId = result[0].id
      if (producer?.getPlantedCrops && producer?.getPlantedCrops.length > 0) {
          await trx.insertQuery().table('producer_crops') .multiInsert(producer?.getPlantedCrops?.map(cp => ({
              crop_name: cp,
              producer_id: producerId,
              created_at: new Date()
          })))
      }
      await trx.commit()
      return producerId
      } catch (ex) {
          await trx.rollback()
      }
  }
  
  async run() {
      const producers = [
        {
          "producer_name": "Teste Producer",
          "farm_name": "Teste",
          "document": "06121699361",
          "city": "Solonopole",
          "state": "Ceará",
          "total_area_arable": 2,
          "total_area_vegetation": 1,
          "total_area_farm":3,
          "planted_crops": ["café"]
        },
        {
          "producer_name": "Teste Producer 2",
          "farm_name": "Teste",
          "document": "06121699361",
          "city": "Rio de Janeiro",
          "state": "Rio de Janeiro",
          "total_area_arable": 2,
          "total_area_vegetation": 1,
          "total_area_farm":3,
          "planted_crops": ["café", "milho"]
      },
      {
        "producer_name": "Teste Producer 3",
        "farm_name": "Teste",
        "document": "06121699361",
        "city": "São Paulo",
        "state": "São Paulo",
        "total_area_arable": 2,
        "total_area_vegetation": 1,
        "total_area_farm":3,
        "planted_crops": ["café", "milho"]
      }
    ]
    for (const producer of producers) {
        this.save(new Producer(producer))
    }
  }
}