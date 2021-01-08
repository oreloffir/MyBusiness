import WorkCard from "../workCard/WorkCard";
import Vue from "vue";

interface FiltersInterface {
    date: {
        months: Map<number, string>;
        years: Map<number, string>;
    };
    paymentInstrument: {
        instruments: Map<string, number>;
    };
}

export default class WorksTable {
    public works: Array<WorkCard>;
    public displayed: Array<WorkCard>;
    private _filter: FiltersInterface;

    constructor(works: Array<WorkCard>) {
        this.works = works;
        this._search = '';
        this._filter = {
            date: {
                months: new Map(),
                years: new Map(),
            },
            paymentInstrument: {
                instruments: new Map()
            }
        };
    }

    private _search: string;

    get search() {
        return this._search;
    }

    set search(val) {
        this._search = val;
    }

    get displayedWorks() {
        return this.displayed;
    }

    set displayedWorks(val) {
        Vue.set(this, 'displayed', val);
    }

    get dateFilter() {
        return this._filter.date;
    }

    get paymentInstrumentFilter() {
        return this._filter.paymentInstrument;
    }

    get headers() {
        return [
            {
                text: 'תאריך',
                value: 'date',
                dataType: 'Date',
                width: 100,
                filter: (date: string) => {
                    if (!this.dateFilter.months.size)
                        return true;

                    return this.dateFilter.months.has(new Date(date).getMonth() + 1) &&
                        this.dateFilter.years.has(new Date(date).getFullYear() - 2000);
                },
            },
            {
                text: 'איש קשר',
                value: 'contact',
            },
            {text: 'לקוח', value: 'companyType'},
            {text: 'לוחית רישוי', value: 'licensePlate', width: 112},
            // {text: 'שעות עבודה', value: 'workTime'},
            {text: 'תיאור עבודה', value: 'description', width: 350, height: 100},
            {text: 'מחיר עבודה', value: 'sumPrice'},
            // {text: 'מחיר חלקים', value: 'partsPrice'},
            // {text: 'הוצאות', value: 'partsCost'},
            {text: 'שולם', value: 'paidSum'},
            {
                text: 'אמצעי תשלום',
                value: 'paymentInstrument',
                filter: (instrument: string) => {
                    if (!this.paymentInstrumentFilter.instruments.size)
                        return true;

                    return this.paymentInstrumentFilter.instruments.has(instrument);
                },
            },
            {text: 'הערות', value: 'notes', sortable: false},
            // {text: 'פעולות', value: 'actions', sortable: false, width: 105},
        ];
    }
}
