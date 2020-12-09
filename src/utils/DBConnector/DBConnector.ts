import Firebase from "@/utils/firebaseUtil/Firebase";

export default new class DBConnector {

    get worksCollection() {
        return Firebase.db.ref('works');
    }
}
