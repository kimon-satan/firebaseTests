// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  Firestore,
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  connectFirestoreEmulator,
  DocumentData,
  QuerySnapshot
} from "firebase/firestore";
import { Analytics, getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

export default class FirebaseIface {
  app: FirebaseApp;
  analytics: Analytics;
  db: Firestore;

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.db = getFirestore(this.app);
    connectFirestoreEmulator(this.db, "localhost", 8080);
  }

  async addUser() {
    try {
      const docRef = await addDoc(collection(this.db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getUsers() {
    const q = query(collection(this.db, "users"), where("first", "==", "Ada"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  }

  subscribeUsers(callback: (users: Record<string, any>[]) => void) {
    const q = query(collection(this.db, "users"));
    onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const users: Record<string, any>[] = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      callback(users);
    });
  }
}
