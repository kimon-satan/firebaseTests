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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut
} from "firebase/auth";

import { Analytics, getAnalytics } from "firebase/analytics";

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

    if (import.meta.env.DEV) {
      // connectFirestoreEmulator(this.db, "localhost", 8080);
    }
  }

  signup(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  signin(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  subscribeUser(callback: (user: User | null) => void) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  }

  signout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  //////////////////// STORIES /////////////////////

  async addStory() {
    try {
      const docRef = await addDoc(collection(this.db, "stories"), {
        subject: "Journal",
        body: "Some text about me ...",
        date: new Date().toISOString()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  subscribeStories(callback: (stories: Record<string, any>[]) => void) {
    const q = query(collection(this.db, "stories"));
    onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const stories: Record<string, any>[] = [];
      querySnapshot.forEach((doc) => {
        stories.push({ id: doc.id, ...doc.data() });
      });
      callback(stories);
    });
  }

  async getStories() {
    const q = query(collection(this.db, "stories"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  }
}
