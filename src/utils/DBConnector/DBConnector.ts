import { db, worksCollection } from '../../firebase/';

export default new class DBConnector {
    constructor(){
        console.log("DBConnector constructor");
    }

    get worksCollection() {
        return worksCollection;
    }
}
