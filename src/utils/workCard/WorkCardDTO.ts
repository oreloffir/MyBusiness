export default interface WorkCardDTO {
    id: number;
    date: number;
    contact?: string;
    companyType?: number;
    licensePlate?: string;
    workTime?: number;
    startWorkTime?: string;
    endWorkTime?: string;
    description?: string;
    workPrice?: number;
    partsPrice?: number;
    partsCost?: number;
    paidSum?: number;
    paid?: boolean;
    paymentInstrument?: string;
    notes?: string;
    taxInvoice?: string;
}
