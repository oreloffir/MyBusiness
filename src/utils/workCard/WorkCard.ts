import WorkCardDTO from './WorkCardDTO';

export default class WorkCard {
    public id: number;
    public date: number;
    public contact?: string;
    public companyType?: number;
    public licensePlate?: string;
    public workTime?: number;
    public startWorkTime?: string;
    public endWorkTime?: string;
    public description?: string;
    public workPrice?: number;
    public partsPrice?: number;
    public partsCost?: number;
    public paidSum?: number;
    public paid?: boolean;
    public paymentInstrument?: string;
    public notes?: string;

    constructor(data: WorkCardDTO
    ) {
        this.id = data.id;
        this.date = data.date;
        this.contact = data.contact;
        this.companyType = data.companyType;
        this.licensePlate = data.licensePlate;
        this.workTime = data.workTime;
        this.startWorkTime = data.startWorkTime;
        this.endWorkTime = data.endWorkTime;
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

        if (tempDate) {
            return tempDate.toLocaleDateString();
        }

        return this.date.toString();
    }

    set dateString(timestamp: string) {
        this.date = parseInt(timestamp);
    }

    get paymentInst() {
        switch (this.paymentInstrument) {

            case "CREDIT_CARD":
                return {
                    value: "CREDIT_CARD",
                    text: "אשראי"
                };
            case "REMITTANCE":
                return {
                    value: "REMITTANCE",
                    text: "העברה"
                };
            case "CHECK":
                return {
                    value: "CHECK",
                    text: "צ'ק"
                };
            case "CASH":
            default:
                return {
                    value: "CASH",
                    text: "מזומן"
                };
        }
    }

    set paymentInst(value) {
        this.paymentInstrument = String(value);
    }

    get firebaseObject() {
        return {
            id: this.id ? this.id : null,
            date: this.date ? this.date : null,
            contact: this.contact ? this.contact : null,
            companyType: this.companyType ? this.companyType : null,
            licensePlate: this.licensePlate ? this.licensePlate : null,
            workTime: this.workTime ? this.workTime : null,
            startWorkTime: this.startWorkTime ? this.startWorkTime : null,
            endWorkTime: this.endWorkTime ? this.endWorkTime : null,
            description: this.description ? this.description : null,
            workPrice: this.workPrice ? this.workPrice : null,
            partsPrice: this.partsPrice ? this.partsPrice : null,
            partsCost: this.partsCost ? this.partsCost : null,
            paidSum: this.paidSum ? this.paidSum : null,
            paid: this.paid ? this.paid : null,
            paymentInstrument: this.paymentInstrument ? this.paymentInstrument : null,
            notes: this.notes ? this.notes : null,
        };
    }
}
