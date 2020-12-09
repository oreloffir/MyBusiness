import Firebase from "@/utils/firebase/Firebase";

export default new class DBConnector {

    get worksCollection() {
        return Firebase.db.ref('works');
    }
}
