import { Producer } from "../models/producer.js";
import db from '@adonisjs/lucid/services/db'

export class ProducerService {
    async save(producer: Producer){
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
}