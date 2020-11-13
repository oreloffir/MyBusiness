import { db } from '../../firebase/';

export default new class DBConnector {
    private _DB = db;

    get worksCollection() {
        return this._DB.ref('works');
    }
}
