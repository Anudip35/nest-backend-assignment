import * as firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export class FirebaseService {
  private initialized = false;

  async initializeApp(): Promise<void> {
    if (!this.initialized) {
        const firebaseConfig = {
            apiKey: "AIzaSyBMd1Ad7qogg56DkbboD-h2LVHngVROMyA",
            authDomain: "nest-fxtrading-system.firebaseapp.com",
            projectId: "nest-fxtrading-system",
            storageBucket: "nest-fxtrading-system.appspot.com",
            messagingSenderId: "516339998232",
            appId: "1:516339998232:web:a5ca17739cf62c12f92d6d"
        };
      firebase.initializeApp(firebaseConfig);
      this.initialized = true;
    }
  }

  async signUp(email: string, password: string): Promise<void> {
    await this.initializeApp();
    await createUserWithEmailAndPassword(getAuth(), email, password);
  }

  async login(email: string, password: string): Promise<void> {
    await this.initializeApp();
    await signInWithEmailAndPassword(getAuth(), email, password);
  }

  async logout(): Promise<void> {
    await this.initializeApp();
    await signOut(getAuth());
  }

  async isAuthenticated(): Promise<boolean> {
    await this.initializeApp();
    return new Promise<boolean>((resolve) => {
      const unsubscribe = getAuth().onAuthStateChanged((user) => {
        unsubscribe();
        resolve(!!user);
      });
    });
  }
}
