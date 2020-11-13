export default class WorkCard {
    public id: number;
    public date: number;
    public contact: string;
    public companyType: number;
    public licensePlate: string;
    public workTime: number;
    public description: string;
    public workPrice: number;
    public partsPrice: number;
    public partsCost: number;
    public paidSum: number;
    public paid: boolean;
    public paymentInstrument: string;
    public notes: string;

    constructor(public data: {
                    id: number;
                    date: number;
                    contact: string;
                    companyType: number;
                    licensePlate: string;
                    workTime: number;
                    description: string;
                    workPrice: number;
                    partsPrice: number;
                    partsCost: number;
                    paidSum: number;
                    paid: boolean;
                    paymentInstrument: string;
                    notes: string;
                }
    ) {
        this.id = data.id;
        this.date = data.date;
        this.contact = data.contact;
        this.companyType = data.companyType;
        this.licensePlate = data.licensePlate;
        this.workTime = data.workTime;
        this.description = data.description;
        this.workPrice = data.workPrice;
        this.partsPrice = data.partsPrice;
        this.partsCost = data.partsCost;
        this.paidSum = data.paidSum;
        this.paid = data.paid;
        this.paymentInstrument = data.paymentInstrument;
        this.notes = data.notes;
    }

    get dateString() {
        const tempDate = new Date(this.date);

        if (tempDate){
            return tempDate.toLocaleDateString();
        }

        return this.date.toString();
    }

    set dateString(timestamp: string) {
        this.date = parseInt(timestamp);
    }
}

