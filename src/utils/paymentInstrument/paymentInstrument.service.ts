import PaymentInstrumentEnum from "@/utils/paymentInstrument/paymentInstrument.enum";
import PaymentInstrumentInterface from "@/utils/paymentInstrument/paymentInstrument.interface";

export default class PaymentInstrumentService {
    public static get paymentInstruments(): Array<PaymentInstrumentInterface> {
        return [{
            value: PaymentInstrumentEnum.CREDIT_CARD,
            label: "אשראי",
            icon: "mdi-credit-card",
            color: 'gray'
        }, {
            value: PaymentInstrumentEnum.REMITTANCE,
            label: "העברה",
            icon: "mdi-bank-transfer",
            color: 'purple'
        }, {
            value: PaymentInstrumentEnum.CHECK,
            label: "צ'ק",
            icon: "mdi-checkbook",
            color: 'yellow'
        }, {
            value: PaymentInstrumentEnum.CASH,
            label: "מזומן",
            icon: "mdi-cash-multiple",
            color: 'green'
        }]
    }

    public static enum(value: string | undefined): PaymentInstrumentEnum | undefined {
        switch (value) {
            case PaymentInstrumentEnum.CHECK:
                return PaymentInstrumentEnum.CHECK;
            case PaymentInstrumentEnum.REMITTANCE:
                return PaymentInstrumentEnum.REMITTANCE;
            case PaymentInstrumentEnum.CREDIT_CARD:
                return PaymentInstrumentEnum.CREDIT_CARD;
            case PaymentInstrumentEnum.CASH:
                return PaymentInstrumentEnum.CASH;
        }
    }

    public static instrument(value: string): PaymentInstrumentInterface | undefined {
        return PaymentInstrumentService.paymentInstruments.filter((instrument) => {
            return instrument.value === value;
        }).pop();
    }
}
