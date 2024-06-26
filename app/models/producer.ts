export interface ProducerParams {
    producer_name: string;
    document: string;
    farm_name: string;
    state: string;
    city: string;
    total_area_arable: number;
    total_area_vegetation: number;
    total_area_farm:number;
    planted_crops: string[];
}


export class Producer {
    private producer_name?: string;
    private document?: string;
    private document_type?: string;
    private farm_name?: string;
    private state?: string;
    private city?: string;
    private total_area_arable?: number;
    private total_area_vegetation?: number;
    private total_area_farm?: number;
    private planted_crops?: string[];

    constructor({ producer_name, document, farm_name, state, city, total_area_arable, total_area_vegetation, planted_crops, total_area_farm }: ProducerParams) {
        this.producer_name = producer_name
        this.document = document
        this.document_type = document ? (document?.length === 14 ? 'cnpj' : 'cpf'): undefined
        this.farm_name = farm_name
        this.state = state
        this.city = city
        this.total_area_arable = total_area_arable
        this.total_area_farm = total_area_farm
        this.total_area_vegetation = total_area_vegetation
        this.planted_crops = planted_crops?.length > 0 ? [...planted_crops] : []
    }

    isValidFarmArea(): boolean {
        const total = (this.total_area_arable ?? 0) + (this.total_area_vegetation ?? 0)
        return Number(total).toFixed(2) === Number(this.total_area_farm).toFixed(2)
    }
    
    public get getProducerName() : string | undefined {
        return this.producer_name
    }
    public get getFarmName() : string | undefined {
        return this.farm_name
    }
    public get getDocument() : string | undefined {
        return this.document
    }
    public get getDocumentType() : string | undefined  {
        return this.document_type
    }
    public get getState() : string | undefined  {
        return this.state
    }
    public get getCity() : string | undefined  {
        return this.city
    }
    public get getTotalAreaArable() : number | undefined {
        return this.total_area_arable
    }
    public get getTotalAreaVegetation() : number | undefined  {
        return this.total_area_vegetation
    }
    public get getTotalAreaFarm() : number | undefined {
        return this.total_area_farm
    } 
    public get getPlantedCrops() : string[]| undefined   {
        return this.planted_crops
    }
    
}