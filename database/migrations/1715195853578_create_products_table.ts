import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'producers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id', { primaryKey: true })
      table.string('document', 14)
      table.string('document_type', 5)
      table.string('farm_name', 255)
      table.string('producer_name', 255)
      table.string('city', 100)
      table.string('state', 100)
      table.double('total_area_farm', 2) // Área total em hectares da fazenda
      table.double('total_area_arable', 2) //Área agricultável em hectares
      table.double('total_area_vegetation', 2) //Área de vegetação em hectares
      //table.string('planted_crops') // (Soja, Milho, Algodão, Café, Cana de Açucar)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}