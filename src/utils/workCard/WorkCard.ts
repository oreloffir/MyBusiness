export default class WorkCard {

    constructor(
        public id: number,
        public date: string,
        public contact: string,
        public companyType: number,
        public licensePlate: string,
        public workTime: number,
        public description: string,
        public workPrice: number,
        public partsPrice: number,
        public partsCost: number,
        public paidSum: number,
        public paid: boolean,
        public paymentInstrument: string,
        public notes: string
    ) {

        console.log("WorkCard constructor:");
        console.log(this.id, this.date, this.contact, this.companyType, this.licensePlate, this.workTime, this.description, this.workPrice, this.partsPrice, this.partsCost, this.paidSum, this.paid, this.paymentInstrument);
        console.log();
    }
}

