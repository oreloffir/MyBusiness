import PaymentInstrumentEnum from './paymentInstrument.enum';

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
}
