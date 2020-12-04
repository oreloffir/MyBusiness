import PaymentInstrumentEnum from "@/utils/paymentInstrument/paymentInstrument.enum";

interface PaymentInstrumentInterface {
    value: PaymentInstrumentEnum;
    label: string;
    icon: string;
    color: string;
}

export default PaymentInstrumentInterface;
