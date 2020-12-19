import PaymentInstrumentEnum from "@/utils/paymentInstrument/paymentInstrument.enum";
import PaymentInstrumentInterface from "@/utils/paymentInstrument/paymentInstrument.interface";

export default class PaymentInstrumentService {
    public static get paymentInstruments(): Array<PaymentInstrumentInterface> {
        return [{
            value: PaymentInstrumentEnum.CREDIT_CARD,
            label: "אשראי",
            fullText: "אשראי",
            icon: "mdi-credit-card-outline",
            color: 'indigo accent-2'
        }, {
            value: PaymentInstrumentEnum.REMITTANCE,
            label: "העברה",
            fullText: "העברה",
            icon: "mdi-bank-transfer",
            color: 'purple'
        }, {
            value: PaymentInstrumentEnum.CHECK,
            label: "צ'ק",
            fullText: "צ'ק",
            icon: "mdi-checkbook",
            color: 'yellow'
        }, {
            value: PaymentInstrumentEnum.CASH,
            label: "מזומן",
            fullText: "מזומן",
            icon: "mdi-cash-multiple",
            color: 'green'
        }, {
            value: PaymentInstrumentEnum.WAITING_FOR_PAYMENT,
            label: "ממתין",
            fullText: "ממתין לתשלום",
            icon: "mdi-progress-clock",
            color: 'red'
        }, {
            value: PaymentInstrumentEnum.UNPAID,
            label: "לא שולם",
            fullText: "לא שולם (בוטל)",
            icon: "mdi-cancel",
            color: 'red darken-4'
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
            case PaymentInstrumentEnum.UNPAID:
                return PaymentInstrumentEnum.UNPAID;
            case PaymentInstrumentEnum.WAITING_FOR_PAYMENT:
                return PaymentInstrumentEnum.WAITING_FOR_PAYMENT;
        }
    }

    public static instrument(value: string): PaymentInstrumentInterface | undefined {
        return PaymentInstrumentService.paymentInstruments.filter((instrument) => {
            return instrument.value === value;
        }).pop();
    }

    public static label(value: string): string | undefined {
        const instrument = PaymentInstrumentService.instrument(value);

        if (instrument)
            return instrument.label;
    }
}
