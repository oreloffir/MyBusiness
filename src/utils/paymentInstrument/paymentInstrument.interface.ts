import PaymentInstrumentEnum from "@/utils/paymentInstrument/paymentInstrument.enum";

interface PaymentInstrumentInterface {
    value: PaymentInstrumentEnum;
    label: string;
    fullText: string;
    icon: string;
    color: string;
}

export default PaymentInstrumentInterface;
