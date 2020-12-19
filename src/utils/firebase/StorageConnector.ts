import Firebase from "./Firebase";

export default new class StorageConnector {

    get filesCollection() {
        return Firebase.storage.ref('files');
    }

    get imagesCollection() {
        return Firebase.storage.ref('images');
    }

    get storageCollection() {
        return Firebase.storage;
    }
}
