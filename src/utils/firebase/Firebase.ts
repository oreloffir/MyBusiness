import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';
import Storage = firebase.storage.Storage;
import Database = firebase.database.Database;
import Auth = firebase.auth.Auth;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7EwnjPHoJ0AtzDc8z39tAQoW_P3FjGag",
    authDomain: "mybusiness-49812.firebaseapp.com",
    databaseURL: "https://mybusiness-49812.firebaseio.com",
    projectId: "mybusiness-49812",
    storageBucket: "mybusiness-49812.appspot.com",
    messagingSenderId: "726136595356",
    appId: "1:726136595356:web:a344b1691059749100de59",
    measurementId: "G-2HY76N078H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default new class Firebase {
    private static _db: Database = firebase.database();

    get db() {
        return Firebase._db;
    }

    private static _storage: Storage = firebase.storage();

    get storage() {
        return Firebase._storage;
    }

    private static _auth: Auth = firebase.auth();

    get auth() {
        return Firebase._auth;
    }
}
