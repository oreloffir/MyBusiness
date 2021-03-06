import WorkCardDTO from './WorkCardDTO';
import PaymentInstrumentEnum from "@/utils/paymentInstrument/paymentInstrument.enum";
import PaymentInstrumentService from "@/utils/paymentInstrument/paymentInstrument.service";
import StorageConnector from "@/utils/firebase/StorageConnector";
import DBConnector from "@/utils/firebase/DBConnector";

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
    public paymentInstrument?: PaymentInstrumentEnum;
    public notes?: string;
    public invoiceReceiptLink?: string;
    public imageLink?: string;

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
        this.paymentInstrument = PaymentInstrumentService.enum(data.paymentInstrument) || PaymentInstrumentEnum.WAITING_FOR_PAYMENT;
        this.notes = data.notes;
        this.invoiceReceiptLink = data.invoiceReceiptLink;
        this.imageLink = data.imageLink;
    }

    get sumPrice() {
        return (this.workPrice ? parseInt(String(this.workPrice)) : 0) + (this.partsPrice ? parseInt(String(this.partsPrice)) : 0);
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
        if (!this.paymentInstrument)
            return null;

        return PaymentInstrumentService.instrument(this.paymentInstrument);
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
            invoiceReceiptLink: this.invoiceReceiptLink ? this.invoiceReceiptLink : null,
            imageLink: this.imageLink ? this.imageLink : null,
        };
    }

    public toString(): string {
        const message = ''.concat(
            this.id ? `** כרטיס עבודה מס: ${this.id}**\n` : '',
            this.date ? `תאריך: ${new Date(this.date).toLocaleDateString()}\n` : '',
            this.contact ? `איש קשר: ${this.contact}\n` : '',
            this.companyType ? `חברה: ${this.companyType}\n` : '',
            this.licensePlate ? `לוחית רישוי: ${this.licensePlate}\n` : '',
            this.workTime ? `זמן עבודה: ${this.workTime}\n` : '',
            this.startWorkTime ? `שעת התחלה: ${this.startWorkTime}\n` : '',
            this.endWorkTime ? `שעת סיום: ${this.endWorkTime}\n` : '',
            this.description ? `תיאור: ${this.description}\n` : '',
            this.workPrice ? `מחיר עבודה: ${this.workPrice}\n` : '',
            this.partsPrice ? `מחיר חלקים: ${this.partsPrice}\n` : '',
            this.partsCost ? `הוצאות: ${this.partsCost}\n` : '',
            this.paidSum ? `סכום: ${this.paidSum}\n` : '',
            this.paid ? `שולם: ${this.paid ? 'כן' : 'לא'}\n` : '',
            this.paymentInstrument ? `אמצעי תשלום: ${PaymentInstrumentService.label(this.paymentInstrument)}\n` : '',
            this.notes ? `הערות: ${this.notes}\n` : '',
            this.invoiceReceiptLink ? `לינק חשבונית/קבלה: ${this.invoiceReceiptLink}\n` : '',
            this.imageLink ? `לינק תמונה: ${this.imageLink}\n` : ''
        );

        return String(message);
    }

    public uploadImage(file: File) {
        StorageConnector.imagesCollection
            .child(`works/work-${this.id}-image.jpg`)
            .put(file)
            .then((snapshot) => {
                this.imageLink = snapshot.metadata.fullPath;
                this.save();
            });
    }

    public openImage() {
        StorageConnector.storageCollection.ref(this.imageLink)
            .getDownloadURL()
            .then((url) => {
                window.open(url, 'name', 'width=650,height=700')
            });
    }

    public openInvoice() {
        StorageConnector.storageCollection.ref(this.invoiceReceiptLink)
            .getDownloadURL()
            .then((url) => {
                window.open(url, 'name', 'width=750,height=800')
            });
    }

    public save() {
        DBConnector.worksCollection
            .child(String(this.id))
            .update(this.firebaseObject)
            .then(() => alert("שמירה בוצעה בהצלחה\n"))
            .catch((err: Error) => alert("שגיאה בזמן שמירה\n" + err));
    }
}
