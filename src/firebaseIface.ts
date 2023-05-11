import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";

import {
  Firestore,
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  onSnapshot,
  connectFirestoreEmulator,
  DocumentData,
  QuerySnapshot
} from "firebase/firestore";

import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
  Auth
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
  auth: Auth;

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.db = getFirestore(this.app);
    this.auth = getAuth();

    if (import.meta.env.DEV) {
      connectFirestoreEmulator(this.db, "localhost", 8080);
      connectAuthEmulator(this.auth, "http://localhost:9099");
    }
  }

  signup(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  signin(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  subscribeUser(callback: (user: User | null) => void) {
    onAuthStateChanged(this.auth, (user) => {
      callback(user);
    });
  }

  signout() {
    signOut(this.auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
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
