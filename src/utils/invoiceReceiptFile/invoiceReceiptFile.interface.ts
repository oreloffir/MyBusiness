import InvoiceReceiptFileEnum from "@/utils/invoiceReceiptFile/invoiceReceiptFile.enum";

interface InvoiceReceiptFileInterface {
    type?: InvoiceReceiptFileEnum;
    name?: string;
    number?: number;
    link?: string;
}

export default InvoiceReceiptFileInterface;
