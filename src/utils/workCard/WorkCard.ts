import WorkCardDTO from './WorkCardDTO';

export default class WorkCard {
    public id: number;
    public date: number;
    public contact: string;
    public companyType: number;
    public licensePlate: string;
    public workTime: number;
    public startTime: string;
    public endTime: string;
    public description: string;
    public workPrice: number;
    public partsPrice: number;
    public partsCost: number;
    public paidSum: number;
    public paid: boolean;
    public paymentInstrument: string;
    public notes: string;

    constructor(data: WorkCardDTO
    ) {
        this.id = data.id;
        this.date = data.date;
        this.contact = data.contact;
        this.companyType = data.companyType;
        this.licensePlate = data.licensePlate;
        this.workTime = data.workTime;
        this.startTime = data.startWorkTime;
        this.endTime = data.endWorkTime;
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

    private static processWorkTime(workTime: number | string) {
        console.log('processWorkTime', workTime, workTime.toString().indexOf("-") > -1);
        if (workTime.toString().indexOf("-") > -1) {
            const [startTime, endTime] = workTime.toString().split("-");

            const start = startTime.split(":");
            const end = endTime.split(":");
            const startDate = new Date(0, 0, 0, parseInt(start[0]), parseInt(start[1]), 0);
            const endDate = new Date(0, 0, 0, parseInt(end[0]), parseInt(end[1]), 0);
            let diff = endDate.getTime() - startDate.getTime();
            let hours = Math.floor(diff / 1000 / 60 / 60);
            diff -= hours * 1000 * 60 * 60;
            const minutes = Math.floor(diff / 1000 / 60);

            // If using time pickers with 24 hours format, add the below line get exact hours
            if (hours < 0)
                hours = hours + 24;

            return {
                start: startTime,
                end: endTime,
                diff: hours + (minutes / 60)
            }
        }

        return {
            start: null,
            end: null,
            diff: parseInt(workTime + "")
        };
    }
}
