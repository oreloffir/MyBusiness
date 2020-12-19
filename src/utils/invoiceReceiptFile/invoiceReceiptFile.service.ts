import InvoiceReceiptFileEnum from "@/utils/invoiceReceiptFile/invoiceReceiptFile.enum";
import InvoiceReceiptFileInterface from "@/utils/invoiceReceiptFile/invoiceReceiptFile.interface";

export default class InvoiceReceiptFileService {
    public static get types(): Array<{ value: InvoiceReceiptFileEnum; text: string }> {
        return [{
            value: InvoiceReceiptFileEnum.INVOICE,
            text: "חשבונית"
        }, {
            value: InvoiceReceiptFileEnum.RECEIPT,
            text: "קבלה"
        }];
    }

    public static enum(value: string | undefined): InvoiceReceiptFileEnum | undefined {
        if (!value)
            return;

        switch (value.toUpperCase()) {
            case InvoiceReceiptFileEnum.RECEIPT:
                return InvoiceReceiptFileEnum.RECEIPT;
            case InvoiceReceiptFileEnum.INVOICE:
                return InvoiceReceiptFileEnum.INVOICE;
        }
    }

    static getInvRecFileByLink(link?: string): InvoiceReceiptFileInterface {
        if (!link)
            return {
                type: undefined,
                name: undefined,
                number: undefined,
                link: undefined,
            };

        const fileName = link.split('/').pop();
        const [name] = fileName ? fileName.split('.') : [undefined, undefined];
        const type = name ? InvoiceReceiptFileService.enum(name.slice(0, -5)) : undefined;
        const number = name ? parseInt(name.slice(-5)) : undefined;

        return {
            name: fileName,
            type,
            number,
            link,
        };
    }
}
