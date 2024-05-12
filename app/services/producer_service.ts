import { Producer } from "../models/producer.js";
import db from '@adonisjs/lucid/services/db'
export class ProducerService {

    async save(producer: Producer): Promise<number> {
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
        await trx.insertQuery().table('producer_crops') .multiInsert(producer.getPlantedCrops.map(cp => ({
            crop_name: cp,
            producer_id: producerId,
            created_at: new Date()
        })))
        await trx.commit()
        return producerId
        } catch (ex) {
            await trx.rollback()
            throw ex
        }
    }
    async getQtdFarms(){
        const result = await db.from('producers').countDistinct('farm_name', 'total')
        return Number(result[0].total)
    }
    async getTotalAreaFarms(){
        const result = await db.from('producers').sum('total_area_farm', 'total')
        return Number(result[0].total)
    }
    async getTotalFarmByState(){
        const result = await db.from('producers')
        .select('state')
        .count('farm_name', 'total')
        .groupBy('state')
        return result
    }
    async getTotalByCrops(){
        const result = await db.from('producer_crops')
        .select('crop_name')
        .count('crop_name', 'total')
        .groupBy('crop_name')
        return result
    }
}